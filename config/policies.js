/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  //'*': true
  '*': [
    'basicAuth',
    'bearerAuth',
    'passportBearerAuth',
    'passport',
    'sessionAuth',
    'ModelPolicy',
    'AuditPolicy',
    'OwnerPolicy',
    'PermissionPolicy',
    'RolePolicy',
    'CriteriaPolicy'
  ],

  AuthController: {
    '*': ['passport'],
    'checknickname': true,
    'checkemail': true,
    'contactAdmin': true,
    'changePassword': [
      'bearerAuth',
      'sessionAuth'
    ]
  },


  DeviceController: {
    pushAll: [
      'basicAuth',
      'bearerAuth',
      'passport',
      'sessionAuth',
      'ModelPolicy',
      'AuditPolicy',
      'OwnerPolicy',
      'PermissionPolicy',
      'RolePolicy',
      'CriteriaPolicy'
    ],
    register: true,
    update: true
  },

  //SocketController: [
  //  'basicAuth',
  //  'bearerAuth',
  //  'passport',
  //  'sessionAuth'
  //],

  DataController: [
    'BearerAdmin',
    'sessionAuth'
  ],

  PostController: {
    find: true,
    findNative: true,
    findOne: true,
  },

  PlaceController: {
    find: true,
    findNative: true,
    findOne: true,
  },

  ProductController: {
    find: true,
    findNative: true,
    findOne: true,
  },

  /**************************************
   *               For dev only
   *************************************/

  //CommentController: true

};
