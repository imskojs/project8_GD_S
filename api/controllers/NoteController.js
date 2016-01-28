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
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Note.find  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
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
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Note.findOne  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
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
      var product = Product.findOne({
        id: savedNote.product && savedNote.product.id
      }).populate('thumbnail');
      return [savedNote, product];
    })
    .spread((savedNote, product) => {
      var note = savedNote.toObject();
      note.product = product;
      return res.ok(note);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function getMaxScoreNote(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Note.getMaxScoreNote  -------------");
  sails.log(queryWrapper);

  return Note.findOne({
      where: {
        owner: req.user.id
      }
    })
    .then(function(note) {
      if (!note) {
        return Promise.reject({
          message: 'no notes'
        });
      } else {
        return Note.find({
          where: {
            owner: req.user.id,
          },
          sort: 'myScoreTotal DESC',
          limit: 1
        }).populate('product');
      }
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
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Note.myHandicap  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;

  let specificNotePromise = Note.findOne({
    product: query.where.product,
    owner: query.where.owner || req.user.id
  });

  let allMyNotesPromise = Note.find({
    owner: query.where.owner || req.user.id,
    type: 'FIELD'
  });

  return Promise.all([specificNotePromise, allMyNotesPromise])
    .then((array) => {
      let specificNote = array[0];
      let allMyNotes = array[1];
      if (allMyNotes.length === 0) {
        return Promise.reject({
          message: '0 notes found'
        });
      }
      if (!specificNote) {
        return Promise.reject({
          message: '0 note found'
        });
      }

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
