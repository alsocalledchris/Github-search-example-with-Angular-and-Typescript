var gulp = require("gulp"),
concat = require("gulp-concat"),
cssmin = require("gulp-cssmin"),
uglify = require("gulp-uglify"),
cssclean = require("gulp-clean-css"),
del = require("del"),
ts = require('gulp-typescript'),
htmlreplace = require('gulp-html-replace'),
sass = require("gulp-sass"),
lec = require("gulp-line-ending-corrector"),
runSequence = require('run-sequence'),
sourcemaps = require('gulp-sourcemaps');

var paths = {
    releaseFolder: "./www/",
    scriptslib: "scripts/lib/",
    css: "./css/**/*.css",
    appJsFiles: "./scripts/app/",
    html: ["app/**/*.html"],
    config: ["scripts/app/cordova/cordova-app.js", "scripts/app/cordova/cordova-startup.js"],
    jslibraryincludes: ["scripts/lib/" + "jquery/dist/jquery.js", "scripts/lib/" + "bootstrap/dist/js/bootstrap.js",
           "scripts/lib/" + "angular/angular.js", "scripts/lib/" + "angular-ui-router/www/angular-ui-router.js",
            "scripts/lib/" + "spin.js/spin.js", "scripts/lib/" + "angular-spinner/angular-spinner.js"],
    csslibraryinclude: ["scripts/lib/" + "bootstrap/dist/css/bootstrap.css"]
};

paths.concatJsDest = paths.releaseFolder + "scripts/site.min.js";
paths.concatCssDest = paths.releaseFolder + "css/site.min.css";

gulp.task("clean:app", function (cb) {
     return del(["scripts/app"]);
});

gulp.task("clean:css", function (cb) {
     return del(["css"]);
});

gulp.task("clean:release", function (cb) {
    return del(["www"]);
});

gulp.task('cleanscriptsfolder', function () {
    return del(["www/scripts/**/*"]);
});

gulp.task("min:js", function () {
    // TODO: Non minified due to passed in JS file to start with... find better way
    gulp.src(["scripts/lib/requirejs/require.js"]).pipe(gulp.dest('www/scripts/lib/requirejs/')); // Non minified require JS file just copy

    return gulp.src([
            paths.scriptslib + "jquery/dist/jquery.js",
            paths.scriptslib + "bootstrap/dist/js/bootstrap.min.js",
            paths.scriptslib + "angular/angular.js",
            paths.scriptslib + "angular-ui-router/release/angular-ui-router.js",
            paths.scriptslib + "spin.js/spin.js",
            paths.scriptslib + "angular-spinner/angular-spinner.js",
            paths.appJsFiles + "repo-issues/*.js",
            paths.appJsFiles + "repo-issues/model/*.js",
            paths.appJsFiles + "repo-search/*.js",
            paths.appJsFiles + "repo-search/model/*.js",
            paths.appJsFiles + "*.js"])
          .pipe(concat(paths.concatJsDest))
          .pipe(uglify({ mangle: false }))
          .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, paths.scriptslib + "bootstrap/dist/css/bootstrap.css"])
          .pipe(concat(paths.concatCssDest))
          .pipe(cssclean())
          .pipe(gulp.dest("."));
});

gulp.task("copyfonts", function () {
    gulp.src(paths.scriptslib + "bootstrap/dist/fonts/**/*.{ttf,woff,woff2,eof,svg}")
    .pipe(gulp.dest(paths.releaseFolder + "fonts"));
});

gulp.task("copyhtml", function () {
    gulp.src(paths.html).pipe(gulp.dest('www/app'));
});

gulp.task("copyconfig", function () {
    gulp.src(paths.config).pipe(gulp.dest('www/scripts/app/cordova'));
});

gulp.task("copyresfolder", function () {
    gulp.src(["res/**/*.*"]).pipe(gulp.dest('www/res'));
});

gulp.task('min:htmlreplace', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'css/site.min.css',
        'js': 'scripts/site.min.js'
    }))
    .pipe(gulp.dest('www/'));
});

gulp.task("sass", function () {
    gulp.src("sass/" + "*.scss")
        .pipe(sass({ outputStyle: "nested" }).on("error", sass.logError))
        .pipe(lec({ verbose: true, eolc: "CRLF" }))
        .pipe(gulp.dest("css"))
        .on("error", exceptionLog);
});

var tsProject = ts.createProject("tsconfig.json");
gulp.task("typescript", function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write('.', {
           sourceRoot: function(file){ return file.cwd + '/src'; }
        }))
        .pipe(gulp.dest("scripts/app"));
});

function exceptionLog(error) {
    console.log(error.toString());
}

gulp.task("watch", function () {
    gulp.watch(["app/**/*.{ts,html}", "sass/*.scss"], ["typescript", "sass"]);
});

gulp.task('build', function(callback) {
  runSequence(["clean:app", "clean:css", "clean:release"],
                ["typescript", "sass"],
               ["min:js", "min:css", "copyfonts", "copyhtml","copyconfig", "copyresfolder"],
               ["min:htmlreplace"],
              callback);
});

gulp.task('default', function(callback) {
  runSequence(["clean:app", "clean:css", "clean:release"],
               ["typescript", "sass",],
               ["min:js", "min:css", "copyfonts", "copyhtml","copyconfig", "copyresfolder"],
               ["min:htmlreplace"],
              callback);
});
