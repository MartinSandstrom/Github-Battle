'use strict';

/**
 * @ngdoc function
 * @name githubArenaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the githubArenaApp
 */
angular.module('githubArenaApp')
  .controller('MainCtrl', function ($scope, $http, $q) {
		$scope.players = [];
		$scope.ready = false;
		$scope.master = -1;

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
			repos: 0,
			repoStars: 0,
			forks: 0,
			gists: 0,
			userFollowers: 0,
			total: 0
		};

		$scope.players[1] = {
			name: 'odetocode',
			repos: 0,
			repoStars: 0,
			forks: 0,
			gists: 0,
			userFollowers: 0,
			total: 0
		};

		$scope.fight = function () {
			var promises = [];

			angular.forEach($scope.players, function(player){
				promises.push($http.get('https://api.github.com/users/' + player.name + '/repos')
					.then(function(response){
						player.repos = response.data.length;

						var stargazers = _.map(response.data, function (repo) {
							return repo.stargazers_count;
						});
						player.repoStars = _.reduce(stargazers, function (memo, num) {
							return memo + num;
						});

						var forks = _.map(response.data,function(repo){
								return repo.forks_count;
						});
						player.forks = _.reduce(forks, function(sum, num){
							 return sum + num;
						});
					}));
				promises.push($http.get('https://api.github.com/users/' + player.name)
					.success(function(data){
						 player.userFollowers = data.followers;
						 player.gists = data.public_gists;
					}));
			});

			$q.all(promises).then(function () {
				angular.forEach($scope.players, function(player) {
				});

				angular.forEach($scope.properties, function(property) {
					var winner = $scope.players[0][property] > $scope.players[1][property] ? 0 : 1;
					$scope.winner[property] = winner;
					$scope.players[winner].total += 1;
				});

				$scope.master = $scope.players[0].total > $scope.players[1].total ? 0 : 1;

				$scope.ready = true;
			});
		};
  });
