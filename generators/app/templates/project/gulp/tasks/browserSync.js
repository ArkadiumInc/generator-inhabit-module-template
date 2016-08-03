var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('../config');

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: config.destination.directory
        }
    });
});
