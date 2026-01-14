// Test script to verify admin functionality
const mongoose = require('mongoose');
const User = require('./backend/models/User');
const dotenv = require('dotenv');

dotenv.config();

async function testAdminFunctionality() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iphone-daddy-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to database');

    // Check if admin user exists
    const adminUser = await User.findOne({ email: 'admin@iphonedaddy.com' });
    
    if (adminUser) {
      console.log('✓ Admin user exists in database');
      console.log('  Email:', adminUser.email);
      console.log('  Role:', adminUser.role);
    } else {
      console.log('✗ Admin user does not exist in database');
      console.log('Creating admin user...');
      
      // Import and run createAdminUser function
      const { createAdminUser } = require('./backend/utils/createAdmin');
      await createAdminUser();
      
      const newAdminUser = await User.findOne({ email: 'admin@iphonedaddy.com' });
      if (newAdminUser) {
        console.log('✓ Admin user created successfully');
      }
    }

    // Test admin authentication
    const bcrypt = require('bcryptjs');
    const testPassword = 'admin123'; // Default password from createAdmin.js
    const isMatch = await bcrypt.compare(testPassword, adminUser ? adminUser.password : (await User.findOne({ email: 'admin@iphonedaddy.com' })).password);
    
    if (isMatch) {
      console.log('✓ Admin authentication test passed');
    } else {
      console.log('✗ Admin authentication test failed');
    }

    console.log('\nAdmin functionality verification complete!');
    console.log('\nTo log in as admin:');
    console.log('Email: admin@iphonedaddy.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error during admin functionality test:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
}

testAdminFunctionality();