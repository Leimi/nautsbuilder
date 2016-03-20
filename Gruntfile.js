module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: "/* <%= pkg.title %> v<%= pkg.version %> - https://github.com/Leimi/nautsbuilder\n" +
			"* Copyright (c) <%= grunt.template.today('yyyy') %> Emmanuel Pelletier\n" +
			"* This Source Code Form is subject to the terms of the Mozilla Public License, v2.0. If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/. */"
		},

		compass: {
			dist: {}
		},

		jshint: {
			files: ['Gruntfile.js', 'js/main.js', 'js/nautsbuilder/**/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},

		scsslint: {
			allFiles: ['scss/**/*.scss'],
			options: {
				colorizeOutput: true,
				compact: true,
				force: true
			}
		},

		concat: {
			libs: {
				src: [
					'js/lib/jquery.min.js',
					'js/lib/underscore.js',
					'js/lib/backbone.js',
					'js/lib/tabletop.js',
					'js/lib/mousetooltip.js',
					'js/lib/fastclick.js',
					'js/lib/jquery.sortable.js'
				],
				dest: 'dist/libs.js'
			},
			app: {
				options: {
					banner: "<%= meta.banner %>"
				},
				src: [
					'js/nautsbuilder/utils.js',
					'js/nautsbuilder/data/character.js',
					'js/nautsbuilder/data/skill.js',
					'js/nautsbuilder/data/upgrade.js',
					'js/nautsbuilder/data/step.js',
					'js/nautsbuilder/views/characters.js',
					'js/nautsbuilder/views/character.js',
					'js/nautsbuilder/views/character-build.js',
					'js/nautsbuilder/views/character-order.js',
					'js/nautsbuilder/views/character-info.js',
					'js/nautsbuilder/views/skill.js',
					'js/nautsbuilder/views/upgrade.js',
					'js/nautsbuilder/app.js',
					'js/main.js',
					'js/nautsbuilder/spreadsheet/update.js'
				],
				dest: 'dist/scripts.js'
			}
		},

		uglify: {
			libs: {
				files: {
					'dist/libs.min.js': ['<%= concat.libs.dest %>']
				}
			},
			app: {
				options: {
					banner: "<%= meta.banner %>"
				},
				files: {
					'dist/scripts.min.js': ['<%= concat.app.dest %>']
				}
			}
		},

		cssmin: {
			dist: {
				files: {
					'dist/styles.min.css': ['css/style.css']
				}
			}
		},

		php: {
			test: {
				options: {
					hostname: 'localhost',
					port: 8080,
					keepalive: true,
					open: true,
					silent: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-scss-lint');

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('build', ['compass', 'jshint', 'scsslint']);
	grunt.registerTask('dist', ['concat', 'uglify', 'cssmin']);
	grunt.registerTask('test', ['build', 'php:test']);
	grunt.registerTask('default', ['build', 'dist']);
};
