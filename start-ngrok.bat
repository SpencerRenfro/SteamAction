@echo off
echo Starting ngrok tunnel to port 3002...
echo If this is your first time, sign up at https://dashboard.ngrok.com/signup
echo Then configure your authtoken with: npx ngrok config add-authtoken YOUR_AUTH_TOKEN
npx ngrok http 3002
