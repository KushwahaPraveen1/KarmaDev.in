const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
