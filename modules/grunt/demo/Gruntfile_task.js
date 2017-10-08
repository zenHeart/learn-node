module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        log:{
            foo: {
                files:{
                    "multi/multi.txt":['src/**/*.txt']
                }
            },
            bar:2,
        }
    });

    //多任务注册
    grunt.registerMultiTask('log','测试 multitask',function () {
        console.log(this.target === 'a');
        console.log(this.target,this.data);
    });
    //定义单独任务
    grunt.registerTask('foo','测试 task',function (arg1,arg2) {
        if (arguments.length === 0) {
            grunt.log.writeln(this.name + ", no args");
        } else {
            grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
        }
    })
    //自定义任务默认执行
    grunt.registerTask('default', 'grunt 启动时执行默认任务', function() {
        grunt.log.writeln('Currently running the "default" task.');
    });

    //自定义任务,并在内部设定其他执行任务
    grunt.registerTask('insideLog', 'grunt 启动时执行默认任务', function(args) {
        console.log(args);
        grunt.task.run('log:foo');
    });

    //异步模式,只有当异步事件执行完后才会退出,否则会直接退出
    grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
        // Force task into async mode and grab a handle to the "done" function.
        var done = this.async();
        // Run some sync stuff.
        grunt.log.writeln('Processing task...');
        // And some async stuff.
        setTimeout(function() {
            grunt.log.writeln('All done!');
            done();
        }, 1000);
    });

    //任务执行的依赖,require 只有在其他任务执行存在的情况下才会执行
    grunt.registerTask('relyTask', 'My "foo" task.', function() {
        // Fail task if "meta.name" config prop is missing
        // Format 1: String
        //grunt.task.run('log:foo');
        //grunt.task.run('log:bar');
        grunt.config.requires('log.foo');
        grunt.config.requires(['log', 'bar']);
        // Log... conditionally.
        grunt.log.writeln('This will only log if log:foo and log:bar defined.');
        grunt.log.writeln('log foo config is:',grunt.config('log.foo')); //支持 . 查找
        grunt.log.writeln('log bar config is:',grunt.config(['log','bar'])); //数组查找配置,前面是任务,后面是标签
    });



};