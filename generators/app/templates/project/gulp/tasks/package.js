var gulp = require('gulp'),
    zip = require('gulp-zip'),
    gutil = require('gulp-util'),
    using = require('gulp-using'),
    config = require('../config');

/**
 * Creates widget.zip package from output folder
 * @module package
 */
gulp.task('package', function () {
    return gulp.src([config.destination.moduleDirectory + '**/*', "./inhabitcfg.json"])
        .pipe(using())
        .pipe(zip(config.package.file))
        .pipe(gulp.dest(config.package.directory))
        .pipe(using());
});