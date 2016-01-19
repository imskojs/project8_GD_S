/**
 * Created by Andy on 7/7/2015
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 7/7/2015
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

  var royaltyPointPromise = RoyaltyPoint.find(query);

  QueryService.applyPopulate(royaltyPointPromise, populate);

  var countPromise = RoyaltyPoint.count(query);

  Promise.all([royaltyPointPromise, countPromise])
    .spread(function (royaltyPoints, count) {

      // See if there's more
      var more = (royaltyPoints[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more)royaltyPoints.splice(query.limit - 1, 1);

      res.ok({royaltys: royaltyPoints, more: more, total: count});
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

  Promise.resolve(QueryService.executeNative(RoyaltyPoint, queryWrapper))
    .spread(function (royaltyPoints, more, count) {
      res.ok({royaltys: royaltyPoints, more: more, total: count});
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


  var royaltyPointPromise = RoyaltyPoint.find(query);

  QueryService.applyPopulate(royaltyPointPromise, populate);

  royaltyPointPromise
    .then(function (royaltyPoint) {
      if (royaltyPoint && royaltyPoint[0]) {
        res.send(200, {royalty: royaltyPoint[0]});
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

  var royaltyPoint = QueryService.buildQuery({}, req.allParams()).query;

  // assign user
  royaltyPoint.owner = req.user.id;
  royaltyPoint.createdBy = req.user.id;
  royaltyPoint.updatedBy = req.user.id;

  sails.log.debug(royaltyPoint);

  RoyaltyPoint.create(royaltyPoint)
    .then(function (royaltyPoint) {
      res.send(200, royaltyPoint);
    })
    .catch(function (err) {
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function update(req, res) {

  var royaltyPoint = QueryService.buildQuery({}, req.allParams()).query;
  var id = royaltyPoint.id;

  delete royaltyPoint.createdBy;

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  RoyaltyPoint.update({id: id}, royaltyPoint)
    .then(function (royaltyPoint) {
      res.send(200, royaltyPoint);
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "Failed to update code: 001"
      });
      return;
    });
}


function destroy(req, res) {
  var id = req.param("id");

  // Adding user info
  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  RoyaltyPoint.destroy({id: id})
    .then(function (removedRoyaltyPoints) {
      res.send(200, removedRoyaltyPoints);
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}
