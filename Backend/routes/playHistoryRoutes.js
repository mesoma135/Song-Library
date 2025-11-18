const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const playHistoryController = require('../controllers/playHistoryController');
const router = express.Router();

//Post to log a play
router.post('/play', authMiddleware, playHistoryController.logSongPlay);

//GET to fetch User play history
router.get('/user/history', authMiddleware, playHistoryController.getUserHistory);

module.exports = router;