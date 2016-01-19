'use strict';
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
  find: find,
  findOne: findOne,
  create: create,
  update: update,
  destroy: destroy,
  //====================================================
  //  App Specific
  //====================================================
  withQuestionnaires: withQuestionnaires,
  hasQuestionnaireAnswers: hasQuestionnaireAnswers,
  updatePhoto: updatePhoto,
  updateThumbnail: updateThumbnail,



  // One off
  getCategories: getCategories,
  //====================================================
  //  Not used
  //====================================================
  findNative: findNative,
};

function find(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;
  let populate = queryWrapper.populate;
  if (!query.limit) {
    query.limit = 100;
  }
  query.limit++;
  let productPromise = Product.find(query);
  QueryService.applyPopulate(productPromise, populate);
  let countPromise = Product.count(query);
  return Promise.all([productPromise, countPromise])
    .spread((products, count) => {
      let more = (products[query.limit - 1]) ? true : false;
      if (more) {
        products.pop();
      }
      return res.ok({
        products: products,
        more: more,
        total: count
      });
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function findOne(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;
  let populate = queryWrapper.populate;
  let productPromise = Product.findOne(query);
  QueryService.applyPopulate(productPromise, populate);
  return productPromise
    .then((product) => {
      if (product.views === undefined) {
        product.views = 0;
      }
      product.views = product.views + 1;
      let pendingSave = Promise.pending();
      product.save((err, savedProduct) => {
        if (err) {
          pendingSave.reject(err);
        } else {
          pendingSave.resolve(savedProduct);
        }
      });
      return pendingSave.promise;
    })
    .then((savedProduct) => {
      delete savedProduct.comments;
      return res.ok(savedProduct);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function create(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  query.owner = req.user.id;
  query.createdBy = req.user.id;
  query.updatedBy = req.user.id;
  if (!QueryService.checkParamPassed(query.type)) {
    return res.send(400, {
      message: "no type sent"
    });
  }
  ImageService
    .createPhotos(req, [])
    .then((createdPhotos) => {
      query.photos = _.pluck(createdPhotos, 'id');
      return Product.create(query);
    })
    .then((createdProduct) => {
      return Product.findOne({
        id: createdProduct.id
      }).populate('photos');
    })
    .then((product) => {
      return res.ok(product);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function update(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  delete query.createdBy;
  delete query.updatedBy;
  query.updatedBy = req.user.id;
  let id = query.id;
  delete query.id;
  if (!Array.isArray(query.photos)) {
    query.photos = [];
  }
  return Product
    .findOne({
      id: id
    }).populate('photos')
    .then((oldProduct) => {
      return ImageService.updatePhotos(oldProduct.photos, query.photos /*toKeepPhotos*/ , req);
    })
    .then((createdPhotoIds) => {
      _.forEach(createdPhotoIds, (photoId) => {
        query.photos.push(photoId);
      });
      return Product.update({
        id: id
      }, query);
    })
    .then((postInArray) => {
      return res.ok(postInArray[0]);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}


function destroy(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  var id = query.where.id;
  if (!QueryService.checkParamPassed(id)) {
    return res.send(400, {
      message: "no id sent"
    });
  }
  return Product.destroy({
      id: id
    })
    .then((destroyedProductInArray) => {
      return res.ok(destroyedProductInArray[0]);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function withQuestionnaires(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let query = queryWrapper.query;

  let productPromise = Product.findOne(query)
    .populate('questionnaires');

  return productPromise
    .then((product) => {
      let questionnaires = product.questionnaires;
      let questionnairesPromise = _.map(questionnaires, (questionnaire) => {
        return Questionnaire.findOne({
          id: questionnaire.id
        }).populate('questions');
      });
      return [product, Promise.all(questionnairesPromise)];
    })
    .spread((product, questionnaires) => {
      product = product.toObject();
      product.questionnaires = questionnaires;
      return res.ok(product);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function hasQuestionnaireAnswers(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  // only check one questionnaire answer to determine whether user has it.
  return QuestionnaireAnswer.findOne({
      product: query.where.product,
      createdBy: req.user.id
    })
    .then((questionnaireAnswer) => {
      if (!questionnaireAnswer) {
        return res.ok(true);
      } else {
        return res.ok(false);
      }
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function updatePhoto(req, res) { // queryWrapper{query:{id}}, req.files();
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  delete query.createdBy;
  delete query.updatedBy;
  query.updatedBy = req.user.id;
  let id = query.id;
  delete query.id;
  return Product
    .findOne({
      id: id
    }).populate('photo')
    .then((oldProduct) => {
      return ImageService.updatePhoto(oldProduct.photo, query.photo /*toKeepPhoto*/ , req);
    })
    .then((createdPhotoIdOrFalse) => {
      if (!createdPhotoIdOrFalse) {
        return Promise.reject({
          message: 'tokeep photo specified in updatePhoto'
        });
      }
      return Product.update({
        id: id
      }, {
        photo: createdPhotoIdOrFalse
      });
    })
    .then((productInArray) => {
      return res.ok(productInArray[0]);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}

function updateThumbnail(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  let query = queryWrapper.query;
  delete query.createdBy;
  delete query.updatedBy;
  query.updatedBy = req.user.id;
  let id = query.id;
  delete query.id;
  return Product
    .findOne({
      id: id
    }).populate('thumbnail')
    .then((oldProduct) => {
      return ImageService.updatePhoto(oldProduct.thumbnail, query.thumbnail /*toKeepPhoto*/ , req);
    })
    .then((createdPhotoIdOrFalse) => {
      if (!createdPhotoIdOrFalse) {
        return Promise.reject({
          message: 'tokeep thumbnail specified in updateThumbnail'
        });
      }
      return Product.update({
        id: id
      }, {
        thumbnail: createdPhotoIdOrFalse
      });
    })
    .then((productInArray) => {
      return res.ok(productInArray[0]);
    })
    .catch((err) => {
      return res.negotiate(err);
    });
}






//====================================================
//  One off
//====================================================
function getCategories(req, res) {
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);
  let allFieldPromise = Product.find({
    type: 'FIELD'
  });
  let allClubPromise = Product.find({
    type: 'CLUB'
  });
  let allBallPromise = Product.find({
    type: 'BALL'
  });
  return Promise.all([allFieldPromise, allClubPromise, allBallPromise])
    .then((array) => {
      var allFields = array[0];
      var allClubs = array[1];
      var allBalls = array[2];
      // find all fields's unique location1
      let allLocation1s = _.pluck(allFields, 'location1');
      let uniqueLocation1s = _.uniq(allLocation1s);
      // find all club's unique clubType
      let allClubTypes = _.pluck(allClubs, 'clubType');
      let uniqueClubTypes = _.uniq(allClubTypes);
      // find all club's unique clubBrand
      let allClubBrands = _.pluck(allClubs, 'clubBrand');
      let uniqueClubBrands = _.uniq(allClubBrands);
      // find all ball's unique ballType
      let allBallTypes = _.pluck(allBalls, 'ballType');
      let uniqueBallTypes = _.uniq(allBallTypes);
      // find all ball's unique ballBrand
      let allBallBrands = _.pluck(allBalls, 'ballBrand');
      let uniqueBallBrands = _.uniq(allBallBrands);

      return res.ok({
        location1: uniqueLocation1s,
        clubType: uniqueClubTypes,
        clubBrand: uniqueClubBrands,
        ballType: uniqueBallTypes,
        ballBrand: uniqueBallBrands
      });
    })
    .catch((err) => {
      sails.log("-----------  err  -------------");
      sails.log(err);
      return res.negotiate(err);
    });
}

function findNative(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());

  Promise.resolve(QueryService.executeNative(Product, queryWrapper))
    .spread((products, more, count) => {
      res.ok({
        products: products,
        more: more,
        total: count
      });
    })
    .catch((err) => {
      sails.log.error(err);
      res.send(500, {
        message: "장소 로딩을 실패 했습니다. 서버에러 code: 001"
      });
    });
}
