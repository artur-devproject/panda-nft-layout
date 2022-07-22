// Imports
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sync = require('browser-sync').create()
const del = require('del')
const concat = require('gulp-concat')
const include = require('gulp-file-include')

// Paths
const { resolve } = require('path')
const path = {
    gulp: resolve(),
    build: resolve('dist'),
    buildImages: resolve('dist/images'),
    source: resolve('src'),
    html: resolve('src/*.html'),
    stylesIndex: resolve('src/styles/index.scss'),
    stylesAny: resolve('src/styles/**/*.scss'),
    images: resolve('src/images/**/*.*'),
}

// Tasks
function html() {
    return gulp.src(path.html)
        .pipe(include())
        .pipe(gulp.dest(path.build))
}

function img() {
    return gulp.src(path.images).pipe(gulp.dest(path.buildImages))
}

function scss() {
    return gulp.src(path.stylesIndex)
            .pipe(sass())
            .pipe(concat('index.css'))
            .pipe(gulp.dest(path.build))
}

function server() {
    sync.init({ server: path.build })

    gulp.watch('src/**/*.html', gulp.series(html, img)).on('change', sync.reload)
    gulp.watch('src/styles/**/*.scss', scss).on('change', sync.reload)
}

function clear() {
    return del(path.build)
}

// Exports
exports.run = gulp.series(clear, html, img, scss, server)
exports.clear = clear