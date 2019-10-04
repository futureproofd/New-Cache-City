const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/api', (req, res) => {
  res.send('Hello from API!');
});

/**
 * Register a new user
 */
router.post(
  '/api/register',
  userController.validateRegistration,
  userController.register,
  authController.login,
);

// just a test when accessing api endpoint
router.get('/api/account', authController.isLoggedIn, userController.account);

router.get('/flash', (req, res) => {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

module.exports = router;
