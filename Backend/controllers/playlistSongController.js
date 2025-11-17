const db = require('../config/db');

async function verifyOwnership(req) {
    const [rows] = await db.promise().query(
        "SELECT * FROM Playlist WHERE PlaylistID = ? AND UserID = ?",
        [req.params.playlistId, req.user.userId]
    );
    return rows.length > 0;
}

//ADD a song to a playlist
exports.addSongToPlaylist = async (req, res) => {
    try {
        // Check that playlist belongs to the user
        const ownsPlaylist = await verifyOwnership(req);
        if (!ownsPlaylist) {
            return res.status(403).json({ error: "Not authorized to modify this playlist" });
        }
        await db.promise().query("INSERT INTO PlaylistSong (PlaylistID, SongID) VALUES (?, ?)", [req.params.playlistId, req.body.songId]);
        res.json({ message: "Song has been added to playlist" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add song", details: err });
    }
};

//DELETE to remove a song from a playlist
exports.removeSongFromPlaylist = async (req, res) => {
    try {
        const ownsPlaylist = await verifyOwnership(req); // Check that playlist belongs to the user
        if (!ownsPlaylist) {
            return res.status(403).json({ error: "Not authorized to modify this playlist" });
        }
        // Delete the song from the playlist
        await db.promise().query(
            "DELETE FROM PlaylistSong WHERE PlaylistID = ? AND SongID = ?", [req.params.playlistId, req.params.songId]);
        res.json({ message: "Song removed from playlist" });
    } catch (err) {
        res.status(500).json({ error: "Failed to remove song", details: err });
    }
};

//GET to fetch all songs inside a playlist
exports.getSongsInPlaylist = async (req, res) => {
    try {
        
        const ownsPlaylist = await verifyOwnership(req); // Check that playlist belongs to the user
        if (!ownsPlaylist) {
            return res.status(403).json({ error: "Not authorized to view this playlist" });
        }

        const [songs] = await db.promise().query(
            `SELECT S.* 
             FROM Song S
             JOIN PlaylistSong PS ON S.SongID = PS.SongID
             WHERE PS.PlaylistID = ?`, [req.params.playlistId]);
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch songs", details: err });
    }
};