const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Register route
router.post(
    '/register',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const existingUser = await User.findOne({ $or: [{ username }] });
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, password: hashedPassword });
            await newUser.save();

            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }
);

// Login route
router.post(
    '/login',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
            res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error', error: err.message });
        }
    }
);

module.exports = router;
