(function(angular) {
  'use strict';
  angular.module('app', [
      'ionic',
      'applicat.push.service',
      'ngCordova',
      'ngResource',
      'ngFileUpload',
      'ngTemplates',
      'ngStorage',
      'ngImgCrop',
      // "ui.bootstrap.tpls",
      // "ui.bootstrap.datepicker"
    ])
    .run(init);

  init.$inject = [
    '$ionicPlatform', '$window', '$rootScope', '$state',
    'RootScope', 'Preload',
    'DEV_MODE', 'Assets'
  ];

  function init(
    $ionicPlatform, $window, $rootScope, $state,
    RootScope, Preload,
    DEV_MODE, Assets
  ) {

    Preload.assets(Assets);
    angular.extend($rootScope, RootScope);
    if (DEV_MODE) {
      setInitialState();
      // Mock User
      // $rootScope.AppStorage.user = {
      //   id: "5693110464765c4714f10dd9"
      // };
    }

    $ionicPlatform.ready(onIonicPlatformReady);

    //====================================================
    //  Implementation
    //====================================================
    function onIonicPlatformReady() {
      if ($window.cordova && $window.cordova.plugins.Keyboard) {
        $window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if ($window.StatusBar) {
        $window.StatusBar.styleDefault();
      }
      setInitialState();
    }
    //====================================================
    //  Helper
    //====================================================
    function setInitialState() {
      if ($rootScope.AppStorage.isFirstTime && $state.get('Main.WalkThrough')) {
        // First time user logic
        $state.go('Main.WalkThrough');
      } else if (!$rootScope.AppStorage.token) {
        // Not logged in user logic
        // $state.go('Main.Home');
        $state.go('Login');
      } else {
        // Normal user logic
        // $state.go('Main.Home');
        // $state.go('Login');
        $state.go('Main.Product.ProductList');
      }
    }

  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .config(route);
  route.$inject = ['$stateProvider', '$httpProvider', '$ionicConfigProvider'];

  function route($stateProvider, $httpProvider, $ionicConfigProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(true);
    $httpProvider.interceptors.push('AuthInterceptor');

    $stateProvider
      .state('Main', {
        // abstract: true,
        url: '/Main',
        templateUrl: 'state/0Main/Main.html',
        controller: 'MainController as Main'
      })

    .state('Login', {
      url: '/Login',
      templateUrl: 'state/Login/Login.html',
      controller: 'LoginController as Login'
    })

    //====================================================
    //  Post
    //====================================================
    .state('Main.Post', {
      url: '/Post',
      views: {
        Main: {
          templateUrl: 'state/Post/Post.html'
        }
      }
    })

    .state('Main.Post.PostList', {
      url: '/PostList',
      views: {
        Post: {
          templateUrl: 'state/Post/PostList/PostList.html',
          controller: 'PostListController as PostList'
        }
      }
    })

    .state('Main.Post.PostCreate', {
      url: '/PostCreate',
      views: {
        Post: {
          templateUrl: 'state/Post/PostCreate/PostCreate.html',
          controller: 'PostCreateController as PostCreate'
        }
      }
    })

    .state('Main.Post.PostUpdate', {
      url: '/PostUpdate/:id',
      views: {
        Post: {
          templateUrl: 'state/Post/PostUpdate/PostUpdate.html',
          controller: 'PostUpdateController as PostUpdate'
        }
      }
    })

    //====================================================
    //  Poll
    //====================================================
    .state('Main.Poll', {
      url: '/Poll',
      views: {
        Main: {
          templateUrl: 'state/Poll/Poll.html'
        }
      }
    })


    .state('Main.Poll.PollCreate', {
      url: '/PollCreate',
      views: {
        Poll: {
          templateUrl: 'state/Poll/PollCreate/PollCreate.html',
          controller: 'PollCreateController as PollCreate'
        }
      }
    })

    //====================================================
    //  Rank
    //====================================================
    .state('Main.Rank', {
      url: '/Rank',
      views: {
        Main: {
          templateUrl: 'state/Rank/Rank.html'
        }
      }
    })


    .state('Main.Rank.RankCreate', {
      url: '/RankCreate',
      views: {
        Rank: {
          templateUrl: 'state/Rank/RankCreate/RankCreate.html',
          controller: 'RankCreateController as RankCreate'
        }
      }
    })

    //====================================================
    //  Ads
    //====================================================
    .state('Main.Ads', {
      url: '/Ads',
      views: {
        Main: {
          templateUrl: 'state/Ads/Ads.html'
        }
      }
    })

    .state('Main.Ads.AdsCreate', {
      url: '/AdsCreate',
      views: {
        Ads: {
          templateUrl: 'state/Ads/AdsCreate/AdsCreate.html',
          controller: 'AdsCreateController as AdsCreate'
        }
      }
    })

    //====================================================
    //  Product
    //====================================================
    .state('Main.Product', {
      url: '/Product',
      views: {
        Main: {
          templateUrl: 'state/Product/Product.html'
        }
      }
    })

    .state('Main.Product.ProductList', {
      url: '/ProductList',
      views: {
        Product: {
          templateUrl: 'state/Product/ProductList/ProductList.html',
          controller: 'ProductListController as ProductList'
        }
      }
    })

    .state('Main.Product.ProductCreate', {
        url: '/ProductCreate/:id',
        views: {
          Product: {
            templateUrl: 'state/Product/ProductCreate/ProductCreate.html',
            controller: 'ProductCreateController as ProductCreate'
          }
        }
      })
      .state('Main.Product.ProductUpdate', {
        url: '/ProductUpdate/:id',
        views: {
          Product: {
            templateUrl: 'state/Product/ProductUpdate/ProductUpdate.html',
            controller: 'ProductUpdateController as ProductUpdate'
          }
        }
      })

    //====================================================
    //  QuestionAnswer
    //====================================================
    .state('Main.QuestionAnswer', {
        url: '/QuestionAnswer',
        views: {
          Main: {
            templateUrl: 'state/QuestionAnswer/QuestionAnswer.html'
          }
        }
      })
      .state('Main.QuestionAnswer.QuestionProductList', {
        url: '/QuestionProductList',
        views: {
          QuestionAnswer: {
            templateUrl: 'state/QuestionAnswer/QuestionProductList/QuestionProductList.html',
            controller: 'QuestionProductListController as QuestionProductList'
          }
        }
      })
      .state('Main.QuestionAnswer.QuestionAnswerList', {
        url: '/QuestionAnswerList/:type/:id',
        views: {
          QuestionAnswer: {
            templateUrl: 'state/QuestionAnswer/QuestionAnswerList/QuestionAnswerList.html',
            controller: 'QuestionAnswerListController as QuestionAnswerList'
          }
        }
      })

    //====================================================
    //  User
    //====================================================
    .state('Main.User', {
        url: '/User',
        views: {
          Main: {
            templateUrl: 'state/User/User.html'
          }
        }
      })
      .state('Main.User.UserList', {
        url: '/UserList',
        views: {
          User: {
            templateUrl: 'state/User/UserList/UserList.html',
            controller: 'UserListController as UserList'
          }
        }
      })

    //====================================================
    //  Push
    //====================================================
    .state('Main.Push', {
        url: '/Push',
        views: {
          Main: {
            templateUrl: 'state/Push/Push.html'
          }
        }
      })
      .state('Main.Push.PushSend', {
        url: '/PushSend',
        views: {
          Push: {
            templateUrl: 'state/Push/PushSend/PushSend.html',
            controller: 'PushSendController as PushSend'
          }
        }
      })


    //====================================================
    //  ZZZ Samples
    //====================================================
    .state('zLogin', {
      url: '/zLogin',
      templateUrl: 'state/ZZZ/Login/Login.html',
      controller: 'zLoginController as Login'
    })

    .state('Main.zSignup', {
      url: '/zSignup',
      templateUrl: 'state/ZZZ/Signup/Signup.html',
      controller: 'zSignupController as Signup'
    })

    .state('Main.zTerms', {
      url: '/zTerms',
      templateUrl: 'state/ZZZ/Terms/Terms.html',
      controller: 'zTermsController as Terms'
    })


    .state('Main.zPostList', {
      url: '/zPostList',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostList/PostList.html',
          controller: 'zPostListController as PostList'
        }
      }
    })

    .state('Main.zPostDetail', {
      url: '/zPostDetail/:id',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostDetail/PostDetail.html',
          controller: 'zPostDetailController as PostDetail'
        }
      }
    })

    .state('Main.zPostUpdate', {
      url: '/zPostUpdate/:id',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostUpdate/PostUpdate.html',
          controller: 'zPostUpdateController as PostUpdate'
        }
      }
    })

    .state('Main.zPostCreate', {
      url: '/zPostCreate',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/PostCreate/PostCreate.html',
          controller: 'zPostCreateController as PostCreate'
        }
      }
    })

    .state('Main.zCouponList', {
      url: '/zCouponList',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/CouponList/CouponList.html',
          controller: 'zCouponListController as CouponList'
        }
      }
    })

    .state('Main.zCouponDetail', {
      url: '/zCouponDetail',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/CouponDetail/CouponDetail.html',
          controller: 'zCouponDetailController as CouponDetail'
        }
      }
    })

    .state('Main.zProfile', {
      url: '/zProfile',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/Profile/Profile.html',
          controller: 'zProfileController as Profile'
        }
      }
    })

    .state('Main.zPassword', {
      url: '/zPassword',
      views: {
        Main: {
          templateUrl: 'state/ZZZ/Password/Password.html',
          controller: 'zPasswordController as Password'
        }
      }
    })



  } //route end
})(angular);

// Used to preload assets. Done automatically in gulp
(function(angular) {
  'use strict';

  angular.module('app')
    .value('Assets', []);

})(angular);

// App constants
(function(angular) {
  'use strict';

  angular.module('app')
    // Social login with Kakao
    .constant("KAKAO_KEY", "abcdefghijklmnopqrstu0123456789")
    // Social login with Facebook
    .constant("FACEBOOK_KEY", "1234567890123456")
    // Social login with twitter
    .constant("TWITTER_CONSUMER_KEY", "abCde1GHiJklmn2PqRSTuVWXY")
    .constant("TWITTER_CONSUMER_SECRET", "a1CDefGhIjK2MNopQRst3VwXY4zabC5Ef6HIJK6MNOpQrsTUVw")
    // social login with google+
    .constant("GOOGLE_OAUTH_CLIENT_ID", "12345678901-abcde2gh3j4lmn5p6rs7uvw8x90y1234.apps.googleusercontent.com")
    // Used for sending push notification
    .constant("GOOGLE_PROJECT_NUMBER", "12345678901")
    // Development mode
    .constant("DEV_MODE", true)
    // Server
    // .constant("SERVER_URL", "http://192.168.0.65:1337")
    .constant("SERVER_URL", "http://52.68.146.246")
    .constant("APP_NAME", "YOUR_APP_NAME")
    .constant("APP_NAME_KOREAN", "사람들이 볼만한 앱 이름")
    .constant("APP_ID", 10);
})(angular);

// Global variables
(function(angular) {
  'use strict';
  angular.module('app')
    .value('Sample', {
      test: 'test'
    })
    .value('Sample2', [{
      test2: 'test2'
    }]);
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['AppStorage'];

  function AuthInterceptor(AppStorage) {

    var interceptor = {
      request: request
    };

    return interceptor;

    function request(req) {
      var token = AppStorage.token;
      if (token) {
        if (req.headers.enctype && req.headers.enctype.includes('multipart/form-data')) {
          console.log("---------- 'req.headers.enctype.includes multipart/form-date AuthInterceptor' ----------");
        } else {
          req.headers['Content-Type'] = 'application/json';
        }
        req.headers.Authorization = 'Bearer ' + token;
      }
      return req;
    }

  }
})(angular);

// local storage wrapper, name spaced.
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('AppStorage', AppStorage);

  AppStorage.$inject = [
    '$localStorage',
    'APP_NAME'
  ];

  function AppStorage(
    $localStorage,
    APP_NAME
  ) {

    setInitialState();

    return $localStorage[APP_NAME];

    //====================================================
    //  Implementations
    //====================================================
    function setInitialState() {
      if (!$localStorage[APP_NAME]) {
        $localStorage[APP_NAME] = {};
      }
      var storage = $localStorage[APP_NAME];
      if (storage.isFirstTime === undefined) {
        storage.isFirstTime = true;
      }
    }

    //====================================================
    //  Helper
    //====================================================
  }
})(angular);

// Usage
// Distance.between({latitude: 33, longitude: 33}, {latitude: 44, longitude:44});

// Output: distance between two points in meters.
// 20000
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Distance', Distance);

  Distance.$inject = ['$window'];

  function Distance($window) {

    var service = {
      between: $window.geolib.getDistance
    };

    return service;

  }
})(angular);

// Simple dom manipulation when making directive is a overkill
// USAGE;
// In View;
//<input id="daum-map-search-input" type="text">
// In controller;
//Dom.focusById('daum-map-search-input');
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Dom', Dom);

  Dom.$inject = ['$timeout', '$window'];

  function Dom($timeout, $window) {
    var service = {
      focusById: focusById,
      blurById: blurById,
    };

    return service;

    function focusById(id) {
      $timeout(function() {
        var domElement = $window.document.getElementById(id);
        if (domElement) {
          domElement.focus();
        }
      }, 0);
    }

    function blurById(id) {
      $timeout(function() {
        var domElement = $window.document.getElementById(id);
        if (domElement) {
          domElement.blur();
        }
      }, 0);
    }
  }

})(angular);

// like post avaiable to call from $rootScope
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Favorite', Favorite);

  Favorite.$inject = [
    '$timeout',
    'AppStorage', 'Posts', 'Message', 'Places', 'Events'
  ];

  function Favorite(
    $timeout,
    AppStorage, Posts, Message, Places, Events
  ) {

    var service = {
      toggleSaveToFavorite: toggleSaveToFavorite,
      isFavorite: isFavorite,

      likePost: likePost,
      likePlace: likePlace,
      likeEvent: likeEvent
    };

    return service;
    //====================================================
    //  Favorite.toggleSaveToFavorite
    //====================================================
    // Usage;
    //Favorite.toggleFavorite('1asf31sf1adf31')
    // Output(localStorage favorites array);
    //AppStorage.favorites.
    function toggleSaveToFavorite(id) {
      if (!Array.isArray(AppStorage.favorites)) {
        AppStorage.favorites = [];
      }
      if (isFavorite(id)) { //delte favorite
        var index = AppStorage.favorites.indexOf(id);
        AppStorage.favorites.splice(index, 1);
      } else if (!isFavorite(id)) { // add favorite
        AppStorage.favorites.push(id);
      }
      return AppStorage.favorites;
    }

    //====================================================
    //  Favorite.isFavorite
    //====================================================
    // Usage;
    //Favorite.isFavorite('1asf31sf1adf31')
    // Output(boolean if id exists in AppStorage.favorites);
    //true || false
    function isFavorite(id) {
      if (!Array.isArray(AppStorage.favorites)) {
        AppStorage.favorites = [];
      }
      for (var i = 0; i < AppStorage.favorites.length; i++) {
        if (String(id) === String(AppStorage.favorites[i])) {
          return true;
        }
      }
      return false;
    }

    function likePost(postObj) {
      Message.loading();
      Posts.like({}, {
          post: postObj.id
        }).$promise
        .then(function(post) {
          if (post.message) {
            Message.alert('좋아요 알림', post.message);
          } else {
            $timeout(function() {
              postObj.likes = post.likes;
              Message.alert('좋아요 알림', '좋아요 성공!');
            }, 0);
          }
          console.log("---------- post ----------");
          console.log(post);
        })
        .catch(function(err) {
          Message.hide();
          Message.alert();
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function likePlace(placeObj) {
      Message.loading();
      Places.like({}, {
          place: placeObj.id
        }).$promise
        .then(function(place) {
          if (place.message) {
            Message.alert('좋아요 알림', place.message);
          } else {
            $timeout(function() {
              placeObj.likes = place.likes;
              Message.alert('좋아요 알림', '좋아요 성공!');
            }, 0);
          }
          console.log("---------- place ----------");
          console.log(place);
        })
        .catch(function(err) {
          Message.hide();
          Message.alert();
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function likeEvent(eventObj) {
      Message.loading();
      Events.like({}, {
          event: eventObj.id
        }).$promise
        .then(function(event) {
          if (event.message) {
            Message.alert('좋아요 알림', event.message);
          } else {
            $timeout(function() {
              eventObj.likes = event.likes;
              Message.alert('좋아요 알림', '좋아요 성공!');
            }, 0);
          }
          console.log("---------- event ----------");
          console.log(event);
        })
        .catch(function(err) {
          Message.hide();
          if (err.data.message) {
            Message.alert('좋아요 알림', err.data.message);
          } else {
            Message.alert();
          }
          console.log("---------- err ----------");
          console.log(err);
        });
    }

  } // Service END
})(angular);

// Used to call external resource such as external browser, calling phone, and social sharing;
// Dependencies
//Cordova InAppBrowser
//Cordova SocialSharing
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Link', Link);

  Link.$inject = [
    '$window', '$cordovaSocialSharing', '$state',
    'AppStorage', 'Message'
  ];

  function Link(
    $window, $cordovaSocialSharing, $state,
    AppStorage, Message
  ) {

    var service = {
      call: call,
      open: open,
      share: share
    };
    return service;

    //====================================================
    //  Link.call Usage
    //====================================================
    //Link.call(01011010101)
    // Output
    //phone call
    function call(phone) {
      if (!phone) {
        Message.alert('전화하기 알림', '전화가 없습니다.');
        return false;
      }
      phone = String(phone);
      if (phone[0] !== '0') {
        phone = '0' + phone;
      }
      var phoneArray = phone.split('');
      var indexParen = phoneArray.indexOf(')');
      if (indexParen !== -1) {
        phoneArray.splice(indexParen, 1);
      }
      var indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      indexDash = phoneArray.indexOf('-');
      if (indexDash !== -1) {
        phoneArray.splice(indexDash, 1);
      }
      phone = phoneArray.join('');
      $window.location.href = 'tel:' + phone;
    }

    //====================================================
    //  Link.openLink Usage
    //====================================================
    //Link.openLink('http://www.applicat.co.kr');
    // Output
    //InAppBrowser open new window with url
    function open(link) {
      return $window.open(link, '_system');
    }

    //====================================================
    //  Link.share Usage
    //====================================================
    // Link.share('my title', 'my content stuff', 'http://www.applicat.co.kr')
    // Output
    //Social Share title content and link
    function share(title, content, url) {
      return $cordovaSocialSharing
        .share(title, content, null, url)
        .then(function(suc) {
          console.log(suc);
        }, function(err) {
          console.log(err);
        });
    }
  }
})(angular);

(function() {
  'use strict';

  angular.module('app')
    .factory('Log', Log);

  Log.$inject = [
    '$cordovaDevice', '$window',
    'appStorage', 'Logs'
  ];

  function Log(
    $cordovaDevice, $window,
    appStorage, Logs
  ) {
    var moment = $window.moment;

    var Service = {
      sendUUID: sendUUID
    };

    return Service;

    //====================================================
    //  Send device UUID if not sent between 00:00 to 23:59:59
    //====================================================
    function sendUUID() {
      var today = moment().hour(0).minute(0).second(0);
      if (!appStorage.loggedDate || moment(appStorage.loggedDate).isBefore(today)) {
        appStorage.loggedDate = new Date().toString();
        return Logs.log({}, {
            deviceId: $cordovaDevice.getUUID()
          }).$promise
          .then(function(data) {
            console.log("---------- data ----------");
            console.log(data);
            appStorage.loggedDate = new Date().toString();
          })
          .catch(function(err) {
            console.log("---------- err ----------");
            console.log(err);
          });
      }
    }
  }
})();

// loading spinner and common message wrapper
(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Message', Message);

  Message.$inject = [
    '$ionicLoading', '$ionicPopup'
  ];

  function Message(
    $ionicLoading, $ionicPopup
  ) {
    var service = {
      loading: loading,
      hide: hide,
      success: success,
      error: error,
      alert: alert
    };

    return service;

    function loading(message) {
      $ionicLoading.show(message);
    }

    function success(message) {
      $ionicLoading.show({
        template: '<h4 class="message-success">' + message + '</h4>',
        duration: 2000
      });
    }

    function error(message) {
      $ionicLoading.show({
        template: '<h4 class="message-error">' + message + '</h4>',
        duration: 2000
      });
    }

    function hide() {
      $ionicLoading.hide();
    }

    function alert(title, message) {
      hide();
      return $ionicPopup.alert({
        title: title || '인터넷이 끊겼습니다.',
        template: message || '인터넷을 켜주세요.'
      });
    }


  }


})(angular);

//  Dependencies
//ng-file-uploead
//cordovaCamera/
//MessageService
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Photo', Photo);

  Photo.$inject = [
    '$cordovaCamera', '$window', '$timeout', '$q', '$cordovaFile', '$rootScope', '$ionicModal',
    'SERVER_URL', 'Message', 'Upload'
  ];

  function Photo(
    $cordovaCamera, $window, $timeout, $q, $cordovaFile, $rootScope, $ionicModal,
    SERVER_URL, Message, Upload
  ) {

    var _ = $window._;
    $ionicModal.fromTemplateUrl('state/0Template/ImageCropModal.html', {
        id: '9999',
        scope: $rootScope,
        animation: 'instant-slide'
      })
      .then(function(modal) {
        $rootScope.ImageCropModal = modal;
        $rootScope.hideImageCropModal = function() {
          $rootScope.getPhotoCancelled = false;
          $rootScope.ImageCropModal.hide();
        };
      });

    $rootScope.ImageCropAttribute = {
      sourceImageBase64: '',
      croppedImageBase64: '',
      resultImageSize: 600,
      areaType: 'square',
      aspectRatio: 1
    };

    $rootScope.getPhotoCancelled = true;


    var service = {
      get: get,
      post: post,
      clean: clean
    };

    return service;

    //====================================================
    //  Photo.get Usage
    //====================================================
    //Usage
    //  Photo.get('camera' || 'gallery', 800, true, 300,'square | circle | rectangle', aspectRatioIfRectangle)
    //Output:
    //  'data:base64, asdfk1jmcl1...'
    function get(sourceType, width, cropTrue, resultImageSize, areaType, aspectRatio) {

      var promise;

      if (sourceType === 'camera') {
        promise = $cordovaCamera.getPicture({
          quality: 50,
          destinationType: $window.Camera.DestinationType.FILE_URI,
          encodingType: $window.Camera.EncodingType.JPEG,
          targetWidth: width || 800,
          correctOrientation: true,
          mediaType: $window.Camera.MediaType.PICTURE,
          cameraDirection: $window.Camera.Direction.BACK,
          sourceType: 1 //camera
        });
      } else if (sourceType === 'gallery') {
        promise = pickImage(width);
      }

      promise = promise
        .then(function(filePath) {
          var name = filePath.substr(filePath.lastIndexOf('/') + 1);
          var namePath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          return $cordovaFile.readAsDataURL(namePath, name);
        })
        .catch(function( /* cancelled */ ) {
          $rootScope.ImageCropModal.hide();
          return $q.reject({
            message: 'cancelled'
          });
        });

      if (cropTrue) {
        $rootScope.ImageCropAttribute.sourceImageBase64 = null;
        $rootScope.ImageCropAttribute.areaType = areaType || 'square';
        $rootScope.ImageCropAttribute.aspectRatio = aspectRatio || 1;
        $rootScope.ImageCropAttribute.resultImageSize = resultImageSize || 600;
        $rootScope.ImageCropModal.show();
        promise = promise
          .then(function(base64) {
            $rootScope.ImageCropAttribute.sourceImageBase64 = base64;
            // $rootScope.ImageCropModal.show();
            var deferred = $q.defer();
            var modalHiddenListenerOff = $rootScope.$on('modal.hidden', function(event, modal) {
              if (modal.id === '9999') {
                if ($rootScope.getPhotoCancelled === true) {
                  return $q.reject({
                    message: 'cancelled'
                  });
                } else {
                  $rootScope.getPhotoCancelled = true;
                  deferred.resolve($rootScope.ImageCropAttribute.croppedImageBase64);
                }
              }
            });
            return $q.all([deferred.promise, modalHiddenListenerOff]);
          })
          .then(function(array) {
            var base64 = array[0];
            var modalHiddenListenerOff = array[1];
            modalHiddenListenerOff();
            return base64;
          });
      }

      return promise;
    }

    //====================================================
    //  Photo.post Usage
    //====================================================
    // Usage:
    //Photo.post(
    //  '/place',
    //  { files: ['dataUri:base64', 'dataUri:base64'],
    //    title: '포스트 이름',
    //    content: '냠냠냠'
    //  },
    //  POST
    //)
    //  Promise with with response from server:
    // Output usage:
    //promise
    //  .then(function(createdPlaceWrapper){
    //    console.log(createdPlaceWrapper.data);
    //  })
    //  .catch(function(err){
    //    $q.reject(err);
    //  })
    function post(url, form, method) {
      var form_copy = _.clone(form);
      var filesToSend = [];
      angular.forEach(form_copy.files, function(base64File) {
        if (base64File != null) {
          filesToSend.push(base64ToFile(base64File));
        }
      });
      delete form_copy.files;

      if (url[0] !== '/') {
        url = '/' + url;
      }

      var promise = Upload.upload({
        url: SERVER_URL + url,
        method: method || 'POST',
        file: filesToSend,
        fields: form_copy,
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise;

    } //end post

    function clean() {
      return $cordovaCamera.cleanup();
    }

    //====================================================
    //  HELPERS
    //====================================================

    function pickImage(width) {
      var deferred = $q.defer();
      $window.imagePicker.getPictures(function(results) {
        if (results.length === 0) {
          deferred.reject({
            message: 'cancelled'
          });
        } else {
          deferred.resolve(results[0]);
        }
      }, function(cancelled) {
        deferred.reject(cancelled);
      }, {
        maximumImagesCount: 1,
        width: width || 800,
        height: width || 800
      });
      return deferred.promise;
    }

    function base64ToFile(dataUris) {
      var byteString;
      var mimestring;
      if (dataUris.split(',')[0].indexOf('base64') !== -1) {
        byteString = $window.atob(dataUris.split(',')[1]);
      } else {
        byteString = decodeURI(dataUris.split(',')[1]);
      }
      mimestring = dataUris.split(',')[0].split(':')[1].split(';')[0];
      console.log(mimestring);
      var content = [];
      for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i);
      }
      return new $window.Blob([new $window.Uint8Array(content)], {
        type: mimestring
      });
    }
  } // End
})(angular);

