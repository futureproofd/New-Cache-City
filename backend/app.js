const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const routes = require('./routes/index.js');
// invoke our local passport strategy on the User model
require('./handlers/passportLocal');

// create Express application
const app = express();

app.use(cors());

// convert raw requests to JSON properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// populate req.cookies with any
app.use(cookieParser());

// setup sessions to use our database for storing user sessions
// local passport strategy will serialize the 'User' on a session cookie
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// add flash middleware to requests - stored on above session
app.use(flash());

// handle routes
app.use('/', routes);

module.exports = app;
