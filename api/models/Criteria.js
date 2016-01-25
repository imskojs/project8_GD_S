// api/models/Criteria.js

'use strict';
var _ = require('lodash');
var _super = require('sails-permissions/api/models/Criteria');

_.merge(exports, _super);
_.merge(exports, {

  attributes: {
    label: {
      type: "STRING"
    }
  }

});
