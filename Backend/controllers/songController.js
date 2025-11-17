const db = require('../config/db');

//GET songs by Name
exports.getSongsbyTitle = async (req, res) => {
    try{
        const [songs] = await db.promise().query("SELECT * FROM Song WHERE Title = ?", [req.params.songName]);

        res.json(songs);
    } 
    catch (err) {
        res.status(500).json({ error: "An error occured..."})
    }
}

// GET songs by Artist Name
exports.getSongsByArtistName = async (req, res) => {
    try {
        const [songs] = await db.promise().query(
            `SELECT S.* 
             FROM Song S
             JOIN Artist A ON S.ArtistID = A.ArtistID
             WHERE A.Name = ?`,
            [req.params.name]);
        if (songs.length === 0) {
            return res.status(404).json({ error: "No songs found for this artist" });
        }
        res.json(songs);
    } 
    catch (err){
        res.status(500).json({ error: "An error occured...", details: err});
    }
};

//DELETE song by id (Admin only)
exports.deleteSong = async (req, res) => {
    try {
      const songId = req.params.songId;
      await db.promise().query("DELETE FROM Songs WHERE SongID = ?", [req.params.songId]);
      return res.json({ message: "Song deleted successfully" });
    } 
    catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete song" });
    }
};

//GET song by ID
exports.getSongById = async (req, res) => {
    try {
        const [song] = await db.promise().query("SELECT * FROM Song WHERE SongID = ?", [req.params.id]);

        if (song.length === 0) {
            return res.status(404).json({ error: "Song not found" });
        }
        res.json(song[0]);
    } 
    catch (err) {
        res.status(500).json({ error: "An error occured...", details: err});
    }
};

// GET all songs
exports.getAllSongs = async (req, res) => {
    try {
        const [songs] = await db.promise().query("SELECT * FROM Song");
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: "An error occurred", details: err });
    }
};
