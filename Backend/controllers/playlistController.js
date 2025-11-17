const db = require('../config/db');

// CREATE playlist
exports.createPlaylist = async (req, res) => {
    try {
        const [result] = await db.promise().query(
            "INSERT INTO Playlist (UserID, PlaylistName, DateCreated) VALUES (?, ?, CURDATE())", [req.user.userId, req.body.name]);
        res.json({ message: "Playlist created", playlistId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: "Failed to create playlist", details: err });
    }
};

// GET playlist by ID
exports.getPlaylist = async (req, res) => {
    try {
        const playlistId = req.params.id;

        const [rows] = await db.promise().query(
            "SELECT * FROM Playlist WHERE PlaylistID = ? AND UserID = ?",
            [playlistId, req.user.userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Playlist not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch playlist", details: err });
    }
};

exports.updatePlaylist = async (req, res) => {
    try {
          // Ensure the playlist belongs to the user
        const [check] = await db.promise().query(
            "SELECT * FROM Playlist WHERE PlaylistID = ? AND UserID = ?", [req.params.id, req.user.userId]);
        if (check.length === 0) {
            return res.status(403).json({ error: "Not authorized to update this playlist" });
        }
        // Update playlist name
        await db.promise().query(
            "UPDATE Playlist SET PlaylistName = ? WHERE PlaylistID = ?", [req.body.name, req.params.id]);
        res.json({ message: "Playlist updated!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to update playlist", details: err });
    }
};

// DELETE playlist
exports.deletePlaylist = async (req, res) => {
    try {
        // Ensure the playlist belongs to the user
        const [check] = await db.promise().query(
            "SELECT * FROM Playlist WHERE PlaylistID = ? AND UserID = ?", [req.params.id, req.user.userId]);
        if (check.length === 0) {
            return res.status(403).json({ error: "Not authorized to delete this playlist" });
        }
        console.log("Deleting playlist:", req.params.id, "User:", req.user.userId);
        await db.promise().query(
            "DELETE FROM Playlist WHERE PlaylistID = ?", [req.params.id]);
        res.json({ message: "Playlist deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete playlist", details: err });
    }
};