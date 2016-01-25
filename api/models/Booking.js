'use strict';
module.exports = {
  schema: false,
  attributes: {

    // Properties
    category: {
      type: 'STRING',
      index: true
    },
    datetime: {
      type: 'DATETIME'
    },
    duration: {
      type: 'FLOAT'
    },
    status: {
      type: 'STRING'
    },
    // e.g. [array of products as snapshot]
    products: {
      type: 'ARRAY'
    },
    // Associations
    place: {
      model: 'Place'
    },
    //====================================================
    //  general
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
