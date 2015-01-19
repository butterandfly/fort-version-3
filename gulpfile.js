var path = require('path');
var argv = require('yargs').argv;
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var createComp = require('create-component');
var nunjucksRender = require('gulp-nunjucks-render');
var rename = require('gulp-rename');

// 资源存放目录
var sourceDir = './source';

var scssFiles  = ['./_components/_base/_base.scss', './_components/**/*.scss'];
var targetCssFileName = 'main.scss';

/**
 * @type gulp-task
 *
 * @name merge-css
 *
 * @description
 * 合并所有component的css
 */
gulp.task('merge-css', function() {
  gulp.src(scssFiles)
    .pipe(concat(targetCssFileName))
    .pipe(sass())
    .pipe(gulp.dest(sourceDir));
});

// init需要放在前面，gulp的src不会取得重复文件
var jsFiles = ['./_components/_base/_base.js', './_components/**/*.js'];
var targetJsFileName = 'main.js';

/**
 * @type gulp-task
 *
 * @name merge-js
 *
 * @description
 * 合并所有component的js
 */
gulp.task('merge-js', function() {
  gulp.src(jsFiles)
    .pipe(concat(targetJsFileName))
    .pipe(gulp.dest(sourceDir));
});

var htmlFiles = ['./_components/**/*.html'];
var baseHtml = './_components/_base/_base.html';
/**
 * @type gulp-task
 *
 * @name merge-html
 *
 * @description
 * 重新生成index.html
 */
gulp.task('merge-html', function() {
  return gulp.src(baseHtml)
    .pipe(nunjucksRender())
    .pipe(rename(function (path) {
      path.basename = "index";
    }))
    .pipe(gulp.dest('./'));
});

/**
 * @type gulp-task
 *
 * @name component
 *
 * @description
 * 在component目录下创建一个组件目录与相关文件（js, scss, tmpl）
 *
 * @param name 这个service的名称
 * @param subdir 子目录名称；最后会生成在[base]/[subdir]/目录下
 */
gulp.task('component', function() {
  var compName = argv.name;

  // 命令行没有输入名称的情况直接退出该任务
  if (!compName || compName === '') {
    gutil.log('请输入compenent的名称');
    return;
  }

  // 存放comp的路径
  var compPath = path.join('./_components/');

  var compCreatingTemplatesPath = './_templates/component';

  createComp(compName, [
    {'suffix': '.html', 'tplFile': path.join(compCreatingTemplatesPath, 'component.html')},
    {'suffix': '.js', 'tplFile': path.join(compCreatingTemplatesPath, 'component.js')},
    {'suffix': '.scss', 'tplFile': path.join(compCreatingTemplatesPath, 'component.scss')}
  ], compPath);
});

// 默认任务
gulp.task('default', ['merge-js', 'merge-css', 'merge-html'], function() {
  gulp.watch([scssFiles], ['merge-css']);
  gulp.watch([jsFiles], ['merge-js']);
  gulp.watch([htmlFiles], ['merge-html']);
});