'use strict';

const gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    eslint = require('gulp-eslint'),
    babel = require('gulp-babel'),
    del = require('del');

gulp.task('lint', () => {
    return gulp.src(['./src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', () => {
    return gulp.src(['./src/**/*.js', './bin/**/*.js', './example/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return del('./dist');
});

gulp.task('default', ['lint']);