'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  //====================================================
  //  App Specific
  //====================================================
  updateAnswers: updateAnswers,
  createAnswers: createAnswers,
  createScreenshot: createScreenshot
};

function updateAnswers(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: QuestionAnswer.updateAnswers  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  // let queryWrapper = req.allParams();
  // let query = queryWrapper.query;
  delete query.id;
  delete query.createdBy;
  delete query.updatedBy;
  delete query.owner;
  query.updatedBy = req.user.id;
  if (!QueryService.checkParamPassed(query.product, query.answers)) {
    return res.send(400, {
      message: "no type/product/answers sent"
    });
  }
  sails.log("-----------  query.answers.length  -------------");
  sails.log(query.answers.length);

  sails.log("-----------  _.pluck(query.answers, 'id')  -------------");
  sails.log(_.pluck(query.answers, 'id').length);

  let checkArray = _.uniq(_.pluck(query.answers, 'id'));

  sails.log("-----------  checkArray.length  -------------");
  sails.log(checkArray.length);

  if (query.answers.length !== checkArray.length) {
    return res.send(400, {
      message: "one or more id is not sent for query.answers"
    });
  }

  let questionAnswers = query.answers;

  let updatePromises = _.map(questionAnswers, (questionAnswer) => {
    let id = questionAnswer.id;
    delete questionAnswer.id;
    delete questionAnswer.createdBy;
    delete questionAnswer.updatedBy;
    delete questionAnswer.owner;
    delete questionAnswer.question; // Should I delete this?
    delete questionAnswer.questionnaireAnswer;
    delete questionAnswer.product;
    questionAnswer.updatedBy = req.user.id;

    return QuestionAnswer
      .update({
        id: id
      }, questionAnswer)
      .then((inArray) => {
        let updatedQuestionAnswer = inArray[0];
        return updatedQuestionAnswer;
      });
  });
  return Promise.all(updatePromises)
    .then((updatedQuestionAnswers) => {
      sails.log("-----------  updatedQuestionAnswers  -------------");
      sails.log(updatedQuestionAnswers);
      // clean query for creation of Note
      let product = query.product;
      delete query.product;
      delete query.answers;
      delete query.id;
      delete query.createdBy;
      delete query.updatedBy;
      delete query.owner;
      query.updatedBy = req.user.id;
      let notePromise = Note.update({
        createdBy: req.user.id,
        product: product
      }, query);
      return [product, notePromise];
    })
    .spread((product) => {
      // sanity check;
      let questionnairePromise = QuestionnaireAnswer.find({
        product: product,
        createdBy: req.user.id
      }).populate('questionAnswers');

      let notePromise = Note.findOne({
        createdBy: req.user.id,
        product: product
      });

      return [questionnairePromise, notePromise];
    })
    .spread((questionnaireAnswers, note) => {
      return res.ok({
        questionnaireAnswers: questionnaireAnswers,
        note: note
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}


function createAnswers(req, res) {
  // let queryWrapper = QueryService.buildQuery({}, req.allParams());
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: QuestionAnswer.createAnswers  -------------");
  sails.log(queryWrapper);
  // let queryWrapper = req.allParams();
  var query = queryWrapper.query;
  let questionAnswers = query.answers;
  if (!QueryService.checkParamPassed(query.type, query.product, query.answers)) {
    return res.send(400, {
      message: "no type/product/answers sent"
    });
  }
  // there should be no id in query.answers
  let checkArray = _.uniq(_.pluck(questionAnswers, 'id'));
  if (checkArray.length !== 1) {
    return res.send(400, {
      message: "id exists in question answers"
    });
  }
  if (checkArray[0] !== undefined) {
    return res.send(400, {
      message: "id exists in question answers"
    });
  }
  // checks only one questionnaire to determine whether it's the first time creating.
  return QuestionnaireAnswer.findOne({
      product: query.product,
      createdBy: req.user.id
    })
    .then((questionnaireAnswer) => {
      if (!questionnaireAnswer) {
        return true;
      } else {
        return Promise.reject({
          message: 'not a first time creating questionnaire'
        });
      }
    })
    .then(() => {
      let questionnaireAnswersPending = _.map([0, 1, 2, 3, 4], (i) => {
        return QuestionnaireAnswer.create({
            position: i,
            type: query.type,
            product: query.product,
            owner: req.user.id,
            createdBy: req.user.id,
            updatedBy: req.user.id
          })
          .then((createdQuestionnaireAnswer) => {
            let subPreQuestionAnswers = _.where(questionAnswers, {
              position: i
            });
            let subQuestionAnswers = _.map(subPreQuestionAnswers, (questionAnswer) => {
              questionAnswer.type = query.type;
              questionAnswer.product = query.product;
              questionAnswer.questionnaireAnswer = createdQuestionnaireAnswer.id;
              questionAnswer.createdBy = req.user.id;
              questionAnswer.owner = req.user.id;
              questionAnswer.updatedBy = req.user.id;
              return questionAnswer;
            });
            // create position i qustionAnswer
            return QuestionAnswer.create(subQuestionAnswers);
          })
          .then((createdQuestionAnswers) => {
            sails.log("-----------  createdQuestionAnswers  -------------");
            sails.log(createdQuestionAnswers);
            return createdQuestionAnswers;
          });
      });
      return Promise.all(questionnaireAnswersPending);
    })
    .then((createdQuestionnaireAnswers) => {
      sails.log("-----------  createdQuestionnaireAnswers  -------------");
      sails.log(createdQuestionnaireAnswers);
      // clean query for creation of Note
      delete query.answers;
      delete query.id;
      delete query.createdBy;
      delete query.updatedBy;
      delete query.owner;
      query.createdBy = req.user.id;
      query.updatedBy = req.user.id;
      query.owner = req.user.id;
      return Note.create(query);
    })
    .then(() => {
      // sanity check
      let notePromise = Note.findOne({
        product: query.product,
        createdBy: req.user.id
      });
      let questionnaireAnswers = QuestionnaireAnswer.find({
        product: query.product,
        createdBy: req.user.id
      }).populate('questionAnswers');
      return [notePromise, questionnaireAnswers];
    })
    .spread((note, questionnaireAnswers) => {
      sails.log("-----------  note  -------------");
      sails.log(note);
      sails.log("-----------  questionnaireAnswers  -------------");
      sails.log(questionnaireAnswers);
      return res.ok({
        note: note,
        questionnaireAnswers: questionnaireAnswers
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function createScreenshot(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: QuestionAnswer.createScreenshot, has req.file()  -------------");
  sails.log(queryWrapper);
  return ImageService
    .createPhotos(req, [])
    .then((createdPhotos) => {
      let createdPhotoId = createdPhotos[0] && createdPhotos[0].id;
      if (!createdPhotoId) {
        return Promise.reject({
          message: 'no photo created cloudinary/server error'
        });
      } else {
        return Photo.findOne({
          id: createdPhotoId
        });
      }
    })
    .then((photo) => {
      return res.ok(photo); // photo.url only?
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
