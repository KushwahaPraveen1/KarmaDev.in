const express = require('express');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;

    try {
        const post = new Post({
            title,
            content,
            author: req.user.id // Get the user ID from the JWT token
        });

        await post.save();
        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author').sort({ createdAt: -1 });
    res.json(posts);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(post, req.body, { updatedAt: Date.now() });
    await post.save();
    res.json(post);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await post.remove();
    res.status(204).send();
});

module.exports = router;
