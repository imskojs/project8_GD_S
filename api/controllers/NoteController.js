'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  find: find,
  findOne: findOne,
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

function findOne(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;
  let populate = queryWrapper.populate;
  let notePromise = Note.findOne(query);
  QueryService.applyPopulate(notePromise, populate);
  return notePromise
    .then((note) => {
      if (note.views === undefined) {
        note.views = 0;
      }
      note.views = note.views + 1;
      let pendingSave = Promise.pending();
      note.save((err, savedNote) => {
        if (err) {
          pendingSave.reject(err);
        } else {
          pendingSave.resolve(savedNote);
        }
      });
      return pendingSave.promise;
    })
    .then((savedNote) => {
      return res.ok(savedNote);
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
    }).populate('product')
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
  let query = queryWrapper.query;
  sails.log("-----------  query  -------------");
  sails.log(query);

  let specificNotePromise = Note.findOne({
    product: query.where.product,
    owner: query.where.owner || req.user.id
  });

  let allMyNotesPromise = Note.find({
    owner: query.where.owner || req.user.id
  });

  return Promise.all([specificNotePromise, allMyNotesPromise])
    .then((array) => {
      let specificNote = array[0];
      let allMyNotes = array[1];
      let allMyScores = _.pluck(allMyNotes, 'myScoreTotal');
      let myTotalScore = _.reduce(allMyScores, (mem, myScore) => {
        return mem + myScore;
      }, 0);
      let myAverage = myTotalScore / allMyScores.length;
      let diff = specificNote.myScoreTotal - myAverage;
      return res.ok({
        myHandicap: diff
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
