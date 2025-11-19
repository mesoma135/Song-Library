const db = require('../config/db');

exports.getProfile = async (req, res) => {
    try{
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
} catch (err){
    res.status(500).json({ error: 'Error retrieving user profile', details: err})
}
}