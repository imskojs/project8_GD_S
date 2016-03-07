/* jshint ignore:start */
'use strict';
/* jshint ignore:end */
module.exports = {
  attributes: {

    type: { // FIELD, CLUB, BALL
      type: 'STRING',
      index: true
    },

    likes: { //common
      type: 'INTEGER',
      defaultsTo: 0
    },

    //====================================================
    //  Field Only
    //====================================================
    fieldName: {
      type: 'STRING'
    },

    location1: {
      type: 'STRING'
    },

    location2: {
      type: 'STRING'
    },

    fullLocation: {
      type: 'STRING'
    },

    contact: {
      type: 'STRING'
    },

    fieldUrl: {
      type: 'STRING'
    },

    courseName: {
      type: 'STRING'
    },

    courseSize: {
      type: 'STRING'
    },

    greenFee: {
      type: 'STRING'
    },

    cartFee: {
      type: 'STRING'
    },

    caddieFee: {
      type: 'STRING'
    },

    membershipType: {
      type: 'STRING'
    },

    //====================================================
    //  BALL && CLUB only
    //====================================================
    modelName: {
      type: 'STRING'
    },

    //====================================================
    //  CLUB only
    //====================================================
    clubBrand: {
      type: 'STRING'
    },

    clubType: {
      type: 'STRING'
    },

    //====================================================
    //  BALL only
    //====================================================
    ballBrand: {
      type: 'STRING'
    },

    ballType: {
      type: 'STRING'
    },

    //====================================================
    //  Association
    //====================================================
    questionnaires: { //common
      collection: 'Questionnaire',
      via: 'product'
    },
    questionnaireAnswers: { //common
      collection: 'QuestionnaireAnswer',
      via: 'product'
    },
    thumbnail: { //common
      model: 'Photo'
    },
    photo: {
      model: 'Photo'
    },
    notes: {
      collection: 'Note',
      via: 'product'
    },
    likedBy: {
      collection: 'User',
      via: 'likedProducts'
    },
    golfRecord: {
      model: 'GolfRecord'
    },
    //====================================================
    //  general info
    //====================================================
    owner: {
      model: 'User'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    }
  }
};
