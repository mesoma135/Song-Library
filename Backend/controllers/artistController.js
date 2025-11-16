const db = require('../config/db');

exports.getAllArtists = async (req, res) => {
    try{
        const [artist] = await db.promise().query("SELECT * FROM Artist");
        res.json(artist);
    } catch (err) {
        res.status(500).json({error: "Database error", details: err });
    }
};