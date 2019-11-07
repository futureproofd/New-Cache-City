/* eslint-disable no-useless-escape */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const { body, validationResult, sanitizeBody } = require('express-validator');

const Cache = mongoose.model('Cache');

exports.caches = (req, res) => {
  res.status(200).send('yo');
};

exports.addCache = async (req, res) => {
  req.body.author = req.user._id;
  const loc = {
    type: 'Point',
    address: req.body.location,
    coordinates: [req.body.coordinates.lng, req.body.coordinates.lat],
  };
  try {
    await new Cache({
      name: req.body.name,
      description: req.body.description,
      location: loc,
      author: req.user._id,
    })
      .save()
      .then((cache) => {
        res.status(201).send({ cache, redirectURI: '/' });
      });
  } catch (err) {
    res.status(500).send({ err });
  }
};

/**
 * Middlewares
 */

// Validations are provided in an array with a callback function
exports.validateCache = [
  sanitizeBody('name'),
  body('name')
    .not()
    .isEmpty()
    .withMessage('You must provide a Cache name.')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 characters long.')
    .not()
    .matches(
      /\`|\~|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:/,
      'g',
    )
    .withMessage('No special characters allowed.'),

  sanitizeBody('description'),
  body('description')
    .not()
    .isEmpty()
    .withMessage('You must provide a Cache description.')
    .isLength({ min: 20 })
    .withMessage('Must be at least 20 characters long.')
    .not()
    .matches(
      /\`|\~|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\<|\>|\/|\""|\;/,
      'g',
    )
    .withMessage('No special characters allowed.'),

  body('location')
    .not()
    .isEmpty()
    .withMessage('You must provide a general location.')
    .isLength({ min: 3 })
    .withMessage('Must be at least 3 characters long.')
    .not()
    .matches(
      /\`|\~|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\>|\/|\""|\;/,
      'g',
    )
    .withMessage('Invalid location characters.'),

  body('coordinates')
    .not()
    .isEmpty()
    .withMessage('You must provide a set of refined coordinates.')
    .not()
    .isLatLong()
    .withMessage('Invalid Coordinates.'),
  (req, res, next) => {
    const results = validationResult(req);

    if (results.errors.length !== 0) {
      res.status(400).send({ errors: results.mapped(err => err.msg) });
      return;
    }
    next();
  },
];
