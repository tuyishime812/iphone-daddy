// Script to add sample products to the database
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./backend/models/Product');
const Merchandise = require('./backend/models/Merchandise');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iphone-daddy', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

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

async function addSampleData() {
  try {
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
    mongoose.connection.close();
    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
    mongoose.connection.close();
  }
}

addSampleData();