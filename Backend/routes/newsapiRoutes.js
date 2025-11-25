const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsapiController");

//GET to fetch /api/news/music
router.get("/music", newsController.getMusicNews);

module.exports = router;