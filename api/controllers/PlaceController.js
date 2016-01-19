/**
 * Created by Andy on 7/7/2015
 * As part of applicatplatform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Andy Yoon Yong Shin - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Andy Yoon Yong Shin <andy.shin@applicat.co.kr>, 7/7/2015
 *
 */

var _ = require('lodash');
var Promise = require('bluebird');

module.exports = {
  find: find,
  findNative: findNative,
  findOne: findOne,

  create: create,
  update: update,
  destroy: destroy
}


function find(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100)
    query.limit = 100;

  query.limit++;

  var placePromise = Place.find(query);

  QueryService.applyPopulate(placePromise, populate);

  var countPromise = Place.count(query);

  Promise.all([placePromise, countPromise])
    .spread(function (places, count) {

      // See if there's more
      var more = (places[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more)places.splice(query.limit - 1, 1);

      res.ok({places: places, more: more, total: count});
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function findNative(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());

  Promise.resolve(QueryService.executeNative(Place, queryWrapper))
    .spread(function (places, more, count) {
      res.ok({places: places, more: more, total: count});
    })
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function findOne(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!QueryService.checkParamPassed(query.where.id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  var placePromise = Place.find(query);

  QueryService.applyPopulate(placePromise, populate);

  sails.log(1);

  placePromise
    .then(function (place) {
      if (place && place[0]) {

        ++place[0].views;
        place[0].save();

        Promise.all([place[0], Like.find({
            owner: req.user.id,
            place: place[0].id
          })])
          .spread(function (place, like) {

            var isLikable = true;
            if (like[0])
              isLikable = false;

            sails.log(3);

            res.send(200, {place: place, isLikable: isLikable});

          })
          .catch(function (err) {
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
    .catch(function (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}


function create(req, res) {

  var place = QueryService.buildQuery({}, req.allParams()).query;

  // assign user
  place.owner = req.user.id;
  place.createdBy = req.user.id;
  place.updatedBy = req.user.id;

  sails.log.debug(place);

  if (!QueryService.checkParamPassed(place.name)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  ImageService.createPhoto(req, [], null, function (err, createdPhotos) {

    if (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 004"
      });
      return;
    }

    place.photos = [];

    for (var i = 0; i < createdPhotos.length; i++) {
      place.photos.push(createdPhotos[i].id);
    }

    Place.create(place)
      .exec(function (err, place) {
        if (err) {
          sails.log.error(err);
          res.send(500, {
            message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
          });
          return;
        }

        res.send(200, place);
      });
  });
}

function update(req, res) {

  var place = QueryService.buildQuery({}, req.allParams()).query;
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
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  ImageService.createPhoto(req, [], null, function (err, createdPhotos) {

    if (err) {
      sails.log.error(err);
      res.send(500, {
        message: "게시물 로딩을 실패 했습니다. 서버에러 code: 004"
      });
      return;
    }

    if (!place.photos)
      place.photos = [];

    Place.findOne({id: id})
      .populate('photos')
      .then(function (oldPlace) {

        // Remove photo data only need id for association
        place.photos = _.pluck(place.photos, "id");

        // Delete photo no longer exist
        _.forEach(oldPlace.photos, function (oldPhoto) {

          var exist = false;

          for (var i = 0; i < place.photos.length; i++) {

            if (oldPhoto.id === place.photos[i])
              exist = true;
          }

          if (!exist)
            return ImageService.deletePhoto(oldPhoto.id);
          else
            return;
        });

        // Add new uploaded photo
        for (var i = 0; i < createdPhotos.length; i++) {
          place.photos.push(createdPhotos[i].id);
        }

        return Place.update({id: id}, place);

      })
      .then(function (updatedPlace) {
        res.send(200, updatedPlace);
      })
      .catch(function (err) {
        sails.log.error(err);
        res.send(500, {
          message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
        });
        return;
      })


  });
}


function destroy(req, res) {
  var id = req.param("id");

  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  Place.findOne({id: id})
    .populateAll()
    .then(function (place) {

      if (place) {
        // Remove photos associated with place
        _.forEach(place.photos, function (photo) {
          ImageService.deletePhoto(photo.id);
        });

        return Place.destroy({id: id});
      } else {
        return null;
      }
    })
    .then(function (place) {
      if (place) {
        res.send(200, place);
      } else {
        res.send(400, {message: "place does not exist"});
      }
    })
    .catch(function (err) {
      if (err) {
        sails.log.error(err);
        res.send(500, {
          message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
        });
      }
    });
}
