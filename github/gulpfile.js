var gulp = require("gulp"),
rimraf = require("rimraf"),
concat = require("gulp-concat"),
cssmin = require("gulp-cssmin"),
uglify = require("gulp-uglify"),
cssclean = require("gulp-clean-css"),
del = require("del"),
ts = require('gulp-typescript'),
htmlreplace = require('gulp-html-replace'),
sass = require("gulp-sass"),
lec = require("gulp-line-ending-corrector"),
runSequence = require('run-sequence');

var paths = {
    webroot: "./release/",
    scriptslib: "scripts/lib/",
    css: "./css/**/*.css",
    app: "./scripts/app/",
    tsscripts: ["scripts/app/**/*.js", "scripts/app/**/*.ts", "scripts/app/**/*.map"],
    html: ["scripts/app/**/*.html"],
    jslibraryincludes: ["scripts/lib/" + "jquery/dist/jquery.js", "scripts/lib/" + "bootstrap/dist/js/bootstrap.js",
           "scripts/lib/" + "angular/angular.js", "scripts/lib/" + "angular-ui-router/release/angular-ui-router.js",
            "scripts/lib/" + "spin.js/spin.js", "scripts/lib/" + "angular-spinner/angular-spinner.js"],
    csslibraryinclude: ["scripts/lib/" + "bootstrap/dist/css/bootstrap.css"]
};

paths.concatJsDest = paths.webroot + "scripts/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:app", function () {
    rimraf("scripts/app");
});

gulp.task("clean:css", function () {
    rimraf("css");
});

gulp.task("clean:release", function () {
    rimraf("release");
});

gulp.task('cleanscriptsfolder', function () {
    return del(["release/scripts/**/*"]);
});

gulp.task('copyscriptsfolder', function () {
    gulp.src(paths.tsscripts).pipe(gulp.dest("release/scripts/app"));
    gulp.src(paths.html).pipe(gulp.dest("release/scripts/app"));
    gulp.src(paths.jslibraryincludes).pipe(gulp.dest("release/scripts"));
    gulp.src(paths.csslibraryinclude).pipe(gulp.dest("release/css"));
    gulp.src(paths.css).pipe(gulp.dest("release/css"));
});

gulp.task("min:js", function () {
    return gulp.src([
            paths.scriptslib + "jquery/dist/jquery.js",
            paths.scriptslib + "bootstrap/dist/js/bootstrap.min.js",
            paths.scriptslib + "angular/angular.js",
            paths.scriptslib + "angular-ui-router/release/angular-ui-router.js",
            paths.scriptslib + "spin.js/spin.js",
            paths.scriptslib + "angular-spinner/angular-spinner.js",
            paths.app + "repo-issues/*.js",
            paths.app + "repo-issues/model/*.js",
            paths.app + "repo-search/*.js",
            paths.app + "repo-search/model/*.js",
            paths.app + "*.js"])
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
    .pipe(gulp.dest(paths.webroot + "fonts"));
});

gulp.task("copyhtml", function () {
    gulp.src(paths.html).pipe(gulp.dest('release/scripts/app'));
});

gulp.task('min:htmlreplace', function() {
  gulp.src('index.html')
    .pipe(htmlreplace({
        'css': 'css/site.min.css',
        'js': 'scripts/site.min.js'
    }))
    .pipe(gulp.dest('release/'));
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
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest("scripts/app"));
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
               ["min:js", "min:css", "copyfonts", "copyhtml"],
               ["min:htmlreplace"],
              callback);
});

gulp.task('default', function(callback) {
  runSequence(["clean:app", "clean:css", "clean:release"],
               ["typescript", "sass",],
               ["min:js", "min:css", "copyfonts", "copyhtml"],
               ["min:htmlreplace"],
              callback);
});
