teamunApp.controller('ActivityDetailCtrl', ['$scope', '$state', '$stateParams', '$location', 'toaster', 'ActivityService', function($scope, $state, $stateParams, $location, toaster, ActivityService) {

  $scope.isJoin = false;
  $scope.isCreator = false;

  ActivityService.activity.get({activity_id: $stateParams.activity_id, code: $location.search().code}, function(data) {
    $scope.activity = data.activity;
    $scope.userinfo = data.userinfo;
    ActivityService.joinList.get({activity_id: $stateParams.activity_id}, function(data) {
      $scope.joinRecords = data.joinRecords;
      if ($scope.userinfo) {
        for (var i = 0; i < data.joinRecords.length; i++) {
          if (data.joinRecords[i].openid == $scope.userinfo.openid) {
            $scope.isJoin = true;
          }
        }
        if ($scope.userinfo.openid == $scope.activity.openid) {
          $scope.isCreator = true;
        }
      }
    }, function(error) {
      toaster.pop('error', error.data);
    });
  }, function(error) {
    toaster.pop('error', error.data);
  });


  $scope.join = function(activity, userinfo) {
    ActivityService.joinActivity.save({activity_id: activity._id}, $.param(userinfo), function(data) {
      toaster.pop('success', '加入成功');
      $scope.isJoin = true;
      ActivityService.joinList.get({activity_id: $stateParams.activity_id}, function(data) {
        $scope.joinRecords = data.joinRecords;
      }, function(error) {
        toaster.pop('error', error.data);
      });
    }, function(error) {
      toaster.pop('error', error.data);
    });
  };


  $scope.quit = function(activity, userinfo) {
  	var join_id = 0;
  	for (var i = 0; i < $scope.joinRecords.length; i++) {
      if (activity._id == $scope.joinRecords[i].activity) {
        join_id = $scope.joinRecords[i]._id;
      }
    }
    ActivityService.quit.remove({openid: userinfo.openid, activity_id: activity._id, join_id: join_id}, function(response) {
      toaster.pop('success', '退出成功');
      $scope.isJoin = false;
      ActivityService.joinList.get({activity_id: $stateParams.activity_id}, function(data) {
        $scope.joinRecords = data.joinRecords;
      }, function(error) {
        toaster.pop('error', error.data);
      });
    }, function(error) {
      toaster.pop('error', error.data);
    });
  };


}]);
