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
		var baseUrl = 'https://api.github.com/users/';

		var cache = {};
		var ls = window.localStorage.getItem('cache');
		if (ls)
			cache = JSON.parse(ls);

		function wrapPromise(data) {
			var deferred = $q.defer();
			deferred.resolve({ data: data });
			return deferred.promise;
		}

		function cachedCall(url) {
			var cachedData = cache[url];
			if (cachedData) {
				return wrapPromise(cachedData);
			}

			return $http.get(url).success(function (data) {
				cache[url] = data;
				window.localStorage.setItem('cache', JSON.stringify(cache));
			});
		}

		this.repo = function (username) {
			return cachedCall(baseUrl + username + '/repos');
		};

		this.user = function (username) {
			return cachedCall(baseUrl + username);
		};
  });
