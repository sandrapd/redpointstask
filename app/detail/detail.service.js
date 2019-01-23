(function () {
	'use strict';

	angular.module('detail').service('detailService', detailService);

	detailService.$inject = ['$http'];

	function detailService($http) {

		var service = {
			getInfo: getInfo,
			getReviews: getReviews,
			getKey: getKey,
			getCredits: getCredits,
		}

		var content = '&content-type=application/json;charset=utf-8';
		var lang = '&language=en-US';

		function getKey (postInit) {
				$http.get('assets/api_key.json')
					.then(function successCallback(response){
					postInit(response.data.key);
				});
		}

		// Get movie info 
		function getInfo(key, id, callbackFunc){
			var dir = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + key + lang;
			callApi(dir, callbackFunc);
		} 

		// Get reviews 
		function getReviews(key, id, callbackFunc){
			var dir = 'https://api.themoviedb.org/3/movie/' + id + '/reviews?api_key=' + key + lang;
			callApi(dir, callbackFunc);
		} 
		
		// Get credits 
		function getCredits(key, id, callbackFunc){
			var dir = 'https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + key + lang;
			callApi(dir, callbackFunc);
		} 
		
		// Http get to TMDB
		function callApi(dir, callbackFunc){
			$http.get(dir)
				.then(function success(response) { callbackFunc(response.data)}, function errorCallback(response){
				console.log("Unable to perform get request");
			});
		}

		return service;
	}

})();