var gulp = require('gulp');
var preProcessHtml = require('gulp-preprocess');
var config = require('../config');

gulp.task('processHtml', function () {
    return gulp.src(config.sources.html)
        .pipe(preProcessHtml({context: {NODE_ENV: 'production', DEBUG: true}}))
        .pipe(gulp.dest(config.destination.directory));
});