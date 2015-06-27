/**---------------------------------------------------------------------------------------------------------------------
 * tgi-core/gulpfile.js
 */

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var childProcess = require('child_process');
var fs = require('fs');

// Source and _packaging
var libFiles = [
  'lib/tgi-server.lib.js',
  'lib/tgi-server.source.js'
];
var libPackaging = ['lib/_packaging/lib-header'].concat(['node_modules/tgi-core/dist/tgi.core.chunk.js']).concat(libFiles).concat(['lib/_packaging/lib-footer']);

// The Spec
var specFiles = [
  'node_modules/tgi-core//lib/_packaging/spec-header',
  'lib/_packaging/spec-header',
  'node_modules/tgi-core/dist/tgi.core.spec.chunk.js',
  'lib/tgi-server.spec.js',
  'lib/_packaging/spec-footer'
];

// Build Lib
gulp.task('_buildLib', function () {
  return gulp.src(libPackaging)
    .pipe(concat('tgi-server.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('tgi-server.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Build Lib Chunk
gulp.task('_buildLibChunk', function () {
  return gulp.src(libFiles)
    .pipe(concat('tgi.server.chunk.js'))
    .pipe(gulp.dest('dist'));
});

// Build Spec
gulp.task('_buildSpec', function () {
  return gulp.src(specFiles)
    .pipe(concat('tgi-server.spec.js'))
    .pipe(gulp.dest('dist'));
});

// Build Task
gulp.task('build', ['_buildLibChunk', '_buildLib', '_buildSpec'], function (callback) {
  callback();
});

// Lint Lib
gulp.task('_lintLib', ['_buildLibChunk','_buildLib'], function (callback) {
  return gulp.src('dist/tgi.core.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Lint Spec
gulp.task('_lintSpec', ['_buildSpec'], function (callback) {
  return gulp.src('dist/tgi.core.spec.js')
    .pipe(jshint({validthis: true, sub:true}))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Lint Task
gulp.task('lint', ['_lintLib', '_lintSpec'], function (callback) {
  callback();
});

// mkdir Task
gulp.task('mkdir', function (callback) {
  var pathName = 'json-file-store';
  fs.mkdir(pathName, undefined, function (err) {
    if (err) {
      if (err.code == 'EEXIST')
        callback();
      else {
        var damn = new Error('cannot create "' + pathName+'" folder');
        console.error(damn);
        callback(damn);
      }

    } else {
      callback();
    }
  });
});

// Test Task
gulp.task('test', ['lint','mkdir'], function (callback) {
  childProcess.exec('node spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    callback(error);
  });
});

// Coverage Task
gulp.task('cover', function (callback) {
  childProcess.exec('istanbul cover spec/node-runner.js', function (error, stdout, stderr) {
    console.log(stdout);
    console.error(stderr);
    callback(error);
  });
});

// Spec Task
gulp.task('spec', ['lint'], function (callback) {
  setTimeout(function () {
    childProcess.exec('node spec/node-make-spec-md.js', function (error, stdout, stderr) {
      console.log(stdout);
      callback(error);
    });
  }, 100); // Without this sometimes the exec runs before script is written/flushed ?
});

// Default & Travis CI Task
gulp.task('default', ['test']);
gulp.task('travis', ['test']);
