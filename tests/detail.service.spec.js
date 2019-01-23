describe('DetailServiceTest', function(){

	var detailServiceMock = {}, detailControllerMock = {},$httpBackend, key;

	beforeEach(angular.mock.module('myApp'));
	beforeEach(inject(function(_detailService_, _$q_, _$httpBackend_) {
		detailServiceMock = _detailService_;
		$httpBackend = _$httpBackend_;
		$httpBackend.whenGET('home/home.tpl.html').respond(200, {});
		jasmine.getJSONFixtures().fixturesPath='base/app/assets';
		key = getJSONFixture('api_key.json').key;
	}));

	it('detailService should exist', function() {
		expect(detailServiceMock).toBeDefined();
	});

	it('detailService.getInfo should exist', function() {
		expect(detailServiceMock.getInfo).toBeDefined();
	});

	it('detailService.getReviews should exist', function() {
		expect(detailServiceMock.getReviews).toBeDefined();
	});	

	it('detailService.getCredits should exist', function() {
		expect(detailServiceMock.getCredits).toBeDefined();
	});

	it('detailService.getKey should exist', function() {
		expect(detailServiceMock.getKey).toBeDefined();
	});

	it('detailService.getKey should be ok (200 status)', function() {
		$httpBackend.whenGET('assets/api_key.json').respond(200, key);
		$httpBackend.expectGET('assets/api_key.json');

		detailServiceMock.getKey(function (r) {});

		$httpBackend.flush();

	});

	it('detailService.getInfo should be ok (200 status)', function() {

		var dir = 'https://api.themoviedb.org/3/movie/297802?api_key=' + key + '&language=en-US';

		$httpBackend.whenGET(dir).respond(200, {});
		$httpBackend.expectGET(dir);

		detailServiceMock.getInfo(key, '297802', function (r) {});

		$httpBackend.flush();

	});

	it('detailService.getReviews should be ok (200 status)', function() {
		var dir = 'https://api.themoviedb.org/3/movie/297802/reviews?api_key=' + key + '&language=en-US';

		$httpBackend.whenGET(dir).respond(200, {});
		$httpBackend.expectGET(dir);

		detailServiceMock.getReviews(key, '297802', function (r) {});

		$httpBackend.flush();

	});

	it('detailService.getCredits should be ok (200 status)', function() {

		var dir = 'https://api.themoviedb.org/3/movie/297802/credits?api_key=' + key +'&language=en-US';


		$httpBackend.whenGET(dir).respond(200, {});
		$httpBackend.expectGET(dir);

		detailServiceMock.getCredits(key, '297802', function (r) {});

		$httpBackend.flush();

	});

});