const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//POST Registration for new users
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // User insert
        const [result] = await db.promise().query(
            "INSERT INTO UserAccount (UserName, Email, Password, JoinDate) VALUES (?, ?, ?, CURDATE())",
            [username, email, hashedPassword]
        );
        res.json({ message: "User registered", userId: result.insertId });
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Registration failed" });
    }
};

//POST Login for existing users
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const [rows] = await db.promise().query(
            "SELECT UserID, UserName, Email, Password FROM UserAccount WHERE Email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const user = rows[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Create token
        const token = jwt.sign(
            { userId: user.UserID, userName: user.UserName },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({ message: "Login successful", token,
            username: user.UserName,
            id: user.UserID});

    } catch (err) {
        res.status(500).json({ error: "Login failed", details: err });
    }
};




exports.logout = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(400).json({ error: "No token found" });
      }
      const token = authHeader.split(" ")[1];

      const decoded = jwt.decode(token);

      // Save the token to blacklist
      await db.promise().query(
        "INSERT INTO TokenBlacklist (token) VALUES (?)", [token]);
      return res.json({ message: "Logout successful" });
    } 
    catch (err) {
      console.error(err);
      res.status(500).json({ error: "Logout unsuccessful", details: err });
    }
  };