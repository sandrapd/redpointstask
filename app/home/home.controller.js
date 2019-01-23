(function () {
	'use strict';

	angular.module('home').controller('homeController', homeController);

	homeController.$inject = ['homeService', '$state'];

	function homeController(homeService, $state) {

		var vm = this;

		vm.initModel = initModel;
		vm.search = search;
		vm.moreItems = moreItems;
		vm.goToDetail = goToDetail;

		initModel();

		// Set up the page
		function initModel () {
			vm.model = {
				popular: [],
				search:[],
				config: {
					categories: {},
					showPopular: 8,
					showSearch: 4
				}
			};
			if (!vm.model.config.key) {
				homeService.getKey(postInit);
			} else {
				postInit(vm.model.config.key);
			}
		}  

		// Once we have the api key, ask for categories and popular movies
		function postInit(key) {
			vm.model.config.key = key;
			homeService.getCategories(vm.model.config.key, categoriesCallback);
			homeService.getPopular(vm.model.config.key,popularCallback);
		}
		
		// Function to search for a movie
		function search () {
			homeService.search(vm.model.config.key, vm.model.movieSearched, searchCallback);
		} 

		// Get a match between genre id and name
		function categoriesCallback(response) {
			if(response){
				response.genres.forEach(function(genre){
					vm.model.config.categories[genre.id] = genre.name;
				});				
			} 
		} 

		// Set results of popular movies
		function popularCallback(response) {
			if(response){
				angular.copy(response.results, vm.model.popular);
				getImgs(vm.model.popular); 
			}
		}

		// Set results of search
		function searchCallback(response){
			if(response){
				angular.copy(response.results, vm.model.search);				
				getImgs(vm.model.search); 
			}
		}

		// Set up the url for images
		function getImgs(source) {
			for(var i = 0; i < source.length; i++){
				if(source[i].poster_path){
					source[i].image = 'https://image.tmdb.org/t/p/w185' + source[i].poster_path;
				}
			}
		}

		// Show 4 more items when clicking "Show more"
		function moreItems(titleSection) {			
			if(titleSection === 'popular'){
				vm.model.config.showPopular += 4; 
			} else {
				vm.model.config.showSearch += 4;
			}
		}

		function goToDetail(movie) {
			var params = {
				id: movie.id
			}
			$state.go('detail', {params: params});
		}
	}
})();