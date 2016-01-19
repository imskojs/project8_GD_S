/**
 * Created by andy on 26/05/15
 * As part of beigintongserver
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 26/05/15
 *
 */


'use strict';
var Promise = require('bluebird');
var _ = require('lodash');
var cloudinary = require('cloudinary');
var fs = require('fs');

var appTags = [];

module.exports = {
  createPhotos: createPhotos,
  updatePhotos: updatePhotos,
  updatePhoto: updatePhoto,
  destroyPhoto: destroyPhoto,

  init: init,
  getService: getService,
  uploadPhoto: uploadPhoto,
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
