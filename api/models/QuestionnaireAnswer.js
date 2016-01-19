/**
 * QuestionnaireAnswer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    position: { // 0, 1, 2, 3, 4
      type: 'INTEGER',
      index: true
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
