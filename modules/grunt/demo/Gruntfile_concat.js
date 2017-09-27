module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['src/**/*.js'],           // 压缩配置
                dest: 'dist/<%= pkg.name %>.js' //todo 模板使用包中的变量
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.registerTask('default', ['concat']);

};