// Preload photos no longer used. use before enter init() and after enter bind approach;
// Preload.assets are used in app.js to load everything when app starts, automatically done
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('Preload', Preload);

  Preload.$inject = [
    '$q', '$filter', '$window'
  ];

  function Preload(
    $q, $filter, $window
  ) {

    var _ = $window._;

    var service = {
      photos: photos,
      assets: assets
    };

    return service;

    //====================================================
    //  Implementation
    //====================================================
    function photos(arrayOfObjsWithPhotosArray, cloudinaryFilterName, onlyFirstOnesBool, neverMind) {
      if (neverMind) {
        return [];
      }
      var urls = getPhotos(arrayOfObjsWithPhotosArray, cloudinaryFilterName, onlyFirstOnesBool);
      var promises = [];
      angular.forEach(urls, function(url) {
        var deferred = $q.defer();
        var img = new $window.Image();
        img.onload = onImageLoad(deferred);
        img.onerror = onImageError(deferred, url);
        promises.push(deferred.promise);
        img.src = url;
      });
      return $q.all(promises);
    }

    function assets(fileUrls) {
      var promises = [];
      // var images = [];
      angular.forEach(fileUrls, function(url) {
        var deferred = $q.defer();
        var img = new $window.Image();
        img.onload = onImageLoad(deferred);
        img.onerror = onImageError(deferred, url);
        promises.push(deferred.promise);
        img.src = url;
        // images.push(img);
      });
      return $q.all(promises);
    }

    //====================================================
    //  Helper
    //====================================================
    function onImageLoad(deferred) {
      return function() {
        deferred.resolve();
      };
    }

    function onImageError(deferred, url) {
      return function() {
        deferred.reject(url);
      };
    }

    function getPhotos(posts, cloudinaryFilterName, onlyFirstOnesBool) {
      var preProcessedUrls = [];
      // make it work for single object
      if (!Array.isArray(posts)) {
        posts = [posts];
      }
      var arrayOfUrls = _.pluck(posts, 'photos');
      angular.forEach(arrayOfUrls, function(photos) {
        var urls = _.pluck(photos, 'url');
        if (onlyFirstOnesBool) {
          var first = urls[0];
          urls = [first];
        }
        preProcessedUrls = preProcessedUrls.concat(urls);
      });
      var urls = _.map(preProcessedUrls, function(url) {
        return $filter(cloudinaryFilterName)(url);
      });
      urls = _.filter(urls, function(url) {
        return url != null;
      });
      return urls;
    }

  } // Service END
})(angular);

// Implements latest version of phonegap-push-plugin
(function() {
  'use strict';

  angular.module('applicat.push.service', ['ngCordova'])
    .service('PushService', PushService);

  PushService.$inject = [
    '$http', '$log', '$q', '$cordovaDialogs', '$window',
    '$timeout', '$rootScope', '$cordovaMedia',
    'GOOGLE_PROJECT_NUMBER', 'SERVER_URL'
  ];

  function PushService(
    $http, $log, $q, $cordovaDialogs, $window,
    $timeout, $rootScope, $cordovaMedia,
    GOOGLE_PROJECT_NUMBER, SERVER_URL
  ) {
    var deviceId = null;

    this.registerDevice = registerDevice;
    // maybe devideId is used outside of this service, or not...
    this.getDeviceId = function() {
      return deviceId;
    };

    //====================================================
    //  Implementation
    //====================================================
    function registerDevice() {
      var push = $window.PushNotification.init({
        android: {
          "senderID": GOOGLE_PROJECT_NUMBER,
          "icon": "pushicon"
        },
        ios: {
          "badge": true,
          "sound": "true",
          "alert": "true"
        }
      });

      if (ionic.Platform.isIOS()) {
        push.getApplicationIconBadgeNumber(function(n) {
          push.setApplicationIconBadgeNumber(function() {
            console.log('---- setApplicationBadegeNumber success with ' + n + ' ----');
          }, function() {
            console.log('----- setApplicationBadgeNumber error -----');
          }, n);
        }, function() {
          console.log('---- getBadgeNumber error ----');
        });
      }

      push.on('registration', function(result) {
        if (ionic.Platform.isIOS()) {
          storeDeviceToken(result.registrationId, 'IOS');
        } else if (ionic.Platform.isAndroid()) {
          storeDeviceToken(result.registrationId, 'ANDROID');
        }
      });

      push.on('notification', function(notification) {
        if (ionic.Platform.isAndroid()) {
          $window.plugin.notification.local.schedule({
            title: notification.title,
            text: notification.message,
            icon: "res://icon.png",
            smallIcon: "res://pushicon.png"
          });
        } else if (ionic.Platform.isIOS()) {
          handleIOS(notification);
        }
      });
    }

    //====================================================
    //  Helpers
    //====================================================
    function storeDeviceToken(deviceId, deviceType) {
      var registration = {
        deviceId: deviceId,
        platform: deviceType,
        active: true
      };
      return $http({
          url: SERVER_URL + '/device',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          data: registration
        })
        .then(function(dataWrapper) {
          $log.info("PushService - registered to server: " + JSON.stringify(dataWrapper));
          deviceId = dataWrapper.data.device.deviceId;
        })
        .catch(function(err) {
          $log.info("PushService - error: " + JSON.stringify(err));
        });
    }


    function handleIOS(notification) {
      // If foreground is not checked here it would make a sound twice,
      //once when received in background and once more upon opening it by clicking
      //the notification.
      if (notification.additionalData.foreground === true) {
        // Play custom audio if a sound specified.
        if (notification.sound) {
          var audio = $cordovaMedia.newMedia(notification.sound);
          audio.then(function(r) {
            console.log('success');
            console.log(r);
            $timeout(function() {
              audio.play();
            }, 500);
          }, function(r) {
            console.log('error');
            console.log(r);
          });
        }
        $cordovaDialogs.alert(notification.title, notification.message);
      } else {
        $cordovaDialogs.alert(notification.title, notification.message);
      }
    }
  }
})();

// Description: Extends $rootScope with custom functions;

// Usage;
// In app.js
// .run(['$rootScope', 'RootScope', function ($rootScope, RootScope){
//   angular.extend($rootScope, RootScope);
// }])
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('RootScope', RootScope);

  RootScope.$inject = [
    '$state', '$stateParams', '$ionicHistory', '$ionicSideMenuDelegate', '$timeout',
    '$rootScope', '$ionicViewSwitcher', '$ionicModal', '$ionicScrollDelegate',
    'Message', 'AppStorage', 'Favorite',
    'DEV_MODE'
  ];

  function RootScope(
    $state, $stateParams, $ionicHistory, $ionicSideMenuDelegate, $timeout,
    $rootScope, $ionicViewSwitcher, $ionicModal, $ionicScrollDelegate,
    Message, AppStorage, Favorite,
    DEV_MODE
  ) {
    var service = {
      AppStorage: AppStorage,
      $state: $state,
      $stateParams: $stateParams,
      isState: isState,
      areStates: areStates,
      getState: getState,
      isParam: isParam,
      hasParam: hasParam,
      getParam: getParam,
      goToState: goToState,
      goBack: goBack,
      logout: logout,
      loading: loading,
      toggleSideMenu: toggleSideMenu,
      closeSideMenu: closeSideMenu,
      comingSoon: comingSoon,
      DEV_MODE: DEV_MODE,

      likePost: Favorite.likePost,
      likePlace: Favorite.likePlace
    };

    return service;

    function logout(state) {
      angular.copy({ isFirstTime: false }, AppStorage);
      goToState(state, null, 'back');
    }

    function isState(state) {
      return state === $ionicHistory.currentStateName();
    }

    function areStates(states) {
      return states.indexOf($ionicHistory.currentStateName()) !== -1;
    }

    function getState() {
      return $ionicHistory.currentStateName();
    }
    //====================================================
    //  $rootScope.isParam({id: '123', category: ''}) >> true | false
    //====================================================
    function isParam(paramObj) {
      for (var key in paramObj) {
        if ($state.params[key] !== paramObj[key]) {
          return false;
        }
      }
      return true;
    }

    function hasParam(paramKey) {

      if ($state.params[paramKey] !== '') {
        return true;
      } else {
        return false;
      }
    }
    //====================================================
    // $rootScope.getParam(category)  >> $stateParams[category]
    //====================================================
    function getParam(key) {
      return $state.params[key];
    }
    //====================================================
    //  $rootScope.goToState('Main.Home', {category: 'apple', theme: 'drink'}, 'forward | back')
    //====================================================
    function goToState(state, params, direction, Model) {
      Message.hide();
      if (Model) { //if model remember scrollpostion and save
        if (Model.handle) {
          Model.scrollPosition = $ionicScrollDelegate.$getByHandle(Model.handle).getScrollPosition().top;
        } else {
          console.log("---- 'no handle specified in CtrlAs.Model' root ----");
        }
      }
      $timeout(function() {
        if (direction) {
          $ionicViewSwitcher.nextDirection(direction);
        }
        $state.go(state, params);
        $ionicSideMenuDelegate.toggleLeft(false);
      }, 0);
    }
    //====================================================
    //  $rootScope.goBack();
    //====================================================
    function goBack(direction) {
      Message.hide();
      if (direction) {
        $ionicViewSwitcher.nextDirection(direction);
      }
      $ionicHistory.goBack();
    }
    //====================================================
    //  $rootScope.loading();
    //====================================================
    function loading() {
      Message.loading();
      $timeout(function() {
        Message.hide();
      }, 5000);
    }
    //====================================================
    //  $rootScope.closeSideMenu();
    //====================================================
    function closeSideMenu() {
      $ionicSideMenuDelegate.toggleLeft(false);
    }
    //====================================================
    //  $rootScope.toggleSideMenu();
    //====================================================
    function toggleSideMenu() {
      // if (requireLoggedIn) {
      //   if (!AppStorage.token) {
      //     return Message.alert('둘러보기 알림', '로그인을 하셔야 볼수있는 내용입니다.');
      //   }
      // }
      $ionicSideMenuDelegate.toggleLeft();
    }
    //====================================================
    //  $rootScope.comingSoon();
    //====================================================
    function comingSoon(title) {
      return Message.alert(title + ' 준비중인 서비스입니다.', '빠른시일내에 준비완료하겠습니다.');
    }


  } //end
})(angular);

// Twitter example
(function() {
  'use strict';

  angular.module('app')
    .factory('Twitter', Twitter);

  Twitter.$inject = [
    '$cordovaOauth', '$cordovaOauthUtility', '$http', '$reource', '$q', '$window'
  ];

  function Twitter(
    $cordovaOauth, $cordovaOauthUtility, $http, $resource, $q, $window
  ) {
    // 1
    var twitterKey = "STORAGE.TWITTER.KEY";
    var clientId = 'TwitterAppConsumerKey';
    var clientSecret = 'TwitterAppConsumerSecret';

    // 2
    function storeUserToken(data) {
      $window.localStorage.setItem(twitterKey, JSON.stringify(data));
    }

    function getStoredToken() {
      return $window.localStorage.getItem(twitterKey);
    }

    // 3
    function createTwitterSignature(method, url) {
      var token = angular.fromJson(getStoredToken());
      var oauthObject = {
        oauth_consumer_key: clientId,
        oauth_nonce: $cordovaOauthUtility.createNonce(10),
        oauth_signature_method: "HMAC-SHA1",
        oauth_token: token.oauth_token,
        oauth_timestamp: Math.round((new Date()).getTime() / 1000.0),
        oauth_version: "1.0"
      };
      var signatureObj = $cordovaOauthUtility.createSignature(method, url, oauthObject, {}, clientSecret, token.oauth_token_secret);
      $http.defaults.headers.common.Authorization = signatureObj.authorization_header;
    }

    return {
      // 4
      initialize: function() {
        var deferred = $q.defer();
        var token = getStoredToken();

        if (token !== null) {
          deferred.resolve(true);
        } else {
          $cordovaOauth.twitter(clientId, clientSecret).then(function(result) {
            storeUserToken(result);
            deferred.resolve(true);
          }, function(error) {
            deferred.reject(false);
          });
        }
        return deferred.promise;
      },
      // 5
      isAuthenticated: function() {
        return getStoredToken() !== null;
      },
      // 6
      getHomeTimeline: function() {
        var home_tl_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
        createTwitterSignature('GET', home_tl_url);
        return $resource(home_tl_url).query();
      },
      storeUserToken: storeUserToken,
      getStoredToken: getStoredToken,
      createTwitterSignature: createTwitterSignature
    };
  }
})();

// Utility
(function(angular) {
  'use strict';

  angular.module('app')
    .factory('U', U);

  U.$inject = [
    '$ionicHistory', '$ionicScrollDelegate', '$timeout', '$filter', '$window', '$rootScope',
    '$ionicSideMenuDelegate', '$state', '$ionicViewSwitcher', '$ionicSlideBoxDelegate',
    'Message', 'RootScope', 'Dom'
  ];

  function U(
    $ionicHistory, $ionicScrollDelegate, $timeout, $filter, $window, $rootScope,
    $ionicSideMenuDelegate, $state, $ionicViewSwitcher, $ionicSlideBoxDelegate,
    Message, RootScope, Dom
  ) {

    var _ = $window._;
    var service = {
      isForwardView: isForwardView,
      isBackView: isBackView,
      isSiblingView: isSiblingView,
      areSiblingViews: areSiblingViews,
      hasPreviousStates: hasPreviousStates,
      resize: resize,
      update: update,
      resetSlides: resetSlides,
      error: error,
      bindData: bindData,
      appendData: appendData,
      broadcast: broadcast,
      top: top,
      scrollTo: scrollTo,
      freeze: freeze,
      loading: loading
    };

    _.defaults(service, RootScope);

    return service;

    // Within Parent State Stack
    function isForwardView(stateName) {
      if ($ionicHistory.viewHistory().forwardView) {
        return $ionicHistory.viewHistory().forwardView.stateName === stateName;
      } else {
        return false;
      }
    }

    // Within Parent State Stack
    function isBackView(stateName) {
      if ($ionicHistory.viewHistory().backView) {
        return $ionicHistory.viewHistory().backView.stateName === stateName;
      } else {
        return false;
      }
    }

    // Within Parent State Stack
    function isSiblingView(stateName) {
      return isForwardView(stateName) || isBackView(stateName);
    }

    // Within Parent State Stack
    function areSiblingViews(stateNames) {
      var i;
      var stateName;
      for (i = 0; i < stateNames.length; i++) {
        stateName = stateNames[i];
        if (isSiblingView(stateName)) {
          return true;
        }
      }
      return false;
    }

    // Absolute previous State. Within or Without parent stack.
    function hasPreviousStates(stateNames) {
      if (stateNames.length === 0) {
        return false;
      }
      var currentViewId = $ionicHistory.currentView().viewId.split('ion').pop();
      var prevViewId = Number(currentViewId) - 1;
      var prevViewKey = 'ion' + prevViewId;
      var prevStateName = $ionicHistory.viewHistory().views[prevViewKey] &&
        $ionicHistory.viewHistory().views[prevViewKey].stateName;
      var hasPrevView = _.indexOf(stateNames, prevStateName) !== -1;
      var hasSiblingView = areSiblingViews(stateNames);
      if (hasPrevView) {
        return true;
      } else if (hasSiblingView) {
        return true;
      }
      return false;
    }

    // update content scroll
    function resize() {
      $timeout(function() {
        $ionicScrollDelegate.resize();
      }, 0);
    }

    // update slidebox
    function update() {
      $timeout(function() {
        $ionicSlideBoxDelegate.update();
      }, 0);
    }

    // fix bug where prev slide number persist
    function resetSlides() {
      $ionicSlideBoxDelegate.slide(0, 0);
      $ionicSlideBoxDelegate.update();
    }

    function error(err) {
      console.log(err);
      freeze(false);
      if (err.data && err.data.invalidAttributes && err.data.invalidAttributes.username) {
        return Message.alert('회원가입 알림', '이미 존제하는 이메일입니다. 다른이메일을 입력해주세요.')
          .then(function() {
            Dom.focusById('email');
          });
      } else if (err.data && err.data.invalidAttributes && err.data.invalidAttributes.email) {
        return Message.alert('회원가입 알림', '이미 존제하는 이메일입니다. 다른이메일을 입력해주세요.')
          .then(function() {
            Dom.focusById('email');
          });
      }
      return Message.alert();
    }

    function bindData(data, model, name, emitEventTrue, loadingModel) {
      $timeout(function() {
        // if data is a dataArrayWrapper
        if (name[name.length - 1] === 's') {
          model[name] = data[name];
          model.more = data.more;
        } else {
          // if data is a dataObject 
          model[name] = data;
        }
        if (!loadingModel) {
          model.loading = false;
        } else {
          loadingModel.loading = false;
        }
        freeze(false);
        update();
        resize();
        if (emitEventTrue) {
          $rootScope.$broadcast('$rootScope:bindDataComplete');
        }
      }, 0);
    }

    function appendData(dataWrapper, model, name, emitEventTrue) {
      $timeout(function() {
        if (name[name.length - 1] === 's') {
          angular.forEach(dataWrapper[name], function(item) {
            model[name].push(item);
          });
          model.more = dataWrapper.more;
          freeze(false);
          resize();
          if (emitEventTrue) {
            $rootScope.$broadcast('$rootScope:appendDataComplete');
          }
        } else {
          // if data is a data
          console.error('no dataArrayWrapper.dataArray perhaps dataWrapper is dataObject.');
        }
      }, 0);
    }

    function broadcast($scope) {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    function top() {
      $ionicScrollDelegate.scrollTop(false);
    }

    function scrollTo(Model) {
      if (Model) {
        if (Model.scrollPosition === undefined) {
          console.log('no scollPosition specified in CtrlAs.Model -- U.scrollTo');
        }
        if (Model.handle) {
          $ionicScrollDelegate.$getByHandle(Model.handle).scrollTo(undefined, Model.scrollPosition, false);
        } else {
          console.log('no handle specified in CtrlAs.Model -- U.scrollTo');
        }
      } else {
        console.log('no CtrlAs.Model specified -- U.scrollTo');
      }
    }

    function freeze(shouldFreezeTrue) {
      // $ionicScrollDelegate.freezeScroll(shouldFreezeTrue);
      $ionicScrollDelegate.freezeScroll(shouldFreezeTrue);
    }

    function loading(Model) {
      Model.loading = true;
      top();
      freeze(true);
    }


  } // Service END
})(angular);

// Calls a specified function when enter is pressed on input
// Usage
// <input ng-enter="vm.myFunction()"></input>
(function(angular) {
  'use strict';
  angular.module('app')
    .directive('ngEnter', ngEnter);

  ngEnter.$inject = ['$window'];

  function ngEnter($window) {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          if ($window.cordova) {
            $window.cordova.plugins.Keyboard.close();
          }
          event.preventDefault();
        }
      });
    };
  }
})(angular);

