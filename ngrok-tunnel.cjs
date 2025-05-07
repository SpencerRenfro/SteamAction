#!/usr/bin/env node
// This script starts ngrok and exposes both the frontend and backend servers
const ngrok = require('ngrok');
const readline = require('readline');

// Configuration
const FRONTEND_PORT = 3000; // Your React app port
const BACKEND_PORT = 5000;  // Your API server port

console.log('Starting ngrok tunnels...');
console.log('This will create public URLs for your local servers.');
console.log('Press Ctrl+C to stop the tunnels.');
console.log('');

// Track URLs and connections
let frontendUrl = null;
let backendUrl = null;
let frontendConnection = null;
let backendConnection = null;

// Start ngrok tunnels
async function startTunnels() {
  try {
    // Start frontend tunnel
    console.log(`Starting tunnel for frontend (port ${FRONTEND_PORT})...`);
    frontendUrl = await ngrok.connect({
      addr: FRONTEND_PORT,
      onStatusChange: status => {
        console.log(`Frontend tunnel status: ${status}`);
      }
    });
    console.log(`\n🌐 Frontend URL: ${frontendUrl}`);

    // Start backend tunnel
    console.log(`Starting tunnel for backend (port ${BACKEND_PORT})...`);
    backendUrl = await ngrok.connect({
      addr: BACKEND_PORT,
      onStatusChange: status => {
        console.log(`Backend tunnel status: ${status}`);
      }
    });
    console.log(`\n🌐 Backend URL: ${backendUrl}`);

    // Print instructions
    console.log('\n✅ Both tunnels are now running!');
    console.log('\nIMPORTANT INSTRUCTIONS:');
    console.log('1. Share the Frontend URL with others to access your application');
    console.log('2. Your API requests will still go to the backend URL automatically');
    console.log('3. Keep this terminal window open while sharing your application');
    console.log('\nPress Ctrl+C to stop the tunnels when you\'re done.');

  } catch (error) {
    console.error('Error starting ngrok tunnels:', error);
    process.exit(1);
  }
}

// Start the tunnels
startTunnels();

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\nShutting down ngrok tunnels...');
  try {
    await ngrok.disconnect();
    await ngrok.kill();
    console.log('Tunnels closed successfully.');
  } catch (error) {
    console.error('Error closing tunnels:', error);
  }
  process.exit(0);
});

// Keep the process running
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('SIGINT', () => {
  process.emit('SIGINT');
});
