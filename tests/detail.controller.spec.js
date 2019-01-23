describe('DetailControllerTest', function(){

	var detailServiceMock = {}, detailController = {}, $controller, $rootScope, $scope, $stateParams;

	beforeEach(angular.mock.module('myApp'));
	beforeEach(inject(function(_$controller_, _$rootScope_, _detailService_) {
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();
		detailService = detailServiceMock;
		$controller = _$controller_;

		jasmine.getJSONFixtures().fixturesPath='base/tests/responses';
		$stateParams = { 
			params: {
				id: '1'
			}
		};
		detailController = $controller('detailController', { $scope: $scope, $stateParams: $stateParams, detailService: detailServiceMock });		

	}));
	
	
	detailServiceMock = {
		getInfo: function (key, movie, callback){
			var response = getJSONFixture('getInfo.json');
			callback(response);
		},
		getReviews: function (key, movie, callback) {
			var response = getJSONFixture('getReviews.json');
			callback(response);
		},
		getKey: function (callback) {
			callback();
		},
		getCredits: function (key, movie, callback) {
			var response = getJSONFixture('getCredits.json');
			callback(response);
		}
	}

	it('detailController should exist', function() { 
		expect(detailController).toBeDefined();
	});
	it('detailController.initModel should exist', function() { 
		expect(detailController.initModel).toBeDefined();
	});
	it('detailController.goHome should exist', function() { 
		expect(detailController.goHome).toBeDefined();
	});
	it('detailController.rate should exist', function() { 
		expect(detailController.rate).toBeDefined();
	});
	
	it('detailController.getInfo should map info', function() { 
		var infoResp = getJSONFixture('getInfo.json');
		infoResp.image = 'https://image.tmdb.org/t/p/w342' + infoResp.poster_path;
		
		detailController.initModel();
		
		expect(detailController.model.movie).toEqual(infoResp);
	});
	
	it('detailController.getReviews should map info', function() { 
		var reviewsResp = getJSONFixture('getReviews.json');

		detailController.initModel();
		
		expect(detailController.model.reviews).toEqual(reviewsResp.results);
	});
	
	it('detailController.getCredits should map info', function() { 
		var creditsResp = getJSONFixture('getCredits.json');

		detailController.initModel();
		
		expect(detailController.model.cast).toEqual(creditsResp.cast);
	});
});