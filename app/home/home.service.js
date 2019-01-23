(function () {
	'use strict';

	angular.module('home').service('homeService', homeService);

	homeService.$inject = ['$http'];

	function homeService($http) {

		var service = { 
			getPopular: getPopular,
			getCategories: getCategories,
			search: search,
			getKey: getKey
		}

		var content = '&content-type=application/json;charset=utf-8';
		var lang = '&language=en-US';

		//Read key from json
		function getKey (postInit) {
				$http.get('assets/api_key.json')
					.then(function successCallback(response){					
					postInit(response.data.key);
				});
		}

		// Function to get popular movies 
		function getPopular(key, callbackFunc){
			var dir = 'https://api.themoviedb.org/3/movie/popular?sort_by=popularity.desc&api_key=' + key + content;
			callApi(dir, callbackFunc);
		}

		// Function to get categories 
		function getCategories(key, callbackFunc){
			var dir = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + key + content;
			callApi(dir, callbackFunc);
		}

		// Function to search for a movie 
		function search(key, data, callbackFunc){
			var dir = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=' + key + lang + "&query=" + data;
			callApi(dir, callbackFunc);
		}

		// Http get to TMDB
		function callApi(dir, callbackFunc){
			$http.get(dir)
				.then(function success(response) {callbackFunc(response.data)}, function errorCallback(response){
				console.log("Unable to perform get request");
			});
		}

		return service;
	}

})();