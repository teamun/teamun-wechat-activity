'use strict';
/**
 * @ngdoc overview
 * @name teamunApp
 * @description
 * #
 * 队部JS库依赖以及程序路由主配置文件
 */
var teamunApp = angular.module('teamunApp', [
  'ngAnimate',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ui.router',
  'ngResource',
  'textAngular',
  'ngFileUpload',
  'toaster',
  'angular-carousel',
  'angular-loading-bar'
]);


teamunApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('activity-list', {
        url: '/activity-list/:openid',
        views: {
          '': {
            templateUrl: 'views/activities/activity-list.html',
            controller: 'ActivityListCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-list-ctrl'
          }
        }
      })
      .state('activity-add', {
        url: '/activity-add/:openid',
        views: {
          '': {
            templateUrl: 'views/activities/activity-add.html',
            controller: 'ActivityAddCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-add-ctrl'
          }
        }
      })
      .state('activity-detail', {
        url: '/activity-detail/:activity_id',
        views: {
          '': {
            templateUrl: 'views/activities/activity-detail.html',
            controller: 'ActivityDetailCtrl',
            controllerUrl: 'scripts/controllers/activities/activity-detail-ctrl'
          }
        }
      })
      .state('official-activity-list', {
        url: '/official-activity-list',
        views: {
          '': {
            templateUrl: 'views/activities/official-activity-list.html',
            controller: 'OfficialActivityListCtrl',
            controllerUrl: 'scripts/controllers/activities/official-activity-list-ctrl'
          }
        }
      })
      /**---------------------------------------------  登山游戏  -----------------------------------------------------*/
      .state('climb-game-start', {
        url: '/climb-game-start',
        views: {
          '': {
            templateUrl: 'views/climb-game/climb-game-start.html',
            controller: 'ClimbGameStartCtrl',
            controllerUrl: 'scripts/controllers/climb-game/climb-game-start-ctrl'
          }
        }
      })
      .state('climb-game-climbing', {
        url: '/climb-game-climbing/:unionid/:nickname/:headimgurl/:sex/:city',
        views: {
          '': {
            templateUrl: 'views/climb-game/climb-game-climbing.html',
            controller: 'ClimbGameClimbingCtrl',
            controllerUrl: 'scripts/controllers/climb-game/climb-game-climbing-ctrl'
          }
        }
      })
      .state('climb-game-ranking', {
        url: '/climb-game-ranking/:unionid/:nickname/:headimgurl/:sex/:meter/:time/:city',
        views: {
          '': {
            templateUrl: 'views/climb-game/climb-game-ranking.html',
            controller: 'ClimbGameRankingCtrl',
            controllerUrl: 'scripts/controllers/climb-game/climb-game-ranking-ctrl'
          }
        }
      })
      ;

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');

  }]);

teamunApp.constant('DEFAULT_DOMAIN', '/api');
