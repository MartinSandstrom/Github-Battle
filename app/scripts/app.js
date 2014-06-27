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
		'countTo'
  ])
	.value('_', window._)
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
			.when('/contact', {
				templateUrl: 'views/contact.html'
			})
      .otherwise({
        redirectTo: '/'
      });
  });
