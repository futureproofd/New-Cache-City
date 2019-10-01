const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

// use the passportjs mongoose strategy to take care of salting/hashing
passport.use(User.createStrategy());

// User model now has access to serialization to session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
