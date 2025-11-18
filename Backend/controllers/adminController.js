const db = require('../config/db');

exports.banUser = async (req, res) => {
    try {
      await db.promise().query(
        "UPDATE UserAccount SET isBanned = TRUE WHERE UserID = ?",
        [req.params.userId]
      );
  
      return res.json({ message: "User banned successfully" });
    } 
    catch(err) {
      console.error(err);
      res.status(500).json({ error: "Failed to ban user" });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      await db.promise().query(
        "DELETE FROM UserAccount WHERE UserID = ?", [userId]);
        return res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete user" });
    }
  };

  exports.unbanUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      await db.promise().query(
        "UPDATE UserAccount SET isBanned = FALSE WHERE UserID = ?",
        [userId]
      );
  
      return res.json({ message: "User unbanned successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to unban user" });
    }
  };

exports.getBannedUsers = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT UserID, UserName, Email FROM UserAccount WHERE isBanned = TRUE"
    );

    return res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch banned users" });
  }
};