var gulp = require("gulp");
var babel = require("gulp-babel");
var sass = require("gulp-sass");
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var sourcemaps = require('gulp-sourcemaps');
var ejs = require('gulp-ejs');
var templates = require('./templates-data');

gulp.task('babel', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('clarity-components.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('sass', function() {
  return gulp.src('./src/styles.scss')
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(rename('clarity-components.css'))
  .pipe(gulp.dest('./dist'));
});

var ejsTasks = [];
templates.pages.forEach(function(page) {
  var taskName = 'ejs_' + page.name;
  gulp.task(taskName, function() {
    return gulp.src("./src/app/page.ejs")
      .pipe(plumber())
      .pipe(ejs(page))
      .pipe(rename(page.name + '.html'))
      .pipe(gulp.dest("./dist"))
  });
  ejsTasks.push(taskName);
});

gulp.task('ejs', ejsTasks);

gulp.task('sass:watch', function() {
  gulp.watch('./src/**/*.scss', ['sass']);
});
gulp.task('js:watch', function() {
  gulp.watch('./src/**/*.js', ['babel']);
});
gulp.task('ejs:watch', function() {
  gulp.watch('./src/**/*.ejs', ['ejs']);
});

gulp.task('minify', function() {
  return gulp.src('./dist/*.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['babel', 'sass', 'ejs']);

gulp.task('dev', ['default', 'sass:watch', 'js:watch', 'ejs:watch']);
