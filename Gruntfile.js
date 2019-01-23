module.exports = function(grunt) {
	var appConfig = {
		app: require('./bower.json').appPath || 'app',
		dist: 'dist'
	};
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					hostname: 'localhost',
					port: 9000,
					base: {
						path: 'app',
					}
				}
			}
		},

		watch: {
			dev: {
				files: [ 'Gruntfile.js', 'app/**/*.js', 'app/**/*.html', 'test/**/*.spec.js' ],
				tasks: [ 'karma:unit' ],
				options: {
					atBegin: true
				}
			}
		},

		karma: {
			options: {
				configFile: 'config/karma.conf.js'
			},
			unit: {
				singleRun: true
			},

			continuous: {
				singleRun: false,
				autoWatch: true
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('dev', [ 'connect:server', 'watch:dev' ]);
};