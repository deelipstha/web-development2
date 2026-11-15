
const express = require('express');
const mongoose = require('mongoose');

const Post = require('../models/Post');

const router = express.Router();

function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

// CREATE a post
router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        const savedPost = await post.save();

        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// GET one post
router.get('/:id', async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid post id'
            });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// UPDATE a post
router.put('/:id', async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid post id'
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPost) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// DELETE a post
router.delete('/:id', async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({
                error: 'Invalid post id'
            });
        }

        const deletedPost = await Post.findByIdAndDelete(
            req.params.id
        );

        if (!deletedPost) {
            return res.status(404).json({
                error: 'Post not found'
            });
        }

        res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;
