const db = require('../config/db');

//THIS WAS UNUSED IN THE FINAL IMPLEMENTATION

exports.logSongPlay = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { songId, device } = req.body;

        await db.promise().query(
            `INSERT INTO UserHistory (UserID, SongID, PlayDate, Device)
             VALUES (?, ?, NOW(), ?)`,
            [userId, songId, device || 'Web']
        );
        res.json({ message: "Play logged" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to log history" });
    }
};

function timeAgo(date){
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            //plural
            let unit = interval.label;
            if(count > 1){
                unit = unit + 's';
            }
            return count + ' ' + unit + ' ago';
        }
    }
    return "Just now";
}

exports.getUserHistory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const [rows] = await db.promise().query(
            `SELECT h.HistoryID, h.SongID, s.Title AS SongTitle, h.PlayDate, h.Device
             FROM UserHistory h
             JOIN Song s ON h.SongID = s.SongID
             WHERE h.UserID = ?
             ORDER BY h.PlayDate DESC`,
            [userId]
        );

        // Attach "timeAgo" to each entry
        const formattedRows = rows.map(item => ({
            ...item,
            timeAgo: timeAgo(item.PlayDate)
        }));

        res.json(formattedRows);
    } 
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user history" });
    }
}