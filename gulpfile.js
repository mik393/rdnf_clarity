var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('babel', function () {
  return gulp.src('./src/index.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('./src/styles.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});
gulp.task('js:watch', function () {
  gulp.watch('./src/**/*.js', ['babel']);
});

gulp.task('minify', function () {
  return gulp.src('./dist/*.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['babel', 'sass']);

gulp.task('dev', ['default', 'sass:watch', 'js:watch']);
