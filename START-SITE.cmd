@echo off
setlocal
cd /d "%~dp0"

echo Preparing FlyPix AI...
call npm run build
if errorlevel 1 goto error

start "FlyPix AI server - keep this window open" cmd /k "cd /d ""%~dp0"" && set CLOUDFLARE_CF_FETCH_ENABLED=false && npm run dev"

powershell -NoProfile -ExecutionPolicy Bypass -Command "$deadline=(Get-Date).AddSeconds(90); while((Get-Date)-lt $deadline){ try { $response=Invoke-WebRequest -UseBasicParsing 'http://localhost:3000/' -TimeoutSec 2; if($response.StatusCode -eq 200){ exit 0 } } catch {}; Start-Sleep -Milliseconds 750 }; exit 1"
if errorlevel 1 goto error

start "" "http://localhost:3000/"
exit /b 0

:error
echo.
echo The site did not start. Keep this window open and send its screenshot to Codex.
pause
exit /b 1
