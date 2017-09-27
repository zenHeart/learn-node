module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ls:{
            filter:'isFile'
        },
        fileObjRule: {
            files:{
                'distObj/<%= pkg.name %>.js': ['src/**/*.js']
            }
        },
        //等效于文件对象模式的常规表示方法
        normalRule: {
            src: ['src/**/*.js'],
            dest: 'dist/<%= pkg.name %>.js'
        },
        multiDist:{
            files:[
                {dest:"distObj/<%= pkg.name %>.js",src: ['src/**/*.js'],extDot:'min'},
                {dest:"distObj/<%= pkg.name %>.html",src: ['src/**/*.html']},
                {dest:"distObj/<%= pkg.name %>.css",src: ['src/**/*.css']}
            ],
        },

        concat: {
            options: {
                separator: ''
            },
            dist: '<%= multiDist%>'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['concat']);

};