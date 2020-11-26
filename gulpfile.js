'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const config = require('./config');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

gulp.task('nodemon', () => {
  nodemon({
      script: './app/server/index.js',
      ext: 'js',
      watch: './app/server',
      env: { 'NODE_ENV': 'development' }
  })
});

/*
gulp.task('dev-server', (callback) => {
    let compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
        stats: { colors: true }
    }).listen(config.devPort, config.devListen, (err) => {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://210.140.171.54:8080/webpack-dev-server/dist/index.html');
        // keep the server alive or continue?
        callback();
    });
});
*/

//gulp.task('start', ['dev-server', 'server']);

gulp.task('lint', () => {
    return gulp.src(config.gulpServerSrc)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('watch', () => {
    gulp.watch([config.gulpServerSrc], ['lint']);
});

gulp.task('webpack', (callback) => {
    webpack(webpackConfig, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task('default', ['watch']);
