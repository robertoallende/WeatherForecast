/* File: gulpfile.js */
// Following: https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');
    
// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('copyHtml', function() {
  // copy any html files in source/ to public/
  gulp.src('source/*.html').pipe(gulp.dest('public'));
});

gulp.task('build-css', function() {
  return  sass('source/scss/**/*.scss')
    .pipe(gulp.dest('public/assets/stylesheets'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint']);
  gulp.watch('source/scss/**/*.scss', ['build-css']);
  gulp.watch('source/*.html', ['copyHtml']);
  gulp.start('build');    
});

gulp.task('build-js', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/javascript'));
});

var serve = require('gulp-serve');
gulp.task('serve', serve('public'));
gulp.task('serve-build', serve(['public', 'build']));
gulp.task('serve-prod', serve({
  root: ['public', 'build'],
  port: 80,
  middleware: function(req, res) {
    
  }
}));

gulp.task('build', function() {
  gulp.start('copyHtml', 'build-css', 'build-js');
})

gulp.task('dev', ['build', 'watch', 'serve']);


