module.exports = function allowedRoles(...allowed) {
    return (req, res, next) => {
      // Guest = user is not logged in at all
      if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      if (!allowed.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden: Access denied" });
      }
      next();
    };
  };