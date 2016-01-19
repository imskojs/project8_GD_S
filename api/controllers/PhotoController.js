/**
 * Created by Andy on 7/13/2015
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 7/13/2015
 *
 */

var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {

  find: find,
  findNative: findNative,
  findOne: findOne,

  create: create,
  update: update,
  destroy: destroy
}


function find(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100)
    query.limit = 100;

  query.limit++;

  var photoPromise = Photo.find(query);

  QueryService.applyPopulate(photoPromise, populate);

  var countPromise = Photo.count(query);

  Promise.all([photoPromise, countPromise])
    .spread(function (photos, count) {


      // See if there's more
      var more = (photos[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more)photos.splice(query.limit - 1, 1);

      res.ok({photos: photos, more: more, total: count});
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function findNative(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());

  Promise.resolve(QueryService.executeNative(Photo, queryWrapper))
    .spread(function (photos, more, count) {
      res.ok({photos: photos, more: more, total: count});
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function findOne(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!QueryService.checkParamPassed(query.where.id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  var photoPromise = Photo.find(query);

  QueryService.applyPopulate(photoPromise, populate);

  photoPromise
    .then(function (photo) {
      if (photo && photo[0]) {
        res.send(200, {photo: photo[0]});
      } else {
        res.send(500, {
          message: "존재하지 않는 게시글 입니다. 서버에러 code: 001"
        });
      }
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function create(req, res) {

  var photo = QueryService.buildQuery({}, req.allParams()).query;

  ImageService.uploadPhoto(req, photo.tags, photo, function (err, images) {

    if (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 004"
      });
      return;
    }

    if (images[0])
      photo = _.extend(photo, images[0]);

    sails.log(photo);

    Photo.create(photo)
      .then(function (createdPhoto) {
        return res.send(200, createdPhoto);
      })
      .catch(function (err) {
        return res.send(500, {
          message: "Failed to update code: 001"
        });
      });
  });
}

function update(req, res) {

  var photo = QueryService.buildQuery({}, req.allParams()).query;
  var id = photo.id;

  delete photo.createdBy;
  delete photo.id;

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  ImageService.uploadPhoto(req, [], photo, function (err, images) {

    if (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 004"
      });
      return;
    }

    if (images[0])
      photo = _.extend(photo, images[0]);

    sails.log(photo);

    Photo.update({id: id}, photo)
      .then(function (updatedPhoto) {
        return res.send(200, updatedPhoto);
      })
      .catch(function (err) {
        return res.send(500, {
          message: "Failed to update code: 001"
        });
      });
  });
}


function destroy(req, res) {

  var id = req.param("id");

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  ImageService.deletePhoto(id, function (err, photos) {

    if (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 004"
      });
      return;
    }

    res.send(200, photos);
  })
}