//====================================================
//  Usage
//====================================================
// wait for ng repat to finish 'ngRepeatFinished' event emitted to controller
(function(angular) {
  'use strict';

  angular.module('app')
    .directive('onFinishRender', onFinishRender);

  onFinishRender.$inject = ['$timeout'];

  function onFinishRender($timeout) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope) {
      if (scope.$last === true) {
        $timeout(function() {
          scope.$emit('ngRepeatFinished');
        });
      }
    }
  }
})(angular);

//====================================================
//  Usage
//====================================================
// Set by default in index.html
// make device width in pixels available globally
(function(angular) {
  'use strict';

  angular.module('app')
    .directive('pgh', pgh)
    .directive('pgha', pgha)
    .directive('pghb', pghb)
    .directive('pghc', pghc)
    .directive('pghd', pghd);

  pgh.$inject = ['$rootScope', '$window', '$timeout'];

  function pgh($rootScope, $window, $timeout) {
    return {
      link: link
    };

    function link(scope, element) {
      scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
          $rootScope.pgh = element.prop('offsetHeight');
        }, 0);
      });

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.pgh = element.prop('offsetHeight');
        });
      });
    }
  }

  pgha.$inject = ['$rootScope', '$window', '$timeout'];

  function pgha($rootScope, $window, $timeout) {
    return {
      link: link
    };

    function link(scope, element) {
      scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
          $rootScope.pgha = element.prop('offsetHeight');
        }, 0);
      });

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.pgha = element.prop('offsetHeight');
        });
      });
    }
  }

  pghb.$inject = ['$rootScope', '$window', '$timeout'];

  function pghb($rootScope, $window, $timeout) {
    return {
      link: link
    };

    function link(scope, element) {
      scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
          $rootScope.pghb = element.prop('offsetHeight');
        }, 0);
      });

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.pghb = element.prop('offsetHeight');
        });
      });
    }
  }

  pghc.$inject = ['$rootScope', '$window', '$timeout'];

  function pghc($rootScope, $window, $timeout) {
    return {
      link: link
    };

    function link(scope, element) {
      scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
          $rootScope.pghc = element.prop('offsetHeight');
        }, 0);
      });

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.pghc = element.prop('offsetHeight');
        });
      });
    }
  }

  pghd.$inject = ['$rootScope', '$window', '$timeout'];

  function pghd($rootScope, $window, $timeout) {
    return {
      link: link
    };

    function link(scope, element) {
      scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
          $rootScope.pghd = element.prop('offsetHeight');
        }, 0);
      });

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.pghd = element.prop('offsetHeight');
        });
      });
    }
  }

})(angular);

//====================================================
//  Usage
//====================================================
// ion-scroll[direction="x" parent-scroll]

// Fixes the case where parent veritcal scrolling(eg ion-content scroll) is disabled on area where ion-scroll is located.
(function(angular) {
  'use strict';

  angular.module('app')
    .directive('parentScroll', parentScroll);

  parentScroll.$inject = ['$ionicScrollDelegate', '$timeout', '$window', '$document'];

  function parentScroll($ionicScrollDelegate, $timeout, $window, $document) {
    return {
      scope: true,
      restrict: 'A',
      compile: compile
    };

    function compile(element, attr) {

      if (!$window.horizontalIonScrollCount) {
        $window.horizontalIonScrollCount = 0;
      }

      $window.horizontalIonScrollCount++;
      attr.delegateHandle = "horizontal" + $window.horizontalIonScrollCount;

      return function(scope, element, attr) {
        $timeout(function() {
          var horizontal = attr.delegateHandle;
          var sv = $ionicScrollDelegate.$getByHandle(horizontal).getScrollView();

          var container = sv.__container;

          var originaltouchStart = sv.touchStart;
          var originalmouseDown = sv.mouseDown;
          var originaltouchMove = sv.touchMove;
          var originalmouseMove = sv.mouseMove;

          container.removeEventListener('touchstart', sv.touchStart);
          container.removeEventListener('mousedown', sv.mouseDown);
          $document.removeEventListener('touchmove', sv.touchMove);
          $document.removeEventListener('mousemove', sv.mousemove);


          sv.touchStart = function(e) {
            e.preventDefault = function() {};
            originaltouchStart.apply(sv, [e]);
          };

          sv.touchMove = function(e) {
            e.preventDefault = function() {};
            originaltouchMove.apply(sv, [e]);
          };

          sv.mouseDown = function(e) {
            e.preventDefault = function() {};

            if (originalmouseDown) {
              originalmouseDown.apply(sv, [e]);
            }

          };


          sv.mouseMove = function(e) {
            e.preventDefault = function() {};

            if (originalmouseMove) {
              originalmouseMove.apply(sv, [e]);
            }

          };

          container.addEventListener("touchstart", sv.touchStart, false);
          container.addEventListener("mousedown", sv.mouseDown, false);
          $document.addEventListener("touchmove", sv.touchMove, false);
          $document.addEventListener("mousemove", sv.mouseMove, false);
        });

      };
    }
  }
})(angular);

//====================================================
//  Usage
//====================================================
// <div class="h300px w100p"
//   static-daum-map
//   marker-src="img/map_04.png"
//   marker-width="40"
//   marker-height="22"
//   longitude="{{PlaceDetail.Model.place.geoJSON.coordinates[0]}}"
//   latitude="{{PlaceDetail.Model.place.geoJSON.coordinates[1]}}"
// >
// </div>
//====================================================
//  Dependencies
//====================================================
// daum map api in www/index.html;
// <script src="http://apis.daum.net/maps/maps3.js?apikey=1d77329135df78c95c219758f5fdddfb&libraries=services"></script>


(function(angular) {
  'use strict';

  angular.module('app')
    .directive('staticDaumMap', staticDaumMap);

  staticDaumMap.$inject = ['$timeout', '$window'];

  function staticDaumMap($timeout, $window) {
    var daum = $window.daum;
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      var DOM = element[0];
      // static daum map does not allow marker image to be set.
      // disabled class is added to normal daumMap to disable all touch events
      element.addClass('disabled' /*30_touched.scss*/ );
      scope.$on('$rootScope:bindDataComplete', function() {
        var markerSize = new daum.maps.Size(Number(attrs.markerWidth), Number(attrs.markerHeight));
        var markerImg = new daum.maps.MarkerImage(attrs.markerSrc, markerSize);
        var placePosition = new daum.maps.LatLng(Number(attrs.latitude), Number(attrs.longitude));
        var marker = new daum.maps.Marker({
          position: placePosition,
          image: markerImg
        });
        var staticMapOption = {
          center: placePosition,
          level: 4
        };
        $timeout(function() {
          var map = new daum.maps.Map(DOM, staticMapOption);
          marker.setMap(map);
        }, 0);
      });
    }
  }

})(angular);

//====================================================
//  Usage
//====================================================
// Some element would not apply .activated class, this fixes it 
// div[touch]
// style in touched.scss

(function(angular) {
  'use strict';

  angular.module('app')
    .directive('touch', touch);

  touch.$inject = ['$timeout'];

  function touch($timeout) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element) {
      element.on('click', function() {
        element.addClass('touch');
        $timeout(function() {
          element.removeClass('touch');
        }, 50);

      });
    }
  }

})(angular);

//====================================================
//  Usage
//====================================================
// Set by default in index.html
// make device width in pixels available globally
(function(angular) {
  'use strict';

  angular.module('app')
    .directive('vw', vw);

  vw.$inject = ['$rootScope', '$window'];

  function vw($rootScope, $window) {
    return {
      link: link
    };

    function link(scope, element) {
      $rootScope.vw = element.prop('offsetWidth');

      $window.addEventListener('resize', function() {
        $rootScope.$apply(function() {
          $rootScope.vw = element.prop('offsetWidth');
        });
      });
    }
  }


})(angular);

//<p>{{input | AppText}}</p>
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('AppText', AppText);

  AppText.$inject = [];

  function AppText() {
    return function(input) {
      //====================================================
      //  Post
      //====================================================
      if (input === 'title') {
        return '제목';
      } else if (input === 'content') {
        return '내용';
      } else if (input === 'item0') {
        return '랭크1';
      } else if (input === 'item1') {
        return '랭크2';
      } else if (input === 'item2') {
        return '랭크3';
      } else if (input === 'item3') {
        return '랭크4';
      } else if (input === 'item4') {
        return '랭크5';
      } else if (input === 'item5') {
        return '랭크6';
      } else if (input === 'item6') {
        return '랭크7';
      } else if (input === 'item7') {
        return '랭크8';
      } else if (input === 'item8') {
        return '랭크9';
      } else if (input === 'item9') {
        return '랭크10';

        //====================================================
        //  Field
        //====================================================
      } else if (input === 'likes') { //common Field, Club, Ball
        return '좋아요';
      } else if (input === 'location1') {
        return '지역1';
      } else if (input === 'location2') {
        return '지역2';
      } else if (input === 'fullLocation') {
        return '주소';
      } else if (input === 'fieldName') {
        return '골프장';
      } else if (input === 'membershipType') {
        return '회원';
      } else if (input === 'holeNumber') {
        return '홀수';
      } else if (input === 'courseName') {
        return '코스';
      } else if (input === 'courseSize') {
        return '코스크기';
      } else if (input === 'greenFee') {
        return '그린비';
      } else if (input === 'cartFee') {
        return '카트비';
      } else if (input === 'caddieFee') {
        return '캐디비';
      } else if (input === 'fieldUrl') {
        return '홈페이지';
      } else if (input === 'contact') {
        return '연락처';

        //====================================================
        //  Club
        //====================================================
      } else if (input === 'modelName') { // common Club, Ball
        return '모델';
      } else if (input === 'clubBrand') {
        return '브랜드';
      } else if (input === 'clubType') {
        return '클럽종류';

        //====================================================
        // Ball 
        //====================================================
      } else if (input === 'ballBrand') {
        return '브랜드';
      } else if (input === 'ballType') {
        return '피스';
      } else if (input === 'owner') {
        return '작성자';
      } else if (input === 'createdAt') {
        return '작성일';
        //====================================================
        //  QuestionAnswer
        //====================================================
      } else if (input === 'question') {
        return '질문';
      } else if (input === 'score') {
        return '답변 점수';
      } else if (input === 'optionLabel') {
        return '답변';
        //====================================================
        //  User
        //====================================================
      } else if (input === 'username') {
        return '유저 아이디';
      } else if (input === 'email') {
        return '이메일';
      } else if (input === 'name') {
        return '이름';
      } else if (input === 'nickname') {
        return '별명';
      } else if (input === 'phone') {
        return '전화번호';
      } else if (input === 'gender') {
        return '성별';
      } else if (input === 'age') {
        return '나이';
      } else if (input === 'height') {
        return '키';
      } else if (input === 'weight') {
        return '몸무게';
      } else if (input === 'strength') {
        return '스트렝스';

        //====================================================
        // Category 
        //====================================================
      } else if (input === 'FIELD') {
        return '골프 장';
      } else if (input === 'CLUB') {
        return '골프 클럽';
      } else if (input === 'BALL') {
        return '골프 공';
      } else if (input === 'EVENT') {
        return '이벤트';
      } else if (input === 'RANK') {
        return '랭크';
      } else if (input === 'NOTICE') {
        return '공지';
      }
    };
  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .filter('Cloudinary800', CloudinaryFilter.bind(null, 800))
    .filter('Cloudinary750', CloudinaryFilter.bind(null, 750))
    .filter('Cloudinary700', CloudinaryFilter.bind(null, 700))
    .filter('Cloudinary650', CloudinaryFilter.bind(null, 650))
    .filter('Cloudinary600', CloudinaryFilter.bind(null, 600))
    .filter('Cloudinary550', CloudinaryFilter.bind(null, 550))
    .filter('Cloudinary500', CloudinaryFilter.bind(null, 500))
    .filter('Cloudinary450', CloudinaryFilter.bind(null, 450))
    .filter('Cloudinary400', CloudinaryFilter.bind(null, 400))
    .filter('Cloudinary350', CloudinaryFilter.bind(null, 350))
    .filter('Cloudinary300', CloudinaryFilter.bind(null, 300))
    .filter('Cloudinary250', CloudinaryFilter.bind(null, 250))
    .filter('Cloudinary200', CloudinaryFilter.bind(null, 200))
    .filter('Cloudinary150', CloudinaryFilter.bind(null, 150))
    .filter('Cloudinary100', CloudinaryFilter.bind(null, 100))
    .filter('Cloudinary50', CloudinaryFilter.bind(null, 50));

  function CloudinaryFilter(size) {
    var matching = /upload/;
    return function(input) {
      if (input) {
        var index = input.search(matching);
        if (index !== -1) {
          return input.substring(0, index) + 'upload/c_scale,w_' + size + '/' + input.substring(input.lastIndexOf('/'));
        } else {
          return input;
        }
      } else if (input == null) {
        return null;
      } else {
        return input;
      }
    };
  }
})(angular);

//<p>{{post.owner | GetName}}</p>
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('GetName', GetName);

  GetName.$inject = [];

  function GetName() {
    return function(user) {
      if (user.name) {
        return user.name;
      } else if (user.nickname) {
        return user.nickname;
      } else if (user.username) {
        return user.username;
      } else if (user.fullname) {
        return user.fullname;
      } else {
        return 'UserX';
      }
    };
  }
})(angular);

// Input
// vm.openingHours = [{start: "07:00", end: "20:20"}, ..., {start: "08:00", end: "18:00"} ]

// Usage
// div{vm.openingHours | GroupByOpeningHours}

// Output
// ["월~목 07:00 ~ 20:20", "금~토 08:00 ~ 16:00", "일요일 휴무"]

(function(angular) {
  'use strict';

  angular.module('app')
    .filter('GroupByOpeningHours', GroupByOpeningHours);

  GroupByOpeningHours.$inject = ['$window'];

  function GroupByOpeningHours($window) {
    return filter;

    function filter(openingHours) {
      // append index to object
      if (!openingHours) {
        return ['업데이트 해주세요'];
      }
      openingHours = appendIndexToObj(openingHours);
      // group by same hours
      var grouped = groupByBusinessHours(openingHours);
      // create [{days: [0, 1], start: "08:00", end: "20:00"},...}
      var orderedResultArray = createArrayOfObjWithGroup(grouped);
      // create ["월 ~ 금" 08:00 ~ 03:00", "일요일 휴무"]
      var textArray = $window._.map(orderedResultArray, function(result) {
        // result = {days:[0,1], start: '', end: ''};
        result.days = $window._.map(result.days, function(day) {
          var daysKorean = parseDay(day);
          return daysKorean;
        });
        result.days = tildeArrayValuesToText(result.days);
        var apendTime = '';
        if (result.start === result.end) {
          apendTime = '휴무';
        } else {
          apendTime = result.start + ' ~ ' + result.end;
        }
        var texts = result.days + ' ' + apendTime;
        return texts;
      });

      return textArray;
    }


    function appendIndexToObj(openingHours) {
      for (var i = 0; i < openingHours.length; i++) {
        openingHours[i].index = i;
      }
      return openingHours;
    }

    function groupByBusinessHours(openingHours) {
      var grouped = $window._.groupBy(openingHours, function(hoursObj) {
        var start = hoursObj.start;
        var end = hoursObj.end;
        var groupCategory = start + end;
        return groupCategory;
      });
      return grouped;
    }

    function createArrayOfObjWithGroup(grouped) {
      // grouped = ['1212': [{start:'', end:'', index: 0}, ...]]
      // out = [{days:[0,1], start:'',  end:''}, ...]
      var keys = Object.keys(grouped);

      var resultArray = [];
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var subOpeningHoursArray = grouped[key];

        var daysResult = [];
        for (var j = 0; j < subOpeningHoursArray.length; j++) {
          var openingHourObj = subOpeningHoursArray[j];
          daysResult.push(openingHourObj.index);
        }

        var start = subOpeningHoursArray[0].start;
        var end = subOpeningHoursArray[0].end;

        resultArray.push({
          days: daysResult,
          start: start,
          end: end
        });
      }

      var orderedResultArray = $window._.sortBy(resultArray, function(obj) {
        var day = obj.days[0];
        if (day === 0) {
          day = 7;
        }
        return day;
      });

      return orderedResultArray;
    }

    function parseDay(day) {
      if (day === 0) {
        return '일';
      } else if (day === 1) {
        return '월';
      } else if (day === 2) {
        return '화';
      } else if (day === 3) {
        return '수';
      } else if (day === 4) {
        return '목';
      } else if (day === 5) {
        return '금';
      } else if (day === 6) {
        return '토';
      }
    }

    function tildeArrayValuesToText(array) {
      var daysInNumbers = $window._.map(array, function(dayInKorean) {
        if (dayInKorean === '일요일') {
          return 7;
        } else if (dayInKorean === '월') {
          return 1;
        } else if (dayInKorean === '화') {
          return 2;
        } else if (dayInKorean === '수') {
          return 3;
        } else if (dayInKorean === '목') {
          return 4;
        } else if (dayInKorean === '금') {
          return 5;
        } else if (dayInKorean === '토') {
          return 6;
        }
      });
      for (var i = 0; i < daysInNumbers.length - 1; i++) {
        var day_1 = daysInNumbers[i];
        var day_2 = daysInNumbers[i + 1];
        if (Math.abs(day_1 - day_2) > 1) {
          var concatStart = array[0];
          for (var j = 1; j < daysInNumbers.length; j++) {
            concatStart = concatStart + ', ' + array[j];
          }
          return concatStart;
        }
      }
      if (array.length > 2) {
        return array[0] + ' ~ ' + array[array.length - 1];
      } else if (array.length === 2) {
        return array[0] + ', ' + array[1];
      } else if (array.length === 1) {
        return array[0];
      }
    }
  }

})(angular);

//====================================================
//  Usage
//====================================================
// <p> {{diatanceInMeters | MeterToKilometer}} </p>
// if distance is bigger than 1000m it will convert it to km
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('MeterToKilometer', MeterToKilometer);

  MeterToKilometer.$inject = [];

  function MeterToKilometer() {
    return function(input) {
      if (input >= 1000) {
        return (input / 1000).toFixed(2) + ' km';
      } else if (input === undefined) {
        return '0 m';
      } else {
        return input + ' m';
      }
    };
  }
})(angular);

