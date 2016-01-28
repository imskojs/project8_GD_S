'use strict';
var Promise = require('bluebird');

module.exports = {
  find: find,
  findNative: findNative,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy
};


function find(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Booking.find  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100)
    query.limit = 100;

  query.limit++;

  var bookingPromise = Booking.find(query);

  QueryService.applyPopulate(bookingPromise, populate);

  var countPromise = Booking.count(query);

  Promise.all([bookingPromise, countPromise])
    .spread(function(bookings, count) {

      // See if there's more
      var more = (bookings[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more) bookings.splice(query.limit - 1, 1);

      res.ok({
        bookings: bookings,
        more: more,
        total: count
      });
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function findNative(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Booking.findNative  -------------");
  sails.log(queryWrapper);

  return Promise.resolve(QueryService.executeNative(Booking, queryWrapper))
    .spread(function(bookings, more, count) {
      res.ok({
        bookings: bookings,
        more: more,
        total: count
      });
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function findOne(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Booking.findOne  -------------");
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!QueryService.checkParamPassed(query.where.id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  var bookingPromise = Booking.find(query);

  QueryService.applyPopulate(bookingPromise, populate);

  return bookingPromise
    .then(function(booking) {
      if (booking && booking[0]) {
        res.send(200, {
          booking: booking[0]
        });
      } else {
        res.send(500, {
          message: "존재하지 않는 게시글 입니다. 서버에러 code: 001"
        });
      }

    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function create(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Booking.create  -------------");
  sails.log(queryWrapper);

  var booking = queryWrapper.query;

  // assign user
  booking.owner = req.user.id;
  booking.createdBy = req.user.id;
  booking.updatedBy = req.user.id;

  sails.log.debug(booking);

  return Booking.create(booking)
    .then(function(booking) {
      res.send(200, booking);
    })
    .catch(function(err) {
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function update(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Booking.update  -------------");
  sails.log(queryWrapper);

  var booking = queryWrapper.query;
  var id = booking.id;

  delete booking.createdBy;

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  return Booking.update({
      id: id
    }, booking)
    .then(function(booking) {
      res.send(200, booking);
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "Failed to update code: 001"
      });
      return;
    });
}


function destroy(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Booking.destroy  -------------");
  sails.log(queryWrapper);

  var id = queryWrapper.query.where.id;

  // Adding user info
  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  return Booking.destroy({
      id: id
    })
    .then(function(removedBookings) {
      res.send(200, removedBookings);
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}
