
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const pagesRouter = require('./routes/pages');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

async function connectToDatabase() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing from .env file');
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'blog'
        });

        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw error;
    }
}

app.locals.publicDir = publicDir;

app.use(express.json());
app.use(express.static(publicDir));

app.use('/', pagesRouter);
app.use('/api/posts', postsRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(publicDir, '404.html'));
});

// 500 error handler
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).sendFile(path.join(publicDir, '500.html'));
});

// Connect database before starting server
connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log('Mounted routers:');
            console.log('  / -> routes/pages.js');
            console.log('  /api/posts -> routes/posts.js');
        });
    })
    .catch(() => {
        console.error('Server could not start because database connection failed.');
        process.exit(1);
    });

