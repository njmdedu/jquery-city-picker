var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

const DIST = 'dist/';
const SRC = 'src/';
const DOC = 'docs/'

gulp.task('build',['build-js'],function(){
  console.log('build success');
})

gulp.task('build-js',function(){
    gulp.src([SRC+'*.js'])
        .pipe(concat('jquery.bs.cncitypicker.js'))
        .pipe(gulp.dest(DIST))
        .pipe(gulp.dest(DOC+'js/'))
        .pipe(uglify())
        .pipe(rename({
          extname:'.min.js'
        }))
        .pipe(gulp.dest(DIST))
        .pipe(gulp.dest(DOC+'js/'));
})



// gulp.task('build-css',function(){
//     gulp.src([SRC+'css/*.scss'])
//     .pipe(gulp.dest(DIST+'css'))
//     .pipe(uglify())
//     .pipe(rename({
//       extname:'.min.css'
//     }))
//     .pipe(gulp.dest(DIST+'css'));
// })
//
// gulp.task('build-html',function(){
//     gulp.src([SRC+'html/*.html'])
//     .pipe(gulp.dest(DIST+'html'));
// })
