'use strict';
var Promise = require('bluebird');
var _ = require('lodash');
var cloudinary = require('cloudinary');
var fs = require('fs');

module.exports = {
  findLatest: findLatest,
  create: create,
};

function findLatest(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Poll.find  -------------");
  sails.log(queryWrapper);
  return Poll.find({
      where: {},
      sort: 'updatedAt DESC',
      limit: 1
    }).populateAll()
    .then((inArray) => {
      let lastestPoll = inArray[0];
      return res.ok(lastestPoll);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function create(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Poll.create  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  if (!QueryService.checkParamPassed(query.content)) {
    return res.send(400, {
      message: "no content sent"
    });
  }
  // RANK begins
  var itemPhotosPromise = _.map([
    'photo0', 'photo1'
  ], function(itemName) {
    var deferred = Promise.pending();
    req.file(itemName)
      .upload(function(err, imagesInServer) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve(imagesInServer);
        }
      });
    return deferred.promise;
  });

  return Promise.all([Promise.all(itemPhotosPromise), []])
    .then(function(array) {
      // [[{fd, filename, field}], [{fd, filename, field}]]
      var imagesInServer = _.flatten(array[0], true);
      var photoTags = array[1];
      var imagePromises = _.map(imagesInServer, function(image) {
        return cloudinary.uploader.upload(image.fd, null, {
          tags: photoTags
        });
      });
      return [Promise.all(imagePromises), imagesInServer];
    })
    .spread(function(imagesInCloudinary, imagesInServer) {
      var fields = _.pluck(imagesInServer, 'field');
      _.forEach(imagesInServer, function(image) {
        fs.unlink(image.fd);
      });
      return [imagesInCloudinary, fields];
    })
    .spread(function(imagesInCloudinary, fields) {
      _.forEach(imagesInCloudinary, function(cloudinaryObj) {
        if (req.user && req.user.id) {
          cloudinaryObj.createdBy = req.user.id;
          cloudinaryObj.updatedBy = req.user.id;
          cloudinaryObj.owner = req.user.id;
        }
      });
      if (imagesInCloudinary.length === 0) {
        return [];
      }
      // fileds = [item0Photo, item1Photo]
      return [Photo.create(imagesInCloudinary), fields];
    })
    .spread(function(createdPhotos, fields) {
      _.forEach(fields, function(field, i) {
        query[field] = createdPhotos[i];
      });
      return Poll.create(query);
    })
    .then(function(createdPoll) {
      return Poll.findOne({
        id: createdPoll.id
      }).populate('photo0').populate('photo1');
    })
    .then(function(poll) {
      return res.ok(poll);
    })
    .catch(function(err) {
      return res.negotiate(err);
    });

}
