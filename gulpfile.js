"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();



var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var htmlmin = require('gulp-htmlmin');
var include = require("posthtml-include");
var del = require("del");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");



gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))

    .pipe(minify())
    .pipe(rename("style.min.css"))

    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/sp-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("jsmin", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
});




// gulp.task("copy-html", function (done) {
//   return gulp.src("source/*.html")
//     .pipe(gulp.dest("build"));
// });



gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});


gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/**/sp-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("jsmin", function () {
  return gulp.src("source/js/*.js")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename +=".min";
    }))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});


gulp.task("build", gulp.series( "clean", "copy", "css", "sprite", "html", "jsmin"));
gulp.task("start", gulp.series("build", "server"));
gulp.task("img", gulp.series("images", "webp"));



// gulp.task("jsmin", function () {
//   return gulp.src("source/js/*.js")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(uglify())
//     .pipe(rename("script.min.js"))

//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("build/js"))
//     .pipe(server.stream());
// });
