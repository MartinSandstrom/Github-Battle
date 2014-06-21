'use strict';

/**
 * @ngdoc service
 * @name githubArenaApp.Github
 * @description
 * # Github
 * Service in the githubArenaApp.
 */
angular.module('githubArenaApp')
  .service('Github', function Github($http, $q) {
		var cache = {
			repo: {},
			user: {}
		};
		var ls = window.localStorage.getItem('cache');
		if (ls)
			cache = JSON.parse(ls);

		var baseUrl = 'https://api.github.com/users/';

		function wrapPromise(data) {
			var deferred = $q.defer();
			deferred.resolve({ data: data });
			return deferred.promise;
		}

		function cachedCall(target, username, url) {
			var cachedData = cache[target][username];
			if (cachedData) {
				return wrapPromise(cachedData);
			}

			return $http.get(url).success(function (data) {
				cache[target][username] = data;
				window.localStorage.setItem('cache', JSON.stringify(cache));
			});
		}

		this.repo = function (username) {
			return cachedCall('repo', username, baseUrl + username + '/repos');
		};

		this.user = function (username) {
			return cachedCall('user', username, baseUrl + username);
		};
  });
