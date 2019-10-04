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
// invoke a default, local passport strategy on the User model to provide sessions
require('./handlers/passportLocal');

// create Express application
const app = express();

const whitelist = [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN];

// CORS Policy for client access (sessions)
app.use(
  cors({
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: [
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    ],
    credentials: true,
    methods: ['GET', 'PUT', 'POST'],
    optionsSuccessStatus: 200, // avoid legacy browser choke on default 204
  }),
);

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
