const passport = require('passport');

exports.login = (req, res, next) => {
  // generate the authenticate method and pass the req/res
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/');
    }

    // req / res held in closure
    req.logIn(user, (error) => {
      if (error) {
        return next(err);
      }
      // send a redirect URI back to react-land for routing purposes
      return res.status(201).send({ user: user.email, redirectURI: '/' });
    });
  })(req, res, next);
};

/**
 * Middlewares
 */
exports.isLoggedIn = (req, res, next) => {
  // check user auth via passportJS method
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'You must be logged in');
  res.status(401).send('Unauthorized. Please Login');
};

exports.logout = (req, res) => {
  // destroy session via passportJS method
  req.logout();
  req.flash('success', 'Logged out!');
  res.redirect('/');
};
