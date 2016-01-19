/**
 * Created by andy on 5/08/15
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 5/08/15
 *
 */

var _ = require('lodash');
var _super = require('sails-permissions/api/controllers/RoleController');

_.merge(exports, _super);
_.merge(exports, {

  getMyRole: getMyRole,

  find: find,
  findNative: findNative,
  findOne: findOne,

  create: create,
  update: update,
  destroy: destroy
});


function getMyRole(req, res) {

  var roles = req.user.roles;

  sails.log.debug(req.user);

  Role.findOne({id: roles[0].id})
    .populate('features')
    .then(function (role) {

      if (role)
        res.send(200, role);
      else
        res.send(403, {message: "권한이 없습니다."});
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "예약 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    })
}


function find(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100)
    query.limit = 100;

  query.limit++;

  var rolePromise = Role.find(query);

  QueryService.applyPopulate(rolePromise, populate);

  var countPromise = Role.count(query);

  Promise.all([rolePromise, countPromise])
    .spread(function (roles, count) {

      // See if there's more
      var more = (roles[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more)roles.splice(query.limit - 1, 1);

      res.ok({roles: roles, more: more, total: count});
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

  Promise.resolve(QueryService.executeNative(Role, queryWrapper))
    .spread(function (roles, more, count) {
      res.ok({roles: roles, more: more, total: count});
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

  var rolePromise = Role.find(query);

  QueryService.applyPopulate(rolePromise, populate);

  rolePromise
    .then(function (role) {
      if (role && role[0]) {
        res.send(200, {role: role[0]});
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

  var role = QueryService.buildQuery({}, req.allParams()).query;

  if (role.id) {
    delete role.id;
  }

  // Adding user info
  role.createdBy = req.user.id;

  sails.log.debug(JSON.stringify(role));

  Role.create(role)
    .exec(function (err, role) {
      if (err) {
        sails.log.error(err);
        res.send(500, {
          message: "예약 로딩을 실패 했습니다. 서버에러 code: 001"
        });
      }

      res.send(200, role);
    });

}


function update(req, res) {
  var role = QueryService.buildQuery({}, req.allParams()).query;

  var id = role.id;

  // Things user can't update
  delete role.id;
  delete role.createdBy;
  delete role.createdDevice;
  delete role.createdAt;
  delete role.updatedAt;

  // Adding user info
  role.updatedBy = req.user.id;

  sails.log.debug(JSON.stringify(role));

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  // needs to check whether user is owner

  Role.update({id: id}, role)
    .exec(function (err, updatedRole) {

      if (err) {
        sails.log.error(err);
        res.send(500, {
          message: "예약 로딩을 실패 했습니다. 서버에러 code: 001"
        });
      }

      res.send(200, updatedRole);

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

  Role.destroy({id: id})
    .then(function (removedRoles) {
      res.send(200, removedRoles);
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


