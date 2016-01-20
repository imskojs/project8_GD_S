module.exports = {

  attributes: {

    answer: {
      type: 'INTEGER',
    },

    //====================================================
    //  Association
    //====================================================
    poll: {
      model: 'POLL'
    },

    //====================================================
    //  general info
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
