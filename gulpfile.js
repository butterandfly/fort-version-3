var gulp = require('gulp');
var sass = require('gulp-sass');

var sassFile = "./main.scss";

gulp.task('sass', function() {
  gulp.src(sassFile)
    .pipe(sass())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['sass'], function() {
  gulp.watch([sassFile], ['sass']);
});