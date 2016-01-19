/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // Home angular
  '/': {
    assets: 'index.html'
  },
  //====================================================
  // User 
  //====================================================
  'POST /user/login': 'AuthController.login',

  //====================================================
  //  Product
  //====================================================
  'GET /product/withQuestionnaires': 'ProductController.withQuestionnaires',
  'PUT /product/updatePhoto': 'ProductController.updatePhoto',
  'PUT /product/updateThumbnail': 'ProductController.updateThumbnail',
  // One off
  'GET /product/getCategories': 'ProductController.getCategories',

  //====================================================
  //  Like
  //====================================================
  'POST /like/create': 'LikeController.create',
  'DELETE /like/destroy': 'LikeController.destroy',

  //====================================================
  //  QuestionAnswer
  //====================================================
  'POST /questionAnswer/createAnswers': 'QuestionAnswerController.createAnswers',
  'PUT /questionAnswer/updateAnswers': 'QuestionAnswerController.updateAnswers',













  /**************************************
   *               LIKE
   *************************************/

  'GET /like/find': 'LikeController.find',

  /**************************************
   *               Post
   *************************************/

  'GET /post/find': 'PostController.find',
  'GET /post/findNative': 'PostController.findNative',
  'GET /post/findOne': 'PostController.findOne',

  'POST /post/create': 'PostController.create',
  'PUT /post/update': 'PostController.update',
  'DELETE /post/destroy': 'PostController.destroy',

  'POST /post/like': 'LikeController.postLike',
  'DELETE /post/unlike': 'LikeController.postUnlike',


  /**************************************
   *               Comment
   *************************************/

  'GET /comment/find': 'CommentController.find',
  'GET /comment/findNative': 'CommentController.findNative',
  'GET /comment/findOne': 'CommentController.findOne',

  'POST /comment/create': 'CommentController.create',
  'PUT /comment/update': 'CommentController.update',
  'DELETE /comment/destroy': 'CommentController.destroy',

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

  'GET /product/find': 'ProductController.find',
  'GET /product/findNative': 'ProductController.findNative',
  'GET /product/findOne': 'ProductController.findOne',

  'POST /product/create': 'ProductController.create',
  'PUT /product/update': 'ProductController.update',
  'DELETE /product/destroy': 'ProductController.destroy',

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

  'POST /user/register': 'AuthController.register',
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
  'GET /user/find': 'UserController.find',
  'GET /user/findNative': 'UserController.findNative',
  'GET /user/findOne': 'UserController.findOne',

  'POST /user/create': 'UserController.create',
  'PUT /user/update': 'UserController.update',
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
