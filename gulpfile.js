const gulp = require('gulp');
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');
const uglifycss = require('gulp-uglifycss');
const prefix = require('gulp-autoprefixer');

gulp.task('browser-sync', () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./static/css/scss/*.scss', gulp.series('css'));
});

gulp.task('css', () => {
    return gulp.src('./static/css/scss/main.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(gulp.dest('./static/css/'))
    .pipe(browserSync.stream());
});

gulp.task('default', gulp.series('browser-sync', 'css'));