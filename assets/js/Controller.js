angular.module('myApp', [])
  .controller('myCtrl', function($scope, $http) {

    $scope.sendPost = function() {
      var regEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
      var name = $scope.name;
      var tel = $scope.tel;
      var title = $scope.title;
      var content = $scope.content;

      if (!regEmail.test($scope.mail)) {
        alert("Mail을 확인해주세요.");
        return false;
      } else {
        mail = $scope.mail;
      }

      if (CheckUndefined(name) != '' && CheckUndefined(mail) != '' && CheckUndefined(content) != '') {

        var data = {
          name: name,
          mail: mail,
          tel: tel,
          title: title,
          content: content
        };

        $http({
            method: 'POST',
            url: 'http://192.168.0.65:1337/contact/admin',
            data: data,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          })
          .success(function(data, status, headers, config) {
            if (data) {
              console.log("success" + JSON.stringify(data));
              alert("메일 전송에 성공하였습니다.");
              $scope.name = "";
              $scope.mail = "";
              $scope.tel = "";
              $scope.title = "";
              $scope.content = "";
            } else {
              alert("메일 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.");
            }
          })
          .error(function(data, status, headers, config) {
            alert("메일 전송에 실패하였습니다. 잠시 후 다시 시도해주세요.");
          });

      } else {
        alert("입력한 내용을 확인해주세요.");
      }


    }; //sendPost


    function CheckUndefined(text) {
      if (!text) {
        return '';
      } else {
        return text;
      }
    }
  }); //end
