const db = require('../config/db');

//GET songs by Name
exports.getSongsbyTitle = async (req, res) => {
    try{
        const [songs] = await db.promise().query("SELECT * FROM Song WHERE Title = ?", [req.params.songName]);

        res.json(songs);
    } catch (err) {
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
    } catch (err) {
        res.status(500).json({ error: "An error occured...", details: err});
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
    } catch (err) {
        res.status(500).json({ error: "An error occured...", details: err});
    }
};

