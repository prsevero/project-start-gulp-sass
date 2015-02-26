var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),

    paths = {
        js: ['static/src/js/**/*.js'],
        scss: ['static/src/scss/**/*.scss', 'static/src/scss/**/*.sass'],
    };


gulp.task('sass', function() {
    gulp.src(paths.scss)
        .pipe(sass()).on('error', errorHandler)
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(concat('style.css', { newLine: '' }))
        .pipe(gulp.dest('static/css'))
        .pipe(livereload());
});


gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(jshint()).pipe(jshint.reporter('default'))
        .pipe(uglify()).on('error', errorHandler)
        .pipe(gulp.dest('static/js'))
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.js, ['js']);
});


function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}


gulp.task('default', ['watch']);

