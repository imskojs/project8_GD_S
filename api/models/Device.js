'use strict';
module.exports = {
  schema: false,
  attributes: {
    deviceId: {
      unique: true,
      type: 'STRING',
      maxLength: 256,
      required: true,
      notNull: true
    },
    platform: {
      type: 'STRING',
      required: true,
      notNull: true,
      enum: ['IOS', 'ANDROID']
    },
    active: {
      type: 'BOOLEAN',
      defaultsTo: true
    },

    //====================================================
    //  Association
    //====================================================
    user: {
      model: 'User'
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
