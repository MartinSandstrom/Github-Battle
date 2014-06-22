'use strict';

/**
 * @ngdoc service
 * @name githubArenaApp.Rounds
 * @description
 * # Rounds
 * Service in the githubArenaApp.
 */
angular.module('githubArenaApp')
  .factory('Rounds', function Rounds() {
		var _currentRound = 0;
		var _rounds = [
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

		function currentRound() {
			return _rounds[_currentRound];
		}

		function nextRound() {
			_currentRound++;
		}

		function roundsFinished() {
			return _currentRound >= _rounds.length;
		}

		function resetRounds() {
			_currentRound = 0;
		}

		function currentRoundIndex() {
			return _currentRound;
		}

		return {
			rounds: _rounds,
			current: currentRound,
			next: nextRound,
			finished: roundsFinished,
			reset: resetRounds,
			currentIndex: currentRoundIndex
		};
  });
