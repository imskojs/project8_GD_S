'use strict';
module.exports = {
  schema: false,
  attributes: {

    // Properties
    public_id: {
      type: 'STRING',
      required: true,
      notNull: true
    },
    name: {
      type: 'STRING'
    },
    url: {
      type: 'STRING'
    },
    https: {
      type: 'STRING'
    },
    version: {
      type: 'INTEGER'
    },
    width: {
      type: 'INTEGER'
    },
    height: {
      type: 'INTEGER'
    },
    format: {
      type: 'STRING'
    },
    resource_type: {
      type: 'STRING'
    },
    tags: {
      type: 'ARRAY'
    },

    //Associations
    place: {
      model: 'Place'
    },
    poll: {
      model: 'Poll'
    },
    post: {
      model: 'Post'
    },
    product: {
      model: 'Product'
    },
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
