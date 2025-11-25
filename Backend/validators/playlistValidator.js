const { body } = require("express-validator");

exports.createPlaylistValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Playlist name is required")
    .isLength({ min: 2 }).withMessage("Playlist name must be at least 2 characters")
];