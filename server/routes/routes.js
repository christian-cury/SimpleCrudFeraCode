const express = require('express');

const app = express();

const web = require('./web');
const api = require('./api');

app.use('/', web);
app.use('/api', api);

module.exports = app;