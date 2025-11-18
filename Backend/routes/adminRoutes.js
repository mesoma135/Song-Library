const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const allowedRoles = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

//PUT to ban a user
router.put('/ban/:userId', authMiddleware, allowedRoles("admin"), adminController.banUser);

// Unban a user
router.put("/unban/:userId", authMiddleware, allowedRoles("admin"), adminController.unbanUser);

// Delete a user
router.delete("/users/:userId", authMiddleware, allowedRoles("admin"), adminController.deleteUser);

// GET to fetch all banned users
router.get('/banned', authMiddleware, allowedRoles("admin"), adminController.getBannedUsers);

module.exports = router;