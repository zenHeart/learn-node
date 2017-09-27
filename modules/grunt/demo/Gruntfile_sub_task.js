module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concatRule: {
            src: ['src/**/*.js'],           // 压缩配置
            dest: 'dist/<%= pkg.name %>.js' //todo 模板使用包中的变量
        },
        concat:{
            test:{

            },
             demo:{   options: {
                    separator: ' '
                },
                dist: '<%= concatRule%>'
            }}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat']);

};