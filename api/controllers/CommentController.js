'use strict';
var Promise = require('bluebird');

module.exports = {
  find: find,
  create: create,

  //====================================================
  //  Not used
  //====================================================
  findNative: findNative,
  findOne: findOne,
  update: update,
  destroy: destroy,
};


function find(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Comment.find  -------------");
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 200)
    query.limit = 200;
  query.limit++;

  var commentPromise = Comment.find(query);

  QueryService.applyPopulate(commentPromise, populate);

  var countPromise = Comment.count(query);

  return Promise.all([commentPromise, countPromise])
    .spread(function(comments, count) {
      var more = (comments[query.limit - 1]) ? true : false;
      if (more) comments.splice(query.limit - 1, 1);
      return res.ok({
        comments: comments,
        more: more,
        total: count
      });
    })
    .catch(function(err) {
      return res.negotiate(err);
    });
}

function create(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Comment.create  -------------");
  sails.log(queryWrapper);

  var comment = queryWrapper.query;

  if (!QueryService.checkParamPassed(comment.content, comment.category)) {
    return res.send(400, {
      message: "content/category not sent"
    });
  }

  return Comment.create(comment)
    .then(function(comment) {
      return res.send(200, comment);
    })
    .catch(function(err) {
      return res.negotiate(err);
    });
}


function findNative(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Comment.findNative  -------------");
  sails.log(queryWrapper);

  return Promise.resolve(QueryService.executeNative(Comment, queryWrapper))
    .spread(function(comments, more, count) {
      res.ok({
        comments: comments,
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


function findOne(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Comment.findOne  -------------");
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

  return commentPromise
    .then(function(comment) {
      if (comment && comment[0]) {
        Promise.all([comment[0], Like.find({
            owner: req.user.id,
            comment: comment[0].id
          })])
          .spread(function(comment, like) {
            var isLikable = true;
            if (like[0])
              isLikable = false;
            res.send(200, {
              comment: comment,
              isLikable: isLikable
            });
          })
          .catch(function(err) {
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
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function update(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Comment.update  -------------");
  sails.log(queryWrapper);

  var comment = queryWrapper.query;
  var id = comment.id;

  delete comment.createdBy;

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  return Comment.update({
      id: id
    }, comment)
    .then(function(comment) {
      res.send(200, comment);
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "Failed to update code: 001"
      });
      return;
    });
}

function destroy(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Comment.destroy  -------------");
  sails.log(queryWrapper);

  var id = queryWrapper.query.where.id;

  // Adding user info
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  return Comment.destroy({
      id: id
    })
    .then(function(removedComments) {
      res.send(200, removedComments);
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}
