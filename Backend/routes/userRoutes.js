const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.get('/user', authMiddleware, userController.getProfile);

// Get all users (requires auth, optionally admin only)
router.get('/allUsers',  userController.getAllUsers);

// Ban a user
router.post('/ban/:userId', userController.banUser);

// Unban a user
router.post('/unban/:userId', authMiddleware, userController.unbanUser);


module.exports = router;
