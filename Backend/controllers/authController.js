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
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Registration failed" });
    }
};

//POST Login for existing users
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user
        const [users] = await db.promise().query(
            "SELECT * FROM UserAccount WHERE Email = ?",
            [email]
        );
        if (users.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }
        const user = users[0];

        // Check password
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Create token
        const token = jwt.sign(
            { userId: user.UserID },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
};