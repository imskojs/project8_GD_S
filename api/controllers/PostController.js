'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  find: find,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy,

  findNative: findNative
};

function find(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;
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
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;
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
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  query.owner = req.user.id;
  query.createdBy = req.user.id;
  query.updatedBy = req.user.id;
  if (!QueryService.checkParamPassed(query.category)) {
    return res.send(400, {
      message: "no category sent"
    });
  }
  ImageService
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

function update(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
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
  _.forEach(propertiesAllowedToUpdate, (property) => {
    if (propertiesToUpdate[property]) {
      query[property] = propertiesToUpdate[property];
    }
  });
  if (!Array.isArray(query.photos)) {
    query.photos = [];
  }

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
      return res.ok(postInArray[0]);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}


function destroy(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
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

  var queryWrapper = QueryService.buildQuery({}, req.allParams());

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
