teamunApp.controller('ClimbGameClimbingCtrl', ['$interval', '$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'ngAudio', 'ClimbGameService', 'DEFAULT_DOMAIN', function($interval, $scope, $rootScope, $state, $stateParams, $location, toaster, $timeout, ngAudio, ClimbGameService, DEFAULT_DOMAIN) {

  $scope.unionid = $stateParams.unionid;
  $scope.nickname = $stateParams.nickname;
  $scope.headimgurl = decodeURIComponent($stateParams.headimgurl);
  $scope.sex = $stateParams.sex;
  $scope.city = $stateParams.city;
  $scope.narutosound = ngAudio.load("sounds/narutoedit.mp3")

  // alert($location.absUrl());

  $scope.onTouchstartLeft = function($event) {
    angular.element(document.querySelector('#dustom-drum-active')).attr("style", 'display:block');
  }

  $scope.onTouchendLeft = function($event) {
    angular.element(document.querySelector('#dustom-drum-active')).attr("style", 'display:none');
  }

  $scope.onTouchstartRight = function($event) {
    angular.element(document.querySelector('#dustom-drum-active-2')).attr("style", 'display:block');
  }

  $scope.onTouchendRight = function($event) {
    angular.element(document.querySelector('#dustom-drum-active-2')).attr("style", 'display:none');
  }

  $scope.ready = function() {
    $scope.narutosound.play();
    angular.element(document.querySelector('.modal')).attr("style", 'display:none');
    angular.element(document.querySelector('.custom-ready-go')).append("<img src='images/ready-go.gif' class='img-responsive' />");
    $timeout(go, 2000);
  };

  $scope.ss = 10;
  $scope.ms = 10;
  var countdown;
  $scope.usetime = 0;

  function go() {
    countdown = $interval(function() {
      $scope.ms--;
      if ($scope.ss === 0) {
        $scope.ss = 0;
        $scope.ms = 0;
        $interval.cancel(countdown);

        var hms = $scope.ss + '.' + $scope.ms;
        $scope.usetime = (10 - parseFloat(hms)).toFixed(1);
        $scope.narutosound.stop();
        $timeout(getRanking, 1000);

      } else {
        if ($scope.ms === 0) {
          $scope.ss--;
          $scope.ms = 9;
        }
      }
    }, 100, 0);
  };

  var meter = 0;
  $scope.topmeter = '';
  $scope.climb = function() {
    if (meter >= 71) {
      $interval.cancel(countdown);
      $scope.topmeter = '8848';
      var hms = $scope.ss + '.' + $scope.ms;
      $scope.usetime = (10 - parseFloat(hms)).toFixed(1);
      $scope.narutosound.stop();
      $timeout(getRanking, 1000);

    } else {
      meter += 2;
      angular.element(document.querySelector('#custom-avatar')).attr("style", coordinates[meter]);
    }
  };

  function getRanking() {
    $state.go('climb-game-ranking', {
      unionid: $scope.unionid,
      nickname: $scope.nickname,
      headimgurl: $scope.headimgurl,
      sex: $scope.sex,
      meter: meter,
      time: $scope.usetime,
      city: $scope.city
    });
  }

  var coordinates = [
    'bottom:12%; left:38%;',
    'bottom:23%; left:37%;',
    'bottom:24%; left:36%;',
    'bottom:25%; left:35%;',
    'bottom:26%; left:34%;',
    'bottom:27%; left:33%;',
    'bottom:28%; left:32%;',
    'bottom:29%; left:31%;',
    'bottom:30%; left:32%;',
    'bottom:31%; left:33%;',
    'bottom:32%; left:34%;',
    'bottom:33%; left:35%;',
    'bottom:34%; left:36%;',
    'bottom:35%; left:37%;',
    'bottom:36%; left:38%;',
    'bottom:37%; left:39%;',
    'bottom:37%; left:40%;',
    'bottom:37%; left:41%;',
    'bottom:37%; left:42%;',
    'bottom:37%; left:43%;',
    'bottom:37%; left:44%;',
    'bottom:37%; left:45%;',
    'bottom:37%; left:46%;',
    'bottom:38%; left:47%;',
    'bottom:39%; left:48%;',
    'bottom:40%; left:49%;',
    'bottom:41%; left:50%;',
    'bottom:42%; left:51%;',
    'bottom:42%; left:52%;',
    'bottom:43%; left:51%;',
    'bottom:44%; left:50%;',
    'bottom:45%; left:49%;',
    'bottom:46%; left:48%;',
    'bottom:47%; left:49%;',
    'bottom:47%; left:50%;',
    'bottom:47%; left:51%;',
    'bottom:47%; left:52%;',
    'bottom:48%; left:53%;',
    'bottom:48%; left:54%;',
    'bottom:49%; left:55%;',
    'bottom:50%; left:56%;',
    'bottom:51%; left:57%;',
    'bottom:52%; left:58%;',
    'bottom:53%; left:59%;',
    'bottom:54%; left:60%;',
    'bottom:55%; left:61%;',
    'bottom:55%; left:62%;',
    'bottom:55%; left:63%;',
    'bottom:56%; left:64%;',
    'bottom:57%; left:65%;',
    "bottom:58%; left:66%;",
    'bottom:59%; left:67%;',
    'bottom:60%; left:66%;',
    'bottom:61%; left:65%;',
    'bottom:62%; left:64%;',
    'bottom:63%; left:63%;',
    'bottom:64%; left:62%;',
    'bottom:65%; left:61%;',
    'bottom:66%; left:60%;',
    'bottom:67%; left:59%;',
    'bottom:68%; left:58%;',
    "bottom:69%; left:57%;",
    'bottom:70%; left:56%;',
    'bottom:71%; left:55%;',
    'bottom:72%; left:55%;',
    'bottom:73%; left:54%;',
    'bottom:74%; left:54%;',
    'bottom:75%; left:54%;',
    'bottom:76%; left:54%;',
    'bottom:77%; left:53%;',
    'bottom:78%; left:52%;'
  ]

}]);
