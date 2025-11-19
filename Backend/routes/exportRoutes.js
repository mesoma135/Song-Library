const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const exportController = require('../controllers/exportController');

//GET to export playlist data to CSV
router.get('/playlists/csv', authMiddleware, exportController.exportPlaylistsCSV);

//GET to export playlist data to PDF
router.get('/playlists/pdf', authMiddleware, exportController.exportPlaylistsPDF);

module.exports = router;
