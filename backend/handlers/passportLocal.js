const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

// use the passportjs mongoose strategy to take care of salting/hashing
passport.use(User.createStrategy());

// User model now has access to deserialize user object on session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
