const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const exportController = require('../controllers/exportController');

//Export playlist data to CSV
router.get("/export/playlists/csv", authMiddleware, exportController.exportPlaylistsCSV);

//Export playlist data to PDF
router.get("/export/playlists/pdf", authMiddleware, exportController.exportPlaylistsPDF);

module.exports = router;
