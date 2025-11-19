const db = require('../config/db');

// Get current logged-in user profile
exports.getProfile = async (req, res) => {
    try {
        const [user] = await db.promise().query(
            `SELECT UserName, Email, Country, role, JoinDate
             FROM UserAccount
             WHERE UserID = ?`,
            [req.user.userId]
        );

        if(user.length === 0){
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error retrieving user profile', details: err });
    }
};

// Get all users (no passwords)
exports.getAllUsers = async (req, res) => {
    try {
        const [users] = await db.promise().query(
            `SELECT UserID, UserName, Email, Country, role, JoinDate, isBanned
             FROM UserAccount`
        );

        res.json(users);
    } catch (err) {
        console.error("Error in getAllUsers:", err);
        res.status(500).json({ error: 'Error retrieving users', details: err });
    }
};

// Ban a user (set isBanned = 1)
exports.banUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Optionally prevent banning admins
        const [user] = await db.promise().query(
            `SELECT role FROM UserAccount WHERE UserID = ?`,
            [userId]
        );

        if(user.length === 0) return res.status(404).json({ error: 'User not found' });
        if(user[0].role === 'admin') return res.status(403).json({ error: 'Cannot ban an admin' });

        await db.promise().query(
            `UPDATE UserAccount SET isBanned = 1 WHERE UserID = ?`,
            [userId]
        );

        res.json({ message: 'User has been banned' });
    } catch (err) {
        res.status(500).json({ error: 'Error banning user', details: err });
    }
};

// Unban user (set isBanned = 0)
exports.unbanUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const [user] = await db.promise().query(
            `SELECT role FROM UserAccount WHERE UserID = ?`,
            [userId]
        );

        if(user.length === 0) return res.status(404).json({ error: 'User not found' });
        if(user[0].role === 'admin') return res.status(403).json({ error: 'Cannot unban an admin' });

        await db.promise().query(
            `UPDATE UserAccount SET isBanned = 0 WHERE UserID = ?`,
            [userId]
        );

        res.json({ message: 'User has been unbanned' });
    } catch (err) {
        res.status(500).json({ error: 'Error unbanning user', details: err });
    }
};