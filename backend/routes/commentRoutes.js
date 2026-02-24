import express from 'express';
import Comment from '../models/Comment.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ek post ke comments get karein (Public)
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Naya comment add karein (Public)
router.post('/', async (req, res) => {
    try {
        const { postId, visitorName, content } = req.body;
        const comment = await Comment.create({ postId, visitorName, content });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Comment delete karein (Admin Only - extra feature for control)
router.delete('/:id', protectAdmin, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;