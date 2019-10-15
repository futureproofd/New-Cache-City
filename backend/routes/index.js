const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// confirm login session for user
router.get('/api/current_user', (req, res) => {
  res.send(req.user);
});

router.post(
  '/api/register',
  userController.validateRegistration,
  userController.register,
  authController.login,
);

// just a test when accessing api endpoint
router.get('/api/account', authController.isLoggedIn, userController.account);

router.post('/api/login', authController.login);

router.get('/api/logout', authController.isLoggedIn, authController.logout);

router.get('/flash', (req, res) => {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

module.exports = router;
