teamunApp.controller('ActivityListCtrl', ['$scope', '$state', '$stateParams', '$location', 'toaster', 'ActivityService', function($scope, $state, $stateParams, $location, toaster, ActivityService) {

  $scope.manageFlag = false;
  $scope.eventDay = [];
  $scope.openid = $stateParams.openid;
  ActivityService.activityList.get({'openid': $stateParams.openid}, function(data) {
    $scope.activityList = data.activities;
  }, function(error) {
    toaster.pop('error', error.data);
  });

  $scope.myactivities = [];

  $scope.manage = function(flag) {
    $scope.manageFlag = flag;
  };

  $scope.remove = function(myactivities, openid) {
    if (myactivities.length != 0) {
      ActivityService.remove.remove({
        openid: openid,
        myactivities: myactivities
      }, function(response) {
        toaster.pop('success', "删除成功");
        $state.reload();
      }, function(error) {
        toaster.pop('error', error.data);
      });
    }
  };


  Array.prototype.contains = function(item) {
    return RegExp("\\b" + item + "\\b").test(this);
  };

  Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == val) return i;
    }
    return -1;
  };
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  $scope.check = function(checkId, value) {
    if ($scope.myactivities.contains(value)) {
      angular.element(document.querySelector('#' + checkId)).attr('checked', false);
      $scope.myactivities.remove(value);
    } else {
      angular.element(document.querySelector('#' + checkId)).attr('checked', true);
      $scope.myactivities.push(value);
    }
  };

}]);
