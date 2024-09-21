const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

const UserRoutes = require('./server/routes/user');
const PostRoutes = require('./server/routes/post');

app.use('/api/users', UserRoutes);
app.use('/api/posts', PostRoutes);

const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
