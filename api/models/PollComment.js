/* jshint ignore:start */
'use strict';
/* jshint ignore:end */

module.exports = {

  attributes: {
    content: {
      type: 'STRING',
    },
    // association //
    user: {
      model: 'User'
    },
    poll: {
      model: 'Poll'
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
