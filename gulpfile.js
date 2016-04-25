/*global document, window, alert, console, require*/

var gulp            = require('gulp');
var sass            = require('gulp-sass');
var pug             = require('gulp-pug');
var images          = require('gulp-imagemin');
var prefix          = require('gulp-autoprefixer');
var newer           = require('gulp-newer');
var uglify          = require('gulp-uglify');
var browserSync     = require('browser-sync').create();
var ghPages         = require('gulp-gh-pages');

// Browser Sync
gulp.task('serve', ['sass', 'pug', 'images', 'compress', 'fonts'], function () {
  'use strict';
  browserSync.init({
    server: {
      baseDir: '_site'
    },
    online: true,
    notify: false
  });
  gulp.watch('assets/sass/**', ['sass']);
  gulp.watch(['jadefiles/**/*.pug', '_includes/*.pug', '_layouts/*.pug'], ['pug']);
  gulp.watch('assets/js/*.js', ['compress']);
  gulp.watch('assets/images/**', ['images']).on('change', browserSync.reload);
  gulp.watch('assets/fonts/**', ['fonts']);
  gulp.watch('_site/*.html').on('change', browserSync.reload);
});

// Compile Sass
gulp.task('sass', function () {
  'use strict';
  return gulp.src('assets/sass/main.scss')
    .pipe(sass({
      includePaths: ['assets/sass/partials', 'assets/sass/modules']
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.stream());
});

// Compile Jade to HTML
gulp.task('pug', function () {
  'use strict';
  return gulp.src('jadefiles/**/*.pug')
    .pipe(pug({
      basedir: '.',
      pretty: true
    }))
    .pipe(gulp.dest('_site'));
});

// Compile JS
gulp.task('compress', function () {
  'use strict';
  return gulp.src('assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('_site/assets/js'));
});

// Compress Images
gulp.task('images', function () {
  'use strict';
  return gulp.src('assets/images/**')
    .pipe(newer('_site/assets/images'))
    .pipe(images())
    .pipe(gulp.dest('_site/assets/images'));
});

// Watch Fonts
gulp.task('fonts', function () {
  'use strict';
  return gulp.src('assets/fonts/**')
    .pipe(gulp.dest('_site/assets/fonts'));
});

// Deploy to gh-pages
gulp.task('deploy', function () {
  'use strict';
  return gulp.src('_site/**/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['serve']);
