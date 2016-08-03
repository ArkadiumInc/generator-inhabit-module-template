var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var build = require('../util/build');
var config = require('../config');
var stringify = require('stringify');

var bundler = browserify({
    entries: [config.sources.jsEntry],
    cache: {},
    packageCache: {},
    plugin: [watchify],
    debug: true
});
bundler.transform(stringify, {
    appliesTo: { includeExtensions: ['.hbs'] },
    minify: false
});
bundler.on('update', function () {
    gulp.start('watch');
});

gulp.task('watch', function () {

    build(bundler);
});