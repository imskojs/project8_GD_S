'use strict';
var _ = require('lodash');
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
  sails.log("-----------  queryWrapper: Place.find  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100) {
    query.limit = 100;
  }
  query.limit++;

  var placePromise = Place.find(query);

  QueryService.applyPopulate(placePromise, populate);

  var countPromise = Place.count(query);

  return Promise.all([placePromise, countPromise])
    .spread(function(places, count) {
      var more = (places[query.limit - 1]) ? true : false;
      if (more) {
        places.splice(query.limit - 1, 1);
      }
      return res.ok({
        places: places,
        more: more,
        total: count
      });
    })
    .catch(function() {
      return res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function findNative(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Place.findNative  -------------");
  sails.log(queryWrapper);

  return Promise.resolve(QueryService.executeNative(Place, queryWrapper))
    .spread(function(places, more, count) {
      return res.ok({
        places: places,
        more: more,
        total: count
      });
    })
    .catch(function() {
      return res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function findOne(req, res) {

  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Place.findOne  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!QueryService.checkParamPassed(query.where.id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  var placePromise = Place.find(query);

  QueryService.applyPopulate(placePromise, populate);

  return placePromise
    .then(function(place) {
      if (place && place[0]) {

        ++place[0].views;
        place[0].save();

        Promise.all([place[0], Like.find({
            owner: req.user.id,
            place: place[0].id
          })])
          .spread(function(place, like) {

            var isLikable = true;
            if (like[0])
              isLikable = false;

            sails.log(3);

            res.send(200, {
              place: place,
              isLikable: isLikable
            });

          })
          .catch(function(err) {
            sails.log.error(err);
            res.send(500, {
              message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
            });
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
  sails.log("-----------  queryWrapper: Place.create  -------------");
  sails.log(queryWrapper);
  var place = queryWrapper.query;

  return ImageService.createPhoto(req, [], null, function(err, createdPhotos) {

    if (err) {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 004"
      });
    }
    place.photos = [];
    for (var i = 0; i < createdPhotos.length; i++) {
      place.photos.push(createdPhotos[i].id);
    }

    return Place.create(place)
      .exec(function(err, place) {
        if (err) {
          return res.send(500, {
            message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
          });
        }
        return res.send(200, place);
      });
  });
}

function update(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Place.update  -------------");
  sails.log(queryWrapper);
  var place = queryWrapper.query;
  var id = place.id;
  delete place.titlePhoto;
  delete place.royaltyPoints;
  delete place.bookings;
  delete place.products;
  delete place.reviews;
  delete place.createdDevice;
  delete place.createdBy;
  place.updatedBy = req.user.id;

  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  return ImageService.createPhoto(req, [], null, function(err, createdPhotos) {

    if (err) {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 004"
      });
    }

    if (!place.photos) {
      place.photos = [];
    }

    return Place.findOne({
        id: id
      })
      .populate('photos')
      .then(function(oldPlace) {
        place.photos = _.pluck(place.photos, "id");
        _.forEach(oldPlace.photos, function(oldPhoto) {
          var exist = false;
          for (var i = 0; i < place.photos.length; i++) {
            if (oldPhoto.id === place.photos[i])
              exist = true;
          }
          if (!exist) {
            return ImageService.deletePhoto(oldPhoto.id);
          } else {
            return;
          }
        });
        for (var i = 0; i < createdPhotos.length; i++) {
          place.photos.push(createdPhotos[i].id);
        }
        return Place.update({
          id: id
        }, place);
      })
      .then(function(updatedPlace) {
        return res.send(200, updatedPlace);
      })
      .catch(function() {
        return res.send(500, {
          message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
        });
      });
  });
}


function destroy(req, res) {
  var queryWrapper = QueryService.buildQuery(req);
  sails.log("-----------  queryWrapper: Place.destroy  -------------");
  sails.log(queryWrapper);
  var query = queryWrapper.query;

  var id = query.where.id;
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  return Place.findOne({
      id: id
    })
    .populateAll()
    .then(function(place) {
      if (place) {
        _.forEach(place.photos, function(photo) {
          ImageService.deletePhoto(photo.id);
        });
        return Place.destroy({
          id: id
        });
      } else {
        return null;
      }
    })
    .then(function(place) {
      if (place) {
        return res.send(200, place);
      } else {
        return res.send(400, {
          message: "place does not exist"
        });
      }
    })
    .catch(function() {
      return res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}
