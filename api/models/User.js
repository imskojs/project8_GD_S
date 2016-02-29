// api/models/User.js

'use strict';
var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  attributes: {

    username: {
      type: 'string',
      unique: true,
      index: true,
      required: true,
      notNull: true
    },

    email: {
      type: 'email',
      unique: true,
      index: true
    },

    name: {
      type: 'STRING'
    },

    nickname: {
      type: 'STRING'
    },

    phone: {
      type: 'STRING'
    },
    //below is additional information
    gender: {
      type: 'STRING'
    },

    height: {
      type: 'STRING'
    },

    age: {
      type: 'STRING'
    },

    weight: {
      type: 'STRING'
    },

    averageHit: {
      type: 'STRING'
    },

    strength: {
      type: 'STRING'
    },

    //====================================================
    //  Association
    //====================================================
    likedProducts: {
      collection: 'Product',
      via: 'likedBy'
    },

    devices: {
      collection: 'Device',
      via: 'user'
    },

    pollComment: {
      model: 'PollComment'
    },

    owner: {
      model: 'User'
    },
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    },


    // Auth properties
    password_reset_code: {
      type: 'string'
    },
    password_reset_time: {
      type: 'integer'
    },
    accesscount: {
      type: 'integer'
    },
  },
  afterCreate: function setOwner(user, next) {

    sails.log("-----------  user  -------------");
    sails.log(user);
    // sails.log('User.afterCreate.setOwner', user);

    return User
      .update({
        id: user.id
      }, {
        owner: user.id
      })
      .then(function(users) {

        sails.log.debug("User update assign owner: " + users[0].toJSON());

        var userPromise = User.findOne({
          id: users[0].id
        }).populate('roles');
        var rolePromise = Role.find({
          name: 'USER'
        });

        return [userPromise, rolePromise];
      })
      .spread(function(user, roles) {

        sails.log.debug("User assigning default role: " + JSON.stringify(user));

        if (user)
          if (!user.roles || user.roles.length === 0) {
            User.update({
                id: user.id
              }, {
                roles: roles
              })
              .exec(function(err, users) {
                sails.log.debug("User default assign done: " + JSON.stringify(users));
              });
          }

        next();
      })
      .catch(function(e) {
        sails.log.error(e);
        next(e);
      });

  }
});
