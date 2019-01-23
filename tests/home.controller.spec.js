describe('HomeServiceTest', function(){

	var homeServiceMock = {}, homeController = {}, $controller, $rootScope, $scope;

	beforeEach(angular.mock.module('myApp'));
	beforeEach(inject(function(_$controller_, _$rootScope_, _homeService_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		homeService = homeServiceMock;
		$controller = _$controller_;

		jasmine.getJSONFixtures().fixturesPath='base/tests/responses';
		homeController = $controller('homeController', { $scope: $scope, homeService: homeServiceMock });		

	}));

	homeServiceMock = {
		getCategories: function (key, callback){
			var response = getJSONFixture('getCategories.json');
			callback(response);
		},
		search: function (key, movie, callback) {
			var response = getJSONFixture('search.json');
			callback(response);
		},
		getPopular: function (key, callback){
			var response = getJSONFixture('getPopular.json');
			callback(response);
		},
		getKey: function (callback){
			callback();
		}
	}

	it('homeController should exist', function() { 
		expect(homeController).toBeDefined();
	});

	it('homeController.moreItems should exist', function() {
		homeController.moreItems('popular');
		homeController.model.config.showPopular = 4;
		homeController.moreItems('search');
	});

	it('homeController.search should map results', function() {
		homeController.model.movieSearched = 'notebook';
		homeController.search();

		var response = getJSONFixture('search.json');
		for(var i = 0; i < response.results.length; i++){
			if(response.results[i].poster_path){
				response.results[i].image = 'https://image.tmdb.org/t/p/w185' + response.results[i].poster_path;
			}
		}
		expect(homeController.model.search).toEqual(response.results);
	});
	
	it('initModel should map results', function() {
		homeController.initModel();
		var categoriesResp = getJSONFixture('getCategories.json');
		var categories = {};
		categoriesResp.genres.forEach(function(genre){
					categories[genre.id] = genre.name;
				});		
		var popular = getJSONFixture('getPopular.json');
		for(var i = 0; i < popular.results.length; i++){
			if(popular.results[i].poster_path){
				popular.results[i].image = 'https://image.tmdb.org/t/p/w185' + popular.results[i].poster_path;
			}
		}
		expect(homeController.model.popular).toEqual(popular.results);
		expect(homeController.model.config.categories).toEqual(categories);

	});

});