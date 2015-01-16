var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var sassFile = "./main.scss";
var sassFile = ['./css/init.scss', './css/parts/*.scss'];

gulp.task('sass', function() {
  gulp.src(sassFile)
    .pipe(concat('main.scss'))
    .pipe(sass())
    .pipe(gulp.dest('./css/'));
});


// init需要放在前面
var jsFiles = ['./js/init.js', './js/parts/*.js'];
var targetJsDir = './js/';

gulp.task('concat-js', function() {
  gulp.src(jsFiles)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(targetJsDir));
})

gulp.task('default', ['sass', 'concat-js'], function() {
  gulp.watch([sassFile], ['sass']);
  gulp.watch([jsFiles], ['concat-js']);
});