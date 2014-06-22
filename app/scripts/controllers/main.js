'use strict';

/**
 * @ngdoc function
 * @name githubArenaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the githubArenaApp
 */
angular.module('githubArenaApp')
  .controller('MainCtrl', function ($scope, $q, $timeout, Github, _) {
		$scope.players = [];
		$scope.ready = false;
		$scope.roundsDone = false;
		$scope.master = {};
		$scope.rounds = [];
		$scope.countDelay = 1;
		var winnerDelay = 1400;
		var roundDelay = 1500; //2000;
		var currentRound = 0;
		var rounds = [
			{
				title: 'Repos',
				score: function (player) {
					return player.userData.length;
				}
			},
			{
				title: 'Repos stars',
				score: function (player) {
					var stargazers = _.map(player.userData, function (repo) {
						return repo.stargazers_count;
					});
					var stars = _.reduce(stargazers, function (memo, num) {
						return memo + num;
					});

					return stars;
				}
			},
			{
				title: 'Forks',
				score: function (player) {
					var forks = _.map(player.userData,function(repo){
						return repo.forks_count;
					});
					var forks = _.reduce(forks, function(sum, num){
						return sum + num;
					});

					return forks;
				}
			},
			{
				title: 'Gists',
				score: function (player) {
					return player.repoData.public_gists;
				}
			},
			{
				title: 'Followers',
				score: function (player) {
					return player.repoData.followers;
				}
			}
		];

		$scope.players[0] = {
			name: 'seriema',
			total: 0
		};

		$scope.players[1] = {
			name: 'odetocode',
			total: 0
		};

		$scope.reset = function(){
			$scope.ready = false;
			$scope.roundsDone = false;
			$scope.master = {};
			$scope.rounds = [];
			currentRound = 0;
			angular.forEach($scope.players, function(player) {
				player.total = 0;
				player.userData = {};
				player.repoData = {};
			});
		};

		$scope.fight = function () {
			var promises = [];
			$scope.roundsDone = false;

			angular.forEach($scope.players, function(player){
				promises.push(Github.repo(player.name)
					.then(function(response){
						player.userData = response.data;
					}));
				promises.push(Github.user(player.name)
					.then(function(response){
						player.repoData = response.data;
					}));
			});

			$q.all(promises).then(function () {
				angular.forEach($scope.players, function(player) {

				});

				$scope.ready = true;
				$scope.nextRound();
			});
		};

		$scope.nextRound = function () {
			if (currentRound === rounds.length) {
				$scope.roundsDone = true;
				var master = $scope.players[0].total > $scope.players[1].total ? 0 : 1;
				$scope.master.name = $scope.players[master].name;
				return;
			}

			var newRound = {};
			angular.copy(rounds[currentRound], newRound);
			$scope.rounds.push(newRound);
			(function (current) {
				$timeout(function () {
					var winner = rounds[current].score($scope.players[0]) > rounds[current].score($scope.players[1]) ? 0 : 1;
					$scope.rounds[current].winner = $scope.players[winner];
					$scope.players[winner].total += 1;
				}, winnerDelay);
			}(currentRound));

			currentRound++;

			$scope.wait();
		};

		$scope.wait = function () {
			$timeout(function () {
				$scope.nextRound();
			}, roundDelay);
		};
  });
