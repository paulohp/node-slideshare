var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');

var paths = {
    src: ['src/**/*.js'],
    dist: 'dist',
    sourceRoot: path.join(__dirname, 'src'),
};
gulp.task('babel', function () {
    return gulp.src(paths.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { sourceRoot: paths.sourceRoot }))
        .pipe(gulp.dest(paths.dist));
});
gulp.task('watch', function() {
    gulp.watch(paths.src, ['babel']);
});
gulp.task('default', ['watch']);