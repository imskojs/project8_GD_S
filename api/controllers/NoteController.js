'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  find: find,
  //====================================================
  //  App specific
  //====================================================
  getMaxScoreNote: getMaxScoreNote,
  myHandicap: myHandicap
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
        owner: req.user.id,
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

function myHandicap(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;
  // find all note with productId
  return Note.find({
      product: query.where.product
    })
    .then((allNotes) => {
      let allScores = _.pluck(allNotes, 'myScoreTotal');
      let averageScore = _.mean(allScores);
      let myNotePromise = Note.findOne({
        product: query.where.product,
        owner: req.user.id
      });
      return [averageScore, myNotePromise];
    })
    .spread((averageScore, myNote) => {
      let myScore = myNote.myScoreTotal;
      let diff = myScore - averageScore;
      return res.ok(diff);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
