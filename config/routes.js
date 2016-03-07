module.exports.routes = {
  //====================================================
  //  Home
  //====================================================
  '/': {
    assets: 'index.html'
  },
  '/admin': {
    assets: 'admin.html'
  },
  //====================================================
  //  Product
  //====================================================
  'GET /product/find': 'ProductController.find',
  'GET /product/findOne': 'ProductController.findOne',
  'GET /product/withQuestionnaires': 'ProductController.withQuestionnaires',
  'GET /product/hasQuestionnaireAnswer': 'ProductController.hasQuestionnaireAnswer',
  'GET /product/findWithAverage': 'ProductController.findWithAverage',
  'GET /product/findOneWithAverage': 'ProductController.findOneWithAverage',
  'PUT /product/updatePhoto': 'ProductController.updatePhoto',
  'PUT /product/updateThumbnail': 'ProductController.updateThumbnail',
  'DELETE /product/destroy': 'ProductController.destroy',

  'POST /product/create': 'ProductController.create',
  'POST /product/createProduct': 'ProductController.createProduct',
  'PUT /product/updateProduct': 'ProductController.updateProduct',
  'PUT /product/update': 'ProductController.update',
  // One off
  'GET /product/getCategories': 'ProductController.getCategories',

  //====================================================
  //  Like
  //====================================================
  'GET /like/finOne': 'LikeController.findOne',
  'POST /like/create': 'LikeController.create',
  'DELETE /like/destroy': 'LikeController.destroy',
  'DELETE /like/destroyLikes': 'LikeController.destroyLikes',

  //====================================================
  //  QuestionAnswer
  //====================================================
  'GET /questionAnswer/findQuestionAnswer': 'QuestionAnswerController.findQuestionAnswer',
  'POST /questionAnswer/createAnswers': 'QuestionAnswerController.createAnswers',
  'POST /questionAnswer/createScreenshot': 'QuestionAnswerController.createScreenshot',
  'PUT /questionAnswer/updateAnswers': 'QuestionAnswerController.updateAnswers',

  //====================================================
  //  Note
  //====================================================
  'GET /note/find': 'NoteController.find',
  'GET /note/findOne': 'NoteController.findOne',
  'GET /note/getMaxScoreNote': 'NoteController.getMaxScoreNote',
  'GET /note/myHandicap': 'NoteController.myHandicap',

  //====================================================
  //  User
  //====================================================
  'GET /user/findOne': 'UserController.findOne',
  'PUT /user/update': 'UserController.update',
  'POST /user/login': 'AuthController.login',
  'POST /user/register': 'AuthController.register',
  'PUT /user/updatePassword': 'AuthController.changePassword',
  'GET /user/find': 'UserController.find',

  //====================================================
  //  Post
  //====================================================
  'GET /post/find': 'PostController.find',
  'GET /post/findLatest': 'PostController.findLatest',
  'GET /post/findOne': 'PostController.findOne',
  'POST /post/create': 'PostController.create',
  'PUT /post/update': 'PostController.update',

  //====================================================
  //  Comment
  //====================================================
  'GET /comment/find': 'CommentController.find',
  'POST /comment/create': 'CommentController.create',
  'DELETE /comment/destroy': 'CommentController.destroy',

  //====================================================
  //  Poll
  //====================================================
  'GET /poll/findLatest': 'PollController.findLatest',
  'POST /poll/create': 'PollController.create',

  //====================================================
  //  Poll
  //====================================================
  'POST /pollComment/create': 'PollCommentController.create',
  'GET /pollComment/find': 'PollCommentController.find',
  'DELETE /pollComment/destroy': 'PollCommentController.destroy',

  //====================================================
  //  PollAnswer
  //====================================================
  'GET /pollAnswer/hasPollAnswer': 'PollAnswerController.hasPollAnswer',
  'POST /pollAnswer/create': 'PollAnswerController.create',

  //====================================================
  //  GolfRecord
  //====================================================
  'POST /golfRecord/create': 'GolfRecordController.create',
  'GET /golfRecord/find': 'GolfRecordController.find',
  'GET /golfRecord/findOne': 'GolfRecordController.findOne',
  'GET /golfRecord/findByKeyword': 'GolfRecordController.findByKeyword',
  'PUT /golfRecord/update': 'GolfRecordController.update',
  'DELETE /golfRecord/destroy': 'GolfRecordController.destroy',

  'GET /golfRecord/getMaxScoreRecord': 'GolfRecordController.getMaxScoreRecord',
  'GET /golfRecord/myHandicap': 'GolfRecordController.myHandicap',

  //====================================================
  //  Photo
  //====================================================
  'POST /photo/createPhotos': 'PhotoController.createPhotos',
  'PUT /photo/updatePhotos': 'PhotoController.updatePhotos',

  //====================================================
  //  Contact Admin
  //====================================================
  'POST /contact/admin': 'UserController.contactFromWeb',

  //====================================================
  //  NOT USED
  //====================================================
  /**************************************
   *               LIKE
   *************************************/

  'GET /like/find': 'LikeController.find',

  /**************************************
   *               Post
   *************************************/

  'GET /post/findNative': 'PostController.findNative',

  'DELETE /post/destroy': 'PostController.destroy',

  'POST /post/like': 'LikeController.postLike',
  'DELETE /post/unlike': 'LikeController.postUnlike',


  /**************************************
   *               Comment
   *************************************/

  'GET /comment/findNative': 'CommentController.findNative',
  'GET /comment/findOne': 'CommentController.findOne',

  'PUT /comment/update': 'CommentController.update',

  'POST /comment/like': 'LikeController.commentLike',
  'DELETE /comment/unlike': 'LikeController.commentUnlike',

  /**************************************
   *               Place
   *************************************/

  'GET /place/find': 'PlaceController.find',
  'GET /place/findNative': 'PlaceController.findNative',
  'GET /place/findOne': 'PlaceController.findOne',

  'POST /place/create': 'PlaceController.create',
  'PUT /place/update': 'PlaceController.update',
  'DELETE /place/destroy': 'PlaceController.destroy',

  'POST /place/like': 'LikeController.placeLike',
  'DELETE /place/unlike': 'LikeController.placeUnlike',

  /**************************************
   *               Product
   *************************************/

  'GET /product/findNative': 'ProductController.findNative',

  'POST /product/like': 'LikeController.productLike',
  'DELETE /product/unlike': 'LikeController.productUnlike',

  /**************************************
   *               Booking
   *************************************/

  'GET /booking/find': 'BookingController.find',
  'GET /booking/findNative': 'BookingController.findNative',
  'GET /booking/findOne': 'BookingController.findOne',

  'POST /booking/create': 'BookingController.create',
  'PUT /booking/update': 'BookingController.update',
  'DELETE /booking/destroy': 'BookingController.destroy',


  /**************************************
   *               RoyaltyPoint
   *************************************/

  'GET /royalty/find': 'RoyaltyPointController.find',
  'GET /royalty/findNative': 'RoyaltyPointController.findNative',
  'GET /royalty/findOne': 'RoyaltyPointController.findOne',

  'POST /royalty/create': 'RoyaltyPointController.create',
  'PUT /royalty/update': 'RoyaltyPointController.update',
  'DELETE /royalty/destroy': 'RoyaltyPointController.destroy',


  /**************************************
   *               Review
   *************************************/

  'GET /review/find': 'ReviewController.find',
  'GET /review/findNative': 'ReviewController.findNative',
  'GET /review/findOne': 'ReviewController.findOne',

  'POST /review/create': 'ReviewController.create',
  'PUT /review/update': 'ReviewController.update',
  'DELETE /review/destroy': 'ReviewController.destroy',


  /**************************************
   *               Photo
   *************************************/

  'GET /photo/find': 'PhotoController.find',
  'GET /photo/findNative': 'PhotoController.findNative',
  'GET /photo/findOne': 'PhotoController.findOne',

  'POST /photo/create': 'PhotoController.create',
  'PUT /photo/update': 'PhotoController.update',
  'DELETE /photo/destroy': 'PhotoController.destroy',

  /**************************************
   *               Auth
   *************************************/

  // OAuth
  'GET /user/checkNickname': 'AuthController.checkNickname',
  'GET /user/checkUsername': 'AuthController.checkUsername',
  'GET /user/checkEmail': 'AuthController.checkEmail',


  // 'POST /user/login': 'AuthController.login',
  'GET /user/logout': 'AuthController.logout',

  'POST /user/loginWithOauth': 'AuthController.registerPassport',

  'POST /forgotpassword': 'AuthController.forgotPasswordStart',
  'POST /forgotpassword/check': 'AuthController.forgotPasswordCheck',
  'PUT /forgotpassword/complete': 'AuthController.forgotPasswordComplete',
  'PUT /auth/changePassword': 'AuthController.changePassword',

  /**************************************
   *               User
   *************************************/


  'GET /me': 'UserController.getMyUserInfo',
  'PUT /me': 'UserController.updateMyInfo',

  // User authentication service
  'GET /user/findNative': 'UserController.findNative',

  'POST /user/create': 'UserController.create',
  // 'PUT /user/update': 'UserController.update',
  'DELETE /user/destroy': 'UserController.destroy',

  'POST /email/admin': 'UserController.contactAdmin',

  /**************************************
   *               Device
   *************************************/

  'GET /device/push': 'DeviceController.pushAll',


  'POST /device/register': 'DeviceController.register',
  'PUT /device/update': 'DeviceController.update',


  /**************************************
   *               Role
   *************************************/

  'GET /role/myrole': 'RoleController.getMyRole',

  'GET /role/find': 'RoleController.find',
  'GET /role/findNative': 'RoleController.findNative',
  'GET /role/findOne': 'RoleController.findOne',

  'POST /role/create': 'RoleController.create',
  'PUT /role/update': 'RoleController.update',
  'DELETE /role/destroy': 'RoleController.destroy',

  /**************************************
   *               Socket
   *************************************/

  'GET /subscribeToRoom/:roomName': 'SocketController.subscribeToRoom',

  /**************************************
   *               Data
   *************************************/

  'POST /data/import': 'DataController.importCollection',
  'GET /data/export': 'DataController.exportCollection'

};
