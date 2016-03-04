/* jshint ignore:start */
'use strict';
/* jshint ignore:end */
module.exports = {

  attributes: {
    playDate: {
      type: 'DATETIME'
    },
    friend1: {
      type: 'STRING'
    },
    friend2: {
      type: 'STRING'
    },
    friend3: {
      type: 'STRING'
    },
    myScore1: {
      type: 'INTEGER'
    },
    myScore2: {
      type: 'INTEGER'
    },
    myScoreTotal: {
      type: 'INTEGER'
    },
    memo: {
      type: 'STRING'
    },
    photos: {
      collection: 'Photo',
      via: 'golfRecord'
    },
    product: {
      model: 'Product'
    },
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
