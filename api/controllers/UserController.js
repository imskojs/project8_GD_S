// api/controllers/UserController.js

'use strict';
var _ = require('lodash');
var Promise = require('bluebird');


var _super = require('sails-permissions/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  getMyUserInfo: getMyUserInfo,
  updateMyInfo: updateMyInfo,

  find: find,
  findNative: findNative,
  findOne: findOne,

  create: create,
  update: update,
  destroy: destroy,

  contactAdmin: contactAdmin,
});


function getMyUserInfo(req, res) {
  res.send(200, req.user)
}

function updateMyInfo(req, res) {
  var userToUpdate = req.allParams();

  var id = userToUpdate.id;

  var password = userToUpdate.password;

  delete userToUpdate.id;
  delete userToUpdate.application;
  delete userToUpdate.activation_code;
  delete userToUpdate.password_reset_code;
  delete userToUpdate.password_reset_time;
  delete userToUpdate.accesscount;
  delete userToUpdate.royaltyPoints;
  delete userToUpdate.role;
  delete userToUpdate.passports;
  delete userToUpdate.permissions;
  delete userToUpdate.royaltyPoints;
  delete userToUpdate.devices;
  delete userToUpdate.createdBy;
  delete userToUpdate.password;


  if (!QueryService.checkParamPassed(id)) {
    res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
    return;
  }

  User.findOne({
      id: id
    })
    .then(function(updatedUser) {

      _.extend(updatedUser, userToUpdate);

      sails.log.debug(updatedUser);

      updatedUser.save();

      if (updatedUser) {
        if (password) {
          Passport.find({
              user: id,
              protocol: 'local'
            })
            .then(function(passports) {
              sails.log(passports);
              passports[0].password = password;
              passports[0].save();

              res.send(200, updatedUser[0]);

            })
            .catch(function(err) {
              if (err) {
                res.send(400, {
                  message: "맞는 권한 찾기를 실패 했습니다."
                });
                return;
              }
            });
        } else {
          res.send(200, updatedUser[0]);
        }
      } else {
        res.send(500, {
          message: "사용 업데이트를 실패 했습니다. 서버에러 code: 001"
        });
      }
    })
    .catch(function(err) {
      sails.log.error(err);
      res.send(500, {
        message: "사용 업데이트를 실패 했습니다. 서버에러 code: 001"
      });
    });
}

function find(req, res) {

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!query.limit || query.limit > 100)
    query.limit = 100;

  query.limit++;

  var userPromise = User.find(query);

  QueryService.applyPopulate(userPromise, populate);

  var countPromise = User.count(query);

  Promise.all([userPromise, countPromise])
    .spread(function(users, count) {

      // See if there's more
      var more = (users[query.limit - 1]) ? true : false;
      // Remove item over 20 (only for check purpose)
      if (more) users.splice(query.limit - 1, 1);

      res.ok({
        users: users,
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

  var queryWrapper = QueryService.buildQuery({}, req.allParams());

  Promise.resolve(QueryService.executeNative(User, queryWrapper))
    .spread(function(users, more, count) {
      res.ok({
        users: users,
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

  var queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log(queryWrapper);

  var query = queryWrapper.query;
  var populate = queryWrapper.populate;

  if (!QueryService.checkParamPassed(query.where.id)) {
    return res.send(400, {
      message: "모든 매개 변수를 입력해주세요 code: 003"
    });
  }

  var userPromise = User.findOne(query);

  QueryService.applyPopulate(userPromise, populate);

  return userPromise
    .then(function(user) {
      return res.ok(user);
    })
    .catch(function(err) {
      return res.negotiate(err);
    });
}


function create(req, res) {

  var user = QueryService.buildQuery({}, req.allParams()).query;

  sails.log.debug(JSON.stringify(user));

  // Remove id
  if (user.id) {
    delete user.id;
  }

  // Assign application domain
  user.roles = [user.role];
  delete user.role;

  sails.services.passport.protocols.local.register(req.body, function(err, user) {
    if (err) {
      sails.log.error(err);
      res.send(500, {
        message: "유저 가입하기를 실패 하엿습니다. 서버에러 code: 001"
      });
    }

    res.ok({
      user: user,
      message: '가입 완료'
    });
  });
}

function update(req, res) {
  sails.log("-----------  req.allParams()  -------------");
  sails.log(req.allParams());
  let queryWrapper = QueryService.buildQuery({}, req.allParams());
  sails.log('----update----');
  sails.log(queryWrapper);
  let query = queryWrapper.query;
  var id = query.id;
  var params = {};
  params.updatedBy = req.user.id;
  var propertiesAllowedToUpdate = [
    'nickname', 'phone', 'gender', 'height', 'weight', 'age',
    'averageHit', 'playYear', 'strength'
  ];
  _.forEach(propertiesAllowedToUpdate, function(property) {
    if (query[property]) {
      params[property] = query[property];
    }
  });
  return User.update({
      id: id
    }, params)
    .then((inArray) => {
      let user = inArray[0];
      return res.ok(user);
    })
    .catch((err) => {
      return res.negotiate(err);
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


  User.findOne({
      id: id
    })
    .populateAll()
    .then(function(user) {
      if (user) {
        sails.log.debug("removing:" + JSON.stringify(user.email));

        // Remove photos associated with post
        if (user.profilePhoto && user.profilePhoto.id) {
          ImageService.deletePhoto(user.profilePhoto.id);
        }
        return User.destroy({
          id: id
        });
      } else {
        return null;
      }
    })
    .then(function(user) {
      if (user) {
        res.send(200, user);
      } else {
        res.send(400, {
          message: "user does not exist"
        });
      }
    })
    .catch(function(err) {
      if (err) {
        sails.log.error(err);
        res.send(500, {
          message: "게시물 로딩을 실패 했습니다. 서버에러 code: 001"
        });
      }
    });
}

function contactAdmin(req, res) {
  var mail = req.body;

  if (!QueryService.checkParamPassed(mail.title, mail.content)) {
    res.send(400, {
      message: "Please pass all the parameters"
    });
    return;
  }

  User.findOne({
      role: 'ADMIN'
    })
    .exec(function(err, userInfos) {

      if (err) {
        return res.send(500, {
          message: "DB Error"
        });
      }

      var counter = 0;
      var mailError = false;

      async.whilst(function() {
          return (counter < userInfos.length && !mailError);
        },
        function(callback) {

          var user = userInfos[counter];
          counter++;

          if (user.email) {
            MailService.sendEmail("admin", "kr", {
              user: req.user,
              content: mail.content
            }, "admin@applicat.co.kr", user.email, function(err) {
              if (err) {
                callback(err);
              } else {
                callback();
              }
            });
          } else {
            callback();
          }

        },
        function(err) {
          // Stop uploading to cloudinary
          if (err) {
            mailError = true;
          }

          if (mailError) {
            // TODO: If error while uploading delete all uploaded user.
            res.send(400, {
              message: "mail server error"
            });
          } else {

            res.send(201, {
              message: "메일 전송 완료"
            });

          }
        });

    });
}
