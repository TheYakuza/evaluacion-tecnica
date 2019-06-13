const express = require('express');

const main = require('./main');

const app = express();

app.use('/', main);

module.exports = app;
