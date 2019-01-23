(function () {
	'use strict';

	angular.module('detail').controller('detailController', detailController);

	detailController.$inject = ['detailService', '$stateParams', '$state'];

	function detailController(detailService, $stateParams, $state) {

		var vm = this;

		vm.initModel = initModel;
		vm.goHome = goHome;
		vm.rate = rate;
		
		initModel();

		function initModel () {
			vm.model = {
				movie:{},
				reviews: [],
				cast:[],
				config: {
					categories: {},
					error: false
				} 
			};

			if ($stateParams.params && $stateParams.params.id) { 
				vm.model.movie.id = $stateParams.params.id;
				if(!vm.model.config.key){
					detailService.getKey(postInit);
				} else {
					postInit(vm.model.config.key);
				}
			} else {
				vm.model.config.error = true;
			}
		}

		function postInit(key) {
			vm.model.config.key = key;
			detailService.getInfo(vm.model.config.key, vm.model.movie.id, infoCallback);
			detailService.getReviews(vm.model.config.key, vm.model.movie.id, reviewCallback);
			detailService.getCredits(vm.model.config.key, vm.model.movie.id, creditsCallback);
		}

		function infoCallback(response){
			if(response){
				angular.copy(response, vm.model.movie);
				vm.model.movie.image = 'https://image.tmdb.org/t/p/w342' + vm.model.movie.poster_path;
			}
		} 

		function reviewCallback(response){
			if(response){
				angular.copy(response.results, vm.model.reviews);
			}
		}
		
		function creditsCallback(response){
			if(response){
				angular.copy(response.cast, vm.model.cast);
			}
		}

		function rate() {
			alert("You should be registered. As it is a demo, you can not");
		}
		
		function goHome() {
			var params = {};
			$state.go('/', {params: params});
		}
	}
})();