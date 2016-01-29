'use strict';
var Promise = require('bluebird');
var _ = require('lodash');
var cloudinary = require('cloudinary');
var fs = require('fs');

var appTags = [];

module.exports = {
  createPhotos: createPhotos,
  createFieldPhotos: createFieldPhotos,
  updatePhotos: updatePhotos,
  updatePhoto: updatePhoto,
  destroyPhoto: destroyPhoto,

  init: init,
  getService: getService,
  uploadPhoto: uploadPhoto,
  // Old
  createPhoto: createPhoto,
  deletePhoto: deletePhoto
};

// (req: requestObject, photoTags: string[])
// => createdPhotos: iPhoto[] | []
function createPhotos(req, photoTags) {
  var deferred = Promise.pending();
  req.file('file')
    .upload(function(err, imagesInServer) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(imagesInServer);
      }
    });
  return Promise.all([deferred.promise, photoTags])
    .then(function(array) {
      var imagesInServer = array[0];
      var photoTags = array[1];
      var imagePromises = _.map(imagesInServer, function(image) {
        return cloudinary.uploader.upload(image.fd, null, {
          tags: photoTags
        });
      });
      return [Promise.all(imagePromises), imagesInServer];
    })
    .spread(function(imagesInCloudinary, imagesInServer) {
      // Remove temp file
      for (var i = 0; i < imagesInServer.length; ++i) {
        sails.log("Removing temp file: " + imagesInServer[i].fd);
        fs.unlink(imagesInServer[i].fd);
      }
      return imagesInCloudinary;
    })
    .then(function(imagesInCloudinary) {
      sails.log("-----------  imagesInCloudinary  -------------");
      sails.log(imagesInCloudinary);
      _.forEach(imagesInCloudinary, function(cloudinaryObj) {
        if (req.user && req.user.id) {
          cloudinaryObj.createdBy = req.user.id;
          cloudinaryObj.updatedBy = req.user.id;
          cloudinaryObj.owner = req.user.id;
        }
      });

      if (imagesInCloudinary.length > 0) {
        return Photo.create(imagesInCloudinary /*: CloudinaryImage[] */ );
      } else {
        return [];
      }
    })
    .then(function(createdPhotos) {
      return createdPhotos; //: iPhoto[] | []
    });
}

// (fields: string[], req: RequestObj) 
// => Obj: { 
//   photos: iPhoto[] | [], 
//   appliedFields: string[] | [],
//   notAppliedFields: string[] | []
// }
function createFieldPhotos(fields, req, tags) {
  var tempImageFilesInArray = _.map(fields, function(fieldName) {
    var deferred = Promise.pending();
    req.file(fieldName)
      .upload(function(err, imagesInTempFolder) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(imagesInTempFolder);
        }
      });
    return deferred.promise;
  });
  return Promise.all(tempImageFilesInArray)
    .then(function(tempImageFilesInArray) {
      // tempImageFilesInArray = [[{fd, filename, field}], [{fd, filename, field}]]
      let imageFilesInTempFolder = _.flatten(tempImageFilesInArray, true);
      let imagesInCloudinary = _.map(imageFilesInTempFolder, function(imageObj) {
        return cloudinary.uploader.upload(imageObj.fd, null, {
          tags: tags ? tags : []
        });
      });
      return Promise.all([Promise.all(imagesInCloudinary), imageFilesInTempFolder]);
    })
    .spread(function(imagesInCloudinary, imageFilesInTempFolder) {
      let appliedFields = _.pluck(imageFilesInTempFolder, 'field');
      _.forEach(imageFilesInTempFolder, function(imageObj) {
        fs.unlink(imageObj.fd);
      });
      _.forEach(imagesInCloudinary, function(cloudinaryObj) {
        if (req.user && req.user.id) {
          cloudinaryObj.createdBy = req.user.id;
          cloudinaryObj.updatedBy = req.user.id;
          cloudinaryObj.owner = req.user.id;
        }
      });
      var createdPhotos = Photo.create(imagesInCloudinary);
      return [createdPhotos, appliedFields];
    })
    .spread((createdPhotos, appliedFields) => {
      // appliedFields, and createdPhotos have same order
      return {
        photos: createdPhotos,
        appliedFields: appliedFields,
        notAppliedFields: _.difference(fields, appliedFields)
      };
    });
}

//(id: iPhoto.id)
//=> deletedPhoto: iPhoto
function destroyPhoto(id, onlyPhotoModel) {
  return Photo
    .findOne({
      id: id
    })
    .then(function(photo) {
      if (!photo) {
        return Promise.reject({
          message: 'noPhoto'
        });
      }
      if (onlyPhotoModel) {
        return {
          message: 'onlyPhotoModel is Deleted'
        };
      } else {
        return cloudinary.uploader.destroy(photo.public_id, null);
      }
    })
    .then(function(destroyedCloudinaryPhoto) {
      sails.log("-----------  ImageService.destroyPhoto => :destroyedCloudinaryPhoto  -------------");
      sails.log(destroyedCloudinaryPhoto);
      return Photo.destroy({
        id: id
      });
    })
    .then(function(deletedPhotoInArray) {
      var deletedPhoto = deletedPhotoInArray[0];
      return deletedPhoto; /*: iPhoto */
    });
}

