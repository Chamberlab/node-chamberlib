'use strict';

const gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    del = require('del');

gulp.task('lint', () => {
    return gulp.src(['./src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('babel', () => {
    return gulp.src(['./index.js', './src/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return del('./dist');
});

gulp.task('release', ['clean', 'lint', 'babel']);
gulp.task('default', ['lint']);