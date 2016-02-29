/* jshint ignore:start */
'use strict';
var Promise = require('bluebird');
/* jshint ignore:end */
module.exports = {
  find: find,
  findNative: findNative,
  findOne: findOne,

  create: create,
  update: update,
  destroy: destroy
};

function find(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: RoyaltyPoint.find  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100) {
    query.limit = 100;
  }
  query.limit++;

  var royaltyPointPromise = RoyaltyPoint.find(query);

  QueryService.applyPopulate(royaltyPointPromise, populate);

  var countPromise = RoyaltyPoint.count(query);

  return Promise.all([royaltyPointPromise, countPromise])
    .spread(function(royaltyPoints, count) {

      // See if there's more
      var more = (royaltyPoints[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more) royaltyPoints.splice(query.limit - 1, 1);

      res.ok({
        royaltys: royaltyPoints,
        more: more,
        total: count
      });
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function findNative(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: RoyaltyPoint.findNative  -------------");
  sails.log(queryWrapper);
  return Promise.resolve(QueryService.executeNative(RoyaltyPoint, queryWrapper))
    .spread(function(royaltyPoints, more, count) {
      return res.ok({
        royaltys: royaltyPoints,
        more: more,
        total: count
      });
    })
    .catch(function() {
      return res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function findOne(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: RoyaltyPoint.findOne  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!QueryService.checkParamPassed(query.where.id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  var royaltyPointPromise = RoyaltyPoint.find(query);

  QueryService.applyPopulate(royaltyPointPromise, populate);

  return royaltyPointPromise
    .then(function(royaltyPoint) {
      if (royaltyPoint && royaltyPoint[0]) {
        return res.send(200, {
          royalty: royaltyPoint[0]
        });
      } else {
        return res.send(500, {
          message: "존재하지 않는 게시글 입니다. 서버에러 code: 001"
        });
      }

    })
    .catch(function() {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function create(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: RoyaltyPoint.create  -------------");
  sails.log(queryWrapper);
  var royaltyPoint = queryWrapper.query;

  return RoyaltyPoint.create(royaltyPoint)
    .then(function(royaltyPoint) {
      return res.send(200, royaltyPoint);
    })
    .catch(function() {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function update(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: RoyaltyPoint.update  -------------");
  sails.log(queryWrapper);
  var royaltyPoint = queryWrapper.query;
  var id = royaltyPoint.id;
  delete royaltyPoint.createdBy;

  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  return RoyaltyPoint.update({
      id: id
    }, royaltyPoint)
    .then(function(royaltyPoint) {
      return res.send(200, royaltyPoint);
    })
    .catch(function() {
      return res.send(500, {
        message: "Failed to update code: 001"
      });
    });
}


function destroy(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: RoyaltyPoint.destroy  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;

  var id = query.where.id;

  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  return RoyaltyPoint.destroy({
      id: id
    })
    .then(function(removedRoyaltyPoints) {
      return res.send(200, removedRoyaltyPoints);
    })
    .catch(function() {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}
