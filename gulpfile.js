const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const plumber = require('gulp-plumber');

// a task to compile our sass
gulp.task("styles", () => {
	return gulp.src("./dev/styles/**/*.scss")
	// grabs any files or folders that re nested within with the .scss extension
		.pipe(sass().on("error", sass.logError))
		.pipe(concat("style.css"))
		.pipe(gulp.dest("./public/styles"));
});

// a task to compile our javascript
gulp.task("scripts", () => {
	return gulp.src("./dev/scripts/**/*.js")
	.pipe(plumber())
	// also can use "glob pattern" for src .dev/scripts/**/*.js
	.pipe(babel({
		presets: ["es2015"]
	}))
	.pipe(gulp.dest("./public/scripts"));
});

// a task to watch all of my other tasks
gulp.task("watch", () => {
	gulp.watch("./dev/styles/**/*.scss", ["styles"]);
	gulp.watch("./dev/scripts/**/*.js", ["scripts"]);
});

// a default task
gulp.task("default", ["styles", "scripts", "watch"]);