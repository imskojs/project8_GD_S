'use strict';
module.exports = {

  attributes: {

    title: {
      type: 'STRING'
    },
    content: {
      type: 'STRING'
    },
    //====================================================
    //  Association
    //====================================================
    photo0: {
      model: 'Photo'
    },

    photo1: {
      model: 'Photo'
    },

    pollAnswers: {
      collection: 'PollAnswer',
      via: 'poll'
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
