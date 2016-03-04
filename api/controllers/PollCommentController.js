/* jshint ignore:start */
'use strict';
var Promise = require('bluebird');
/* jshint ignore:end */
module.exports = {
  create: create,
  find: find,
  destroy: destroy
};

function create(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --PollComment.create-- :::\n", queryWrapper);
  var query = queryWrapper.query;

  if (!QueryService.checkParamPassed(query.content)) {
    return res.send(400, { message: "!content" });
  }

  return PollComment.create(query)
    .then(function(comment) {
      return res.ok(comment);
    })
    .catch(function(err) {
      return res.negotiate(err);
    });
}

function find(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --PollComment.find-- :::\n", queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (query.limit) {
    query.limit += 1;
  }

  var findPromise = PollComment.find(query);

  QueryService.applyPopulate(findPromise, populate);

  var countPromise = PollComment.count(query);

  return Promise.all([findPromise, countPromise])
    .spread(function(comments, count) {
      var more = (comments[query.limit - 1]) ? true : false;
      if (more) comments.splice(query.limit - 1, 1);
      return res.ok({
        pollComments: comments,
        more: more,
        total: count
      });
    })
    .catch(function(err) {
      return res.negotiate(err);
    });
}


function destroy(req, res) {
  var queryWrapper = req.allParams();
  sails.log("queryWrapper --PollComment.destroy-- :::\n", queryWrapper);
  // let id = req.params.id;
  var id = queryWrapper.id;
  // Adding user info
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, { message: "!id" });
  }

  return PollComment.destroy({
      id: id
    })
    .then((comments) => {
      let comment = comments[0];
      return res.ok(comment);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
