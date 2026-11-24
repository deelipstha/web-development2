const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../models/Post");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return res.json(posts);
    } catch (err) {
        return res.status(500).json({ error: "Failed to load posts" });
    }
});

// GET single post by ID
router.get("/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.json(post);
    } catch (err) {
        return res.status(500).json({ error: "Failed to load post" });
    }
});

// POST create a new post
router.post("/", async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        return res.status(201).json(newPost);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: "Failed to create post" });
    }
});

// PUT update an existing post by ID
router.put("/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.json(updatedPost);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: "Failed to update post" });
    }
});

// DELETE a post by ID
router.delete("/:id", async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).json({ error: "Invalid post ID" });
    }
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        return res.json({ message: "Post deleted successfully", id: deletedPost._id });
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete post" });
    }
});

module.exports = router;