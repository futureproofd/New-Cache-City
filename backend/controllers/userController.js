const mongoose = require('mongoose');
const { promisify } = require('es6-promisify');
const {
  body,
  check,
  validationResult,
  sanitizeBody,
} = require('express-validator');

const User = mongoose.model('User');

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
  });
  const register = promisify(User.register.bind(User));
  await register(user, req.body.password);
  next();
};

// authenticated
exports.account = (req, res) => {
  res.send('Hello from account');
};

/**
 * Middlewares
 */

// Validations are provided in an array with a callback function
exports.validateRegistration = [
  sanitizeBody('name'),
  body('name')
    .not()
    .isEmpty()
    .withMessage('You must provide a name.')
    .isLength({ min: 3 })
    .withMessage('Must be at least 2 characters long.')
    .isAlphanumeric()
    .withMessage('No numbers allowed.'),

  body('email')
    .isEmail()
    .withMessage('Invalid email format.'),

  sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  }),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password required.'),
  body('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Please confirm password.'),
  check('password')
    .isLength({ min: 8 })
    .matches('[0-9]')
    .matches('[a-z]')
    .matches('[A-Z]')
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.confirmPassword) {
        return false;
      }
      return value;
    })
    .withMessage("Passwords don't match."),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.errors.length !== 0) {
      res.status(400).send({ errors: results.mapped(err => err.msg) });
      return;
    }
    next();
  },
];
