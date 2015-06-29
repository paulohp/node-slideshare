var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');

var paths = {
    lib: ['lib/**/*.js'],
    dist: 'dist',
    sourceRoot: path.join(__dirname, 'lib'),
};
gulp.task('babel', function () {
    return gulp.src(paths.lib)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.dist));
});
gulp.task('watch', function() {
    gulp.watch(paths.lib, ['babel']);
});
gulp.task('default', ['watch']);