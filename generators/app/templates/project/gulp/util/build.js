var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var size = require('gulp-size');
var config = require('../config');

function build(bundler) {
    console.log('Rebuilding bundle');

    return bundler
        .bundle()
        .pipe(source(config.destination.jsOutput))
        .pipe(gulp.dest(config.destination.moduleDirectory))
        .pipe(size())
        .pipe(browserSync.reload({
            stream: true
        }));
}

module.exports = build;