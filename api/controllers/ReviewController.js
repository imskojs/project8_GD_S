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

  var reviewPromise = Review.find(query);

  QueryService.applyPopulate(reviewPromise, populate);

  var countPromise = Review.count(query);

  Promise.all([reviewPromise, countPromise])
    .spread(function (reviews, count) {

      // See if there's more
      var more = (reviews[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more)reviews.splice(query.limit - 1, 1);

      res.ok({reviews: reviews, more: more, total: count});
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

  Promise.resolve(QueryService.executeNative(Review, queryWrapper))
    .spread(function (reviews, more, count) {
      res.ok({reviews: reviews, more: more, total: count});
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

  var reviewPromise = Review.find(query);

  QueryService.applyPopulate(reviewPromise, populate);

  reviewPromise
    .then(function (review) {
      if (review && review[0]) {
        Promise.all([review[0], Like.find({owner: req.user.id, review: review[0].id})])
          .spread(function (review, like) {
            var isLikable = true;
            if (like[0])
              isLikable = false;
            res.send(200, {review: review, isLikable: isLikable});
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

  var review = QueryService.buildQuery({}, req.allParams()).query;

  review.owner = req.user.id;
  review.createdBy = req.user.id;
  review.updatedBy = req.user.id;

  Review.create(review)
    .then(function (review) {
      res.send(200, review);
    })
    .catch(function (err) {
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function update(req, res) {

  var review = QueryService.buildQuery({}, req.allParams()).query;
  var id = review.id;

  delete review.createdBy;

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  Review.update({id: id}, review)
    .then(function (review) {
      res.send(200, review);
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

  Review.destroy({id: id})
    .then(function (removedReviews) {
      res.send(200, removedReviews);
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}