const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const cacheController = require('../controllers/cacheController');
const mapController = require('../controllers/mapContoller');
const uploadController = require('../controllers/uploadController');

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

/**
 * Cache routes
 */
router.get('/api/caches', authController.isLoggedIn, cacheController.caches);

router.post(
  '/api/addcache',
  authController.isLoggedIn,
  cacheController.validateCache,
  cacheController.addCache,
);

/**
 * Search route
 */
router.get(
  '/api/search',
  authController.isLoggedIn,
  cacheController.searchCaches,
);

/**
 * Map routes
 */
router.get(
  '/api/autocomplete',
  authController.isLoggedIn,
  mapController.autocomplete,
);

router.get(
  '/api/coordinates',
  authController.isLoggedIn,
  mapController.geocodeAddress,
);

/**
 * Upload routes
 */
router.post(
  '/api/upload',
  authController.isLoggedIn,
  uploadController.uploadImage,
);

module.exports = router;
