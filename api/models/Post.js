module.exports = {
  attributes: {

    category: { //'EVENT', 'RANK', 'TIP', 'NOTICE', 'REQUEST'
      type: 'STRING',
      index: true
    },

    tag: { // 아직 미정.. 팁게시판 주제, category가 TIP 일때만 존재
      type: 'STRING'
    },

    title: {
      type: 'STRING'
    },

    content: {
      type: 'STRING'
    },

    item0: {
      type: 'JSON'
    },

    item1: {
      type: 'JSON'
    },

    item2: {
      type: 'JSON'
    },

    item3: {
      type: 'JSON'
    },

    item4: {
      type: 'JSON'
    },

    item5: {
      type: 'JSON'
    },

    item6: {
      type: 'JSON'
    },

    item7: {
      type: 'JSON'
    },

    item8: {
      type: 'JSON'
    },

    item9: {
      type: 'JSON'
    },

    item10: {
      type: 'JSON'
    },
    //====================================================
    //  Association
    //====================================================
    photos: {
      collection: 'Photo',
      via: 'post'
    },
    comments: {
      collection: 'Comment',
      via: 'post'
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
