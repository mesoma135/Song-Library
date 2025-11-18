const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

//GET song by title
router.get('/title/:songName', songController.getSongsbyTitle);

//GET song by artist name
router.get('/artist-name/:name', songController.getSongsByArtistName);

//GET all songs with artist (for songs page)
router.get('/allWithArtist', songController.getAllWithArtist);

//GET all songs
router.get('/', songController.getAllSongs);

//GET song by ID
router.get('/:id', songController.getSongById);

module.exports = router;