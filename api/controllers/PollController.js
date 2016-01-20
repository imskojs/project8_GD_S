'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  findLatest: findLatest,
  create: create,
};

function findLatest(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  return Poll.find({
      where: {},
      sort: 'updatedAt DESC',
      limit: 1
    })
    .then((inArray) => {
      let lastestPoll = inArray[0];
      return res.ok(lastestPoll);
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
  if (!QueryService.checkParamPassed(query.category, query.title)) {
    return res.send(400, {
      message: "no title/category sent"
    });
  }
  ImageService
    .createPhotos(req, [])
    .then((createdPhotos) => {
      let createdPhotoIds = _.pluck(createdPhotos, 'id');
      query.photo0 = createdPhotoIds[0];
      query.photo1 = createdPhotoIds[1];
      return Poll.create(query);
    })
    .then((createdPoll) => {
      return Poll.findOne({
          id: createdPoll.id
        })
        .populate('photo0')
        .populate('photo1');
    })
    .then((poll) => {
      return res.ok(poll);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
