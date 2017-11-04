const gulp = require('gulp');
const concat = require('gulp-concat');

//合并 file 为前缀的所有文件
gulp.task('concat', function() {
    return gulp.src('file*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/'));
});

//检测文件变化,并运行注册的文件
const watcher = gulp.watch('file*.js', ['concat']);
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});