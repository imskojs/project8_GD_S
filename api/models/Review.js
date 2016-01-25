'use strict';
module.exports = {
  attributes: {

    // Properties
    rate: {
      type: 'INTEGER'
    },
    content: {
      type: 'STRING'
    },

    // Associations
    place: {
      model: 'Place'
    },
    booking: {
      model: 'Booking'
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
