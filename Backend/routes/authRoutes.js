const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require("../validators/authValidators");
const validate = require("../middleware/validatorMiddleware");

//POST for user Registration
router.post('/register', registerValidation, validate, authController.register);

//POST for user Login
router.post('/login', loginValidation, validate, authController.login);

//POST user Logout with user authentication
router.post('/logout', authController.logout);

module.exports = router;

