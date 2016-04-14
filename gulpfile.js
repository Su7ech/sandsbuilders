var gulp        = require('gulp');
var sass        = require('gulp-sass');
var pug        = require('gulp-pug');
var images      = require('gulp-imagemin');
var prefix      = require('gulp-autoprefixer');
var newer       = require('gulp-newer');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();

// Browser Sync
gulp.task('serve', ['sass', 'pug', 'images', 'compress'], function() {
  browserSync.init({
    server: {
      baseDir: '_site/'
    },
    notify: false
  });
  gulp.watch('assets/sass/**', ['sass']);
  gulp.watch(['index.pug', '_includes/*.pug', '_layouts/*.pug'], ['pug']);
  gulp.watch('assets/js/*.js', ['compress', browserSync.reload]);
  gulp.watch('assets/images/**', ['images']);
  gulp.watch('_site/*.html').on('change', browserSync.reload);
});

// Compile Sass
gulp.task('sass', function() {
  return gulp.src('assets/sass/main.scss')
    .pipe(sass({
      includePaths: ['assets/sass/partials', 'assets/sass/modules']
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.stream());
});

// Compile Jade to HTML
gulp.task('pug', function() {
  return gulp.src('index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('_site/'));
});

// Compile JS
gulp.task('compress', function() {
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js'));
});

// Compress Images
gulp.task('images', function() {
  return gulp.src('assets/images/**')
    .pipe(newer('_site/assets/images'))
    .pipe(images())
    .pipe(gulp.dest('_site/assets/images'));
});

gulp.task('default', ['serve']);