//<p>{{input | PropertyDisplay}}</p>
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('PropertyDisplay', PropertyDisplay);

  PropertyDisplay.$inject = ['$filter'];

  function PropertyDisplay($filter) {
    return function(input, propertyName) {
      //====================================================
      //  Product
      //====================================================
      if (propertyName === 'owner') {
        return input.name || input.nickname || input.username;
      } else if (propertyName === 'createdAt') {
        return $filter('date')(input, 'yyyy.MM.dd HH:mm');
      } else if (propertyName === 'item0') {
        return input && input.title;
      } else if (propertyName === 'item1') {
        return input && input.title;
      } else if (propertyName === 'item2') {
        return input && input.title;
      } else if (propertyName === 'item3') {
        return input && input.title;
      } else if (propertyName === 'item4') {
        return input && input.title;
      } else if (propertyName === 'item5') {
        return input && input.title;
      } else if (propertyName === 'item6') {
        return input && input.title;
      } else if (propertyName === 'item7') {
        return input && input.title;
      } else if (propertyName === 'item8') {
        return input && input.title;
      } else if (propertyName === 'item9') {
        return input && input.title;
        //====================================================
        //  Question Answer
        //====================================================
      } else if (propertyName === 'question') {
        return input && input.title;


      } else {
        return input;
      }
    };
  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Comments', Comments);

  Comments.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function Comments(
    $resource,
    SERVER_URL, Photo
  ) {

    var commentUrl = SERVER_URL + '/comment' +
      '/:find' +
      '/:findOne' +
      // '/:create' +
      // '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      // create: '@create',
      // update: '@update',
      destroy: '@destroy'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      // create: {
      //   method: 'POST',
      //   params: {
      //     create: 'create'
      //   }
      // },
      // update: {
      //   method: 'PUT',
      //   params: {
      //     update: 'update'
      //   }
      // },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    // (param: null, body: {files: base64[], query: {property: any})
    //=> Promise
    function create(param, body) {
      var photoPromise = Photo.post('/comment/create', body, 'POST');
      return {
        $promise: photoPromise
      };
    }

    // (param: null, body: {files: base64[], query: {property: any})
    //=> Promise
    function update(param, body) {
      var photoPromise = Photo.post('/comment/update', body, 'PUT');
      return {
        $promise: photoPromise
      };
    }


    var service = $resource(commentUrl, params, actions);
    service.create = create;
    service.update = update;

    return service;

  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Coupons', Coupons);

  Coupons.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Coupons(
    $resource,
    SERVER_URL
  ) {

    var couponUrl = SERVER_URL + '/coupon' +
      '/:find' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:updatePassword' +
      '/:use' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      updatePassword: '@updatePassword',
      use: '@use'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      create: {
        method: 'POST',
        params: {
          create: 'create'
        }
      },
      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },
      updatePassword: {
        method: 'PUT',
        params: {
          updatePassword: 'updatePassword'
        }
      },
      use: {
        method: 'PUT',
        params: {
          use: 'use'
        }
      },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(couponUrl, params, actions);

    return service;

  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Devices', Devices);

  Devices.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Devices(
    $resource,
    SERVER_URL
  ) {

    var postUrl = SERVER_URL + '/device' +
      '/:uri';

    var params = {
      uri: '@push'
    };

    var actions = {
      push: {
        method: 'GET',
        params: {
          uri: 'push'
        }
      }
    };

    var service = $resource(postUrl, params, actions);

    return service;


  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Events', Events);

  Events.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Events(
    $resource,
    SERVER_URL
  ) {

    var eventUrl = SERVER_URL + '/event' +
      '/:find' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy' +
      '/:like' +
      '/:unlike' +
      '/:findLikedEvents';

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      like: '@like',
      unlike: '@unlike',
      findLikedEvents: '@findLikedEvents'
    };

    var actions = {

      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },

      create: {
        method: 'POST',
        params: {
          create: 'create'
        }
      },

      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },

      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      },

      like: {
        method: 'POST',
        params: {
          like: 'like'
        }
      },

      unlike: {
        method: 'POST',
        params: {
          unlike: 'unlike'
        }
      },
      findLikedEvents: {
        method: 'GET',
        params: {
          findOne: 'findLikedEvents'
        }
      },
    };

    var service = $resource(eventUrl, params, actions);

    return service;

  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Places', Places);

  Places.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Places(
    $resource,
    SERVER_URL
  ) {

    var placeUrl = SERVER_URL + '/place' +
      '/:find' +
      '/:findLikedPlaces' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy' +
      '/:like' +

      '/:findNative' +
      '/:contactOwner';

    var params = {
      find: '@find',
      findLikedPlaces: '@findLikedPlaces',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      like: '@like',

      findNative: '@findNative',
      contactOwner: '@contactOwner'
    };

    var actions = {

      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },

      findLikedPlaces: {
        method: 'GET',
        params: {
          findLikedPlaces: 'findLikedPlaces'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },

      create: {
        method: 'POST',
        params: {
          create: 'create'
        }
      },

      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },

      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      },

      like: {
        method: 'POST',
        params: {
          like: 'like'
        }
      },

      // longitude, latitude, distance
      findNative: {
        method: 'GET',
        params: {
          findNative: 'findNative'
        }
      },

      contactOwner: {
        method: 'POST',
        params: {
          contactOwner: 'contactOwner'
        }
      }

    };

    var service = $resource(placeUrl, params, actions);

    return service;

  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Posts', Posts);

  Posts.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function Posts(
    $resource,
    SERVER_URL, Photo
  ) {

    var postUrl = SERVER_URL + '/post' +
      '/:find' +
      '/:findOne' +
      // '/:create' +
      // '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      // create: '@create',
      // update: '@update',
      destroy: '@destroy'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      // create: {
      //   method: 'POST',
      //   params: {
      //     create: 'create'
      //   }
      // },
      // update: {
      //   method: 'PUT',
      //   params: {
      //     update: 'update'
      //   }
      // },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(postUrl, params, actions);
    service.create = create;
    service.update = update;

    return service;

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function create(param, body) {
      var photoPromise = Photo.post('/post/create', body, 'POST');
      return {
        $promise: photoPromise
      };
    }

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function update(param, body) {
      var photoPromise = Photo.post('/post/update', body, 'PUT');
      return {
        $promise: photoPromise
      };
    }

  }
})(angular);
/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Products', Products);

  Products.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function Products(
    $resource,
    SERVER_URL, Photo
  ) {

    var productUrl = SERVER_URL + '/product' +
      '/:find' +
      '/:findOne' +
      // '/:create' +
      // '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      // create: '@create',
      // update: '@update',
      destroy: '@destroy'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      // create: {
      //   method: 'POST',
      //   params: {
      //     create: 'create'
      //   }
      // },
      // update: {
      //   method: 'PUT',
      //   params: {
      //     update: 'update'
      //   }
      // },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(productUrl, params, actions);
    service.create = create;
    service.update = update;

    return service;

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function create(param, body) {
      var photoPromise = Photo.post('/post/create', body, 'POST');
      return {
        $promise: photoPromise
      };
    }

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function update(param, body) {
      var photoPromise = Photo.post('/post/update', body, 'PUT');
      return {
        $promise: photoPromise
      };
    }

  }
})(angular);
/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('QuestionAnswers', QuestionAnswers);

  QuestionAnswers.$inject = [
    '$resource',
    'SERVER_URL', 'Photo'
  ];

  function QuestionAnswers(
    $resource,
    SERVER_URL, Photo
  ) {

    var postUrl = SERVER_URL + '/questionAnswer' +
      '/:find' +
      '/:findQuestionAnswer' +
      '/:findOne' +
      // '/:create' +
      // '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      // create: '@create',
      // update: '@update',
      destroy: '@destroy'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },

      findQuestionAnswer: {
        method: 'GET',
        params: {
          findQuestionAnswer: 'findQuestionAnswer'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      // create: {
      //   method: 'POST',
      //   params: {
      //     create: 'create'
      //   }
      // },
      // update: {
      //   method: 'PUT',
      //   params: {
      //     update: 'update'
      //   }
      // },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(postUrl, params, actions);
    service.create = create;
    service.update = update;

    return service;

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function create(param, body) {
      var photoPromise = Photo.post('/post/create', body, 'POST');
      return {
        $promise: photoPromise
      };
    }

    // (param: null, body: {files: base64[], query: {property: any}})
    //=> Promise
    function update(param, body) {
      var photoPromise = Photo.post('/post/update', body, 'PUT');
      return {
        $promise: photoPromise
      };
    }

  }
})(angular);
/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */

(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Users', Users);

  Users.$inject = [
    '$resource',
    'Photo',
    'SERVER_URL'
  ];

  function Users(
    $resource,
    Photo,
    SERVER_URL
  ) {

    var postUrl = SERVER_URL + '/user' +
      '/:uri' +
      '/:login' +
      '/:findOne' +
      '/:update' +
      '/:changePassword';

    var params = {
      uri: '@uri',
      login: '@login',
      findOne: '@findOne',
      update: '@update',
      changePassword: '@changePassword'
    };

    var actions = {
      login: {
        method: 'POST',
        params: {
          login: 'login'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },

      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },

      changePassword: {
        method: 'POST',
        params: {
          changePassword: 'changePassword'
        }
      },

      find: {
        method: 'GET',
        params: {
          uri: 'find'
        }
      }

    };

    var service = $resource(postUrl, params, actions);

    service.register = register;
    service.updateMyPageBg = updateMyPageBg;
    service.update = update;

    return service;

    function register(param, query) {
      console.log("---------- Users.register Service Query ----------");
      console.log(query);
      var promise = Photo.post('/user/register', query, 'POST')
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
      return {
        $promise: promise
      };
    }

    function updateMyPageBg(param, query) {
      var promise = Photo.post('/user/updateMyPageBg', query, 'PUT')
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
      return {
        $promise: promise
      };
    }

    function update(param, query) {
      var promise = Photo.post('/user/update', query, 'PUT')
        .then(function(dataWrapper) {
          return dataWrapper;
        });
      return {
        $promise: promise
      };
    }

  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = [
    '$scope', '$state', '$ionicSideMenuDelegate', '$ionicModal',
    'MainModel', 'AppStorage'
  ];

  function MainController(
    $scope, $state, $ionicSideMenuDelegate, $ionicModal,
    MainModel, AppStorage
  ) {

    var Main = this;
    Main.Model = MainModel;

    Main.logout = logout;
    //====================================================
    //  Implementation
    //====================================================
    function logout(stateAfterLogout) {
      AppStorage = {
        isFirstTime: true
      };
      $ionicSideMenuDelegate.toggleLeft(false);
      $state.go(stateAfterLogout);
    }


  }
})(angular);

(function(angular) {
  'use strict';

  angular.module('app')
    .factory('MainModel', MainModel);

  MainModel.$inject = [];

  function MainModel() {

    var model = {};

    return model;
  }
})(angular);

(function() {
  'use strict';

  angular.module('app')
    .controller('DaumMapController', DaumMapController);

  DaumMapController.$inject = [
    'DaumMapModel', 'Message', 'U',
    '$ionicModal', '$scope', '$state', '$stateParams', '$timeout', '$window', '$rootScope'
  ];

  function DaumMapController(
    DaumMapModel, Message, U,
    $ionicModal, $scope, $state, $stateParams, $timeout, $window, $rootScope
  ) {

    var daum = $window.daum;
    var DaumMap = this;
    DaumMap.Model = DaumMapModel;
    var noLoadingStates = ['Main.PlaceDetail'];

    DaumMap.searchType = "address";
    DaumMap.goToState = goToState;



    DaumMap.findMeThenSearchNearBy = DaumMapModel.findMeThenSearchNearBy;
    DaumMap.searchLocationNearBy = DaumMapModel.searchLocationNearBy;
    $scope.$on('$ionicView.enter', onEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Implementation
    //====================================================
    function goToState(state, params) {
      DaumMapModel.modal.hide();
      $rootScope.goToState(state, params, 'forward');

    }

    function onEnter() {
      // if ($stateParams.id) {
      //   DaumMapModel.findPlaceByIdThenDrawAPlace($stateParams.id);
      // }
    }

    function onAfterEnter() {
      if(!U.areSiblingViews(noLoadingStates)){
        $timeout(function() {
          DaumMapModel.domMap.relayout();
        }, 20);
        var latitude;
        var longitude;
        if ($state.params.id) {
          DaumMapModel.findPlaceByIdThenDrawAPlace($stateParams.id);
        } else if (DaumMapModel.selectedPlace.geoJSON &&
          DaumMapModel.selectedPlace.geoJSON.coordinates) {
          latitude = DaumMapModel.selectedPlace.geoJSON.coordinates[1];
          longitude = DaumMapModel.selectedPlace.geoJSON.coordinates[0];
          DaumMapModel.domMap.panTo(new daum.maps.LatLng(latitude + 0.01, longitude + 0.01));
          DaumMapModel.domMap.panTo(new daum.maps.LatLng(latitude - 0.01, longitude - 0.01));
        }
      }
    }

    //====================================================
    //  Modals
    //====================================================
    $ionicModal.fromTemplateUrl('state/DaumMap/PlaceModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal) {
        DaumMapModel.modal = modal;
      });
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .directive('daumMap', daumMap);

  // Places or Posts
  daumMap.$inject = [
    '$state', '$cordovaGeolocation', '$q', '$stateParams', '$window',
    'DaumMapModel', 'Message', 'Places', 'U'
  ];

  function daumMap(
    $state, $cordovaGeolocation, $q, $stateParams, $window,
    DaumMapModel, Message, Places, U
  ) {

    var daum = $window.daum;

    return {
      scope: {
        markerSrc: '@',
        markerClickedSrc: '@',
        markerWidth: '@',
        markerHeight: '@',
      },
      compile: function(element) {
        //==========================================================================
        //              Global Map Property
        //==========================================================================
        var DOM = element[0];
        var latitude;
        var longitude;
        if (DaumMapModel.lastCenter && DaumMapModel.lastCenter.longitude) {
          latitude = DaumMapModel.lastCenter.latitude;
          longitude = DaumMapModel.lastCenter.longitude;
        } else {
          latitude = 37.5;
          longitude = 127;
        }
        var mapOptions = {
          center: new daum.maps.LatLng(latitude, longitude),
          level: 4,
          draggable: true
        };
        daum.maps.disableHD();
        var map = new daum.maps.Map(DOM, mapOptions);
        var ps = new daum.maps.services.Places();
        map.setCopyrightPosition(daum.maps.CopyrightPosition.BOTTOMRIGHT /*BOTTOMLEFT*/ , false);
        // var geocoder = new daum.maps.services.Geocoder();

        //====================================================
        //  IMPLEMENTATIONS COMPILE
        //====================================================
        // Draw Markers after query
        var drawMarkers = function(currentCenter, markerImg, markerClickedImg, scope) {
          resetMarkers();
          requestPlacesWithin(currentCenter)
            .then(processPin.bind(null, markerImg, markerClickedImg, scope))
            .catch(function error(err) {
              Message.hide();
              Message.alert();
              console.log(err);
            });
        };
        //====================================================
        //  HELPER
        //====================================================
        function resetMarkers() {
          angular.forEach(DaumMapModel.markers, function(marker) {
            marker.setMap(null);
          });
          DaumMapModel.markers = [];
        }

        function requestPlacesWithin(currentCenter) {
          // Request server for places;
          DaumMapModel.selectedPlace = {};
          var PlacesPromise = {};
          var query = {};
          if ($stateParams.id) { // if from place detail
            PlacesPromise = Places.findOne({
              query: {
                where: {
                  id: $stateParams.id
                },
                populate: ['photos']
              }
            }).$promise;
          } else {
            query = {
              query: {
                geoJSON: {
                  $near: {
                    $geometry: {
                      type: 'Point',
                      coordinates: [currentCenter.longitude, currentCenter.latitude, ]
                    },
                    $maxDistance: currentCenter.distance || 5000
                  }
                },
                category: $stateParams.category,
                limit: currentCenter.limit || 50,
                populate: ['photos']
              }
            };
            PlacesPromise = Places.findNative(query).$promise;
          }
          return PlacesPromise;
        }

        function processPin(markerImg, markerClickedImg, scope, placesWrapper) {
          if ($stateParams.id) {
            DaumMapModel.places = [placesWrapper];
          } else {
            DaumMapModel.places = placesWrapper.places;
          }
          console.log("---------- DaumMapModel.places ----------");
          console.log(DaumMapModel.places);
          angular.forEach(DaumMapModel.places, function(place, i) {
            //place = {location:{type:'Point', coordinates:[126.10101, 27.101010]}, ...}
            var placeLongitude = place.geoJSON.coordinates[0];
            var placeLatitude = place.geoJSON.coordinates[1];
            // set marker
            var position = new daum.maps.LatLng(placeLatitude, placeLongitude);
            var marker = new daum.maps.Marker({
              map: map,
              position: position,
              // used as to link to place info
              title: String(i),
              image: markerImg,
              clickable: true
            });
            daum.maps.event.addListener(marker, 'click', function() {
              var marker = this;
              scope.$apply(function() {
                // on click: differentiate clicked image;
                angular.forEach(DaumMapModel.markers, function(otherMarker) {
                  otherMarker.setImage(markerImg);
                });
                marker.setImage(markerClickedImg);
                // on click: show modal which will be filled with place info
                // modal references DaumMapModel.selectedPlace to fill in the info
                var index = Number(marker.getTitle());
                Message.loading();
                Places.findOne({
                    query: {
                      where: {
                        id: DaumMapModel.places[index].id,
                        populate: ['photos', 'createdBy']
                      }
                    }
                  }).$promise
                  .then(function(data) {
                    DaumMapModel.selectedPlace = data;
                    console.log("---------- DaumMapModel.selectedPlace ----------");
                    console.log(DaumMapModel.selectedPlace);
                    Message.hide();
                    DaumMapModel.modal.show();
                  })
                  .catch(function(err) {
                    console.log("---------- err ----------");
                    console.log(err);
                    Message.alert();
                  });
                DaumMapModel.selectedPlace = DaumMapModel.places[index];
              });
            });
            // Save converted place with click event added.
            DaumMapModel.markers.push(marker);
          });
          Message.hide();
        }

        //====================================================
        //  Functions Exposed to controller via DaumMapModel
        //====================================================
        DaumMapModel.findMeThenSearchNearBy = function(justFindAndDontSearch) {
          DaumMapModel.selectedPlace = {};
          Message.loading();
          $cordovaGeolocation.getCurrentPosition({
              maximumAge: 3000,
              timeout: 6000
            })
            .then(function(position) {
              Message.hide();
              if (position.coords == null) {
                Message.alert(
                  '위치 공유가 꺼져있습니다.',
                  '위치 공유를 켜주세요.'
                );
                return false;
              }
              DaumMapModel.currentPosition = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              };
              if (!justFindAndDontSearch) {
                map.setCenter(new daum.maps.LatLng(
                  DaumMapModel.currentPosition.latitude,
                  DaumMapModel.currentPosition.longitude
                ));
              }
              // drawMarkers(currentCenter);
            })
            .catch(function() {
              Message.hide();
              Message.alert(
                '위치 공유가 꺼져있습니다.',
                '위치 공유를 켜주세요.'
              );
            });
        };


        DaumMapModel.findPlaceByIdThenDrawAPlace = function(id) {
          DaumMapModel.selectedPlace = {};
          Message.loading();
          Places.findOne({
              query: {
                where: {
                  id: id
                },
                populate: ['photos']
              }
            }).$promise
            .then(function success(place) {
              //-------------------------------------------------------
              //  Hacky fix: when coming back to map if the map's center is the same as the
              // place we want to pane to, search does not get called. So make it wiggle a bit.
              //-------------------------------------------------------
              var currentCenter = {
                longitude: map.getCenter().getLng(),
                latitude: map.getCenter().getLat()
              };
              if (Math.abs(currentCenter.longitude - place.geoJSON.coordinates[1]) < 0.00001 && Math.abs(currentCenter.latitude - place.geoJSON.coordinates[0]) < 0.00001) {
                map.panTo(new daum.maps.LatLng(
                  currentCenter.longitude + 0.011,
                  currentCenter.latitude + 0.011
                ));
              }
              //------------------------
              //  Hacky fix ends;
              //------------------------
              map.panTo(new daum.maps.LatLng(
                place.geoJSON.coordinates[1],
                place.geoJSON.coordinates[0]
              ));
              Message.hide();
            })
            .catch(function error(err) {
              Message.hide();
              console.log(err);
            });
        };

        DaumMapModel.searchLocationNearBy = function(value) {
          DaumMapModel.selectedPlace = {};
          Message.loading();
          if (!value) {
            Message.hide();
            Message.alert('검색하기 알림', '장소 값을 넣어서 다시 검색해주세요');
            return false;
          }
          ps.keywordSearch(value, function(status, data) {
            if (data.places[0] === undefined) {
              Message.hide();
              Message.alert(
                '요청하신 장소가 없습니다',
                '다시검색해주세요'
              );
              return false;
            }
            // move to center of searched result.
            map.panTo(new daum.maps.LatLng(
              data.places[0].latitude,
              data.places[0].longitude
            ));
            // map's center is moved it will drawMarkers().
            Message.hide();
          }, function(err) {
            console.log(err);
            Message.hide();
            Message.alert({
              title: '위치 공유가 꺼져있습니다.',
              template: '위치 공유 켜주세요.'
            });
          });
        };

        return function link(scope) {
          // Marker style properties.
          var markerSize = new daum.maps.Size(Number(scope.markerWidth), Number(scope.markerHeight));
          var markerImg = new daum.maps.MarkerImage(scope.markerSrc, markerSize);
          var markerClickedImg = new daum.maps.MarkerImage(scope.markerClickedSrc, markerSize);
          map.relayout();
          DaumMapModel.domMap = map;
          // ------------------------
          //  Search when moved
          // ------------------------
          daum.maps.event.addListener(map, 'idle', function() {
            map.relayout();
            if ($window.cordova && !$window.cordova.plugins.Keyboard.isVisible) {
              Message.loading();
            }
            var currentCenter = {
              longitude: map.getCenter().getLng(),
              latitude: map.getCenter().getLat()
            };
            DaumMapModel.lastCenter = currentCenter;
            angular.extend(currentCenter, {
              distance: 5000,
              limit: 20
            });
            drawMarkers(currentCenter, markerImg, markerClickedImg, scope);
          });
        };
      }
    };
  }

})();

