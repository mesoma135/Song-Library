const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');
const { createPlaylistValidation } = require('../validators/playlistValidator');
const validate = require('../middleware/validatorMiddleware');

// CREATE playlist (requires token)
router.post('/', authMiddleware, createPlaylistValidation, validate, playlistController.createPlaylist);

// GET playlist by ID (requires token)
router.get('/:id', authMiddleware, playlistController.getPlaylist);

// UPDATE playlist name (requires token)
router.put('/:id', authMiddleware, playlistController.updatePlaylist);

// DELETE playlist (requires token)
router.delete('/:id', authMiddleware, playlistController.deletePlaylist);


module.exports = router;