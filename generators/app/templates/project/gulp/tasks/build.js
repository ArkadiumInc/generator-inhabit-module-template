var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var build = require('../util/build');
var config = require('../config');
var stringify = require('stringify');

gulp.task('build', ['processHtml'], function () {
    var bundler = browserify(config.sources.jsEntry)
        .transform(stringify, {
            appliesTo: { includeExtensions: ['.hbs'] },
            minify: false
        });

    build(bundler);
});