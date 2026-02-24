import express from 'express';
import Post from '../models/Post.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all posts (Public)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single post (Public)
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create post (Admin Only)
router.post('/', protectAdmin, async (req, res) => {
    try {
        const { title, content, image } = req.body;
        const newPost = await Post.create({ title, content, image, authorId: req.user._id });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update post (Admin Only)
router.put('/:id', protectAdmin, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete post (Admin Only)
router.delete('/:id', protectAdmin, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;