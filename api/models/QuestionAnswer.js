'use strict';
module.exports = {

  attributes: {

    position: { // 0, 1, 2, 3, 4
      type: 'INTEGER',
      index: true
    },

    title: {
      type: 'STRING',
    },

    answer: { //0,1,2,3,4 // question.options[1]
      type: 'INTEGER'
    },

    score: { //1,2,3,4,5
      type: 'INTEGER'
    },

    optionLabel: {
      type: 'STRING'
    },

    type: { // FIELD, CLUB, BALL
      type: 'STRING'
    },
    //====================================================
    //  Association
    //====================================================
    product: {
      model: 'Product'
    },

    question: {
      model: 'Question'
    },

    questionnaireAnswer: {
      model: 'QuestionnaireAnswer'
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
