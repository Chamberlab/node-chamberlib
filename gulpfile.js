'use strict';

const gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    babel = require('gulp-babel'),
    trash = require('trash');

gulp.task('lint', () => {
    return gulp.src(['./src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
        //.pipe(jshint.reporter('fail'));
});

gulp.task('build', ['lint'], () => {
    return gulp.src(['./src/**/*.js', './bin/**/*.js', './example/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return trash('./dist');
});

gulp.task('default', ['lint']);