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
		var roundIndex = 0;
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
					return countRepoProperty(player, 'stargazers_count');
				}
			},
			{
				title: 'Forks',
				score: function (player) {
					return countRepoProperty(player, 'forks_count');
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

		function countRepoProperty(player, property) {
			var stargazers = _.map(player.userData, function (repo) {
				return repo[property];
			});
			var stars = _.reduce(stargazers, function (memo, num) {
				return memo + num;
			});
			return stars;
		}

		function currentRound() {
			return rounds[roundIndex];
		}

		function nextRound() {
			roundIndex++;
		}

		function roundsFinished() {
			return roundIndex >= rounds.length;
		}

		function resetRounds() {
			roundIndex = 0;
		}

		function newRound() {
			var newRound = {};
			angular.copy(currentRound(), newRound);
			nextRound();
			return newRound;
		}

		return {
			finished: roundsFinished,
			reset: resetRounds,
			startNew: newRound
		};
  });
