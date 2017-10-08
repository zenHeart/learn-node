module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        fileObjRule: {
            files: {
                'distObj/<%= pkg.name %>.js': ['src/**/*.js']
            }
        },
        //等效于文件对象模式的常规表示方法
        normalRule: {
            src: ['src/**/*.js'],
            dest: 'dist/<%= pkg.name %>.js'
        },
        multiDist: {
            files: {
                "distObj/<%= pkg.name %>.js": 'src/**/*.js',
                "distObj/<%= pkg.name %>.html": 'src/**/*.html',
                "distObj/<%= pkg.name %>.css": 'src/**/*.css'
            }
        },
        concat: {
            options: {
                separator: ''
            },
            dist: '<%= multiDist%>'
        }, uglify: {
            dist: {
                files: {
                    'distObj/concat.dist.dest.js': 'distObj/<%= pkg.name %>.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['concat', 'uglify']);

};