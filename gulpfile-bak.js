var gulp = require('gulp');

var path = require('path');
// 参数
var argv = require('yargs').argv;
// 合并
var concat = require('gulp-concat');
var concat_pipe2 = require('gulp-concat_sourcemap_pipe2');
// 编译scss
var sass = require('gulp-sass');
//
var watch = require('gulp-watch');
//
var gutil = require('gulp-util');
// 模板
var template = require('gulp-template');
var sourcemaps = require('gulp-sourcemaps');

var appDir = __dirname;
var destDir = path.join(appDir, 'project/source/');

var createComp = require('./create-component.js');
// angular template cache
var templateCache = require('gulp-angular-templatecache');


var sassFiles = [
	'./base/guideline.scss',
	'./base/base.scss',
	'./base/directives/**/*.scss',
	'./project/pages/**/*.scss',
	'./project/components/**/*.scss'
];
// 该任务用于合并、编译scss
gulp.task('sass', function() {
	gulp.src(sassFiles)
		.pipe(concat('app.scss'))
		.pipe(sass())
		.pipe(gulp.dest(destDir));
})

// 合并project里的js
gulp.task('catjs', function() {
  gulp.src(['./project/services/**/*.js', './project/pages/**/*.js', './project/components/**/*.js'])
	  .pipe(sourcemaps.init())
    .pipe(concat_pipe2('app.js'))
	  .pipe(sourcemaps.write())
    .pipe(gulp.dest(destDir))
});

// 合并directives
gulp.task('catdirecs', function() {
	gulp.src(['./base/directives.js', './base/directives/**/*.js'])
		.pipe(concat('direcs.js'))
		.pipe(gulp.dest('./base'));
});

// 合并rg的js
rgJsFiles = ['rg/init.js', 'rg/components/**/*.js', 'rg/directives/**/*.js', 'rg/services/**/*.js'];
gulp.task('cat-rgjs', function() {
  gulp.src(rgJsFiles)
    .pipe(concat('rg.js'))
    .pipe(gulp.dest('rg/dist'));
});

// 合并、编译rg的scss
rgScssFiles = ['rg/base.scss', 'rg/components/**/*.scss'];
gulp.task('cat-rgcss', function() {
  gulp.src(rgScssFiles)
    .pipe(concat('rg.scss'))
    .pipe(sass())
    .pipe(gulp.dest('rg/dist'));
});

// 生成rg的template
rgTplFiles = ['rg/components/**/*.html'];
gulp.task('cat-rgtpl', function() {
  gulp.src(rgTplFiles)
    .pipe(templateCache('templates.js', {'module': 'rg'}))
    .pipe(gulp.dest('rg/dist'));
})

/**
 * @type gulp-task
 *
 * @name rgcomp
 *
 * @description
 * 在components目录下创建一个组件目录与相关文件（js, scss, tmpl）
 *
 * @param name 这个service的名称
 * @param subdir 子目录名称；最后会生成在[base]/[subdir]/目录下
 */
gulp.task('rgcomp', function() {
  var compName = argv.name;

  // 命令行没有输入名称的情况直接退出该任务
  if (!compName || compName === '') {
    gutil.log('请输入compenent的名称');
    return;
  }

  // 存放comp的路径
  var compPath = path.join('./rg/components/'),
    // tplId以gulp-angular-templatecache生成的id名称为准
    compTplId = compName + '/' + compName + '.tpl.html';
  if (argv.subdir) {
    // 有subDir参数的情况再外加子目录
    compPath = path.join(compPath, argv.subdir);
//    compTplPath = path.join('components', argv.subdir, compName, compName + '.tmpl');
  }

  function createTplObject(compName) {
    return {
      'compName': compName,
      'compNameDash': camelToDash(compName),
      'compTplPath': compTplId
    }
  }

  var tplPath = 'rg/tpl';
  createComp(compName, [
    {'suffix': '.tpl.html', 'tplFile': path.join(tplPath, 'comp.tpl.html'), 'createTplObject': createTplObject},
    {'suffix': '.js', 'tplFile': path.join(tplPath, 'comp.js'), 'createTplObject': createTplObject},
    {'suffix': '.scss', 'tplFile': path.join(tplPath, 'comp.scss'), 'createTplObject': createTplObject}
  ], compPath);
});

/**
 * @type gulp-task
 * @name rgdirect
 *
 * @description
 * 在directives目录下创建directive文件
 *
 * @param name 这个service的名称
 * @param subdir 子目录名称；最后会生成在[base]/[subdir]/目录下
 */
