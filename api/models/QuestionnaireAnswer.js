'use strict';
module.exports = {

  attributes: {
    position: { // 0, 1, 2, 3, 4
      type: 'INTEGER',
      index: true
    },
    type: { // FIELD CLUB BALL
      type: 'STRING'
    },
    //====================================================
    //  Association
    //====================================================
    product: {
      model: 'Product'
    },

    questionAnswers: {
      collection: 'QuestionAnswer',
      via: 'questionnaireAnswer'
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
