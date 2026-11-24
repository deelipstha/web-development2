const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const postRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Blog API is running" });
});

app.use("/api/posts", postRoutes);

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Backend server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
    });