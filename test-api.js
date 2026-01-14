// Simple API test script
const axios = require('axios');

async function testAPIEndpoints() {
  const baseURL = 'http://localhost:5000/api';
  
  try {
    console.log('Testing API endpoints...\n');
    
    // Test products endpoint
    console.log('Testing /products endpoint...');
    try {
      const productsResponse = await axios.get(`${baseURL}/products`);
      console.log(`✓ Products endpoint: ${productsResponse.status} - Found ${productsResponse.data.length} products`);
    } catch (error) {
      console.log(`✗ Products endpoint failed: ${error.message}`);
    }
    
    // Test merchandise endpoint
    console.log('Testing /merchandise endpoint...');
    try {
      const merchResponse = await axios.get(`${baseURL}/merchandise`);
      console.log(`✓ Merchandise endpoint: ${merchResponse.status} - Found ${merchResponse.data.length} items`);
    } catch (error) {
      console.log(`✗ Merchandise endpoint failed: ${error.message}`);
    }
    
    console.log('\nAPI test completed. If endpoints show 0 items, run add-sample-data.js to add sample data.');
    
  } catch (error) {
    console.error('Error during API test:', error.message);
  }
}

testAPIEndpoints();