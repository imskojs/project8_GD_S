'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  hasPollAnswer: hasPollAnswer,
  create: create,
};

function hasPollAnswer(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  sails.log("-----------  query  -------------");
  sails.log(query);
  // only check one poll answer to determine whether user has it.
  return PollAnswer.findOne({
      poll: query.where.poll,
      createdBy: req.user.id
    })
    .then((pollAnswer) => {
      if (pollAnswer) {
        return res.ok({
          hasAnswered: true
        });
      } else {
        return res.ok({
          hasAnswered: false
        });
      }
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

  if (!QueryService.checkParamPassed(query.answer)) {
    return res.send(400, {
      message: "no answer sent"
    });
  }
  return PollAnswer.findOne({
      poll: query.poll,
      createdBy: req.user.id
    })
    .then((poll) => {
      if (poll) {
        return Promise.reject({
          message: 'has already answered'
        });
      } else {
        return PollAnswer.create(query);
      }
    })
    .then((createdPollAnswer) => {
      return res.ok(createdPollAnswer);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
