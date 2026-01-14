// Root level server.js to redirect to backend server
const app = require('./backend/server.js');

const PORT = process.env.PORT || 5000;

// Start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;