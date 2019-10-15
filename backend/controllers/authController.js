const passport = require('passport');

exports.login = (req, res, next) => {
  // generate the authenticate method and pass the req/res
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // send a redirect URI back to react-land for routing purposes
      return res
        .status(403)
        .send({ errors: 'Unsuccessful login attempt!', redirectURI: '/' });
    }
    // req / res held in closure
    req.logIn(user, (error) => {
      if (error) {
        return next(err);
      }
      // send a redirect URI back to react-land for routing purposes
      res.status(201).send({ user: user.email, redirectURI: '/' });
      next();
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  res.status(200).send({ redirectURI: '/' });
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
  res.status(401).send('Unauthorized. Please Login');
};
