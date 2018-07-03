'use strict'
//1.LESS编译 压缩 合并
//2.JS合并 压缩 混淆
//3.img复制
//4.html压缩
//在gulpfile先载入gulp包，因为这个包提供了一些API
var gulp = require('gulp');


//1.LESS编译 压缩 合并:没有必要，一般预处理css都可以倒包
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
gulp.task('style',function(){
	//这里实在执行style任务时自动执行的
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({stream:true}));
});
//2.JS合并 压缩 混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({stream:true}));
});
//3.img复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({stream:true}));
});
//3.html处理
var htmlmin = require('gulp-htmlmin');
 
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({
    	collapseWhitespace: true,
    	removeComments:true,
    	removeAttributeQuotes:true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream:true}));
});

//监视变化，自动执行
var browserSync = require('browser-sync');
gulp.task('serve',function(){
		browserSync({
			server: {baseDir:['dist']}
		}, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});
