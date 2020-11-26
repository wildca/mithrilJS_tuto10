'use strict';
const path = require('path');

const rootDir = '/usr/src/app';
const appDir = path.join(rootDir, 'app');
const distDir = path.join(rootDir, 'dist');
const serverDir = path.join(appDir, 'server');

const config = {
    distDir: distDir,
    gulpServerSrc: serverDir+'/*.js',
    port: process.env.EXPRESS_PORT,
    devPort: process.env.DEV_SERVER_PORT,
    devListen: process.env.DEV_SERVER_LISTEN
};

module.exports = config;
