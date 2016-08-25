var gulp = require('gulp');
var browserify = require('browserify');
var build = require('../util/build');
var browserifyConfig = require('../util/browserifyConfigurator')();

gulp.task('build', ['processHtml'], function () {
    var bundler = browserify(browserifyConfig);
    build(bundler);
});