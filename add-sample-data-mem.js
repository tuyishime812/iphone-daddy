// Script to add sample products to the database using in-memory MongoDB
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const Merchandise = require('./backend/models/Merchandise');

async function addSampleDataWithMemoryDB() {
  let mongoServer;
  
  try {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to in-memory MongoDB
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to in-memory MongoDB');

    // Sample products
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro Max',
        description: 'The latest iPhone with advanced camera system and A17 Pro chip',
        price: 1199,
        category: 'iphone',
        image: '/images/iphone 16.jpg'
      },
      {
        name: 'iPhone 14 Pro',
        description: 'Dynamic Island, 48MP camera system',
        price: 999,
        category: 'iphone',
        image: '/images/iphone 14.jpg'
      },
      {
        name: 'iPhone 13',
        description: 'Dual-camera system with Night mode',
        price: 699,
        category: 'iphone',
        image: '/images/iphone 13.jpg'
      }
    ];

    // Sample merchandise
    const sampleMerchandise = [
      {
        name: 'iPhone Daddy Hoodie',
        description: 'Premium cotton hoodie with iPhone Daddy logo',
        price: 49.99,
        category: 'hoodie',
        image: '/images/iphone t shirt.jpg'
      },
      {
        name: 'iPhone Daddy T-Shirt',
        description: 'Comfortable cotton t-shirt with custom design',
        price: 24.99,
        category: 'tshirt',
        image: '/images/iphone t shirt.jpg'
      }
    ];

    // Clear existing data
    await Product.deleteMany({});
    await Merchandise.deleteMany({});

    // Add sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added');

    // Add sample merchandise
    await Merchandise.insertMany(sampleMerchandise);
    console.log('Sample merchandise added');

    console.log('Sample data added successfully to in-memory database!');
    console.log('Note: This is only for testing purposes. For the actual application, you need MongoDB running.');

  } catch (error) {
    console.error('Error adding sample data:', error);
  } finally {
    // Close connections
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  }
}

addSampleDataWithMemoryDB();