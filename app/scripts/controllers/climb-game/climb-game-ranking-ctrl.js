teamunApp.controller('ClimbGameRankingCtrl', ['$filter', '$sce', '$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'Upload', 'ClimbGameService', 'DEFAULT_DOMAIN', function($filter, $sce, $scope, $rootScope, $state, $stateParams, $location, toaster, $timeout, Upload, ClimbGameService, DEFAULT_DOMAIN) {

  $scope.unionid = $stateParams.unionid;
  $scope.nickname = $stateParams.nickname;
  $scope.headimgurl = decodeURIComponent($stateParams.headimgurl);
  $scope.sex = $stateParams.sex;
  $scope.meter = $stateParams.meter;
  $scope.time = $stateParams.time;
  $scope.city = $stateParams.city;

  // alert($location.absUrl());

  var game = {
    unionid: $scope.unionid,
    nickname: $scope.nickname,
    headimgurl: $scope.headimgurl,
    sex: $scope.sex,
    meter: $scope.meter,
    city: $scope.city
  };

  ClimbGameService.ranking.save({}, $.param(game), function(data) {
    $scope.rank = data.data;
   	if (data.data.register) {
   		if (data.data.register && data.data.lottery != null) {
   			angular.element(document.querySelector('#showAward')).show();
   		} else {
   			angular.element(document.querySelector('#noAward')).show();
   		}
   	} else {
   		if (data.data.result.ranktitle > 2) {
	      angular.element(document.querySelector('#getAward')).show();
	    } else {
	      angular.element(document.querySelector('#noAward')).show();
	    }
   	}
    
  }, function(error) {
    toaster.pop('error', error);
  });


  $scope.register = function() {
    var mobile = angular.element(document.querySelector('#registerMobile')).val();

    var telReg = !!mobile.match(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
    if (!telReg) {
    	toaster.pop('error', '请正确填写手机号码');
    } else {
      var user = {
        unionid: $stateParams.unionid,
        mobile: mobile
      }
      ClimbGameService.register.save($.param(user), function(data) {
        $scope.rank = data.data;
        if (data.ret == 1) {
          angular.element(document.querySelector('#getAward')).hide();
          angular.element(document.querySelector('#showAward')).show();
          angular.element(document.querySelector('#mobileModal')).modal('hide');
        }
      }, function(error) {
        toaster.pop('error', error.data.message);
      });
    }


  };
}]);
