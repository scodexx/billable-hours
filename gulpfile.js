const gulp = require('gulp')
const gutil = require('gulp-util')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const precss = require('precss')
const colorfunctions = require('postcss-color-function')

const source = 'public/static/postcss'

gulp.task('css', function() {
  gulp.src(source + '/style.css')
  .pipe(postcss([
    autoprefixer(),
    colorfunctions(),
    precss(),
  ]))
  .on('error', gutil.log)
  .pipe(gulp.dest(source + '/dist'));
});

gulp.task('watch', function() {
  gulp.watch(source + '**/*.css', ['css']);
});

gulp.task('default', ['css', 'watch']);