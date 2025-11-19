const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middleware/authMiddleware');
const { createPlaylistValidation } = require('../validators/playlistValidator');
const validate = require('../middleware/validatorMiddleware');

//GET to fetch recent playlists
router.get('/recent', playlistController.getRecentPlaylists);

//POST to create playlist (requires token)
router.post('/', authMiddleware, createPlaylistValidation, validate, playlistController.createPlaylist);

//GET playlist by ID (requires token)
router.get('/:id', authMiddleware, playlistController.getPlaylist);

//PUT to update playlist name (requires token)
router.put('/:id', authMiddleware, playlistController.updatePlaylist);

//DELETE playlist (requires token)
router.delete('/:id', authMiddleware, playlistController.deletePlaylist);

//GET to export a playlist to CSV
router.get("/export/playlists/csv/:playlistId", authMiddleware, playlistController.exportPlaylistCSV);

//GET to export a playlist to PDF
router.get("/export/playlists/pdf/:playlistId", authMiddleware, playlistController.exportPlaylistPDF);




module.exports = router;