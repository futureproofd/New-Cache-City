const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/api', (req, res) => {
  res.send('Hello from API!');
});

router.get('/api/current_user', (req, res) => {
  console.log('api requesting current user:', req);
  res.send(req.user);
});

router.post('/api/login', authController.login);

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

router.get('/api/logout', authController.logout);

router.get('/flash', (req, res) => {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

module.exports = router;
