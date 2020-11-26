'use strict';

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const config = require('../../config');

const app = express();
const server = app.listen(config.port);
const isProduction = process.env.NODE_ENV === 'production';

if(!isProduction) {
    const webpack = require('webpack');
    const webpackConfig = require('../../webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(favicon(path.join(config.distDir,'images/favicon.ico')));
app.use(express.static(config.distDir));
app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    console.log('get tasks');
    try {
        res.send(JSON.parse(fs.readFileSync('todo.json', 'utf8')));
    } catch (e) {
        res.send([]);
    }
});

app.post('/tasks', (req, res) => {
    console.log('post tasks');
    fs.writeFileSync('todo.json',
                     JSON.stringify(req.body));
    res.status(200).end();
});


app.get('/', (req, res) => {
    res.sendFile(path.join(config.distDir, 'index.html'));
});
