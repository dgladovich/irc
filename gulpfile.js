const gulp = require('gulp');
const beautify = require('gulp-jsbeautifier');
 
gulp.task('beautify', () =>
  gulp.src(['./**/*.css', './**/*.html', './**/*.js'])
    .pipe(beautify({
      indent_size: 2,
    }))
    .pipe(gulp.dest('./dist'))
);