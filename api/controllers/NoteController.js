'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  find: find,

  //====================================================
  //  App specific
  //====================================================
  getMaxScoreNote: getMaxScoreNote
};


function find(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;
  let populate = queryWrapper.populate;
  if (!query.limit) {
    query.limit = 100;
  }
  query.limit++;
  let notePromise = Note.find(query);
  QueryService.applyPopulate(notePromise, populate);
  let countPromise = Note.count(query);
  return Promise.all([notePromise, countPromise])
    .spread((notes, count) => {
      let more = (notes[query.limit - 1]) ? true : false;
      if (more) {
        notes.pop();
      }
      return res.ok({
        notes: notes,
        more: more,
        total: count
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function getMaxScoreNote(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  return Note.find({
      where: {
        owner: req.user.id
      },
      sort: 'myScoreTotal DESC',
      limit: 1
    })
    .then((inArray) => {
      let maxNote = inArray[0];
      return res.ok(maxNote);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
