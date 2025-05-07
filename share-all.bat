@echo off
echo Starting SteamAction application with ngrok sharing...
echo.
echo This will start:
echo 1. Your React application (frontend)
echo 2. Your API server (backend)
echo 3. Ngrok tunnels for both services
echo.
echo IMPORTANT: Look for the "Forwarding" URLs in the ngrok windows.
echo Share the frontend URL with others to access your application.
echo.
echo Press Ctrl+C in each window to stop when done.
echo.

start "React Frontend" cmd /k "npm run dev"
start "API Backend" cmd /k "npm run server"
timeout /t 5
start "Frontend Tunnel" cmd /k "share-frontend.bat"
start "Backend Tunnel" cmd /k "share-backend.bat"

echo.
echo All services started! Check the ngrok windows for your public URLs.
echo.
