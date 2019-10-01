const mongoose = require('mongoose');
const { promisify } = require('es6-promisify');
const { body, validationResult, sanitizeBody } = require('express-validator');

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
    .not()
    .isNumeric()
    .withMessage('No numbers allowed.'),

  body('email')
    .not()
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
  body('confirmPassword')
    .equals('password')
    .withMessage('Passwords do not match.'),
  (req, res, next) => {
    const errors = validationResult(req);

    if (errors !== undefined || errors.length !== 0) {
      req.flash('error', errors.mapped(err => err.msg));
    }
    next();
  },
];
