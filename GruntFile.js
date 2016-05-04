/*!
 * melt assessment Gruntfile
 * @author Jeremy Lowe
 */
 
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        sass: {
          dev: {
            options: {
              style: 'expanded',
              sourcemap: 'none'
            },
            files: {'style.css': 'scss/style.scss'}
          },
          dist: {
            options: {
              style: 'compressed',
              sourcemap: 'none'
            },
            files: {'style.css': 'scss/style.scss'}
          }
        },
        
        postcss: { // Begin Post CSS Plugin
          options: {
            map: false,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
          },
          dist: {
            src: 'style.css'
          }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass:dev', 'postcss'],
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        }
    });
    
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    
    // register tasks
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('dist', ['sass:dist', 'postcss']);
    
};