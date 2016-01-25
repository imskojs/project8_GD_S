// api/models/Role.js

'use strict';
var _ = require('lodash');
var _super = require('sails-permissions/api/models/Role');

_.merge(exports, _super);
_.merge(exports, {

  attributes: {
    label: {
      type: "STRING"
    },
  }
});
