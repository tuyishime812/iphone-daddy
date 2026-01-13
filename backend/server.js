const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const { createAdminUser } = require('./utils/createAdmin');

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB (only when running as main module)
if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iphone-daddy', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    // Create admin user if it doesn't exist
    createAdminUser();
  })
  .catch(err => console.log('MongoDB connection error:', err));
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/merchandise', require('./routes/merchandise'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/orders', require('./routes/orders'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  // In Vercel environment, the frontend is built to the root dist folder
  const buildPath = process.env.VERCEL ? path.join(__dirname, '../../dist') : path.join(__dirname, '../frontend/dist');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

// Export the app for testing
module.exports = app;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}