// (oldPhotos: iPhoto[], toKeepPhotos: iPhoto[], req: requestObject)
//=> createdPhotoIds: iPhoto.id[]
function updatePhotos(oldPhotos, toKeepPhotos, req, onlyPhotoModel) {
  var oldPhotoIds = _.pluck(oldPhotos, 'id');
  var toKeepPhotoIds = _.pluck(toKeepPhotos, 'id');
  var allPhotoIds = _.union(oldPhotoIds, toKeepPhotoIds);
  var toDeletePhotoIds = _.difference(allPhotoIds, toKeepPhotoIds);
  var destroyPendingPhotos = _.map(toDeletePhotoIds, function(id) {
    return destroyPhoto(id, onlyPhotoModel);
  });
  return Promise.all(destroyPendingPhotos)
    .then(function(destroyedPhotos) {
      sails.log("-----------  Post.update's destroyedPhotos  -------------");
      sails.log(destroyedPhotos);
      return ImageService
        .createPhotos(req, []);
    })
    .then(function(createdPhotos) {
      var createdPhotoIds = _.pluck(createdPhotos, 'id');
      return createdPhotoIds; /*: iPhoto.id[]*/
    });
}

function updatePhoto(oldPhoto, toKeepPhoto, req, onlyPhotoModel) {
  var oldPhotoId = oldPhoto.id;
  if (toKeepPhoto) {
    return false;
  }
  return destroyPhoto(oldPhotoId, onlyPhotoModel)
    .then((destroyedPhoto) => {
      sails.log("-----------  destroyedPhoto  -------------");
      sails.log(destroyedPhoto);
      return ImageService.createPhotos(req, []);
    })
    .then(function(createdPhotoInArray) {
      if (createdPhotoInArray && createdPhotoInArray[0] && createdPhotoInArray[0].id) {
        return createdPhotoInArray[0].id;
      } else {
        sails.log('photo destroyed but new photo is not created --ImageService.updatePhoto');
        return false;
      }
    });
}



function init() {
  cloudinary.config(sails.config.connections.cloudinary);
  appTags = sails.config.connections.cloudinary.tags;
}

function getService() {
  return cloudinary;
}

//====================================================
//  Old
//====================================================
function uploadPhoto(req, photoTags, data, callback) {
  req.file('file').upload(function(err, imagesInServer) {
    if (err) {
      callback(err);
      return;
    }
    var tags = appTags;
    var i;
    if (photoTags) {
      for (i = 0; i < photoTags.length; i++) {
        tags.push(photoTags[i]);
      }
    }
    var ImagePromises = [];
    for (i = 0; i < imagesInServer.length; ++i) {
      ImagePromises.push(cloudinary.uploader.upload(imagesInServer[i].fd, null, {
        tags: tags
      }));
    }
    Promise.all(ImagePromises)
      .then(function(imagesInCloudinary) {
        for (var i = 0; i < imagesInServer.length; ++i) {
          sails.log.debug("Removing file: " + imagesInServer[i].fd);
          fs.unlink(imagesInServer[i].fd);
        }
        callback(null, imagesInCloudinary);
      })
      .catch(function(err) {
        callback(err);
      });
  });
}

function createPhoto(req, photoTags, data, callback) {
  sails.log.debug("ImageService: createPhoto");
  // Upload to server with skipper
  req.file('file').upload(function(err, imagesInServer) {

    sails.log.debug("ImageService: upload done");

    if (err) {
      sails.log.error(err);
      callback(err);
      return;
    }

    // Adds tag to specific to application domain
    var tags = appTags;
    var i = 0;
    if (photoTags) {
      for (i = 0; i < photoTags.length; i++) {
        tags.push(photoTags[i]);
      }
    }

    // Collection promise
    var ImagePromises = [];
    for (i = 0; i < imagesInServer.length; ++i) {
      ImagePromises.push(cloudinary.uploader.upload(imagesInServer[i].fd, null, {
        tags: tags
      }));
    }

    // Upload to cloudinary
    Promise.all(ImagePromises)
      .then(function(imagesInCloudinary) {

        sails.log.debug("ImageService: upload done to cloudinary");

        // Remove temp file
        var i = 0;
        for (i = 0; i < imagesInServer.length; ++i) {
          sails.log.debug("Removing file: " + imagesInServer[i].fd);
          fs.unlink(imagesInServer[i].fd);
        }

        sails.log.debug("ImageService: image in server removed");

        if (data) {
          for (i = 0; i < imagesInCloudinary.length; i++) {
            if (data.tags) {
              if (!imagesInCloudinary[i].tags)
                imagesInCloudinary[i].tags = [];
              imagesInCloudinary[i].tags = _.union(imagesInCloudinary[i].tags, tags);
            }

            delete data.tags;
            imagesInCloudinary[i] = _.extend(imagesInCloudinary[i], data);
          }
        }

        sails.log.debug("ImageService: createPhoto - " + imagesInCloudinary);


        //save uploaded photo to database.
        return Photo.create(imagesInCloudinary);
      })
      .then(function(imagesInDb) {
        callback(null, imagesInDb);
      })
      .catch(function(err) {
        callback(err);
      });
  });
}

function deletePhoto(id, callback) {

  // Find photo metadata first
  Photo.findOne({
      id: id
    })
    .then(function(photo) {

      sails.log.debug("removing photo:" + photo.id);

      // If exist delete from cloud
      return cloudinary.uploader.destroy(photo.public_id, null);
    })
    .then(function(photo) {

      sails.log.debug('after: ' + JSON.stringify(photo));
      // On success delete metadata from out db
      return Photo.destroy({
        id: id
      });
    })
    .then(function(photos) {
      if (callback)
        callback(null, photos);
    })
    .catch(function(err) {
      if (callback)
        callback(err);
    });
}
