// Stable startup script for iPhone Daddy application
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting iPhone Daddy E-commerce Application...\n');

// Function to start a process with error handling
function startProcess(name, command, args, cwd) {
  return new Promise((resolve, reject) => {
    console.log(`⏳ Starting ${name}...`);
    
    const child = spawn(command, args, {
      cwd: cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true
    });

    child.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(`[${name}] ${output}`);
      
      // Detect when servers are ready
      if (name === 'Backend' && output.includes('Server running on port')) {
        console.log(`✅ ${name} server is running!\n`);
      }
      if (name === 'Frontend' && (output.includes('Local:') || output.includes('ready in'))) {
        console.log(`✅ ${name} server is running!\n`);
      }
    });

    child.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(`[${name} ERROR] ${error}`);
      
      // Handle common errors
      if (error.includes('EADDRINUSE')) {
        console.error(`❌ Port already in use for ${name}. Please close other applications.\n`);
      }
    });

    child.on('error', (err) => {
      console.error(`[${name} ERROR] Failed to start:`, err.message);
      reject(err);
    });

    child.on('close', (code) => {
      if (code !== 0 && code !== null) {
        console.error(`[${name}] Process exited with code ${code}\n`);
      }
    });

    resolve(child);
  });
}

// Start both servers
async function startApplication() {
  try {
    console.log('📁 Backend Server Location: ./backend');
    console.log('📱 Frontend Server Location: ./frontend\n');
    
    // Start backend first
    await startProcess(
      'Backend', 
      'node', 
      ['test-server.js'], 
      path.join(__dirname)
    );
    
    // Wait a moment for backend to initialize
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Then start frontend
    await startProcess(
      'Frontend', 
      'npm', 
      ['run', 'dev'], 
      path.join(__dirname, 'frontend')
    );
    
    console.log('\n🎉 iPhone Daddy Application is now running!');
    console.log('🌐 Access the website at: http://localhost:5173');
    console.log('🔌 Backend API at: http://localhost:5000/api/');
    console.log('🔑 Admin Panel: http://localhost:5173/login');
    console.log('   Credentials: admin@iphonedaddy.com / admin123');
    console.log('\n📸 Images are pre-loaded and optimized for fast loading!');
    console.log('🔄 The application will stay running. Press Ctrl+C to stop.\n');
    
  } catch (error) {
    console.error('💥 Failed to start application:', error.message);
    process.exit(1);
  }
}

startApplication();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down iPhone Daddy application...');
  process.exit(0);
});