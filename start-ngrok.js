#!/usr/bin/env node
// This script starts ngrok and exposes both the frontend and backend servers
import { spawn } from 'child_process';
import readline from 'readline';

// Configuration
const FRONTEND_PORT = 3000; // Your React app port
const BACKEND_PORT = 5000;  // Your API server port

console.log('Starting ngrok tunnels...');
console.log('This will create public URLs for your local servers.');
console.log('Press Ctrl+C to stop the tunnels.');
console.log('');

// Start ngrok for the frontend
const frontendTunnel = spawn('ngrok', ['http', FRONTEND_PORT]);
console.log(`Starting tunnel for frontend (port ${FRONTEND_PORT})...`);

// Start ngrok for the backend
const backendTunnel = spawn('ngrok', ['http', BACKEND_PORT]);
console.log(`Starting tunnel for backend (port ${BACKEND_PORT})...`);

// Helper function to extract the public URL from ngrok output
function extractUrl(data) {
  const output = data.toString();
  const match = output.match(/Forwarding\s+(https:\/\/[a-z0-9-]+\.ngrok\.io)/i);
  return match ? match[1] : null;
}

// Track URLs
let frontendUrl = null;
let backendUrl = null;

// Process frontend tunnel output
frontendTunnel.stdout.on('data', (data) => {
  if (!frontendUrl) {
    frontendUrl = extractUrl(data);
    if (frontendUrl) {
      console.log(`\n🌐 Frontend URL: ${frontendUrl}`);
      printInstructions();
    }
  }
});

frontendTunnel.stderr.on('data', (data) => {
  console.error(`Frontend tunnel error: ${data}`);
});

// Process backend tunnel output
backendTunnel.stdout.on('data', (data) => {
  if (!backendUrl) {
    backendUrl = extractUrl(data);
    if (backendUrl) {
      console.log(`\n🌐 Backend URL: ${backendUrl}`);
      printInstructions();
    }
  }
});

backendTunnel.stderr.on('data', (data) => {
  console.error(`Backend tunnel error: ${data}`);
});

// Print instructions when both URLs are available
function printInstructions() {
  if (frontendUrl && backendUrl) {
    console.log('\n✅ Both tunnels are now running!');
    console.log('\nIMPORTANT INSTRUCTIONS:');
    console.log('1. Share the Frontend URL with others to access your application');
    console.log('2. Your API requests will still go to the backend URL automatically');
    console.log('3. Keep this terminal window open while sharing your application');
    console.log('\nPress Ctrl+C to stop the tunnels when you\'re done.');
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down ngrok tunnels...');
  frontendTunnel.kill();
  backendTunnel.kill();
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
