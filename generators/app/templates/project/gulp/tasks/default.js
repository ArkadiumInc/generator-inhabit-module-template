var gulp = require('gulp');

gulp.task('default', ['processHtml', 'watch'], function () {
    gulp.start('browserSync');
});