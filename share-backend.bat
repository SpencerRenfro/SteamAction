@echo off
echo Starting ngrok tunnel for backend (port 5000)...
echo.
echo This will create a public URL for your API server.
echo Keep this window open while sharing your application.
echo.
echo Press Ctrl+C to stop the tunnel when you're done.
echo.

ngrok http 5000 --log=stdout
