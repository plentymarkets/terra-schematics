const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('./tsconfig.json', {typescript: require('typescript')});

gulp.task('clean-dist', function () {
    return del('./dist/');
});

gulp.task("compile-ts", function () {
    return gulp.src('./src/**/!(*.d).ts')
        .pipe(ts({
            noImplicitAny: false,
            outFile: 'output.js'
        }))
        .pipe(gulp.dest('built/local'));
});
//
// gulp.task('copy-files', function () {
//     return gulp.src(['package.json',
//         'README.md',
//         './src/**/*'])
//         .pipe(gulp.dest('./dist/'));
// });

gulp.task('build', gulp.series(
    'clean-dist',
    'compile-ts',
    // 'copy-files'
));
