/**
 * Created by Andy on 7/9/2015
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 7/9/2015
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
  destroy: destroy,
}


function find(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100)
    query.limit = 100;

  query.limit++;

  var commentPromise = Comment.find(query);

  QueryService.applyPopulate(commentPromise, populate);

  var countPromise = Comment.count(query);

  Promise.all([commentPromise, countPromise])
    .spread(function (comments, count) {

      // See if there's more
      var more = (comments[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more)comments.splice(query.limit - 1, 1);

      res.ok({comments: comments, more: more, total: count});
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

  Promise.resolve(QueryService.executeNative(Comment, queryWrapper))
    .spread(function (comments, more, count) {
      res.ok({comments: comments, more: more, total: count});
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

  var commentPromise = Comment.find(query);

  QueryService.applyPopulate(commentPromise, populate);

  commentPromise
    .then(function (comment) {
      if (comment && comment[0]) {
        Promise.all([comment[0], Like.find({owner: req.user.id, comment: comment[0].id})])
          .spread(function (comment, like) {
            var isLikable = true;
            if (like[0])
              isLikable = false;
            res.send(200, {comment: comment, isLikable: isLikable});
          })
          .catch(function (err) {
            sails.log.error(err);
            res.send(500, {
              message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
            });
          });

      } else {
        res.send(500, {
          message: "존재하지 않는 댓글 입니다. 서버에러 code: 001"
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

  var comment = QueryService.buildQuery({}, req.allParams()).query;

  comment.owner = req.user.id;
  comment.createdBy = req.user.id;
  comment.updatedBy = req.user.id;

  sails.log.debug(JSON.stringify(comment));

  // Adding user info
  if (!QueryService.checkParamPassed(comment.content)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  Comment.create(comment)
    .then(function (comment) {
      res.send(200, comment);
    })
    .catch(function (err) {
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function update(req, res) {

  var comment = QueryService.buildQuery({}, req.allParams()).query;
  var id = comment.id;

  delete comment.createdBy;

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  Comment.update({id: id}, comment)
    .then(function (comment) {
      res.send(200, comment);
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

  Comment.destroy({id: id})
    .then(function (removedComments) {
      res.send(200, removedComments);
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}