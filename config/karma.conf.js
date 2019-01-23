module.exports = function(config) {
	config.set({
		basePath: '../',
		frameworks: [ 'jasmine-jquery', 'jasmine' ],
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'app/home/home.module.js',
			'app/detail/detail.module.js',
			'app/home/*.js',
			'app/detail/*.js',
			'app/app.js',
			'tests/*.js',
			// fixtures
			 {pattern: '**/**/*.json', watched: true, served: true, included: false}

		],
		preprocessors: {
			'app/**/*.js': ['coverage']
		}, 
		reporters: [ 'progress' , 'coverage'],
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},
		colors: true,
		autoWatch: false,
		browsers: [ 'PhantomJS' ],
		singleRun: true,
		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-ng-html2js-preprocessor',
			'karma-coverage',
			'karma-jasmine-jquery'
		],

	});
};