(function() {
  'use strict';
  angular.module('app')
    .factory('DaumMapModel', DaumMapModel);

  function DaumMapModel() {
    var model = {
      lastCenter: {
        longitude: null,
        latitude: null
      },
      markers: [],
      selectedPlace: {},
      currentPosition: {
        latitude: null,
        longitude: null
      },
      places: [],
      modal: {},
      findMeThenSearchNearBy: function() {},
      searchLocationNearBy: function() {},
      filterByEvent: false
    };

    return model;
  }
})();



(function() {
  'use strict';
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$q',
    'LoginModel', 'Users', 'U', 'Message',
    'FACEBOOK_KEY', 'TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET', 'GOOGLE_OAUTH_CLIENT_ID', 'AppStorage'
  ];

  function LoginController(
    $q,
    LoginModel, Users, U, Message,
    FACEBOOK_KEY, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, GOOGLE_OAUTH_CLIENT_ID, AppStorage
  ) {

    var Login = this;
    Login.Model = LoginModel;

    Login.localLogin = localLogin;

    //====================================================
    //  Implementation
    //====================================================
    function localLogin() {
      Message.loading();
      return userLogin()
        .then(function(userWrapper) {
          Message.hide();
          console.log("---------- userWrapper.user.roles ----------");
          var role = userWrapper.user.roles[0];
          if (role.name !== 'ADMIN') {
            return $q.reject({
              message: 'not admin'
            });
          }
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          AppStorage.isFirstTime = false;
          U.goToState('Main.Post.PostList', null, 'forward');
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          if (err.status === 403) {
            return Message.alert('로그인 알림', '비밀번호/이메일이 틀렸습니다. 다시 입력해주세요');
          } else if (err.message === 'not admin') {
            return Message.alert('로그인 알림', '어드민 유저만 로그인 할수 있습니다.');
          } else {
            return Message.alert();
          }
        });
    }

    //====================================================
    //  REST
    //====================================================
    function userLogin() {
      return Users.login({}, {
          identifier: LoginModel.form.identifier,
          password: LoginModel.form.password
        }).$promise
        .then(function(userWrapper) {
          return userWrapper;
        });
    }

  } //end
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('LoginModel', LoginModel);

  LoginModel.$inject = [];

  function LoginModel() {

    var model = {
      form: {
        identifier: null,
        password: null
      }
    };
    return model;

  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('AdsCreateController', AdsCreateController);

  AdsCreateController.$inject = [
    '$scope', '$q', '$timeout', '$window',
    'AdsCreateModel', 'U', 'Message', 'Upload',
    'SERVER_URL'
  ];

  function AdsCreateController(
    $scope, $q, $timeout, $window,
    AdsCreateModel, U, Message, Upload,
    SERVER_URL
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [];
    var AdsCreate = this;
    AdsCreate.Model = AdsCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    AdsCreate.createAds = createAds;
    AdsCreate.deselectPhoto = deselectPhoto;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(AdsCreateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(message) {
            console.log("---------- message ----------");
            console.log(message);
            U.freeze(false);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function createAds() {
      Message.loading();
      return adsCreate()
        .then(function(createdAds) {
          console.log("---------- createdAds ----------");
          console.log(createdAds);
          return Message.alert('글작성 알림', '글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          // U.goToState('Main.zAdsList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          reset();
        });
    }

    function deselectPhoto(photo, $index) {
      $timeout(function() {
        AdsCreateModel.post.files.splice($index, 1);
      }, 0);

    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.resolve({
        message: 'empty'
      });
    }

    function reset() {
      /* beautify preserve:start */
      AdsCreateModel.post = {
        category: 'ADS',
        title: '',
        content: '',
        files: [],
      };
      /* beautify preserve:end */
    }

    //====================================================
    //  REST
    //====================================================
    function adsCreate() {
      var files = _.clone(AdsCreateModel.post.files);
      delete AdsCreateModel.post.files;
      var promise = Upload.upload({
        url: SERVER_URL + '/post/create',
        method: 'POST',
        file: files,
        fields: {
          query: AdsCreateModel.post
        },
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise;
    }

    // function postCreate() {
    //   var queryWrapper = {
    //     query: {
    //       category: 'CATEGORY_NAME-POST',
    //       title: AdsCreateModel.form.title,
    //       content: AdsCreateModel.form.content,
    //     }
    //   };
    //   return Adss.create({}, queryWrapper).$promise
    //     .then(function(dataWrapper) {
    //       var post = dataWrapper.data;
    //       return post;
    //     });
    // }
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('AdsCreateModel', AdsCreateModel);

  AdsCreateModel.$inject = [

  ];

  function AdsCreateModel(

  ) {

    var Model = {
      /* beautify preserve:start */
      form: {
        category: 'ADS',
        title: '',
        content: '',
        files: []
      }
      /* beautify preserve:end */
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('PollCreateController', PollCreateController);

  PollCreateController.$inject = [
    '$scope', '$q', '$timeout', '$window',
    'PollCreateModel', 'U', 'Message', 'Upload',
    'SERVER_URL'
  ];

  function PollCreateController(
    $scope, $q, $timeout, $window,
    PollCreateModel, U, Message, Upload,
    SERVER_URL
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [];
    var PollCreate = this;
    PollCreate.Model = PollCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PollCreate.createPoll = createPoll;
    PollCreate.deselectPhoto = deselectPhoto;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PollCreateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(message) {
            U.freeze(false);
            console.log("---------- message ----------");
            console.log(message);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function createPoll() {
      Message.loading();
      return pollCreate()
        .then(function(createdPoll) {
          console.log("---------- createdPoll ----------");
          console.log(createdPoll);
          return Message.alert('투표작성 알림', '투표를 성공적으로 작성하였습니다.');
        })
        .then(function() {
          // U.goToState('Main.zPollList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          reset();
        });
    }

    function deselectPhoto(photo, $index) {
      if (Array.isArray(PollCreateModel.form.files)) {
        PollCreateModel.form.files.splice($index, 1);
      } else {
        $timeout(function() {
          delete PollCreateModel.form.files[photo];
        }, 0);
      }
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.resolve({
        message: 'empty'
      });
    }

    function reset() {
      var files;
      files = { /* item0, ..., item9 */ };
      /* beautify preserve:start */
      PollCreateModel.form = {
        title: '',
        content: '',
        description0: '',
        description1: '',
        files: files,
      };
      /* beautify preserve:end */
    }

    //====================================================
    //  REST
    //====================================================
    function pollCreate() {
      var files = _.clone(PollCreateModel.form.files);
      delete PollCreateModel.form.files;
      var promise = Upload.upload({
        url: SERVER_URL + '/poll/create',
        method: 'POST',
        file: files,
        fields: {
          query: PollCreateModel.form
        },
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise;
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('PollCreateModel', PollCreateModel);

  PollCreateModel.$inject = [

  ];

  function PollCreateModel(

  ) {

    var Model = {
      form: {
        title: '',
        content: '',
        description0: '',
        description1: '',
        files: {
          // photo0: null,
          // photo1: null,
        },
      }
    };

    return Model;
  }
})();



(function() {
  'use strict';
  angular.module('app')
    .controller('ProductCreateController', ProductCreateController);

  ProductCreateController.$inject = [
    '$scope', '$q', '$timeout', '$window', '$state',
    'ProductCreateModel', 'Products', 'U', 'Message', 'Upload',
    'SERVER_URL'
  ];

  function ProductCreateController(
    $scope, $q, $timeout, $window, $state,
    ProductCreateModel, Products, U, Message, Upload,
    SERVER_URL
  ) {
    var initPromise;
    var noLoadingStates = [];
    var ProductCreate = this;
    ProductCreate.Model = ProductCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    ProductCreate.createProduct = createProduct;
    ProductCreate.deselectPhoto = deselectPhoto;
    ProductCreate.removePhoto = removePhoto;
    ProductCreate.onFileSelect = onFileSelect;
    ProductCreate.resize = U.resize;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        // U.loading(ProductCreateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(message) {
            console.log("message :::\n", message);
            U.freeze(false);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function createProduct() {
      Message.loading();
      return productCreate()
        .then(function(createdProduct) {
          console.log("createdProduct :::\n", createdProduct);
          U.bindData(createdProduct, ProductCreateModel, 'product');
          return Message.alert('상품등록 알림', '상품등록을 성공적으로 하였습니다.');
        })
        .then(function() {
          return U.goToState('Main.Product.ProductList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function removePhoto(name) {
      if (name === 'photo') {
        $timeout(function() {
          delete ProductCreateModel.product.photo;
        }, 0);
      } else if (name === 'thumbnail') {
        delete ProductCreateModel.product.thumbnail;
      }
    }

    function deselectPhoto(photo) {
      $timeout(function() {
        delete ProductCreateModel.files[photo];
      }, 0);
    }

    function onFileSelect($event) {
      // remove product.photo or product.thumbnail
      if ($event.target.name === 'photo') {
        ProductCreateModel.product.photo = undefined;
      } else if ($event.target.name === 'thumbnail') {
        delete ProductCreateModel.product.thumbnail;
      }
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.resolve({ message: 'empty' });
    }

    function reset() {
      /* beautify preserve:start */
      ProductCreateModel.files = {};
      ProductCreateModel.product = {};
      /* beautify preserve:end */
    }

    //====================================================
    //  REST
    //====================================================

    function productCreate() {
      var promise = Upload.upload({
        url: SERVER_URL + '/product/createProduct',
        method: 'PUT',
        file: ProductCreateModel.files,
        fields: {
          query: ProductCreateModel.product
        },
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise
        .then(function(dataWrapper) {
          var createdProduct = dataWrapper.data;
          return createdProduct;
        });
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('ProductCreateModel', ProductCreateModel);

  ProductCreateModel.$inject = [

  ];

  function ProductCreateModel(

  ) {

    var Model = {
      product: {},
      files: {}
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('ProductListController', ProductListController);

  ProductListController.$inject = [
    '$scope', '$q', '$ionicPopover', '$window', '$ionicScrollDelegate',
    'ProductListModel', 'U', 'Products', 'Message'
  ];

  function ProductListController(
    $scope, $q, $ionicPopover, $window, $ionicScrollDelegate,
    ProductListModel, U, Products, Message
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [
      'Main.Product.ProductUpdate'
    ];
    var ProductList = this;
    ProductList.Model = ProductListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    // $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('popover.hidden', onPopoverHidden);

    ProductList.refresh = refresh;
    ProductList.loadMore = loadMore;
    ProductList.showCategoryPopover = showCategoryPopover;
    ProductList.showColumnPopover = showColumnPopover;
    ProductList.getColWidth = getColWidth;
    ProductList.findProduct = findProduct;
    ProductList.search = search;
    ProductList.destroyProduct = destroyProduct;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(ProductListModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!ProductList.CategoryPopover) {
        createCategoryPopover();
      }
      if (!ProductList.ColumnPopover) {
        createColumnPopover();
      }
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(productsWrapper) {
            console.log("---------- productsWrapper ----------");
            console.log(productsWrapper);
            U.bindData(productsWrapper, ProductListModel, 'products');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.scrollTo(ProductListModel);
      }
    }

    // function onBeforeLeave() {
    //   U.freeze(false);
    // }

    function onPopoverHidden() {
      if (ProductList.categoryPopoverShowing) {
        ProductList.categoryPopoverShowing = false;
        // request server.
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(productsWrapper) {
          console.log("---------- productsWrapper ----------");
          console.log(productsWrapper);
          U.bindData(productsWrapper, ProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = ProductListModel.products.length - 1;
      var extraQuery = {};
      if (ProductListModel.selectedCategory === 'FIELD') {
        extraQuery.fieldName = {
          '>': ProductListModel.products[last].fieldName
        };
      } else {
        extraQuery.modelName = {
          '>': ProductListModel.products[last].modelName
        };
      }
      var extraOperation = {};
      if (ProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      return productFind(extraQuery, extraOperation)
        .then(function(productsWrapper) {
          U.appendData(productsWrapper, ProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function showCategoryPopover($event) {
      ProductList.categoryPopoverShowing = true;
      ProductList.categoryPopover.show($event);
    }

    function showColumnPopover($event) {
      ProductList.columnPopoverShowing = true;
      ProductList.columnPopover.show($event);
    }

    function findProduct(extraQuery) {
      var extraOperation = {};
      if (ProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      U.loading(ProductListModel);
      return productFind(extraQuery, extraOperation)
        .then(function(productsWrapper) {
          U.bindData(productsWrapper, ProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyProduct(product, $index, $event) {
      $event.stopPropagation();
      Message.loading();
      return productDestroy({
          id: product.id
        })
        .then(function(product) {
          console.log("---------- product ----------");
          console.log(product);
          ProductListModel.products.splice($index, 1);
          Message.alert('글 지우기 알림', '글을 성공적으로 지웠습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function search(searchWord) {
      /* beautify preserve:start */
      var extraQuery = {
        or: [
          {fullLocation: {contains: searchWord }},
          {fieldName: {contains: searchWord }},
          {membershipType: {contains: searchWord }},
          {holeNumber: {contains: searchWord }},
          {courseName: {contains: searchWord }},
          {courseSize: {contains: searchWord }},
          {greenFee: {contains: searchWord }},
          {cartFee: {contains: searchWord }},
          {caddieFee: {contains: searchWord }},
          {modelName: {contains: searchWord }},
          {clubBrand: {contains: searchWord }},
          {clubType: {contains: searchWord }},
          {ballBrand: {contains: searchWord }},
          {ballType: {contains: searchWord }}
        ]
      };
      var extraOperation = {};
      if (ProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      U.loading(ProductListModel);
      return productFind(extraQuery, extraOperation)
        .then(function(productsWrapper) {
          U.bindData(productsWrapper, ProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        });
      /* beautify preserve:end */
    }


    //====================================================
    //  Helper
    //====================================================
    function init() {
      var extraOperation = {};
      if (ProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      return productFind(null, extraOperation);
    }

    function createCategoryPopover() {
      return $ionicPopover.fromTemplateUrl('state/Product/ProductList/Popover/CategoryPopover.html', {
        scope: $scope,
        id: 'categoryPopover',
        name: 'categoryPopover'
      }).then(function(popover) {
        ProductList.categoryPopover = popover;
      });
    }

    function createColumnPopover() {
      return $ionicPopover.fromTemplateUrl('state/Product/ProductList/Popover/ColumnPopover.html', {
        scope: $scope
      }).then(function(popover) {
        ProductList.columnPopover = popover;
      });
    }

    function getColWidth(array) {
      var filteredArray = _.map(array, function(columnNameObj) {
        if (columnNameObj.show === true) {
          return columnNameObj;
        }
      });
      array = _.compact(filteredArray);
      var length = array.length;
      var width = Math.floor(100 / length);
      return 'col-' + width;
    }

    //====================================================
    // REST
    //====================================================
    function productFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            type: ProductListModel.selectedCategory,
          },
          limit: 50,
          sort: 'updatedAt DESC',
          populate: ['owner']
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Products.find(queryWrapper).$promise
        .then(function(productsWrapper) {
          return productsWrapper;
        });
    }

    function productDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Products.destroy(queryWrapper).$promise
        .then(function(productsWrapper) {
          return productsWrapper;
        });
    }
  }
})();

/* beautify preserve:start */
(function() {
  'use strict';

  angular.module('app')
    .factory('ProductListModel', ProductListModel);

  ProductListModel.$inject = [];

  function ProductListModel() {
    var Model = {
      handle: 'ProductListModel',
      scrollPosition: 0,
      loading: false,
      products: [],
      selectedCategory: 'FIELD',
      columnFilterOption: {
        FIELD: [
          {name: 'fieldName', show: true },
          {name: 'location1', show: false },
          {name: 'location2', show: false },
          {name: 'fullLocation', show: true },
          {name: 'contact', show: true },
          {name: 'fieldUrl', show: false },
          {name: 'courseName', show: false },
          {name: 'courseSize', show: true },
          {name: 'greenFee', show: false },
          {name: 'cartFee', show: false },
          {name: 'caddieFee', show: true },
          {name: 'membershipType', show: false },
          {name: 'likes', show: true },
          {name: 'owner', show: false },
          {name: 'createdAt', show: false }
        ],
        CLUB: [
          {name: 'modelName', show: true },
          {name: 'clubBrand', show: true },
          {name: 'clubType', show: true },
          {name: 'likes', show: true },
          {name: 'owner', show: false },
          {name: 'createdAt', show: false }
        ],
        BALL: [
          {name: 'modelName', show: true },
          {name: 'ballBrand', show: true },
          {name: 'ballType', show: true },
          {name: 'likes', show: true },
          {name: 'owner', show: false },
          {name: 'createdAt', show: false }
        ]
      },
    };

    return Model;
  }
})();
/* beautify preserve:end */



(function() {
  'use strict';
  angular.module('app')
    .controller('ProductUpdateController', ProductUpdateController);

  ProductUpdateController.$inject = [
    '$scope', '$q', '$timeout', '$window', '$state',
    'ProductUpdateModel', 'Products', 'U', 'Message', 'Upload',
    'SERVER_URL'
  ];

  function ProductUpdateController(
    $scope, $q, $timeout, $window, $state,
    ProductUpdateModel, Products, U, Message, Upload,
    SERVER_URL
  ) {
    var initPromise;
    var noLoadingStates = [];
    var ProductUpdate = this;
    ProductUpdate.Model = ProductUpdateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    ProductUpdate.updateProduct = updateProduct;
    ProductUpdate.destroyProduct = destroyProduct;
    ProductUpdate.deselectPhoto = deselectPhoto;
    ProductUpdate.removePhoto = removePhoto;
    ProductUpdate.onFileSelect = onFileSelect;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(ProductUpdateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(product) {
            console.log("---------- product ----------");
            console.log(product);
            U.bindData(product, ProductUpdateModel, 'product');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function onBeforeLeave() {
      // U.freeze(false);
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function updateProduct() {
      Message.loading();
      return productUpdate()
        .then(function(updatedProduct) {
          console.log("---------- updatedProduct ----------");
          console.log(updatedProduct);
          U.bindData(updatedProduct, ProductUpdateModel, 'product');
          return Message.alert('글수정 알림', '글을 성공적으로 수정하였습니다.');
        })
        .then(function() {
          // U.goToState('Main.zProductList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyProduct() {
      Message.loading();
      return productDestroy()
        .then(function(product) {
          console.log("---------- product ----------");
          console.log(product);
          return Message.alert('글 지우기 알림', '글을 성공적으로 지웠습니다.');
        })
        .then(function() {
          U.goBack();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function removePhoto(name) {
      if (name === 'photo') {
        console.log("---------- 'photo' ----------");
        console.log('photo');
        $timeout(function() {
          delete ProductUpdateModel.product.photo;
          console.log("---------- ProductUpdateModel.product ----------");
          console.log(ProductUpdateModel.product);
        }, 0);
        console.log("---------- ProductUpdateModel.product ----------");
        console.log(ProductUpdateModel.product);
      } else if (name === 'thumbnail') {
        delete ProductUpdateModel.product.thumbnail;
      }
    }

    function deselectPhoto(photo) {
      $timeout(function() {
        console.log("---------- ProductUpdateModel.files[photo] ----------");
        console.log(ProductUpdateModel.files[photo]);
        delete ProductUpdateModel.files[photo];
        console.log("---------- ProductUpdateModel.files[photo] ----------");
        console.log(ProductUpdateModel.files[photo]);
      }, 0);
    }

    function onFileSelect($event) {
      // remove product.photo or product.thumbnail
      if ($event.target.name === 'photo') {
        ProductUpdateModel.product.photo = undefined;
      } else if ($event.target.name === 'thumbnail') {
        delete ProductUpdateModel.product.thumbnail;
      }
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return productFindOne();
    }

    function reset() {
      /* beautify preserve:start */
      ProductUpdateModel.files = {};
      /* beautify preserve:end */
    }

    //====================================================
    //  REST
    //====================================================
    function productFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id,
          },
          populate: ['photo', 'thumbnail']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Products.findOne(queryWrapper).$promise
        .then(function(product) {
          return product;
        });

    }


    function productUpdate() {
      var promise = Upload.upload({
        url: SERVER_URL + '/product/updateProduct',
        method: 'PUT',
        file: ProductUpdateModel.files,
        fields: {
          query: ProductUpdateModel.product
        },
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise
        .then(function(dataWrapper) {
          var updatedProduct = dataWrapper.data;
          return updatedProduct;
        });
    }

    function productDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Products.destroy(queryWrapper).$promise
        .then(function(productsWrapper) {
          return productsWrapper;
        });
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('ProductUpdateModel', ProductUpdateModel);

  ProductUpdateModel.$inject = [

  ];

  function ProductUpdateModel(

  ) {

    var Model = {
      product: {},
      files: {}
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('PostCreateController', PostCreateController);

  PostCreateController.$inject = [
    '$scope', '$q', '$timeout', '$window',
    'PostCreateModel', 'Posts', 'U', 'Message', 'Upload',
    'SERVER_URL'
  ];

  function PostCreateController(
    $scope, $q, $timeout, $window,
    PostCreateModel, Posts, U, Message, Upload,
    SERVER_URL
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [];
    var PostCreate = this;
    PostCreate.Model = PostCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostCreate.createPost = createPost;
    PostCreate.deselectPhoto = deselectPhoto;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PostCreateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(message) {
            console.log("---------- message ----------");
            console.log(message);
            U.freeze(false);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function createPost() {
      Message.loading();
      return postCreate()
        .then(function(createdPost) {
          console.log("---------- createdPost ----------");
          console.log(createdPost);
          return Message.alert('글작성 알림', '글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          // U.goToState('Main.zPostList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          reset();
        });
    }

    function deselectPhoto(photo, $index) {
      if (Array.isArray(PostCreateModel.form.files)) {
        PostCreateModel.form.files.splice($index, 1);
      } else {
        $timeout(function() {
          delete PostCreateModel.form.files[photo];
        }, 0);

      }
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.resolve({
        message: 'empty'
      });
    }

    function reset() {
      var category = PostCreateModel.form.category;
      var files;
      if (category === 'RANK') {
        files = { /* item0, ..., item9 */ };
      } else {
        files = [];
      }
      /* beautify preserve:start */
      PostCreateModel.form = {
        category: category,
        title: '',
        content: '',
        files: files,
        item0: {title: '', content: '', link: ''},
        item1: {title: '', content: '', link: ''},
        item2: {title: '', content: '', link: ''},
        item3: {title: '', content: '', link: ''},
        item4: {title: '', content: '', link: ''},
        item5: {title: '', content: '', link: ''},
        item6: {title: '', content: '', link: ''},
        item7: {title: '', content: '', link: ''},
        item8: {title: '', content: '', link: ''},
        item9: {title: '', content: '', link: ''}
      };
      /* beautify preserve:end */
    }

    //====================================================
    //  REST
    //====================================================
    function postCreate() {
      var files = _.clone(PostCreateModel.form.files);
      delete PostCreateModel.form.files;
      var promise = Upload.upload({
        url: SERVER_URL + '/post/create',
        method: 'POST',
        file: files,
        fields: {
          query: PostCreateModel.form
        },
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise;
    }

    // function postCreate() {
    //   var queryWrapper = {
    //     query: {
    //       category: 'CATEGORY_NAME-POST',
    //       title: PostCreateModel.form.title,
    //       content: PostCreateModel.form.content,
    //     }
    //   };
    //   return Posts.create({}, queryWrapper).$promise
    //     .then(function(dataWrapper) {
    //       var post = dataWrapper.data;
    //       return post;
    //     });
    // }
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('PostCreateModel', PostCreateModel);

  PostCreateModel.$inject = [

  ];

  function PostCreateModel(

  ) {

    var Model = {
      /* beautify preserve:start */
      form: {
        category: 'EVENT',
        title: '',
        content: '',
        files: {/* item0, item9*/},
        item0: {title: '', content: '', link: ''},
        item1: {title: '', content: '', link: ''},
        item2: {title: '', content: '', link: ''},
        item3: {title: '', content: '', link: ''},
        item4: {title: '', content: '', link: ''},
        item5: {title: '', content: '', link: ''},
        item6: {title: '', content: '', link: ''},
        item7: {title: '', content: '', link: ''},
        item8: {title: '', content: '', link: ''},
        item9: {title: '', content: '', link: ''}
      }
      /* beautify preserve:end */
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('PostListController', PostListController);

  PostListController.$inject = [
    '$scope', '$q', '$ionicPopover', '$window',
    'PostListModel', 'U', 'Posts', 'Message'
  ];

  function PostListController(
    $scope, $q, $ionicPopover, $window,
    PostListModel, U, Posts, Message
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [
      'Main.Post.PostCreate', 'Main.Post.PostUpdate'
    ];
    var PostList = this;
    PostList.Model = PostListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('popover.hidden', onPopoverHidden);

    PostList.refresh = refresh;
    PostList.loadMore = loadMore;
    PostList.showCategoryPopover = showCategoryPopover;
    PostList.showColumnPopover = showColumnPopover;
    PostList.getColWidth = getColWidth;
    PostList.findPost = findPost;
    PostList.search = search;
    PostList.destroyPost = destroyPost;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PostListModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!PostList.CategoryPopover) {
        createCategoryPopover();
      }
      if (!PostList.ColumnPopover) {
        createColumnPopover();
      }
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostListModel, 'posts');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.scrollTo(PostListModel);
      }
    }

    function onPopoverHidden() {
      if (PostList.categoryPopoverShowing) {
        PostList.categoryPopoverShowing = false;
        // request server.
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          U.bindData(postsWrapper, PostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = PostListModel.posts.length - 1;
      return postFind({
          updatedAt: {
            '<': PostListModel.posts[last].updatedAt
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function showCategoryPopover($event) {
      PostList.categoryPopoverShowing = true;
      PostList.categoryPopover.show($event);
    }

    function showColumnPopover($event) {
      PostList.columnPopoverShowing = true;
      PostList.columnPopover.show($event);
    }

    function findPost(extraQuery) {
      U.loading(PostListModel);
      return postFind(extraQuery)
        .then(function(postsWrapper) {
          U.bindData(postsWrapper, PostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyPost(post, $index, $event) {
      $event.stopPropagation();
      Message.loading();
      return postDestroy({
          id: post.id
        })
        .then(function(post) {
          console.log("---------- post ----------");
          console.log(post);
          PostListModel.posts.splice($index, 1);
          Message.alert('글 지우기 알림', '글을 성공적으로 지웠습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //     query.where.or = [{
    //       'name': {
    //         'contains': filter
    //       }
    //     }, {
    //       'notes': {
    //         'contains': filter
    //       }
    //     }];

    function search(searchWord) {
      U.loading(PostListModel);
      return postFind({
          or: [{
            title: {
              contains: searchWord
            }
          }, {
            content: {
              contains: searchWord
            }
          }, {
            createdAt: {
              contains: searchWord
            }
          }]
        })
        .then(function(postsWrapper) {
          U.bindData(postsWrapper, PostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        });
    }


    //====================================================
    //  Helper
    //====================================================
    function init() {
      return postFind();
    }

    function createCategoryPopover() {
      return $ionicPopover.fromTemplateUrl('state/Post/PostList/Popover/CategoryPopover.html', {
        scope: $scope,
        id: 'categoryPopover',
        name: 'categoryPopover'
      }).then(function(popover) {
        PostList.categoryPopover = popover;
      });
    }

    function createColumnPopover() {
      return $ionicPopover.fromTemplateUrl('state/Post/PostList/Popover/ColumnPopover.html', {
        scope: $scope
      }).then(function(popover) {
        PostList.columnPopover = popover;
      });
    }

    function getColWidth(array) {
      var filteredArray = _.map(array, function(columnNameObj) {
        if (columnNameObj.show === true) {
          return columnNameObj;
        }
      });
      array = _.compact(filteredArray);
      var length = array.length;
      var width = Math.floor(100 / length);
      return 'col-' + width;
    }

    //====================================================
    // REST
    //====================================================
    function postFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            category: PostListModel.selectedCategory,
          },
          limit: 50,
          sort: 'updatedAt DESC',
          populate: ['owner']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.find(queryWrapper).$promise
        .then(function(postsWrapper) {
          return postsWrapper;
        });
    }

    function postDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Posts.destroy(queryWrapper).$promise
        .then(function(postsWrapper) {
          return postsWrapper;
        });
    }
  }
})();

/* beautify preserve:start */
(function() {
  'use strict';

  angular.module('app')
    .factory('PostListModel', PostListModel);

  PostListModel.$inject = [];

  function PostListModel() {
    var Model = {
      handle: 'PostListModel',
      loading: false,
      posts: [],
      sort: {
        id: -1
      },
      selectedCategory: 'EVENT',
      columnFilterOption: {
        EVENT: [
          {name: 'title', show: true }, // columnNameObj
          {name: 'content', show: true },
          {name: 'owner', show: true },
          {name: 'createdAt', show: true },
        ],
        RANK: [
          {name: 'title', show: true},
          {name: 'content', show: true},
          {name: 'item0', show: true },
          {name: 'item1', show: true },
          {name: 'item2', show: true },
          {name: 'item3', show: false },
          {name: 'item4', show: false },
          {name: 'item5', show: false },
          {name: 'item6', show: false },
          {name: 'item7', show: false },
          {name: 'item8', show: false },
          {name: 'item9', show: false },
          {name: 'owner', show: false},
          {name: 'createdAt', show: false}
        ],
        NOTICE: [
          {name: 'title', show: true},
          {name: 'content', show: true},
          {name: 'owner', show: true},
          {name: 'createdAt', show: true}
        ]
      },
    };

    return Model;
  }
})();
/* beautify preserve:end */

(function() {
  'use strict';
  angular.module('app')
    .controller('PostUpdateController', PostUpdateController);

  PostUpdateController.$inject = [
    '$scope', '$q', '$timeout', '$window', '$state',
    'PostUpdateModel', 'Posts', 'U', 'Message', 'Upload',
    'SERVER_URL'
  ];

  function PostUpdateController(
    $scope, $q, $timeout, $window, $state,
    PostUpdateModel, Posts, U, Message, Upload,
    SERVER_URL
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [];
    var PostUpdate = this;
    PostUpdate.Model = PostUpdateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostUpdate.updatePost = updatePost;
    PostUpdate.destroyPost = destroyPost;
    PostUpdate.deselectPhoto = deselectPhoto;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(PostUpdateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(post) {
            console.log("---------- post ----------");
            console.log(post);
            U.bindData(post, PostUpdateModel, 'post');
            $timeout(function() {
              if (PostUpdateModel.post.category === 'EVENT') {
                PostUpdateModel.post.files = [];
              }
            }, 0);
            console.log("----------  ----------");
            console.log(PostUpdateModel.post.files.length);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function updatePost() {
      Message.loading();
      return postUpdate()
        .then(function(updatedPost) {
          console.log("---------- updatedPost ----------");
          console.log(updatedPost);
          U.bindData(updatedPost, PostUpdateModel, 'post');
          $timeout(function() {
            if (PostUpdateModel.post.category === 'EVENT') {
              PostUpdateModel.post.files = [];
            }
          }, 2);
          return Message.alert('글수정 알림', '글을 성공적으로 수정하였습니다.');
        })
        .then(function() {
          // U.goToState('Main.zPostList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyPost() {
      Message.loading();
      return postDestroy()
        .then(function(post) {
          console.log("---------- post ----------");
          console.log(post);
          return Message.alert('글 지우기 알림', '글을 성공적으로 지웠습니다.');
        })
        .then(function() {
          U.goBack();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function deselectPhoto(photo, $index) {
      if (Array.isArray(PostUpdateModel.post.files)) {
        PostUpdateModel.post.files.splice($index, 1);
      } else {
        $timeout(function() {
          delete PostUpdateModel.post.files[photo];
        }, 0);

      }
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return postFindOne();
    }

    function reset() {
      var category = PostUpdateModel.post.category;
      var files;
      if (category === 'RANK') {
        files = { /* item0, ..., item9 */ };
      } else {
        files = [];
      }
      /* beautify preserve:start */
      PostUpdateModel.post = {
        category: category,
        title: '',
        content: '',
        files: files,
        item0: {title: '', content: '', link: ''},
        item1: {title: '', content: '', link: ''},
        item2: {title: '', content: '', link: ''},
        item3: {title: '', content: '', link: ''},
        item4: {title: '', content: '', link: ''},
        item5: {title: '', content: '', link: ''},
        item6: {title: '', content: '', link: ''},
        item7: {title: '', content: '', link: ''},
        item8: {title: '', content: '', link: ''},
        item9: {title: '', content: '', link: ''}
      };
      /* beautify preserve:end */
    }

    //====================================================
    //  REST
    //====================================================
    function postFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id,
          },
          populate: ['owner', 'photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then(function(post) {
          return post;
        });

    }


    function postUpdate() {
      var files = _.clone(PostUpdateModel.post.files);
      delete PostUpdateModel.post.files;
      if (PostUpdateModel.post.category === 'EVENT') {
        if (files.length > 0) {
          PostUpdateModel.post.photos = [];
        }
      }
      var promise = Upload.upload({
        url: SERVER_URL + '/post/update',
        method: 'PUT',
        file: files,
        fields: {
          query: PostUpdateModel.post
        },
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise
        .then(function(dataWrapper) {
          var updatedPost = dataWrapper.data;
          return updatedPost;
        });
    }

    function postDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Posts.destroy(queryWrapper).$promise
        .then(function(postsWrapper) {
          return postsWrapper;
        });
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('PostUpdateModel', PostUpdateModel);

  PostUpdateModel.$inject = [

  ];

  function PostUpdateModel(

  ) {

    var Model = {
      /* beautify preserve:start */
      post: {
        category: 'RANK',
        title: '',
        content: '',
        files: [],
        item0: {title: '', content: '', link: ''},
        item1: {title: '', content: '', link: ''},
        item2: {title: '', content: '', link: ''},
        item3: {title: '', content: '', link: ''},
        item4: {title: '', content: '', link: ''},
        item5: {title: '', content: '', link: ''},
        item6: {title: '', content: '', link: ''},
        item7: {title: '', content: '', link: ''},
        item8: {title: '', content: '', link: ''},
        item9: {title: '', content: '', link: ''}
      }
      /* beautify preserve:end */
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('PushSendController', PushSendController);

  PushSendController.$inject = [
    '$scope', '$q', '$timeout', '$window', '$state',
    'PushSendModel', 'Devices', 'U', 'Message'
  ];

  function PushSendController(
    $scope, $q, $timeout, $window, $state,
    PushSendModel, Devices, U, Message
  ) {
    var PushSend = this;
    PushSend.Model = PushSendModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);


    PushSend.sendPush = sendPush;
    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      U.freeze(false);
    }

    function onAfterEnter() {}

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================


    //====================================================
    //  Helper
    //====================================================

    function reset() {
      PushSendModel.post.title = '';
      PushSendModel.post.message = '';
    }

    //====================================================
    //  REST
    //====================================================
    function sendPush() {
      return Devices.push({
          title: PushSendModel.post.title,
          message: PushSendModel.post.message
        }).$promise
        .then(function(message) {
          Message.alert('전송 알림', '푸쉬 전송 성공');
          reset();
          console.log("---------- message ----------");
          console.log(message);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
        });
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('PushSendModel', PushSendModel);

  PushSendModel.$inject = [];

  function PushSendModel() {

    var Model = {
      post: {
        title: '',
        message: ''
      }
    };

    return Model;
  }
})();



(function() {
  'use strict';
  angular.module('app')
    .controller('QuestionAnswerListController', QuestionAnswerListController);

  QuestionAnswerListController.$inject = [
    '$scope', '$q', '$ionicPopover', '$window', '$ionicScrollDelegate',
    '$state',
    'QuestionAnswerListModel', 'U', 'QuestionAnswers', 'Message'
  ];

  function QuestionAnswerListController(
    $scope, $q, $ionicPopover, $window, $ionicScrollDelegate,
    $state,
    QuestionAnswerListModel, U, QuestionAnswers, Message
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [
      'Main.QuestionAnswer.QuestionAnswerCreate', 'Main.QuestionAnswer.QuestionAnswerUpdate'
    ];
    var QuestionAnswerList = this;
    QuestionAnswerList.Model = QuestionAnswerListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    // $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('popover.hidden', onPopoverHidden);

    QuestionAnswerList.refresh = refresh;
    QuestionAnswerList.loadMore = loadMore;
    QuestionAnswerList.showCategoryPopover = showCategoryPopover;
    QuestionAnswerList.showColumnPopover = showColumnPopover;
    QuestionAnswerList.getColWidth = getColWidth;
    QuestionAnswerList.findQuestionAnswer = findQuestionAnswer;
    QuestionAnswerList.search = search;
    QuestionAnswerList.destroyQuestionAnswer = destroyQuestionAnswer;
    QuestionAnswerList.getTitle = getTitle;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      QuestionAnswerListModel.selectedCategory = $state.params.type;
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(QuestionAnswerListModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!QuestionAnswerList.CategoryPopover) {
        createCategoryPopover();
      }
      if (!QuestionAnswerList.ColumnPopover) {
        createColumnPopover();
      }
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(questionanswersWrapper) {
            console.log("---------- questionanswersWrapper ----------");
            console.log(questionanswersWrapper);
            U.bindData(questionanswersWrapper, QuestionAnswerListModel, 'questionanswers');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.scrollTo(QuestionAnswerListModel);
      }
    }

    // function onBeforeLeave() {
    //   U.freeze(false);
    // }

    function onPopoverHidden() {
      if (QuestionAnswerList.categoryPopoverShowing) {
        QuestionAnswerList.categoryPopoverShowing = false;
        // request server.
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(questionanswersWrapper) {
          console.log("---------- questionanswersWrapper ----------");
          console.log(questionanswersWrapper);
          U.bindData(questionanswersWrapper, QuestionAnswerListModel, 'questionanswers');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = QuestionAnswerListModel.questionanswers.length - 1;
      var extraQuery = {};
      extraQuery.question = {
        '>': QuestionAnswerListModel.questionanswers[last].question.id
      };
      var extraOperation = {};
      return questionanswerFind(extraQuery, extraOperation)
        .then(function(questionanswersWrapper) {
          U.appendData(questionanswersWrapper, QuestionAnswerListModel, 'questionanswers');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function showCategoryPopover($event) {
      QuestionAnswerList.categoryPopoverShowing = true;
      QuestionAnswerList.categoryPopover.show($event);
    }

    function showColumnPopover($event) {
      QuestionAnswerList.columnPopoverShowing = true;
      QuestionAnswerList.columnPopover.show($event);
    }

    function findQuestionAnswer(extraQuery) {
      var extraOperation = {};
      U.loading(QuestionAnswerListModel);
      return questionanswerFind(extraQuery, extraOperation)
        .then(function(questionanswersWrapper) {
          U.bindData(questionanswersWrapper, QuestionAnswerListModel, 'questionanswers');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyQuestionAnswer(questionanswer, $index, $event) {
      $event.stopPropagation();
      Message.loading();
      return questionanswerDestroy({
          id: questionanswer.id
        })
        .then(function(questionanswer) {
          console.log("---------- questionanswer ----------");
          console.log(questionanswer);
          QuestionAnswerListModel.questionanswers.splice($index, 1);
          Message.alert('글 지우기 알림', '글을 성공적으로 지웠습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function search(searchWord) {
      /* beautify preserve:start */
      var extraQuery = {
        or: [
          {title: {contains: searchWord }},
          {answer: {contains: searchWord }},
          {score: {contains: searchWord }},
          {optionLabel: {contains: searchWord }}
        ]
      };
      var extraOperation = {};
      U.loading(QuestionAnswerListModel);
      return questionanswerFind(extraQuery, extraOperation)
        .then(function(questionanswersWrapper) {
          U.bindData(questionanswersWrapper, QuestionAnswerListModel, 'questionanswers');
        })
        .catch(function(err) {
          U.error(err);
        });
      /* beautify preserve:end */
    }

    function getTitle() {
      if (QuestionAnswerListModel.selectedCategory === 'FIELD') {
        if (QuestionAnswerListModel.questionanswers[0]) {
          return QuestionAnswerListModel.questionanswers[0].product.fieldName + ' 골프장';
        }
      } else if (QuestionAnswerListModel.selectedCategory === 'CLUB') {
        if (QuestionAnswerListModel.questionanswers[0]) {
          return QuestionAnswerListModel.questionanswers[0].product.modelName + ' 클럽';
        }
      } else if (QuestionAnswerListModel.selectedCategory === 'BALL') {
        if (QuestionAnswerListModel.questionanswers[0]) {
          return QuestionAnswerListModel.questionanswers[0].product.modelName + ' 골프공';
        }
      }
    }


    //====================================================
    //  Helper
    //====================================================
    function init() {
      var extraOperation = {};
      return questionanswerFind(null, extraOperation);
    }

    function createCategoryPopover() {
      return $ionicPopover.fromTemplateUrl('state/QuestionAnswer/QuestionAnswerList/Popover/CategoryPopover.html', {
        scope: $scope,
        id: 'categoryPopover',
        name: 'categoryPopover'
      }).then(function(popover) {
        QuestionAnswerList.categoryPopover = popover;
      });
    }

    function createColumnPopover() {
      return $ionicPopover.fromTemplateUrl('state/QuestionAnswer/QuestionAnswerList/Popover/ColumnPopover.html', {
        scope: $scope
      }).then(function(popover) {
        QuestionAnswerList.columnPopover = popover;
      });
    }

    function getColWidth(array) {
      var filteredArray = _.map(array, function(columnNameObj) {
        if (columnNameObj.show === true) {
          return columnNameObj;
        }
      });
      array = _.compact(filteredArray);
      var length = array.length;
      var width = Math.floor(100 / length);
      return 'col-' + width;
    }

    //====================================================
    // REST
    //====================================================
    function questionanswerFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            product: $state.params.id
          },
          limit: 50,
          sort: 'question ASC',
          populate: ['owner', 'product', 'question']
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return QuestionAnswers.findQuestionAnswer(queryWrapper).$promise
        .then(function(questionanswersWrapper) {
          return questionanswersWrapper;
        });
    }

    function questionanswerDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return QuestionAnswers.destroy(queryWrapper).$promise
        .then(function(questionanswersWrapper) {
          return questionanswersWrapper;
        });
    }
  }
})();

/* beautify preserve:start */
(function() {
  'use strict';

  angular.module('app')
    .factory('QuestionAnswerListModel', QuestionAnswerListModel);

  QuestionAnswerListModel.$inject = [];

  function QuestionAnswerListModel() {
    var Model = {
      handle: 'QuestionAnswerListModel',
      loading: false,
      questionanswers: [],
      selectedCategory: 'FIELD',
      columnFilterOption: {
        FIELD: [
          {name: 'question', show: true },
          {name: 'score', show: true },
          {name: 'optionLabel', show: true },
          {name: 'owner', show: true }
        ],
        CLUB: [
          {name: 'question', show: true },
          {name: 'score', show: true },
          {name: 'optionLabel', show: true },
          {name: 'owner', show: true }
        ],
        BALL: [
          {name: 'question', show: true },
          {name: 'score', show: true },
          {name: 'optionLabel', show: true },
          {name: 'owner', show: true }
        ]
      },
    };

    return Model;
  }
})();
/* beautify preserve:end */

(function() {
  'use strict';
  angular.module('app')
    .controller('QuestionProductListController', QuestionProductListController);

  QuestionProductListController.$inject = [
    '$scope', '$q', '$ionicPopover', '$window', '$ionicScrollDelegate',
    'QuestionProductListModel', 'U', 'Products', 'Message'
  ];

  function QuestionProductListController(
    $scope, $q, $ionicPopover, $window, $ionicScrollDelegate,
    QuestionProductListModel, U, Products, Message
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [
      'Main.Product.ProductCreate', 'Main.Product.ProductUpdate'
    ];
    var QuestionProductList = this;
    QuestionProductList.Model = QuestionProductListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    // $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('popover.hidden', onPopoverHidden);

    QuestionProductList.refresh = refresh;
    QuestionProductList.loadMore = loadMore;
    QuestionProductList.showCategoryPopover = showCategoryPopover;
    QuestionProductList.showColumnPopover = showColumnPopover;
    QuestionProductList.getColWidth = getColWidth;
    QuestionProductList.findProduct = findProduct;
    QuestionProductList.search = search;
    QuestionProductList.destroyProduct = destroyProduct;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(QuestionProductListModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!QuestionProductList.CategoryPopover) {
        createCategoryPopover();
      }
      if (!QuestionProductList.ColumnPopover) {
        createColumnPopover();
      }
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(productsWrapper) {
            console.log("---------- productsWrapper ----------");
            console.log(productsWrapper);
            U.bindData(productsWrapper, QuestionProductListModel, 'products');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.scrollTo(QuestionProductListModel);
      }
    }

    // function onBeforeLeave() {
    //   U.freeze(false);
    // }

    function onPopoverHidden() {
      if (QuestionProductList.categoryPopoverShowing) {
        QuestionProductList.categoryPopoverShowing = false;
        // request server.
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(productsWrapper) {
          console.log("---------- productsWrapper ----------");
          console.log(productsWrapper);
          U.bindData(productsWrapper, QuestionProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = QuestionProductListModel.products.length - 1;
      var extraQuery = {};
      if (QuestionProductListModel.selectedCategory === 'FIELD') {
        extraQuery.fieldName = {
          '>': QuestionProductListModel.products[last].fieldName
        };
      } else {
        extraQuery.modelName = {
          '>': QuestionProductListModel.products[last].modelName
        };
      }
      var extraOperation = {};
      if (QuestionProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      return productFind(extraQuery, extraOperation)
        .then(function(productsWrapper) {
          U.appendData(productsWrapper, QuestionProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function showCategoryPopover($event) {
      QuestionProductList.categoryPopoverShowing = true;
      QuestionProductList.categoryPopover.show($event);
    }

    function showColumnPopover($event) {
      QuestionProductList.columnPopoverShowing = true;
      QuestionProductList.columnPopover.show($event);
    }

    function findProduct(extraQuery) {
      var extraOperation = {};
      if (QuestionProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      U.loading(QuestionProductListModel);
      return productFind(extraQuery, extraOperation)
        .then(function(productsWrapper) {
          U.bindData(productsWrapper, QuestionProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyProduct(product, $index, $event) {
      $event.stopPropagation();
      Message.loading();
      return productDestroy({
          id: product.id
        })
        .then(function(product) {
          console.log("---------- product ----------");
          console.log(product);
          QuestionProductListModel.products.splice($index, 1);
          Message.alert('글 지우기 알림', '글을 성공적으로 지웠습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function search(searchWord) {
      /* beautify preserve:start */
      var extraQuery = {
        or: [
          {fullLocation: {contains: searchWord }},
          {fieldName: {contains: searchWord }},
          {membershipType: {contains: searchWord }},
          {holeNumber: {contains: searchWord }},
          {courseName: {contains: searchWord }},
          {courseSize: {contains: searchWord }},
          {greenFee: {contains: searchWord }},
          {cartFee: {contains: searchWord }},
          {caddieFee: {contains: searchWord }},
          {modelName: {contains: searchWord }},
          {clubBrand: {contains: searchWord }},
          {clubType: {contains: searchWord }},
          {ballBrand: {contains: searchWord }},
          {ballType: {contains: searchWord }}
        ]
      };
      var extraOperation = {};
      if (QuestionProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      U.loading(QuestionProductListModel);
      return productFind(extraQuery, extraOperation)
        .then(function(productsWrapper) {
          U.bindData(productsWrapper, QuestionProductListModel, 'products');
        })
        .catch(function(err) {
          U.error(err);
        });
      /* beautify preserve:end */
    }


    //====================================================
    //  Helper
    //====================================================
    function init() {
      var extraOperation = {};
      if (QuestionProductListModel.selectedCategory === 'FIELD') {
        extraOperation.sort = 'fieldName ASC';
      } else {
        extraOperation.sort = 'modelName ASC';
      }
      return productFind(null, extraOperation);
    }

    function createCategoryPopover() {
      return $ionicPopover.fromTemplateUrl('state/QuestionAnswer/QuestionProductList/Popover/CategoryPopover.html', {
        scope: $scope,
        id: 'categoryPopover',
        name: 'categoryPopover'
      }).then(function(popover) {
        QuestionProductList.categoryPopover = popover;
      });
    }

    function createColumnPopover() {
      return $ionicPopover.fromTemplateUrl('state/QuestionAnswer/QuestionProductList/Popover/ColumnPopover.html', {
        scope: $scope
      }).then(function(popover) {
        QuestionProductList.columnPopover = popover;
      });
    }

    function getColWidth(array) {
      var filteredArray = _.map(array, function(columnNameObj) {
        if (columnNameObj.show === true) {
          return columnNameObj;
        }
      });
      array = _.compact(filteredArray);
      var length = array.length;
      var width = Math.floor(100 / length);
      return 'col-' + width;
    }

    //====================================================
    // REST
    //====================================================
    function productFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            type: QuestionProductListModel.selectedCategory,
          },
          limit: 50,
          sort: 'updatedAt DESC',
          populate: ['owner']
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Products.find(queryWrapper).$promise
        .then(function(productsWrapper) {
          return productsWrapper;
        });
    }

    function productDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Products.destroy(queryWrapper).$promise
        .then(function(productsWrapper) {
          return productsWrapper;
        });
    }
  }
})();

/* beautify preserve:start */
(function() {
  'use strict';

  angular.module('app')
    .factory('QuestionProductListModel', QuestionProductListModel);

  QuestionProductListModel.$inject = [];

  function QuestionProductListModel() {
    var Model = {
      handle: 'QuestionProductListModel',
      scrollPosition: 0,
      loading: false,
      products: [],
      selectedCategory: 'FIELD',
      columnFilterOption: {
        FIELD: [
          {name: 'fieldName', show: true },
          {name: 'location1', show: false },
          {name: 'location2', show: false },
          {name: 'fullLocation', show: true },
          {name: 'contact', show: true },
          {name: 'fieldUrl', show: false },
          {name: 'courseName', show: false },
          {name: 'courseSize', show: true },
          {name: 'greenFee', show: false },
          {name: 'cartFee', show: false },
          {name: 'membershipType', show: false },
          {name: 'likes', show: true },
          {name: 'owner', show: false },
          {name: 'createdAt', show: false }
        ],
        CLUB: [
          {name: 'modelName', show: true },
          {name: 'clubBrand', show: true },
          {name: 'clubType', show: true },
          {name: 'likes', show: true },
          {name: 'owner', show: false },
          {name: 'createdAt', show: false }
        ],
        BALL: [
          {name: 'modelName', show: true },
          {name: 'ballBrand', show: true },
          {name: 'ballType', show: true },
          {name: 'likes', show: true },
          {name: 'owner', show: false },
          {name: 'createdAt', show: false }
        ]
      },
    };

    return Model;
  }
})();
/* beautify preserve:end */

(function() {
  'use strict';
  angular.module('app')
    .controller('RankCreateController', RankCreateController);

  RankCreateController.$inject = [
    '$scope', '$q', '$timeout', '$window',
    'RankCreateModel', 'U', 'Message', 'Upload',
    'SERVER_URL'
  ];

  function RankCreateController(
    $scope, $q, $timeout, $window,
    RankCreateModel, U, Message, Upload,
    SERVER_URL
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [];
    var RankCreate = this;
    RankCreate.Model = RankCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    RankCreate.createRank = createRank;
    RankCreate.deselectPhoto = deselectPhoto;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(RankCreateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(message) {
            console.log("---------- message ----------");
            console.log(message);
            U.freeze(false);
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function createRank() {
      Message.loading();
      return rankCreate()
        .then(function(createdRank) {
          console.log("---------- createdRank ----------");
          console.log(createdRank);
          return Message.alert('글작성 알림', '글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          // U.goToState('Main.zRankList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          reset();
        });
    }

    function deselectPhoto(photo, $index) {
      if (Array.isArray(RankCreateModel.post.files)) {
        RankCreateModel.post.files.splice($index, 1);
      } else {
        $timeout(function() {
          delete RankCreateModel.post.files[photo];
        }, 0);

      }
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.resolve({
        message: 'empty'
      });
    }

    function reset() {
      /* beautify preserve:start */
      RankCreateModel.post = {
        category: 'RANK',
        title: '',
        content: '',
        files: {},
        item0: {title: '', content: '', link: ''},
        item1: {title: '', content: '', link: ''},
        item2: {title: '', content: '', link: ''},
        item3: {title: '', content: '', link: ''},
        item4: {title: '', content: '', link: ''},
        item5: {title: '', content: '', link: ''},
        item6: {title: '', content: '', link: ''},
        item7: {title: '', content: '', link: ''},
        item8: {title: '', content: '', link: ''},
        item9: {title: '', content: '', link: ''}
      };
      /* beautify preserve:end */
    }

    //====================================================
    //  REST
    //====================================================
    function rankCreate() {
      var files = _.clone(RankCreateModel.post.files);
      delete RankCreateModel.post.files;
      var promise = Upload.upload({
        url: SERVER_URL + '/post/create',
        method: 'POST',
        file: files,
        fields: {
          query: RankCreateModel.post
        },
        headers: {
          enctype: "multipart/form-data"
        }
      });
      return promise;
    }
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('RankCreateModel', RankCreateModel);

  RankCreateModel.$inject = [

  ];

  function RankCreateModel(

  ) {

    var Model = {
      /* beautify preserve:start */
      post: {
        category: 'RANK',
        title: '',
        content: '',
        files: {/* item0:, item9*/},
        item0: {title: '', content: '', link: ''},
        item1: {title: '', content: '', link: ''},
        item2: {title: '', content: '', link: ''},
        item3: {title: '', content: '', link: ''},
        item4: {title: '', content: '', link: ''},
        item5: {title: '', content: '', link: ''},
        item6: {title: '', content: '', link: ''},
        item7: {title: '', content: '', link: ''},
        item8: {title: '', content: '', link: ''},
        item9: {title: '', content: '', link: ''}
      }
      /* beautify preserve:end */
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('UserListController', UserListController);

  UserListController.$inject = [
    '$scope', '$q', '$ionicPopover', '$window', '$ionicScrollDelegate',
    'UserListModel', 'U', 'Users', 'Message'
  ];

  function UserListController(
    $scope, $q, $ionicPopover, $window, $ionicScrollDelegate,
    UserListModel, U, Users, Message
  ) {
    var _ = $window._;
    var initPromise;
    var noLoadingStates = [
      'Main.User.UserCreate', 'Main.User.UserUpdate'
    ];
    var UserList = this;
    UserList.Model = UserListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    // $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    $scope.$on('popover.hidden', onPopoverHidden);

    UserList.refresh = refresh;
    UserList.loadMore = loadMore;
    UserList.showCategoryPopover = showCategoryPopover;
    UserList.showColumnPopover = showColumnPopover;
    UserList.getColWidth = getColWidth;
    UserList.findUser = findUser;
    UserList.search = search;
    UserList.destroyUser = destroyUser;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(UserListModel);
        initPromise = init();
      } else {
        U.freeze(false);
      }
    }

    function onAfterEnter() {
      if (!UserList.CategoryPopover) {
        createCategoryPopover();
      }
      if (!UserList.ColumnPopover) {
        createColumnPopover();
      }
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(usersWrapper) {
            console.log("---------- usersWrapper ----------");
            console.log(usersWrapper);
            U.bindData(usersWrapper, UserListModel, 'users');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.scrollTo(UserListModel);
      }
    }

    // function onBeforeLeave() {
    //   U.freeze(false);
    // }

    function onPopoverHidden() {
      if (UserList.categoryPopoverShowing) {
        UserList.categoryPopoverShowing = false;
        // request server.
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(usersWrapper) {
          console.log("---------- usersWrapper ----------");
          console.log(usersWrapper);
          U.bindData(usersWrapper, UserListModel, 'users');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = UserListModel.users.length - 1;
      var extraQuery = {};
      extraQuery.nickname = {
        '>': UserListModel.users[last].nickname
      };
      var extraOperation = {};
      return userFind(extraQuery, extraOperation)
        .then(function(usersWrapper) {
          U.appendData(usersWrapper, UserListModel, 'users');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function showCategoryPopover($event) {
      UserList.categoryPopoverShowing = true;
      UserList.categoryPopover.show($event);
    }

    function showColumnPopover($event) {
      UserList.columnPopoverShowing = true;
      UserList.columnPopover.show($event);
    }

    function findUser(extraQuery) {
      var extraOperation = {};
      U.loading(UserListModel);
      return userFind(extraQuery, extraOperation)
        .then(function(usersWrapper) {
          U.bindData(usersWrapper, UserListModel, 'users');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyUser(user, $index, $event) {
      $event.stopPropagation();
      Message.loading();
      return userDestroy({
          id: user.id
        })
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          UserListModel.users.splice($index, 1);
          Message.alert('글 지우기 알림', '글을 성공적으로 지웠습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function search(searchWord) {
      /* beautify preserve:start */
      var extraQuery = {
        or: [
          {username: {contains: searchWord }},
          {email: {contains: searchWord }},
          {name: {contains: searchWord }},
          {nickname: {contains: searchWord }},
          {phone: {contains: searchWord }},
          {gender: {contains: searchWord }},
          {age: {contains: searchWord }},
          {height: {contains: searchWord }},
          {weight: {contains: searchWord }},
          {strength: {contains: searchWord }}
        ]
      };
      var extraOperation = {};
      U.loading(UserListModel);
      return userFind(extraQuery, extraOperation)
        .then(function(usersWrapper) {
          U.bindData(usersWrapper, UserListModel, 'users');
        })
        .catch(function(err) {
          U.error(err);
        });
      /* beautify preserve:end */
    }


    //====================================================
    //  Helper
    //====================================================
    function init() {
      var extraOperation = {};
      return userFind(null, extraOperation);
    }

    function createCategoryPopover() {
      return $ionicPopover.fromTemplateUrl('state/User/UserList/Popover/CategoryPopover.html', {
        scope: $scope,
        id: 'categoryPopover',
        name: 'categoryPopover'
      }).then(function(popover) {
        UserList.categoryPopover = popover;
      });
    }

    function createColumnPopover() {
      return $ionicPopover.fromTemplateUrl('state/User/UserList/Popover/ColumnPopover.html', {
        scope: $scope
      }).then(function(popover) {
        UserList.columnPopover = popover;
      });
    }

    function getColWidth(array) {
      var filteredArray = _.map(array, function(columnNameObj) {
        if (columnNameObj.show === true) {
          return columnNameObj;
        }
      });
      array = _.compact(filteredArray);
      var length = array.length;
      var width = Math.floor(100 / length);
      return 'col-' + width;
    }

    //====================================================
    // REST
    //====================================================
    function userFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {},
          limit: 50,
          sort: 'nickname ASC',
          populate: []
        }
      };

      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Users.find(queryWrapper).$promise
        .then(function(usersWrapper) {
          return usersWrapper;
        });
    }

    function userDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {}
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Users.destroy(queryWrapper).$promise
        .then(function(usersWrapper) {
          return usersWrapper;
        });
    }
  }
})();

/* beautify preserve:start */
(function() {
  'use strict';

  angular.module('app')
    .factory('UserListModel', UserListModel);

  UserListModel.$inject = [];

  function UserListModel() {
    var Model = {
      handle: 'UserListModel',
      loading: false,
      users: [],
      selectedCategory: 'USER',
      columnFilterOption: {
        USER: [
          {name: 'username', show: false },
          {name: 'nickname', show: true },
          {name: 'name', show: true },
          {name: 'email', show: true },
          {name: 'phone', show: true },
          {name: 'gender', show: true },
          {name: 'age', show: false },
          {name: 'height', show: false },
          {name: 'weight', show: false },
          {name: 'strength', show: false }
        ]
      },
    };

    return Model;
  }
})();
/* beautify preserve:end */

(function(angular) {
  'use strict';
  angular.module('app')
    .controller('zCouponDetailController', zCouponDetailController);

  zCouponDetailController.$inject = [
    '$scope', '$ionicModal', '$state', '$q',
    'zCouponDetailModel', 'Coupons', 'U', 'AppStorage', 'Message'
  ];

  function zCouponDetailController(
    $scope, $ionicModal, $state, $q,
    zCouponDetailModel, Coupons, U, AppStorage, Message
  ) {

    var initPromise;
    var noLoadingStates = [];
    var CouponDetail = this;
    CouponDetail.Model = zCouponDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('modal.hidden', function() {
      zCouponDetailModel.form.password = '';
    });

    CouponDetail.closeModal = closeModal;
    CouponDetail.useCoupon = useCoupon; // from modal
    CouponDetail.getCurrentDate = getCurrentDate; // from modal

    //====================================================
    // View Event
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(zCouponDetailModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!CouponDetail.modal) {
        createModal();
      }
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(coupon) {
            U.bindData(coupon, zCouponDetailModel, 'coupon');
          })
          .catch(function(err) {
            U.error(err);
          });
      }
    }

    //====================================================
    //  Implementation
    //====================================================

    function closeModal() {
      CouponDetail.modal.hide();
    }

    function getCurrentDate() {
      return new Date();
    }

    function useCoupon() {
      Message.loading();
      return couponUse()
        .then(function() {
          CouponDetail.modal.hide();
          Message.alert('쿠폰사용 알림', '쿠폰을 성공적으로 사용하였습니다.');
        })
        .catch(function(err) {
          CouponDetail.modal.hide();
          if (err.data.message[0] === '0') {
            return Message.alert('쿠폰사용 알림', '전부 사용한 쿠폰입니다.');
          }
        })
        .finally(function() {
          CouponDetail.modal.hide();
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return couponFindOne();
    }

    function createModal() {
      return $ionicModal.fromTemplateUrl('state/ZZZ/CouponDetail/Modal/CouponModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        CouponDetail.modal = modal;
      });
    }

    //====================================================
    //  REST
    //====================================================
    function couponFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          },
          populate: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Coupons
        .findOne(queryWrapper).$promise
        .then(function(coupon) {
          return coupon;
        });
    }

    function couponUse() {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          password: zCouponDetailModel.form.password,
          usedBy: AppStorage.user.id
        }
      };
      return Coupons
        .use(queryWrapper).$promise
        .then(function(updatedCoupon) {
          return updatedCoupon;
        });
    }

  }
})(angular);

(function(angular) {
  'use strict';

  angular.module('app')
    .factory('zCouponDetailModel', zCouponDetailModel);

  zCouponDetailModel.$inject = [];

  function zCouponDetailModel() {

    var model = {
      loading: false,
      coupon: {},
      form: {
        password: ''
      }
    };

    return model;
  }
})(angular);

(function(angular) {
  'use strict';
  angular.module('app')
    .controller('zCouponListController', zCouponListController);

  zCouponListController.$inject = [
    '$scope', '$state', '$q',
    'zCouponListModel', 'Coupons', 'Message', 'U'
  ];

  function zCouponListController(
    $scope, $state, $q,
    zCouponListModel, Coupons, Message, U
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.zCouponDetail'
    ];
    var CouponList = this;
    CouponList.Model = zCouponListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    CouponList.refresh = refresh;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        U.loading(zCouponListModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return initPromise
          .then(function(couponsWrapper) {
            U.bindData(couponsWrapper, zCouponListModel, 'coupons');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(couponsWrapper) {
          U.bindData(couponsWrapper, zCouponListModel, 'coupons');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return couponFind();
    }

    //====================================================
    // REST 
    //====================================================
    function couponFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            place: $state.params.id,
            // quantity: {
            //   '>': 0
            // }
          },
          populates: ['photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Coupons
        .find(queryWrapper).$promise
        .then(function(couponsWrapper) {
          return couponsWrapper;
        });
    }

  } //end
})(angular);

(function(angular) {
  'use strict';

  angular.module('app')
    .factory('zCouponListModel', zCouponListModel);

  zCouponListModel.$inject = [];

  function zCouponListModel() {

    var Model = {
      loading: true,
      coupons: [{
        id: 10,
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }],
        title: '파워퓌트니스',
        content: '휘트니스 한달 이용권 10% 할인',
        expirationDate: new Date(),
        totalQuantity: 20,
        usedQuantity: 15,
        quantity: 5
      }, {
        id: 11,
        photos: [{
          id: 0,
          url: 'http://placehold.it/400x400'
        }],
        title: '파워퓌트니스1',
        content: '휘트니스 한달 이용권 10% 할인 1',
        expirationDate: new Date(),
        totalQuantity: 20,
        usedQuantity: 5,
        quantity: 15
      }]
    };

    return Model;

  }
})(angular);

(function() {
  'use strict';
  angular.module('app')
    .controller('zLoginController', zLoginController);

  zLoginController.$inject = [
    '$cordovaOauth',
    'zLoginModel', 'Users', 'U', 'Message',
    'FACEBOOK_KEY', 'TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET', 'GOOGLE_OAUTH_CLIENT_ID', 'AppStorage'
  ];

  function zLoginController(
    $cordovaOauth,
    zLoginModel, Users, U, Message,
    FACEBOOK_KEY, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, GOOGLE_OAUTH_CLIENT_ID, AppStorage
  ) {

    var Login = this;
    Login.Model = zLoginModel;

    Login.localLogin = localLogin;
    Login.loginWithFacebook = loginWithFacebook;
    Login.loginWithTwitter = loginWithTwitter;
    Login.loginWithGoogle = loginWithGoogle;

    //====================================================
    //  Implementation
    //====================================================
    function localLogin() {
      Message.loading();
      return userLogin()
        .then(function(userWrapper) {
          Message.hide();
          console.log("---------- userWrapper ----------");
          console.log(userWrapper);
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          AppStorage.isFirstTime = false;
          U.goToState('Main.MainTab.PostList.PostListRecent', null, 'forward');
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          if (err.status === 403) {
            return Message.alert('로그인 알림', '비밀번호/이메일이 틀렸습니다. 다시 입력해주세요');
          } else {
            return Message.alert();
          }
        });
    }

    function loginWithFacebook() {
      return $cordovaOauth.facebook(FACEBOOK_KEY, ["email", "public_profile"])
        .then(function(res) {
          console.log("---------- res ----------");
          console.log(res);
          //====================================================
          //  TODO: send token to our server
          //====================================================
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function loginWithTwitter() {
      return $cordovaOauth.twitter(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
        .then(function(res) {
          console.log("---------- res ----------");
          console.log(res);
          //====================================================
          //  TODO: send token to our server
          //====================================================
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

    function loginWithGoogle() {
      return $cordovaOauth.google(GOOGLE_OAUTH_CLIENT_ID, [
          "https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"
        ])
        .then(function(res) {
          console.log("---------- res ----------");
          console.log(res);
          //====================================================
          //  TODO: send token to our server
          //====================================================
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

    //====================================================
    //  REST
    //====================================================
    function userLogin() {
      return Users.login({}, {
          identifier: zLoginModel.form.identifier,
          password: zLoginModel.form.password
        }).$promise
        .then(function(userWrapper) {
          return userWrapper;
        });
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('zLoginModel', zLoginModel);

  zLoginModel.$inject = [];

  function zLoginModel() {

    var model = {
      form: {
        identifier: null,
        password: null
      }
    };
    return model;

  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('zPasswordController', zPasswordController);

  zPasswordController.$inject = [
    '$scope',
    'zPasswordModel', 'Users', 'Message', 'U'
  ];

  function zPasswordController(
    $scope,
    zPasswordModel, Users, Message, U
  ) {
    var Password = this;
    Password.Model = zPasswordModel;
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    Password.sendForm = sendForm;

    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      if (!validate()) {
        return Message.alert('비밀번호 변경 알림', '새로운 비밀번호와 재입력한 비밀번호가 다릅니다.');
      }
      return userChangePassword()
        .then(function(data) {
          console.log("---------- data ----------");
          console.log(data);
          return Message.alert('비밀번호 변경 알림', data.message);
        })
        .then(function() {
          reset();
          U.goBack();
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.alert('비밀번호 변경 알림', err.data.message);
          reset();
        });
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Helper
    //====================================================
    function validate() {
      if (zPasswordModel.form.newPassword !== zPasswordModel.newPasswordConfirm) {
        return false;
      } else if (true /*more logic*/ ) {
        // return false;
      }

      return true;
    }

    function reset() {
      zPasswordModel.form.oldPassword = '';
      zPasswordModel.form.newPassword = '';
      zPasswordModel.newPasswordConfirm = '';
    }

    //====================================================
    //  REST
    //====================================================
    function userChangePassword() {
      return Users.changePassword({
        oldPassword: zPasswordModel.form.oldPassword,
        newPassword: zPasswordModel.form.newPassword
      }).$promise;
    }
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('zPasswordModel', zPasswordModel);

  zPasswordModel.$inject = [];

  function zPasswordModel() {

    var Model = {
      form: {
        oldPassword: '',
        newPassword: ''
      },
      newPasswordConfirm: ''
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('zPostCreateController', zPostCreateController);

  zPostCreateController.$inject = [
    '$scope', '$q',
    'zPostCreateModel', 'Posts', 'U', 'Message'
  ];

  function zPostCreateController(
    $scope, $q,
    zPostCreateModel, Posts, U, Message
  ) {
    var initPromise;
    var noLoadingStates = [];
    var PostCreate = this;
    PostCreate.Model = zPostCreateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostCreate.createPost = createPost;

    //====================================================
    //  View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(zPostCreateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(message) {
            console.log("---------- message ----------");
            console.log(message);
          })
          .catch(function(err) {
            U.error(err);
          });
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function createPost() {
      Message.loading();
      return postCreate()
        .then(function(createdPost) {
          console.log("---------- createdPost ----------");
          console.log(createdPost);
          return Message.alert('글작성 알림', '글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          U.goToState('Main.zPostList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.resolve({
        message: 'empty'
      });
    }

    function reset() {
      zPostCreateModel.form.title = '';
      zPostCreateModel.form.content = '';
    }

    //====================================================
    //  REST
    //====================================================
    function postCreate() {
      var queryWrapper = {
        query: {
          category: 'CATEGORY_NAME-POST',
          title: zPostCreateModel.form.title,
          content: zPostCreateModel.form.content,
        }
      };
      return Posts.create({}, queryWrapper).$promise
        .then(function(dataWrapper) {
          var post = dataWrapper.data;
          return post;
        });
    }
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('PostFitWriteModel', PostFitWriteModel);

  PostFitWriteModel.$inject = [

  ];

  function PostFitWriteModel(

  ) {

    var Model = {
      form: {
        title: '',
        content: ''
      }
    };

    return Model;
  }
})();

(function(angular) {
  'use strict';
  angular.module('app')
    .controller('zPostDetailController', zPostDetailController);

  zPostDetailController.$inject = [
    '$scope', '$state', '$q',
    'zPostDetailModel', 'Posts', 'Comments', 'Message', 'U'
  ];

  function zPostDetailController(
    $scope, $state, $q,
    zPostDetailModel, Posts, Comments, Message, U
  ) {
    var initPromise;
    var noLoadingStates = [];
    var PostDetail = this;
    PostDetail.Model = zPostDetailModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostDetail.refresh = refresh;
    PostDetail.loadMoreComments = loadMoreComments;
    PostDetail.destroyPost = destroyPost;
    PostDetail.createComment = createComment;
    PostDetail.destroyComment = destroyComment;

    // App Specific
    PostDetail.showBubble = false;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(zPostDetailModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(array) {
            var post = array[0];
            var commentsWrapper = array[1];
            U.bindData(post, zPostDetailModel, 'post');
            U.bindData(commentsWrapper, zPostDetailModel, 'comments');
            console.log("---------- post ----------");
            console.log(post);
            console.log("---------- commentsWrapper ----------");
            console.log(commentsWrapper);
          })
          .catch(function(err) {
            U.error(err);
          });
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(array) {
          var post = array[0];
          var commentsWrapper = array[1];
          U.bindData(post, zPostDetailModel, 'post');
          U.bindData(commentsWrapper, zPostDetailModel, 'comments');
          console.log("---------- post ----------");
          console.log(post);
          console.log("---------- commentsWrapper ----------");
          console.log(commentsWrapper);
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMoreComments() {
      var last = zPostDetailModel.comments.length - 1;
      return commentsFind({
          id: {
            '<': zPostDetailModel.comments[last].id
          }
        })
        .then(function(commentsWrapper) {
          U.appendData(commentsWrapper, zPostDetailModel, 'comments');
          console.log("---------- commentsWrapper ----------");
          console.log(commentsWrapper);
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function destroyPost() {
      Message.loading();
      return postsDestroy()
        .then(function(destroyedPost) {
          console.log("---------- destroyedPost ----------");
          console.log(destroyedPost);
          return Message.alert('글삭제 알림', '글을 성공적으로 삭제하였습니다.');
        })
        .then(function() {
          U.goToState('Main.zPostList', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function createComment() {
      Message.loading();
      return commentsCreate()
        .then(function(createdComment) {
          console.log("---------- createdComment ----------");
          console.log(createdComment);
          refresh();
          return Message.alert('댓글달기 알림', '댓글을 성공적으로 작성하였습니다.');
        })
        .then(function() {
          reset();
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function destroyComment(commentId) {
      Message.loading();
      var extraQuery = {
        id: commentId
      };
      return commentsDestroy(extraQuery)
        .then(function(destroyedComment) {
          console.log("---------- destroyedComment ----------");
          console.log(destroyedComment);
          refresh();
          return Message.alert('댓글 알림', '댓글을 성공적으로 삭제하였습니다.');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return $q.all([postsFindOne(), commentsFind()]);
    }

    function reset() {
      U.resetSlides();
      PostDetail.showBubble = false;
      PostDetail.commentContent = '';
    }

    //====================================================
    // REST
    //====================================================
    function postsFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id,
          },
          populate: ['owner', 'photos']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then(function(post) {
          return post;
        });
    }

    function postsDestroy(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.destroy(queryWrapper).$promise
        .then(function(destroyedPost) {
          return destroyedPost;
        });
    }

    function commentsFind(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            post: $state.params.id,
          },
          sort: 'id DESC',
          limit: 20,
          populate: ['owner']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Comments.find(queryWrapper).$promise
        .then(function(commentsWrapper) {
          return commentsWrapper;
        });
    }


    function commentsCreate() {
      var queryWrapper = {
        query: {
          post: $state.params.id,
          content: PostDetail.form.commentContent
        }
      };
      return Comments.create({}, queryWrapper).$promise
        .then(function(createdComment) {
          return createdComment;
        });
    }

    function commentsDestroy(extraQuery) {
      var queryWrapper = {
        query: {
          where: {
            id: ''
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      return Comments.destroy(queryWrapper).$promise
        .then(function(destroyedComment) {
          return destroyedComment;
        });
    }

  } //end
})(angular);

(function() {
  'use strict';

  angular.module('app')
    .factory('zPostDetailModel', zPostDetailModel);

  zPostDetailModel.$inject = [

  ];

  function zPostDetailModel(

  ) {

    var Model = {
      loading: false,
      post: {},
      comments: [],
      form: {
        commentContent: ''
      }
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('zPostListController', zPostListController);

  zPostListController.$inject = [
    '$scope', '$q',
    'zPostListModel', 'U', 'Posts'
  ];

  function zPostListController(
    $scope, $q,
    zPostListModel, U, Posts
  ) {
    var initPromise;
    var noLoadingStates = [
      'Main.zPostDetail'
    ];
    var PostList = this;
    PostList.Model = zPostListModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    PostList.refresh = refresh;
    PostList.loadMore = loadMore;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(zPostListModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(postsWrapper) {
            console.log("---------- postsWrapper ----------");
            console.log(postsWrapper);
            U.bindData(postsWrapper, zPostListModel, 'posts');
          })
          .catch(function(err) {
            U.error(err);
          });
      } else {
        U.freeze(false);
      }
    }

    //====================================================
    //  Implementation
    //====================================================
    function refresh() {
      return init()
        .then(function(postsWrapper) {
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          U.bindData(postsWrapper, zPostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = zPostListModel.posts.length - 1;
      return find({
          id: {
            '<': zPostListModel.posts[last].id
          }
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, zPostListModel, 'posts');
        })
        .catch(function(err) {
          U.error(err);
        })
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return find();
    }

    //====================================================
    // REST
    //====================================================
    function find(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            category: 'CATEGORY_NAME-POST',
          },
          limit: 20,
          sort: 'updatedAt DESC',
          populate: ['owner']
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.find(queryWrapper).$promise
        .then(function(postsWrapper) {
          return postsWrapper;
        });
    }
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('zPostListModel', zPostListModel);

  zPostListModel.$inject = [];

  function zPostListModel() {

    var Model = {
      loading: false,
      posts: []
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('zPostUpdateController', zPostUpdateController);

  zPostUpdateController.$inject = [
    '$scope', '$state', '$q',
    'zPostUpdateModel', 'U', 'Posts', 'Message'
  ];

  function zPostUpdateController(
    $scope, $state, $q,
    zPostUpdateModel, U, Posts, Message
  ) {
    var initPromise;
    var noLoadingStates = [];
    var PostUpdate = this;
    PostUpdate.Model = zPostUpdateModel;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    PostUpdate.updatePost = updatePost;

    //====================================================
    // View Events
    //====================================================
    function onBeforeEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        U.loading(zPostUpdateModel);
        initPromise = init();
      }
    }

    function onAfterEnter() {
      if (!U.hasPreviousStates(noLoadingStates)) {
        return initPromise
          .then(function(post) {
            U.bindData(post, zPostUpdateModel, 'form');
            console.log("---------- post ----------");
            console.log(post);
          })
          .catch(function(err) {
            U.error(err);
          });
      }
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Implementation
    //====================================================
    function updatePost() {
      Message.loading();
      return postUpdate()
        .then(function(updatedPost) {
          console.log("---------- updatedPost ----------");
          console.log(updatedPost);
          return Message.alert('글 수정 알림', '글수정을 완료하였습니다.');
        })
        .then(function() {
          U.goToState('Main.zPostDetail', {
            id: $state.params.id
          }, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function init() {
      return postFindOne();
    }

    function reset() {
      zPostUpdateModel.form = {
        title: '',
        content: ''
      };
    }


    //====================================================
    //  REST
    //====================================================
    function postFindOne(extraQuery, extraOperation) {
      var queryWrapper = {
        query: {
          where: {
            id: $state.params.id
          }
        }
      };
      angular.extend(queryWrapper.query.where, extraQuery);
      angular.extend(queryWrapper.query, extraOperation);
      return Posts.findOne(queryWrapper).$promise
        .then(function(post) {
          return post;
        });
    }

    function postUpdate() {
      var queryWrapper = {
        query: {
          id: $state.params.id,
          title: zPostUpdateModel.form.title,
          content: zPostUpdateModel.form.content,
        }
      };

      return Posts.update({}, queryWrapper).$promise
        .then(function(updatedPost) {
          return updatedPost;
        });
    }
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('PostFitUpdateModel', PostFitUpdateModel);

  PostFitUpdateModel.$inject = [];

  function PostFitUpdateModel() {

    var Model = {
      form: {}
    };

    return Model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('zProfileController', zProfileController);

  zProfileController.$inject = [
    '$scope', '$timeout',
    'zProfileModel', 'Users', 'AppStorage', 'U', 'Photo', 'Message'
  ];

  function zProfileController(
    $scope, $timeout,
    zProfileModel, Users, AppStorage, U, Photo, Message
  ) {
    var Profile = this;
    Profile.Model = zProfileModel;
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);

    Profile.getPhoto = getPhoto;
    Profile.sendForm = sendForm;

    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      userFindOne()
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          $timeout(function() {
            AppStorage.user = user;
            zProfileModel.form = user;
            console.log("---------- zProfileModel.form ----------");
            console.log(zProfileModel.form);
          }, 0);
        })
        .catch(function(err) {
          return U.error(err);
        });
    }

    function getPhoto() {
      return Photo.get('gallery', 600, true, 300, 'square', 1)
        .then(function(base64) {
          zProfileModel.form.files = [base64];
        })
        .catch(function(err) {
          console.log("---------- err.data.message === cancelled ----------");
          console.log(err.data.message);
          // U.error(err);
        });
    }

    function sendForm() {
      Message.loading();
      userUpdate()
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          Message.hide();
          return Message.alert('프로필 변경 알림.', '프로필을 성공적으로 변경하였습니다.');
        })
        .then(function() {
          U.goBack();

        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.hide();
          Message.alert();
        });
    }


    //====================================================
    //  REST
    //====================================================
    function userFindOne() {
      return Users.findOne({
        id: AppStorage.user.id
      }).$promise;
    }

    function userUpdate() {
      return Users.update({}, {
        files: zProfileModel.form.files,
        name: zProfileModel.form.name,
        nickname: zProfileModel.form.nickname
      }).$promise;
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('zProfileModel', zProfileModel);

  zProfileModel.$inject = [];

  function zProfileModel() {

    var model = {
      form: {
        files: [],
        name: '',
        nickname: ''
      }
    };

    return model;
  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('zSignupController', zSignupController);

  zSignupController.$inject = [
    '$scope', '$timeout',
    'zSignupModel', 'Photo', 'Users', 'U', 'Message', 'Dom'
  ];

  function zSignupController(
    $scope, $timeout,
    zSignupModel, Photo, Users, U, Message, Dom
  ) {

    var Signup = this;
    Signup.Model = zSignupModel;

    Signup.getPicture = getPicture;
    Signup.register = register;

    //====================================================
    //  Implementation
    //====================================================
    function getPicture() {
      zSignupModel.imgLoading = true;
      return Photo.get('gallery', 800, true, 300, 'square', 1)
        .then(function(base64) {
          zSignupModel.form.files = [];
          zSignupModel.form.files[0] = base64;
          $timeout(function() {
            zSignupModel.imgLoading = false;
          }, 2000);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

    function register() {
      if (!validate()) {
        return false;
      }
      Message.loading();
      zSignupModel.form.username = zSignupModel.form.email;
      return userRegister()
        .then(function(data) {
          console.log("---------- data ----------");
          console.log(data);
          Message.alert('회원가입 알림', '회원가입을 성공적으로 하셨습니다.');
        })
        .then(function() {
          U.goToState('zLogin', null, 'back');
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    //====================================================
    //  Helper
    //====================================================
    function validate() {
      var alert = Message.alert.bind(Message, '회원가입 알림');
      var form = zSignupModel.form;
      if (zSignupModel.form.files.length === 0) {
        alert('사진을 등록해주세요');
        return false;
      } else if (!form.name) {
        alert('이름을 입력해주세요')
          .then(function() {
            Dom.focusById('name');
          });
        return false;
      } else if (!form.nickname) {
        alert('별명을 입력해주세요')
          .then(function() {
            Dom.focusById('nickname');
          });
        return false;
      } else if (!form.email) {
        alert('이메일을 입력해주세요')
          .then(function() {
            Dom.focusById('email');
          });
        return false;
      } else if (form.password !== zSignupModel.confirmPassword) {
        alert('비밀번호를 동일하게 입력해주세요')
          .then(function() {
            Dom.focusById('password');
          });
        return false;
      } else if (!validateEmail(form.email)) {
        alert('이메일이 아닙니다, 다시 입력해주세요')
          .then(function() {
            Dom.focusById('email');
          });
        return false;
      } else if (!zSignupModel.agree) {
        alert('이용약관을 동의 해주시기 바랍니다');
        return false;
      } else {
        return true;
      }
    }

    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    //====================================================
    //  REST
    //====================================================
    function userRegister() {
      var form = zSignupModel.form;
      return Users
        .register({}, {
          files: form.files,
          name: form.name,
          nickname: form.nickname,
          email: form.email,
          username: form.username,
          password: form.password
        }).$promise
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
    }

  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('zSignupModel', zSignupModel);

  zSignupModel.$inject = [];

  function zSignupModel() {

    var Model = {
      imgLoading: false,
      form: {
        files: [],
        name: '',
        nickname: '',
        email: '',
        username: '',
        password: ''
      },
      confirmPassword: null,
      agree: false
    };

    return Model;

  }
})();

(function() {
  'use strict';
  angular.module('app')
    .controller('zTermsController', zTermsController);

  zTermsController.$inject = [
    'zTermModel',
    'APP_NAME_KOREAN'
  ];

  function zTermsController(
    zTermModel,
    APP_NAME_KOREAN
  ) {
    var Terms = this;
    Terms.Model = zTermModel;

    Terms.appKorean = APP_NAME_KOREAN;
    //====================================================
    //  Implementation
    //====================================================
  }
})();

(function() {
  'use strict';

  angular.module('app')
    .factory('zTermsModel', zTermsModel);

  zTermsModel.$inject = [];

  function zTermsModel() {

    var model = {

    };

    return model;
  }
})();
