const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: [3, "Title must be at least 3 characters"],
            maxlength: [150, "Title must be at most 150 characters"]
        },
        content: {
            type: String,
            required: [true, "Content is required"],
            trim: true,
            minlength: [5, "Content must be at least 5 characters"]
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
            minlength: [2, "Author must be at least 2 characters"],
            maxlength: [80, "Author must be at most 80 characters"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Post", postSchema);