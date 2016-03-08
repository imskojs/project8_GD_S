// api/hooks/sails-permissions.js

/* jshint ignore:start */
'use strict';
/* jshint ignore:end */
var _ = require('lodash');

module.exports = function(sails) {
  return {
    identity: 'permissions',

    /**
     * Local cache of Model name -> id mappings to avoid excessive database lookups.
     */
    _modelCache: {},

    initialize: function(next) {

      sails.after(sails.config.permissions.afterEvent, function() {
        // set createdBy, and ownership
        installModelOwnership(sails);
      });

      sails.after('hook:orm:loaded', function() {
        console.log("hook:orm:loaded :::\n", 'hook:orm:loaded');

        Model.count()
          .then(function(count) {
            // ensure models are in Model
            if (count == sails.models.length) return next();
            // if not create them
            return initializeFixtures(sails)
              .then(function() {
                sails.emit('hook:permissions:loaded');
                next();
              });
          })
          .catch(function(error) {
            sails.log.error(error);
            next(error);
          });


      });
    }
  };
};

function initializeFixtures(sails) {
  return require('sails-permissions/config/fixtures/model').createModels()
    .bind({})
    .then(function(models) {
      this.models = models;

      // create key with identiy from models, and value is model
      sails.hooks['sails-permissions']._modelCache = _.indexBy(models, 'identity');

      return "temp";
    })
    .catch(function(error) {
      sails.log.error(error);
    });
}

function installModelOwnership(sails) {
  // get models folder as an object with property as file name
  var models = sails.models;
  // if models.js file does not have autoCraete option true return false
  if (sails.config.models.autoCreatedBy === false) return;

  // else if each model definition does not have autoCreatedBy true return false.
  _.each(models, function(model) {
    if (model.autoCreatedBy === false) return;
    // else add createdBy and owner to specific model definition.
    // note if it already has it it doesn't create it (_.defaults)
    _.defaults(model.attributes, {
      createdBy: {
        model: 'User',
        index: true
      },
      owner: {
        model: 'User',
        index: true
      }
    });
  });
}
