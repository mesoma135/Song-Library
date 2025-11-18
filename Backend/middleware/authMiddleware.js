const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "No token was provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded payload to request
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ error: "Invalid/expired token" });
    }
};
