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

// GET all playlists for user
exports.getUserPlaylists = async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM Playlist WHERE UserID = ?", [req.user.userId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch playlists" });
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
        console.log("Deleting playlist:", req.params.id, "User:", req.user.userId); //console log for more details on deletion status
        await db.promise().query(
            "DELETE FROM Playlist WHERE PlaylistID = ?", [req.params.id]);
        res.json({ message: "Playlist deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete playlist", details: err });
    }
};

// GET recent playlists (public)
exports.getRecentPlaylists = async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT p.PlaylistID, p.PlaylistName, u.UserName AS CreatorName, p.DateCreated
            FROM Playlist p
            JOIN UserAccount u ON p.UserID = u.UserID
            ORDER BY p.DateCreated DESC
            LIMIT 5
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch recent playlists", details: err });
    }
};

const json2csv = require('json2csv').parse; // if you don't have it, install: npm i json2csv
const PDFDocument = require('pdfkit');      // if you don't have it, install: npm i pdfkit

// Export a single playlist to CSV
exports.exportPlaylistCSV = async (req, res) => {
    try {
        const playlistId = req.params.playlistId;

        // Get playlist name
        const [playlistRows] = await db.promise().query(
            "SELECT PlaylistName FROM Playlist WHERE PlaylistID = ?", [playlistId]
        );
        if (playlistRows.length === 0) return res.status(404).json({ error: "Playlist not found" });

        const playlistName = playlistRows[0].PlaylistName;

        // Fetch songs
        const [rows] = await db.promise().query(`
            SELECT s.Title, s.Genre, s.Length, s.ReleaseDate, a.Name AS Artist
            FROM PlaylistSong ps
                     JOIN Song s ON ps.SongID = s.SongID
                     JOIN Artist a ON s.ArtistID = a.ArtistID
            WHERE ps.PlaylistID = ?
        `, [playlistId]);

        if (rows.length === 0) return res.status(404).json({ error: "No songs in this playlist" });

        const formattedRows = rows.map(r => ({
            Title: r.Title,
            Artist: r.Artist,
            Genre: r.Genre,
            Length: r.Length,
            ReleaseDate: r.ReleaseDate.toISOString().split('T')[0]
        }));

        const json2csv = require('json2csv').parse;
        const csv = json2csv(formattedRows);

        res.header('Content-Type', 'text/csv');
        const safeName = playlistName.replace(/\s+/g, '_');
        res.attachment(`${safeName}.csv`);
        res.send(csv);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to export CSV", details: err });
    }
};


// Export a single playlist to PDF
exports.exportPlaylistPDF = async (req, res) => {
    try {
        const playlistId = req.params.playlistId;

        // Get playlist info
        const [playlistRows] = await db.promise().query(
            "SELECT PlaylistName FROM Playlist WHERE PlaylistID = ?", [playlistId]
        );
        if (playlistRows.length === 0) return res.status(404).json({ error: "Playlist not found" });

        const playlistName = playlistRows[0].PlaylistName;

        // Fetch songs
        const [songRows] = await db.promise().query(`
            SELECT s.Title, s.Genre, s.Length, s.ReleaseDate, a.Name AS Artist
            FROM PlaylistSong ps
                     JOIN Song s ON ps.SongID = s.SongID
                     JOIN Artist a ON s.ArtistID = a.ArtistID
            WHERE ps.PlaylistID = ?
        `, [playlistId]);

        if (songRows.length === 0) return res.status(404).json({ error: "No songs in this playlist" });

        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');

        // Use playlist name as file name
        const safeName = playlistName.replace(/\s+/g, '_');
        res.setHeader('Content-Disposition', `attachment; filename=${safeName}.pdf`);
        doc.pipe(res);

        // Playlist title at top
        doc.fontSize(20).text(playlistName, { align: 'center' });
        doc.moveDown();

        songRows.forEach((song, index) => {
            const releaseDate = song.ReleaseDate.toISOString().split('T')[0]; // trim time
            doc.fontSize(12).text(
                `Title: ${song.Title}\nArtist: ${song.Artist}\nGenre: ${song.Genre}\nLength: ${song.Length}\nRelease Date: ${releaseDate}\n`
            );
            doc.moveDown();
        });

        doc.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to export PDF", details: err });
    }
};



