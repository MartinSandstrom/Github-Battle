'use strict';

/**
 * @ngdoc function
 * @name githubArenaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the githubArenaApp
 */
angular.module('githubArenaApp')
  .controller('MainCtrl', function ($scope, $q, $timeout, Github, Rounds, _) {
      $scope.players = [];
      $scope.ready = false;
      $scope.roundsDone = false;
      $scope.master = {};
      $scope.rounds = [];
      $scope.countDelay = 1;
      var winnerDelay = 1000;
      var roundDelay = 1500; //2000;

      
      $scope.players[0] = {
          name: 'seriema',
          total: 0
      };

      $scope.players[1] = {
          name: 'odetocode',
          total: 0
      };

      $scope.reset = function () {
          $scope.ready = false;
          $scope.roundsDone = false;
          $scope.master = {};
          $scope.rounds = [];
          Rounds.reset();
          angular.forEach($scope.players, function (player) {
              player.total = 0;
              player.userData = {};
              player.repoData = {};
          });
      };

      $scope.fight = function () {
          var promises = [];
          $scope.roundsDone = false;

          angular.forEach($scope.players, function (player) {
              promises.push(Github.repo(player.name)
					.then(function (response) {
					    player.repoData = response.data;
					}));
              promises.push(Github.user(player.name)
					.then(function (response) {
					    player.userData = response.data;
					}));
          });

          $q.all(promises).then(function () {
              angular.forEach($scope.players, function (player) {

              });

              $scope.ready = true;
              $scope.nextRound();
          });
      };

      $scope.nextRound = function () {
          if (Rounds.finished()) {
              $scope.roundsDone = true;
              var master = $scope.players[0].total > $scope.players[1].total ? 0 : 1;
              $scope.master.name = $scope.players[master].name;
              return;
          }

          var newRound = Rounds.startNew();
          $scope.rounds.push(newRound);
          (function (current) {
              $timeout(function () {
                  var winner = current.score($scope.players[0]) > current.score($scope.players[1]) ? 0 : 1;
                  current.winner = $scope.players[winner];
                  $scope.players[winner].total += 1;
              }, winnerDelay);
          } (newRound));
          $scope.wait();
      };

      $scope.wait = function () {
          $timeout(function () {
              $scope.nextRound();
          }, roundDelay);
      };
  });
