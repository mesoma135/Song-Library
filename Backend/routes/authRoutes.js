const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//new User Registration
router.post('/register', authController.register);

//User Login
router.post('/login', authController.login);

//User Logout with user authentication
router.post('/logout', authController.logout);

module.exports = router;

