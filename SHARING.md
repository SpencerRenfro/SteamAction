# Sharing Your SteamAction Application

This guide explains how to share your locally running SteamAction application with others over the internet using ngrok.

## What is ngrok?

ngrok is a tool that creates secure tunnels to expose your local web servers to the internet. This allows others to access your application without having to install anything on their computers.

## Prerequisites

1. Make sure you have Node.js installed
2. Install ngrok globally: `npm install -g ngrok`
3. Make sure your application is running locally

## Sharing Your Application

### Option 1: Using the Batch File (Windows)

1. Double-click the `share-app.bat` file in the project root
2. Three command windows will open:
   - React Frontend (running on port 3000)
   - API Backend (running on port 5000)
   - ngrok Tunnels (creating public URLs)
3. In the ngrok Tunnels window, you'll see the public URLs for your application
4. Share the Frontend URL with others

### Option 2: Using the PowerShell Script (Windows)

1. Right-click the `share-app.ps1` file and select "Run with PowerShell"
2. Three PowerShell windows will open:
   - React Frontend (running on port 3000)
   - API Backend (running on port 5000)
   - ngrok Tunnels (creating public URLs)
3. In the ngrok Tunnels window, you'll see the public URLs for your application
4. Share the Frontend URL with others

### Option 3: Using npm Scripts

1. Start your application:
   ```
   npm run dev:all
   ```
2. In a separate terminal, run:
   ```
   npm run share
   ```
3. You'll see the public URLs for your application
4. Share the Frontend URL with others

## Important Notes

1. **Keep the terminal windows open** while sharing your application
2. The public URLs are **temporary** and will change each time you restart ngrok
3. The free version of ngrok has some limitations:
   - Sessions last 2 hours
   - Limited to 40 connections per minute
   - URLs change each time you restart
4. For more features, you can sign up for a free ngrok account at https://ngrok.com/

## Troubleshooting

- If you see an error about ngrok not being found, make sure you've installed it globally: `npm install -g ngrok`
- If the tunnels don't start, make sure your application is running on ports 3000 (frontend) and 5000 (backend)
- If you're having issues with the batch or PowerShell scripts, try using the npm script method

## Security Considerations

Remember that when you share your application using ngrok, anyone with the URL can access it. Be careful about sharing sensitive data or functionality.
