const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');
const { createPlaylistValidation } = require('../validators/playlistValidator');
const validate = require('../middleware/validatorMiddleware');

// Public route for recent playlists
router.get('/recent', playlistController.getRecentPlaylists);

// CREATE playlist (requires token)
router.post('/', authMiddleware, createPlaylistValidation, validate, playlistController.createPlaylist);

router.get('/', authMiddleware, playlistController.getUserPlaylists);

// GET playlist by ID (requires token)
router.get('/:id', authMiddleware, playlistController.getPlaylist);

// UPDATE playlist name (requires token)
router.put('/:id', authMiddleware, playlistController.updatePlaylist);

// DELETE playlist (requires token)
router.delete('/:id', authMiddleware, playlistController.deletePlaylist);

//Export playlist data to CSV
router.get("/export/playlists/csv", authMiddleware, playlistController.exportPlaylistsCSV);

//Export playlist data to PDF
router.get("/export/playlists/pdf", authMiddleware, playlistController.exportPlaylistsPDF);



module.exports = router;