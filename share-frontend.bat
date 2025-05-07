@echo off
echo Starting ngrok tunnel for frontend (port 3000)...
echo.
echo This will create a public URL for your React application.
echo Keep this window open while sharing your application.
echo.
echo Press Ctrl+C to stop the tunnel when you're done.
echo.

ngrok http 3000 --log=stdout
