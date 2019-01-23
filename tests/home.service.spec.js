describe('HomeServiceTest', function(){

	var homeServiceMock = {}, homeControllerMock = {},$httpBackend, api;

	beforeEach(angular.mock.module('myApp'));
	beforeEach(inject(function(_homeService_, _$q_, _$httpBackend_) {
		homeServiceMock = _homeService_;
    	$httpBackend = _$httpBackend_;
		$httpBackend.whenGET('home/home.tpl.html').respond(200, {});
		jasmine.getJSONFixtures().fixturesPath='base/app/assets';
		api = getJSONFixture('api_key.json').key;
	}));

	it('homeService should exist', function() {
		expect(homeServiceMock).toBeDefined();
	});

	it('homeService.getPopular should exist', function() {
		expect(homeServiceMock.getPopular).toBeDefined();
	});

	it('homeService.getCategories should exist', function() {
		expect(homeServiceMock.getCategories).toBeDefined();
	});	

	it('homeService.search should exist', function() {
		expect(homeServiceMock.search).toBeDefined();
	});

	it('homeService.getKey should be ok (200 status)', function() {
		$httpBackend.whenGET('assets/api_key.json').respond(200, api);
		$httpBackend.expectGET('assets/api_key.json');

		homeServiceMock.getKey(function (r) {});
		
		$httpBackend.flush();

	});
	
	it('homeService.getCategories should be ok (200 status)', function() {
		var dir = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + api + '&content-type=application/json;charset=utf-8';
		
		$httpBackend.whenGET(dir).respond(200, {});
		$httpBackend.expectGET(dir);

		homeServiceMock.getCategories(api, function (r) {});
		
		$httpBackend.flush();

	});
	
	it('homeService.getCategories should be ko (400 status)', function() {
		var dir = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + api + '&content-type=application/json;charset=utf-8';
		
		$httpBackend.whenGET(dir).respond(400, {});
		$httpBackend.expectGET(dir);

		homeServiceMock.getCategories(api, function (r) {});
		
		$httpBackend.flush();

	});
	
	it('homeService.getPopular should be ok (200 status)', function() {
 
		var dir = 'https://api.themoviedb.org/3/movie/popular?sort_by=popularity.desc&api_key=' + api + '&content-type=application/json;charset=utf-8';
		
		
		$httpBackend.whenGET(dir).respond(200, {});
		$httpBackend.expectGET(dir);

		homeServiceMock.getPopular(api, function (r) {});
		
		$httpBackend.flush();

	});
	
		it('homeService.search should be ok (200 status)', function() {
 
		var dir = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=' + api + '&language=en-US&query=notebook';
		
	 	
		$httpBackend.whenGET(dir).respond(200, {});
		$httpBackend.expectGET(dir);

		homeServiceMock.search(api, 'notebook', function (r) {});
		
		$httpBackend.flush();

	});

});