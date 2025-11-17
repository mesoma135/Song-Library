const express = require('express');
const router = express.Router();
const playlistSongController = require('../controllers/playlistSongController');
const authMiddleware = require('../middleware/authMiddleware');

// ADD to add a song to a playlist
router.post('/:playlistId/songs', authMiddleware, playlistSongController.addSongToPlaylist);

// DELETE to remove a song from a playlist
router.delete('/:playlistId/songs/:songId', authMiddleware, playlistSongController.removeSongFromPlaylist);

// GET to read all songs inside a playlist
router.get('/:playlistId/songs', authMiddleware, playlistSongController.getSongsInPlaylist);

module.exports = router;