const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require("../validators/authValidators");
const validate = require("../middleware/validatorMiddleware");

//new User Registration
router.post('/register', registerValidation, validate, authController.register);

//User Login
router.post('/login', loginValidation, validate, authController.login);

//User Logout with user authentication
router.post('/logout', authController.logout);

module.exports = router;

