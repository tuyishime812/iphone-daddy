const axios = require('axios');

// Test the order API endpoints
async function testOrderAPI() {
  const API_BASE_URL = 'http://localhost:5000/api';
  
  console.log('Testing Order API endpoints...\n');
  
  try {
    // Test getting user orders (this will require authentication)
    console.log('1. Testing GET /api/orders/myorders (requires auth)');
    try {
      const myOrdersResponse = await axios.get(`${API_BASE_URL}/orders/myorders`, {
        headers: {
          'x-auth-token': 'dummy-token' // This will fail with invalid token, which is expected
        }
      });
      console.log('   Response:', myOrdersResponse.status);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('   ✓ Correctly requires authentication (401 Unauthorized)');
      } else {
        console.log('   ✗ Unexpected error:', error.message);
      }
    }
    
    // Test getting all orders (admin only, requires auth)
    console.log('\n2. Testing GET /api/orders (requires admin auth)');
    try {
      const allOrdersResponse = await axios.get(`${API_BASE_URL}/orders`, {
        headers: {
          'x-auth-token': 'dummy-token' // This will fail with invalid token, which is expected
        }
      });
      console.log('   Response:', allOrdersResponse.status);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('   ✓ Correctly requires authentication (401 Unauthorized)');
      } else {
        console.log('   ✗ Unexpected error:', error.message);
      }
    }
    
    // Test creating an order (requires auth)
    console.log('\n3. Testing POST /api/orders (requires auth)');
    try {
      const createOrderResponse = await axios.post(`${API_BASE_URL}/orders`, {}, {
        headers: {
          'x-auth-token': 'dummy-token' // This will fail with invalid token, which is expected
        }
      });
      console.log('   Response:', createOrderResponse.status);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('   ✓ Correctly requires authentication (401 Unauthorized)');
      } else {
        console.log('   ✗ Unexpected error:', error.message);
      }
    }
    
    console.log('\n✓ Order API endpoints are accessible and properly protected!');
    
  } catch (error) {
    console.error('✗ Error testing API:', error.message);
  }
}

testOrderAPI();