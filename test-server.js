const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createAdminUser } = require('./backend/utils/createAdmin');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Routes
app.use('/api/products', require('./backend/routes/products'));
app.use('/api/merchandise', require('./backend/routes/merchandise'));
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/chat', require('./backend/routes/chat'));
app.use('/api/orders', require('./backend/routes/orders'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/dist/index.html'));
  });
}

async function startServer() {
  try {
    // Start in-memory MongoDB
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // Connect to in-memory DB
    await mongoose.connect(uri);

    console.log('Connected to in-memory MongoDB');

    // Create admin user if it doesn't exist
    await createAdminUser();

    // Start the server
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.disconnect();
      await mongod.stop();
      server.close();
      console.log('Server closed');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();