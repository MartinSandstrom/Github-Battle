'use strict';

/**
 * @ngdoc function
 * @name githubArenaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the githubArenaApp
 */
angular.module('githubArenaApp')
  .controller('MainCtrl', function ($scope, $http, $q, $timeout) {
		$scope.players = [];
		$scope.ready = false;
		$scope.roundsDone = false;
		$scope.master = -1;
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
				},
				winner: undefined
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
				},
				winner: undefined
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
				},
				winner: undefined
			},
			{
				title: 'Gists',
				score: function (player) {
					return player.repoData.public_gists;
				},
				winner: undefined
			},
			{
				title: 'Followers',
				score: function (player) {
					return player.repoData.followers;
				},
				winner: undefined
			},
		];

		$scope.properties = [
			'repos',
			'repoStars',
			'forks',
			'gists',
			'userFollowers'
		];

		$scope.propertyNames = {
			repos: 'Repos',
			repoStars: 'Repo stars',
			forks: 'Forks',
			gists: 'Gists',
			userFollowers: 'User followers'
		};

		$scope.winner = {
			repos: -1,
			repoStars: -1,
			forks: -1,
			gists: -1,
			userFollowers: -1
		};

		$scope.players[0] = {
			name: 'seriema',
			total: 0
		};

		$scope.players[1] = {
			name: 'odetocode',
			total: 0
		};

		$scope.fight = function () {
			var promises = [];
			$scope.roundsDone = false;

			angular.forEach($scope.players, function(player){
				promises.push($http.get('https://api.github.com/users/' + player.name + '/repos')
					.then(function(response){
						player.userData = response.data;
					}));
				promises.push($http.get('https://api.github.com/users/' + player.name)
					.success(function(data){
						player.repoData = data;
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
				$scope.master = $scope.players[0].total > $scope.players[1].total ? 0 : 1;
				return;
			}

			var round = rounds[currentRound];

			$timeout(function () {
				var winner = round.score($scope.players[0]) > round.score($scope.players[1]) ? 0 : 1;
				round.winner = $scope.players[winner];
				$scope.players[winner].total += 1;
			}, winnerDelay);

			$scope.rounds.push(round);
			currentRound++;

			$scope.wait();
		};

		$scope.wait = function () {
			$timeout(function () {
				$scope.nextRound();
			}, roundDelay);
		};
  });
