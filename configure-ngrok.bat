@echo off
if "%~1"=="" (
  echo Usage: configure-ngrok.bat YOUR_AUTH_TOKEN
  echo Please provide your ngrok authtoken as an argument.
  echo You can get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken
  exit /b 1
)

echo Configuring ngrok with your authtoken...
npx ngrok config add-authtoken %1
echo Done! You can now run start-ngrok.bat to create a tunnel.
