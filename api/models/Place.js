/**
 * Created by Andy on 7/6/2015
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 7/6/2015
 *
 */
module.exports = {
  schema: false,
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
