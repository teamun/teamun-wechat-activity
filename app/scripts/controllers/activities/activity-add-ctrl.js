teamunApp.controller('ActivityAddCtrl', ['$filter', '$sce', '$scope', '$rootScope', '$state', '$stateParams', '$location', 'toaster', '$timeout', 'Upload', 'ActivityService', 'DEFAULT_DOMAIN', function($filter, $sce, $scope, $rootScope, $state, $stateParams, $location, toaster, $timeout, Upload, ActivityService, DEFAULT_DOMAIN) {

  $scope.openid = $stateParams.openid;
  $scope.canvasFlag = false;

  $scope.cancel = function() {
    $scope.canvasFlag = false;
  };

  // $scope.$watch('files', function() {
  //   $scope.upload($scope.files);
  // });

  // $scope.progress = '';
  // $scope.posters = [];
  // $scope.upload = function(files) {
  //   if (files.length > 4) {
  //     toaster.pop('error', '最多只能上传四张图片');
  //   } else {
  //     if (files && files.length) {
  //       for (var i = 0; i < files.length; i++) {
  //         var file = files[i];
  //         Ahdin.compress({
  //           sourceFile: file,
  //           maxWidth: 500,
  //           maxHeight: 500,
  //           outputFormat: 'jpeg',
  //           quality: 0.7
  //         }).then(function(compressedBlob) {
  //           Upload.upload({
  //             url: DEFAULT_DOMAIN + '/upload',
  //             method: 'POST',
  //             file: compressedBlob
  //           }).progress(function(evt) {
  //             var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //             $scope.progress = progressPercentage;
  //           }).success(function(data, status, headers, config) {
  //             $timeout(function() {
  //               $scope.posters.push(data.imgurl);
  //               $scope.canvasFlag = false;
  //             });
  //           });
  //         });
  //       }
  //     }
  //   }
  // };

  // $scope.$watch('startTime', function() {
  //   var endTime = parseDate($scope.startTime);
  //   endTime.setHours(endTime.getHours() + 2);
  //   $scope.endTime = formatDate(endTime);
  // });

  $scope.saveActivity = function(activity) {
    var posters = [];
    var waituploadimg = angular.element(document.getElementsByName('waituploadimg'));
    for (var i = 0; i < waituploadimg.length; i++) {
      posters.push(waituploadimg[i].value);
    };
    activity.posters = posters;

    if(posters.length < 1) {
      toaster.pop('error', '请至少上传一张活动图片');
      return false;
    }

    if (!angular.element(document.querySelector('#startTime')).val() || !angular.element(document.querySelector('#endTime')).val()) {
      toaster.pop('error', '请填写活动起止时间');
      return false;
    }

    var startTime = (new Date(angular.element(document.querySelector('#startTime')).val()).getTime() - 28800000);
    var endTime = (new Date(angular.element(document.querySelector('#endTime')).val()).getTime() - 28800000);

    if(startTime > endTime) {
      toaster.pop('error', '结束日期不能小于开始日期');
      return false;
    }
    
    activity.startTime = startTime;
    activity.endTime = endTime;
    ActivityService.saveActivity.save($.param(activity), function(data) {
      toaster.pop('success', '创建成功');
      // $location.path('/activity-detail/' + data.activity._id);
      $state.go('activity-detail', {
        activity_id: data.activity._id
      });
    }, function(error) {
      toaster.pop('error', error.data.message);
    });
  };


}]);
