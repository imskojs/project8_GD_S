module.exports = {

  attributes: {

    position: { // 0, 1, 2, 3, 4
      type: 'INTEGER'
    },

    type: {
      type: 'STRING', // ‘FIELD', 'CLUB', 'BALL'
      index: true
    },

    category: {
      //'SURVEY' -- 메인기능, 'POLL' -- 간단한거
      type: 'STRING',
      index: true
    },
    //====================================================
    //  Association
    //====================================================
    product: {
      model: 'Product'
    },

    questions: {
      collection: 'Question',
      via: 'questionnaire'
    },
    //====================================================
    //  General
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
