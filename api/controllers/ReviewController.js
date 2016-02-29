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
  destroy: destroy,
};


function find(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Review.find  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100) {
    query.limit = 100;
  }
  query.limit++;

  var reviewPromise = Review.find(query);

  QueryService.applyPopulate(reviewPromise, populate);

  var countPromise = Review.count(query);

  return Promise.all([reviewPromise, countPromise])
    .spread(function(reviews, count) {
      var more = (reviews[query.limit - 1]) ? true : false;
      if (more) {
        reviews.splice(query.limit - 1, 1);
      }
      return res.ok({
        reviews: reviews,
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

function findNative(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Review.findNative  -------------");
  sails.log(queryWrapper);
  return Promise.resolve(QueryService.executeNative(Review, queryWrapper))
    .spread(function(reviews, more, count) {
      return res.ok({
        reviews: reviews,
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
  sails.log("-----------  queryWrapper: Review.findOne  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!QueryService.checkParamPassed(query.where.id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  var reviewPromise = Review.find(query);

  QueryService.applyPopulate(reviewPromise, populate);

  return reviewPromise
    .then(function(review) {
      if (review && review[0]) {
        Promise.all([review[0], Like.find({
            owner: req.user.id,
            review: review[0].id
          })])
          .spread(function(review, like) {
            var isLikable = true;
            if (like[0])
              isLikable = false;
            res.send(200, {
              review: review,
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

function create(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Review.create  -------------");
  sails.log(queryWrapper);
  var review = queryWrapper.query;
  return Review.create(review)
    .then(function(review) {
      return res.send(200, review);
    })
    .catch(function() {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function update(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Review.update  -------------");
  sails.log(queryWrapper);
  var review = queryWrapper.query;
  var id = review.id;
  delete review.createdBy;
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  return Review.update({
      id: id
    }, review)
    .then(function(review) {
      return res.send(200, review);
    })
    .catch(function(err) {
      sails.log.error(err);
      return res.send(500, {
        message: "Failed to update code: 001"
      });
    });

}

function destroy(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Review.destroy  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var id = query.id;

  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  return Review.destroy({
      id: id
    })
    .then(function(removedReviews) {
      return res.send(200, removedReviews);
    })
    .catch(function() {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}
