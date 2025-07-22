const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/leaderboard';

mongoose.connect(MONGODB_URI, {
  
})
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.error('MongoDB connection error:', err));


// API Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/claim', require('./routes/claim'));
app.use('/api/history', require('./routes/history'));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
