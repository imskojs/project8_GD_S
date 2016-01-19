/**
 * Created by andy on 14/12/15
 * As part of boilerplate
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 14/12/15
 *
 */


'use strict';
var Promise = require('bluebird');
var ObjectID = require('mongodb').ObjectID;
var _ = require('lodash');

var OBJID_REGEXP = /ObjectId\(/;

/**************************
 *     Public Interface
 **************************/

module.exports = {
  checkParamPassed: checkParamPassed,
  buildQuery: buildQuery,
  applyPopulate: applyPopulate,
  executeNative: executeNative,
  executeInsertNative: executeInsertNative
};

/********************************************************
 *                      Public Methods
 ********************************************************/


// General
function checkParamPassed() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] == null) {
      return false;
    }
  }
  return true;
}

function buildQuery(query, params) {

  //=====================================================
  //                    Parse JSON
  //=====================================================
  if (params && params.query && typeof params.query === 'string') {
    query = JSON.parse(params.query);
  }

  var populate = _.clone(query.populate);
  delete query.populate;

  return {
    query: query,
    populate: populate
  };
}

function applyPopulate(queryPromise, populate) {
  if (!populate) {
    return false;
  }

  _.each(populate, function(populateProp) {
    queryPromise = queryPromise.populate(populateProp);
  });

}


function executeNative(Model, queryWrapper, projection) {

  //====================================================
  //                   Native Find
  //
  //              [sort, skip, limit]
  //====================================================

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  var sort = query.sort;
  delete query.sort;
  var skip = query.skip;
  delete query.skip;
  var limit = query.limit;
  delete query.limit;

  var ModelNative = Promise.promisify(Model.native);

  return ModelNative()
    .then(function(collection) {

      var deferred1 = Promise.pending();
      var deferred2 = Promise.pending();

      var collectionQuery = collection
        .find(query, projection)
        .sort(sort ? JSON.parse(query.sort) : null)
        .skip(skip ? parseInt(query.skip, 10) : 0)
        .limit(limit ? parseInt(query.limit, 10) + 1 : 101);


      collectionQuery.toArray(function(err, results) {

        if (err) {
          deferred1.reject(err);
        } else {
          deferred1.resolve(results);
        }

      });

      collectionQuery.count(function(err, count) {
        if (err) {
          deferred2.reject(err);
        } else {
          deferred2.resolve(count);
        }
      });

      return [deferred1.promise, deferred2.promise];
    })
    .spread(function(results, count) {

      if (populate)
        results = populateNativeCollection(Model, results, populate);

      return [results, count];
    })
    .spread(function(results, count) {

      var more = false;

      if (limit && results[limit]) {
        more = true;
        results.pop();
      }

      return [results, more, count];
    });
}

function executeInsertNative(Model, data, options) {

  //====================================================
  //                   Native Find
  //
  //              [sort, skip, limit]
  //====================================================

  _.map(data, function(row) {
    _.forEach(row, function(val, key) {

      if (!val || typeof val !== "string")
        return;

      if (val.match(OBJID_REGEXP)) {
        var cleanedVal = val;
        cleanedVal = cleanedVal.replace('ObjectId(', '');
        cleanedVal = cleanedVal.replace(')', '');
        row[key] = new ObjectID(cleanedVal);
      }
    });

    return row;
  });


  var ModelNative = Promise.promisify(Model.native);

  return ModelNative()
    .then(function(collection) {

      var collectionQuery = collection
        .insert(data, options);

      return collectionQuery;
    });
}


/**************************
 *     Private Methods
 **************************/

// var firstcharRegExp = /^\s*(.)/;

// function firstchar(str) {
//   if (!str) return ''
//   var match = firstcharRegExp.exec(str)
//   return match ? match[1] : ''
// }


function populateNativeCollection(Model, collection, populates) {

  //====================================================
  //                   Populate Found
  //
  //              Model, collection, populates
  //====================================================

  var deferred = Promise.pending();

  var ids = _.pluck(collection, "_id");

  var populatePromise = Model.find({
    id: ids
  });

  _.each(populates, function(populate) {
    populatePromise = populatePromise.populate(populate);
  });

  populatePromise
    .then(function(results) {
      deferred.resolve(results);
    })
    .catch(function(err) {
      deferred.reject(err);
    });

  return deferred.promise;

}
