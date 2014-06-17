'use strict';

/**
 * @ngdoc function
 * @name githubArenaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the githubArenaApp
 */
angular.module('githubArenaApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
