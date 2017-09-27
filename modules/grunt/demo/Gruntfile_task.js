module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        log:{
            a:1,
            b:2
        }
    });

    grunt.registerMultiTask('log','测试 multitask',function () {
        console.log(this.target,this.data);
    })

};