gulp.task('rgdirect', function() {
  var directName = argv.name;
  // 命令行没有输入名称的情况直接退出该任务
  if (!directName || directName === '') {
    gutil.log('错误：', '请输入direct的名称');
    return;
  }

  // 模板的路径
  var tplFile = path.join(appDir, 'rg/tpl/direct.js');
  // 存放direct的路径
  var directPath;
  if (argv.subdir) {
    // 有subDir参数的情况再外加子目录
    directPath = path.join(appDir, 'rg/directives/', argv.subdir);
  } else {
    directPath = path.join(appDir, 'rg/directives/');
  }

  createComp(directName, {
    'suffix': '.js',
    'tplFile': tplFile
  }, directPath);

});

/**
 * @type gulp-task
 *
 * @name comp
 *
 * @description
 * 在component目录下创建一个组件目录与相关文件（js, scss, tmpl）
 *
 * @param name 这个service的名称
 * @param subdir 子目录名称；最后会生成在[base]/[subdir]/目录下
 */
gulp.task('comp', function() {
	var compName = argv.name;

	// 命令行没有输入名称的情况直接退出该任务
	if (!compName || compName === '') {
		gutil.log('请输入compenent的名称');
		return;
	}

	// 存放comp的路径
	var compPath = path.join('./project/components/'),
		compTplPath = path.join('components', compName, compName + '.tmpl');
	if (argv.subdir) {
//		servicePath = path.join(appDir, 'project/services/', argv.subdir);
		// 有subDir参数的情况再外加子目录
		compPath = path.join(compPath, argv.subdir);
		compTplPath = path.join('components', argv.subdir, compName, compName + '.tmpl');
	}

	function createTplObject(compName) {
		return {
			'compName': compName,
			'compNameDash': camelToDash(compName),
			'compTplPath': compTplPath
		}
	}

	createComp(compName, [
		{'suffix': '.tmpl', 'tplFile': path.join('./dev_tools', 'comp.tmpl'), 'createTplObject': createTplObject},
		{'suffix': '.js', 'tplFile': path.join('./dev_tools', 'comp.js'), 'createTplObject': createTplObject},
		{'suffix': '.scss', 'tplFile': path.join('./dev_tools', 'comp.scss'), 'createTplObject': createTplObject}
	], compPath);
});

// TODO: 创建directive

/**
 * @type gulp-task
 *
 * @description
 * 在service目录下创建service文件
 *
 * @param name 这个service的名称
 * @param subdir 子目录名称；最后会生成在[base]/[subdir]/目录下
 */
gulp.task('service', function() {
	var serviceName = argv.name;
	// 命令行没有输入名称的情况直接退出该任务
	if (!serviceName || serviceName === '') {
		gutil.log('错误：', '请输入service的名称');
		return;
	}

	// 模板的路径
	var tplFile = path.join(appDir, 'dev_tools/tpl/service.js');
	// 存放service的路径
	var servicePath;
	if (argv.subdir) {
		// 有subDir参数的情况再外加子目录
		servicePath = path.join(appDir, 'project/services/', argv.subdir);
	} else {
		servicePath = path.join(appDir, 'project/services/');
	}

	createComp(serviceName, {
		'suffix': '.js',
		'tplFile': tplFile
	}, servicePath);

});

// TODO: 未能检测新建文件与文件删除
gulp.task('default', ['sass', 'catjs', 'catdirecs', 'cat-rgtpl', 'cat-rgjs', 'cat-rgcss'], function() {
//	watch({'global': ['.base/base.css', './project/pages/**/*.scss', './project/components/**/*.scss']}, ['sass']);
	gulp.watch(['./base/**/*.scss', './project/pages/**/*.scss', './project/components/**/*.scss'], ['sass']);
	gulp.watch(['./project/pages/**/*.js', './project/components/**/*.js'], ['catjs']);

	// 检测directives
	gulp.watch(['./base/directives.js', './base/directives/**/*.js'], ['catdirecs']);
	// 检测services
	gulp.watch(['./project/services/**/*.js'], ['catjs']);


  // rg的内容
  gulp.watch(rgJsFiles, ['cat-rgjs']);
  gulp.watch(rgTplFiles, ['cat-rgtpl']);
  gulp.watch(rgScssFiles, ['cat-rgcss']);
})

// 该方法将驼峰命名转为横杆命名，如：youSucks => you-sucks
// TODO: 若第一个字母为大写的话会在前面加横杆，应去掉
function camelToDash(str) {
	return str.replace(/([A-Z])/g, function(str){ return '-' + str.toLowerCase()});
}
