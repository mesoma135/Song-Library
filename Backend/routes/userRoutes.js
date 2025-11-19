const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/user', authMiddleware, userController.getProfile);

//GET all users (requires auth, optionally admin only)
router.get('/allUsers',  userController.getAllUsers);

//POST to ban a user
router.post('/ban/:userId', userController.banUser);

//POST to unban a user
router.post('/unban/:userId', authMiddleware, userController.unbanUser);


module.exports = router;
