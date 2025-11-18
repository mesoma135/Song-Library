const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

// GET artist by NAME
router.get('/name/:name', artistController.getArtistByName);

// GET top 4 artists
router.get('/top', artistController.getTopFourArtists)

//GET all artists
router.get('/all', artistController.getAllArtists);

// GET artist by ID
router.get('/:id', artistController.getArtistById);

module.exports = router;



