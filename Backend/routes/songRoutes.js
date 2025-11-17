const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const allowedRoles = require('../middleware/roleMiddleware');


  
//GET song by title
router.get('/title/:songName', songController.getSongsbyTitle);

//GET song by artist name
router.get('/artist-name/:name', songController.getSongsByArtistName);

//DELETE song by id (Admin only)
router.delete("/:songId", authMiddleware, allowedRoles("admin"), songController.deleteSong);

//GET song by ID
router.get('/:id', songController.getSongById);

module.exports = router;