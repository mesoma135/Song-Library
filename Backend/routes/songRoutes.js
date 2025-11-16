const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

//GET song by title
router.get('/title/:songName', songController.getSongsbyTitle);

//GET song by artist name
router.get('/artist-name/:name', songController.getSongsByArtistName);

//GET song by ID
router.get('/:id', songController.getSongById);

module.exports = router;