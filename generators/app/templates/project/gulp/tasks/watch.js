var gulp = require('gulp');
var browserify = require('browserify');
var build = require('../util/build');
var browserifyConfig = require('../util/browserifyConfigurator')();

browserifyConfig.addPlugin('watchify');

var bundler = browserify(browserifyConfig);

bundler.on('update', function () {
    gulp.start('watch');
});

gulp.task('watch', function () {
    build(bundler);
});