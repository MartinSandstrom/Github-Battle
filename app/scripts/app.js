'use strict';

/**
 * @ngdoc overview
 * @name githubArenaApp
 * @description
 * # githubArenaApp
 *
 * Main module of the application.
 */
angular
  .module('githubArenaApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch',
		'ui.bootstrap',
		'countTo'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });