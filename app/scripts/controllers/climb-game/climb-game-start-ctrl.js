teamunApp.controller('ClimbGameStartCtrl', ['$filter', '$sce', '$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'Upload', 'ClimbGameService', 'DEFAULT_DOMAIN', function($filter, $sce, $scope, $rootScope, $state, $stateParams, $location, toaster, $timeout, Upload, ClimbGameService, DEFAULT_DOMAIN) {

  // alert($location.absUrl());

  ClimbGameService.userInfo.get({
    code: $location.search().code
  }, function(data) {
    $scope.userinfo = data.userinfo;
  }, function(error) {
    toaster.pop('error', error);
  });

  // $scope.startClimbing = function(userinfo) {
  //   console.log(userinfo);
  //   $state.go('climb-game-climbing', {
  //     unionid: userinfo.unionid,
  //     nickname: userinfo.nickname,
  //     headimgurl: userinfo.headimgurl,
  //     sex: userinfo.sex,
  //     city: userinfo.city
  //   });
  // };

}]);
