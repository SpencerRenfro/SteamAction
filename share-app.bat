@echo off
echo Starting SteamAction application with ngrok sharing...
echo.
echo This will start:
echo 1. Your React application (frontend)
echo 2. Your API server (backend)
echo 3. Ngrok tunnels to make both accessible from the internet
echo.
echo Press Ctrl+C in the ngrok window to stop sharing when done.
echo.
echo Starting services...

start "React Frontend" cmd /k "npm run dev"
start "API Backend" cmd /k "npm run server"
start "Ngrok Tunnels" cmd /k "node ngrok-tunnel.cjs"

echo.
echo All services started! Check the Ngrok Tunnels window for your public URLs.
echo.
