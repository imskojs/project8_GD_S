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
    'RolePolicy', // empty
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
  UserController: {
    'create': ['passport'],
    'checknickname': true,
    'checkemail': true,
    'contactAdmin': true,
    'contactFromWeb': true
      //'*': true
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

  // DataController: [
  //   'BearerAdmin',
  //   'sessionAuth'
  // ],

  // PostController: {
  //   find: true,
  //   findNative: true,
  //   findOne: true,
  // },

  // PlaceController: {
  //   find: true,
  //   findNative: true,
  //   findOne: true,
  // },

  // ProductController: {
  //   find: true,
  //   findNative: true,
  //   findOne: true,
  // },

  /**************************************
   *               For dev only
   *************************************/

  //CommentController: true

};
