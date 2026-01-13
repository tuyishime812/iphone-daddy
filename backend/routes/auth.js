const express = require('express');
const router = express.Router();
const { login, getUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET api/auth
// @desc    Get user data
// @access  Private
router.get('/', auth, getUser);

module.exports = router;