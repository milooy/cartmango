var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    exec = require('child_process').exec,
    browserSync = require('browser-sync');

gulp.task('less', function() {
    console.log("less compiled");
    return gulp.src('./cart/static/less/base.less')
        .pipe(less().on('error', function(err) {
            console.log(err);
        }))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest('./cart/static/css'));
});

gulp.task('default', ['less'], function() {
    gulp.watch('./cart/static/less/*.less', ['less']);
});