'use strict';
module.exports = {

  attributes: {

    position: { // 0, 1, 2, 3, 4
      type: 'INTEGER',
      index: true
    },

    title: {
      type: 'STRING'
    },

    description: { //associate된questionnaire의 category가 POLL일 경우에만 존재.
      type: 'STRING'
    },

    options: {
      type: 'ARRAY' //3번 data 참고
    },

    //====================================================
    //  Association
    //====================================================
    questionnaire: {
      model: 'Questionnaire',
    },

    questionAnswers: {
      collection: 'QuestionAnswer',
      via: 'question'
    },
    //====================================================
    //  General
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
