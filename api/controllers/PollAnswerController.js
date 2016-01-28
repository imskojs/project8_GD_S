'use strict';
var Promise = require('bluebird');

module.exports = {
  hasPollAnswer: hasPollAnswer,
  create: create,
};

function hasPollAnswer(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: PollAnswer.find  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
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
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: PollAnswer.create  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
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
