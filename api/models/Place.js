'use strict';
module.exports = {
  attributes: {

    // Properties
    category: {
      type: 'STRING',
      index: true
    },
    name: {
      type: 'STRING',
      required: true,
      notNull: true
    },
    description: {
      type: 'STRING'
    },

    address: {
      type: 'STRING'
    },
    geoJSON: {
      type: 'JSON'
    },
    views: {
      type: 'INTEGER',
      defaultsTo: 0
    },
    likes: {
      type: 'INTEGER',
      defaultsTo: 0
    },

    // Associations
    // titlePhoto: {
    //   model: 'Photo'
    // },
    // photos: {
    //   collection: 'Photo',
    //   via: 'place'
    // },
    // royaltyPoints: {
    //   collection: 'RoyaltyPoint',
    //   via: 'place'
    // },
    // bookings: {
    //   collection: 'Booking',
    //   via: 'place'
    // },
    // reviews: {
    //   collection: 'Review',
    //   via: 'place'
    // },

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
