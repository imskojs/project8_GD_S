module.exports = {

  attributes: {
    type: { // ‘FIELD', 'CLUB', 'BALL'
      type: 'STRING'
    },
    myComment: { //common
      type: 'STRING'
    },
    //====================================================
    //  type: Field only
    //====================================================
    playDate: {
      type: 'DATETIME'
    },
    friend1: {
      type: 'STRING'
    },
    friend2: {
      type: 'STRING'
    },
    friend3: {
      type: 'STRING'
    },
    myScore1: {
      type: 'INTEGER'
    },
    myScore2: {
      type: 'INTEGER'
    },
    myScoreTotal: {
      type: 'INTEGER',
      index: true
    },
    //====================================================
    //  type: CLUB only
    //====================================================
    //club only --club only data는 clubType별로 특정 property만 있다.
    gender: { // '남성용', '여성용', '모름'
      type: 'STRING'
    },
    spec: { //'아시안스펙', 'US스펙', '모름'
      type: 'STRING'
    },
    loft: { // 8,8.5,9,9,5,10,10.5,11,11.5,12
      type: 'STRING'
    },
    shaftType: { //'STEEL', 'GRAPHITE'
      type: 'STRING'
    },
    shaftStrength: { // X,S,SR,R,L
      type: 'STRING'
    },
    shaftLength: { //33,34,벨리, 브롱스틱
      type: 'STRING'
    },
    //====================================================
    //  Association
    //====================================================
    product: { //common
      model: 'Product'
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
