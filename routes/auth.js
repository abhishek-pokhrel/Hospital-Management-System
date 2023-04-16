const express = require('express');
const authController = require('../controllers/auth');
const { route } = require('./pages');
const router = express.Router();

// Register
// /auth/register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;