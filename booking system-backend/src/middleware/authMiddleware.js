const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified; // Attach user info to request
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access restricted to admins' });
    }
    next();
};

module.exports = { verifyToken, isAdmin };
