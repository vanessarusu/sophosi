var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('assets/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('assets/css/'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
    	baseDir: './',
    	index: 'index.html'
    },
  })
});

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('assets/scss/*.scss', ['sass']);
	gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch("assets/js/*.js").on('change', browserSync.reload);
});