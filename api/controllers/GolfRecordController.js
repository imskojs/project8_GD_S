/* jshint ignore:start */
'use strict';
const Promise = require('bluebird');
/* jshint ignore:end */
const _ = require('lodash');
module.exports = {
  create: create,
  find: find,
  findOne: findOne,
  findByKeyword: findByKeyword,
  update: update,
  destroy: destroy,

  getMaxScoreRecord: getMaxScoreRecord,
  myHandicap: myHandicap
};

function create(req, res) {
  let queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --GolfRecord.create-- :::\n", queryWrapper);
  let query = queryWrapper.query;
  if (!QueryService.checkParamPassed(query.product)) {
    return res.send(400, { message: "!product" });
  }
  return GolfRecord.create(query)
    .then((createdGolfRecord) => {
      return GolfRecord.findOne({
          id: createdGolfRecord.id
        })
        .populate('photos')
        .populate('product');
    })
    .then((golfRecord) => {
      return res.ok(golfRecord);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function find(req, res) {
  let queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper -- GolfRecord.find -- :::\n", queryWrapper);
  let query = queryWrapper.query;
  let populate = queryWrapper.populate;

  let golfRecordPromise = GolfRecord.find(query);
  QueryService.applyPopulate(golfRecordPromise, populate);
  let countPromise = GolfRecord.count(query);

  return Promise.all([golfRecordPromise, countPromise])
    .spread((golfRecords, count) => {
      let more = (golfRecords[query.limit - 1]) ? true : false;
      if (more) {
        golfRecords.pop();
      }
      return res.ok({
        golfRecords: golfRecords,
        more: more,
        total: count
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function findOne(req, res) {
  let queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --GolfRecord.findOne-- :::\n", queryWrapper);
  let query = queryWrapper.query;
  let populate = queryWrapper.populate;

  let golfRecordPromise = GolfRecord.findOne(query);
  QueryService.applyPopulate(golfRecordPromise, populate);

  return golfRecordPromise
    .then((golfRecord) => {
      if (!golfRecord) {
        return Promise.reject({ message: '!golfRecord' });
      }
      if (!golfRecord.product) {
        return Promise.reject({ message: '!golfRecord.product' });
      }
      let product = Product.findOne({ id: golfRecord.product.id })
        .populate('thumbnail')
        .populate('photo');
      return [golfRecord, product];
    })
    .spread((golfRecord, product) => {
      golfRecord.product = product;
      sails.log("golfRecord :::\n", golfRecord);
      return res.ok(golfRecord);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function findByKeyword(req, res) {
  let queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --GolfRecord.findByKeyword-- :::\n", queryWrapper);
  let query = queryWrapper.query;
  let populate = queryWrapper.populate;

  return Product.find({
      where: {
        or: [
          { fieldName: { contains: query.where.keyword } }
        ]
      }
    })
    .then((products) => {
      if (products.length === 0) {
        return Promise.reject({ message: '!product' });
      }
      let productIds = _.pluck(products, 'id');
      let golfRecordPromise = GolfRecord.find({ product: productIds });
      let countPromise = GolfRecord.count({ product: productIds });
      QueryService.applyPopulate(golfRecordPromise, populate);
      return [golfRecordPromise, countPromise];
    })
    .spread((golfRecords, count) => {
      let more = (golfRecords[query.limit - 1]) ? true : false;
      if (more) {
        golfRecords.pop();
      }
      return res.ok({
        golfRecords: golfRecords,
        more: more,
        total: count
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}


function update(req, res) {
  let queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper -- GolfRecord.update -- :::\n", queryWrapper);
  let query = queryWrapper.query;
  query.updatedBy = req.user.id;
  let id = query.id;
  delete query.id;
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "id"
    });
  }

  let propertiesAllowedToUpdate = [
    'product', 'playDate', 'friend1', 'friend2', 'friend3', 'myScore1', 'myScore2', 'memo',
    'photos', 'myScoreTotal'
  ];
  let propertiesToUpdate = {};
  _.forEach(propertiesAllowedToUpdate, (property) => {
    if (query[property] !== undefined) {
      propertiesToUpdate[property] = query[property];
    }
  });

  return GolfRecord.update({
      id: id
    }, propertiesToUpdate)
    .then((golfRecords) => {
      let golfRecord = golfRecords[0];
      return res.ok(golfRecord);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function destroy(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --GolfRecord.destroy-- :::\n", queryWrapper);
  var query = queryWrapper.query;
  var id = query.where.id;
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, { message: '!id' });
  }
  return GolfRecord.destroy({
      id: id
    })
    .then((golfRecords) => {
      let golfRecord = golfRecords[0];
      if (!golfRecord) {
        return Promise.reject({ message: '!golfRecord' });
      }
      return res.ok(golfRecord);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function getMaxScoreRecord(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --GofRecord.getMaxScoreRecord-- :::\n", queryWrapper);
  sails.log("req.user.id :::\n", req.user.id);

  return GolfRecord.findOne({
      where: {
        owner: req.user.id
      }
    })
    .then(function(golfRecord) {
      if (!golfRecord) {
        return Promise.reject({
          message: '!golfRecord'
        });
      } else {
        return GolfRecord.find({
            where: {
              owner: req.user.id,
            },
            sort: 'myScoreTotal DESC',
            limit: 1
          })
          .populate('product')
          .populate('photos');
      }
    })
    .then((inArray) => {
      let maxGolfScore = inArray[0];
      return res.ok(maxGolfScore);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function myHandicap(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("queryWrapper --GolfRecord.myHandicap-- :::\n", queryWrapper);
  var query = queryWrapper.query;

  let specificGolfRecordPromise = GolfRecord.findOne({
    product: query.where.product,
    owner: query.where.owner || req.user.id
  });

  let allMyGolfRecordsPromise = GolfRecord.find({
    owner: query.where.owner || req.user.id,
  });

  return Promise.all([specificGolfRecordPromise, allMyGolfRecordsPromise])
    .then((array) => {
      let specificGolfRecord = array[0];
      let allMyGolfRecords = array[1];
      if (allMyGolfRecords.length === 0) {
        return Promise.reject({
          message: '0 golfRecord found'
        });
      }
      if (!specificGolfRecord) {
        return Promise.reject({
          message: '0 golfRecord found'
        });
      }

      let allMyScores = _.pluck(allMyGolfRecords, 'myScoreTotal');
      let myTotalScore = _.reduce(allMyScores, (mem, myScore) => {
        return mem + myScore;
      }, 0);
      let myAverage = myTotalScore / allMyScores.length;
      let diff = specificGolfRecord.myScoreTotal - myAverage;
      return res.ok({
        myHandicap: diff
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}
