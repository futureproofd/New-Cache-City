const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index.js');

// TODO: invoke our passport strategies

// create Express application
const app = express();

// convert raw requests to JSON properties on req.body
app.use(bodyParser.json());
// TODO: urlencoding?

// populate req.cookies with any
app.use(cookieParser());

// handle routes
app.use('/', routes);

module.exports = app;
