#!/usr/bin/env node

console.log("Starting ngrok tunnel to port 3002...");
console.log("If this is your first time, sign up at https://dashboard.ngrok.com/signup");
console.log("Then configure your authtoken with: npx ngrok config add-authtoken YOUR_AUTH_TOKEN");

const { spawn } = require('child_process');
const ngrok = spawn('npx', ['ngrok', 'http', '3002'], { stdio: 'inherit' });

ngrok.on('error', (err) => {
  console.error('Failed to start ngrok:', err);
});

process.on('SIGINT', () => {
  ngrok.kill();
  process.exit();
});
