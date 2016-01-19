module.exports = {
  attributes: {

    content: {
      type: 'STRING',
      required: true,
      notNull: true
    },

    likes: {
      type: 'INTEGER',
      defaultsTo: 0
    },

    //====================================================
    //  Association
    //====================================================
    post: {
      model: 'Post'
    },

    children: {
      collection: 'Comment'
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
