/* jshint ignore:start */
'use strict';
/* jshint ignore:end */
module.exports = {

  attributes: {

    title: {
      type: 'STRING'
    },

    content: {
      type: 'STRING'
    },

    description0: {
      type: 'STRING'
    },

    description1: {
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

    pollComments: {
      collection: 'PollComment',
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
