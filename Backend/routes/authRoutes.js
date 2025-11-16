const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//new User Registration
router.post('/register', authController.register);

//User Login
router.post('/login', authController.login);

module.exports = router;