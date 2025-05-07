# PowerShell script to start the application with ngrok sharing

Write-Host "Starting SteamAction application with ngrok sharing..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start:" -ForegroundColor Cyan
Write-Host "1. Your React application (frontend)" -ForegroundColor Cyan
Write-Host "2. Your API server (backend)" -ForegroundColor Cyan
Write-Host "3. Ngrok tunnels to make both accessible from the internet" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in the ngrok window to stop sharing when done." -ForegroundColor Yellow
Write-Host ""
Write-Host "Starting services..." -ForegroundColor Green

# Start React frontend
Start-Process powershell -ArgumentList "-Command", "Write-Host 'Starting React Frontend...' -ForegroundColor Cyan; npm run dev"

# Start API backend
Start-Process powershell -ArgumentList "-Command", "Write-Host 'Starting API Backend...' -ForegroundColor Cyan; npm run server"

# Start ngrok tunnels
Start-Process powershell -ArgumentList "-Command", "Write-Host 'Starting Ngrok Tunnels...' -ForegroundColor Cyan; node ngrok-tunnel.cjs"

Write-Host ""
Write-Host "All services started! Check the Ngrok Tunnels window for your public URLs." -ForegroundColor Green
Write-Host ""
