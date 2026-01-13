// Script to add sample products to the database using in-memory MongoDB
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const Merchandise = require('./backend/models/Merchandise');

async function addSampleData() {
  try {
    // Start in-memory MongoDB
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    
    // Connect to in-memory DB
    await mongoose.connect(uri);
    
    console.log('Connected to in-memory MongoDB');
    
    // Sample products
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro Max',
        description: 'The latest iPhone with advanced camera system and A17 Pro chip',
        price: 1199,
        category: 'iphone',
        image: '/images/iphone 16.jpg' // Using one of the images from public directory
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
    
    // Close connection
    await mongoose.disconnect();
    await mongod.stop();
    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
    process.exit(1);
  }
}

addSampleData();