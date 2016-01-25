'use strict';
module.exports = {
  attributes: {

    // Properties
    points: {
      type: 'FLOAT'
    },

    // Associations
    place: {
      model: 'Place'
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
