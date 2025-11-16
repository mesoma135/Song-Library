const db = require('../config/db');

// GET artist by name
exports.getArtistByName = async (req, res) => {
    try {
        const { name } = req.params;
        const [artist] = await db.promise().query(
            "SELECT * FROM Artist WHERE Name = ?", [name]);
        if (artist.length === 0) {
            return res.status(404).json({ error: "Artist not found" });
        }
        res.json(artist);
    } catch (err) {
        res.status(500).json({ error: "An error occurred", details: err });
    }
};

// GET artist by ID
exports.getArtistById = async (req, res) => {
    try {
      const [artist] = await db.promise().query(
        "SELECT * FROM Artist WHERE ArtistID = ?",
        [req.params.id]
      );
      if (artist.length === 0) return res.status(404).json({ error: "Artist not found" });
      res.json(artist[0]);
    } catch (err) {
      res.status(500).json({ error: "An error occured...", details: err });
    }
  };
