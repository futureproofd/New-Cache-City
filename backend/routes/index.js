const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api', (req, res) => {
  res.send('Hello from API!');
});

router.post(
  '/api/register',
  userController.validateRegistration,
  userController.register,
);

router.get('/flash', (req, res) => {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

module.exports = router;
