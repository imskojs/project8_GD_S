'use strict';
var Promise = require('bluebird');
var _ = require('lodash');
var cloudinary = require('cloudinary');
var fs = require('fs');

module.exports = {
  findLatest: findLatest,
  find: find,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy,

  //====================================================
  //  Not used
  //====================================================
  findNative: findNative
};


function findLatest(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Post.findLatest  -------------");
  sails.log(queryWrapper);
  return Post.find({
      where: {
        category: queryWrapper.query.where.category
      },
      sort: 'updatedAt DESC',
      limit: 1
    }).populate('photos')
    .then((inArray) => {
      let latestPost = inArray[0];
      return res.ok(latestPost);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function find(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Post.find  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  let populate = queryWrapper.populate;
  if (!query.limit) {
    query.limit = 100;
  }
  query.limit++;
  let postPromise = Post.find(query);
  QueryService.applyPopulate(postPromise, populate);
  let countPromise = Post.count(query);
  return Promise.all([postPromise, countPromise])
    .spread((posts, count) => {
      let more = (posts[query.limit - 1]) ? true : false;
      if (more) {
        posts.pop();
      }
      return res.ok({
        posts: posts,
        more: more,
        total: count
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function findOne(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Post.findOne  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  let populate = queryWrapper.populate;
  let postPromise = Post.findOne(query);
  QueryService.applyPopulate(postPromise, populate);
  return postPromise
    .then((post) => {
      if (post.views === undefined) {
        post.views = 0;
      }
      post.views = post.views + 1;
      let pendingSave = Promise.pending();
      post.save((err, savedPost) => {
        if (err) {
          pendingSave.reject(err);
        } else {
          pendingSave.resolve(savedPost);
        }
      });
      return pendingSave.promise;
    })
    .then((savedPost) => {
      delete savedPost.comments;
      return res.ok(savedPost);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function create(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Post.create  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;

  if (!QueryService.checkParamPassed(query.category)) {
    return res.send(400, {
      message: "no category sent"
    });
  }
  if (query.category === 'RANK') {
    // RANK begins
    var itemPhotosPromise = _.map([
      'item0', 'item1', 'item2', 'item3',
      'item4', 'item5', 'item6', 'item7',
      'item8', 'item9'
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
          query[field].photo = createdPhotos[i];
        });
        return Post.create(query);
      })
      .then(function(createdPost) {
        return res.ok(createdPost);
      })
      .catch(function(err) {
        return res.negotiate(err);
      });
    // RANK end
  } else if (query.category !== 'RANK') {
    /* beautify preserve:start */
    delete query.item0; delete query.item1; delete query.item2; delete query.item3;
    delete query.item4; delete query.item5; delete query.item6; delete query.item7;
    delete query.item8; delete query.item9;
    /* beautify preserve:end */
    return ImageService
      .createPhotos(req, [])
      .then((createdPhotos) => {
        query.photos = _.pluck(createdPhotos, 'id');
        return Post.create(query);
      })
      .then((createdPost) => {
        return Post.findOne({
          id: createdPost.id
        }).populate('photos');
      })
      .then((post) => {
        return res.ok(post);
      })
      .catch((err) => {
        return res.negotiate(err);
      });
  }
}


// function create(req, res) {
//   var queryWrapper = QueryService.buildQuery(req);
//   sails.log("-----------  queryWrapper: Post.create  -------------");
//   sails.log(queryWrapper);
//   var query = queryWrapper.query;

//   if (!QueryService.checkParamPassed(query.category)) {
//     return res.send(400, {
//       message: "no category sent"
//     });
//   }

//   return ImageService
//     .createPhotos(req, [])
//     .then((createdPhotos) => {
//       query.photos = _.pluck(createdPhotos, 'id');
//       return Post.create(query);
//     })
//     .then((createdPost) => {
//       return Post.findOne({
//         id: createdPost.id
//       }).populate('photos');
//     })
//     .then((post) => {
//       return res.ok(post);
//     })
//     .catch((err) => {
//       return res.negotiate(err);
//     });
// }

function update(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Post.update  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  query.updatedBy = req.user.id;
  let id = query.id;
  delete query.id;
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "no id sent"
    });
  }
  let propertiesAllowedToUpdate = [
    'category', 'tags', 'title', 'content', 'photos'
  ];
  for (let i = 0; i < 10; i++) {
    propertiesAllowedToUpdate.push('item' + i);
  }
  let propertiesToUpdate = {};
  // this does not have any effect see ProductController.updateProduct...
  _.forEach(propertiesAllowedToUpdate, (property) => {
    if (propertiesToUpdate[property]) {
      // query[property] = propertiesToUpdate[property];
      query[property] = propertiesToUpdate[property];
    }
  });
  if (!Array.isArray(query.photos)) {
    query.photos = [];
  }

  if (query.category === 'RANK') {

  } else {
    return Post
      .findOne({
        id: id
      }).populate('photos')
      .then((oldPost) => {
        return ImageService.updatePhotos(oldPost.photos, query.photos /*toKeepPhotos*/ , req);
      })
      .then((createdPhotoIds) => {
        _.forEach(createdPhotoIds, (photoId) => {
          query.photos.push(photoId);
        });
        return Post.update({
          id: id
        }, query);
      })
      .then((postInArray) => {
        return Post.findOne({
          id: postInArray[0].id
        }).populate('photos');
      })
      .then(function(post) {
        return res.ok(post);
      })
      .catch((err) => {
        return res.negotiate(err);
      });
  }

}


function destroy(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Post.destroy  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var id = query.where.id;
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "no id sent"
    });
  }
  return Post.destroy({
      id: id
    })
    .then((destroyedPostInArray) => {
      return res.ok(destroyedPostInArray[0]);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function findNative(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Post.findNative  -------------");
  sails.log(queryWrapper);

  return Promise.resolve(QueryService.executeNative(Post, queryWrapper))
    .spread((posts, more, count) => {
      return res.ok({
        posts: posts,
        more: more,
        total: count
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
