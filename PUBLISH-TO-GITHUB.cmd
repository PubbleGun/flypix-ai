@echo off
setlocal
cd /d "%~dp0"

echo Preparing FlyPix AI for GitHub Pages...

where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed or is not available.
  echo Install Node.js, then run this file again.
  pause
  exit /b 1
)

call npm run build
if errorlevel 1 (
  echo The site build failed.
  pause
  exit /b 1
)

call npm run preview:file
if errorlevel 1 (
  echo The public preview could not be created.
  pause
  exit /b 1
)

if not exist "github-pages\index.html" (
  echo The public index file was not created.
  pause
  exit /b 1
)

git --version >nul 2>nul
if errorlevel 1 (
  echo Git is not installed or is not available.
  echo Install Git for Windows, then run this file again.
  pause
  exit /b 1
)

rem The hidden .git folder can be owned by the Codex service account.
rem Keep publication metadata in a separate folder created by this Windows user.
set "PUBLISH_GIT_DIR=%CD%\.git-publish"

git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" init
git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" branch -M main
git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" remote get-url origin >nul 2>nul
if errorlevel 1 (
  git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" remote add origin https://github.com/PubbleGun/flypix-ai.git
) else (
  git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" remote set-url origin https://github.com/PubbleGun/flypix-ai.git
)

git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" config user.name >nul 2>nul
if errorlevel 1 git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" config user.name "Paul Pushkin"

git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" config user.email >nul 2>nul
if errorlevel 1 git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" config user.email "181694536+PubbleGun@users.noreply.github.com"

git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" fetch origin main
if errorlevel 1 (
  echo GitHub could not be reached. Check the connection or sign in, then try again.
  pause
  exit /b 1
)

git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" reset --mixed origin/main
git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" add -A
git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" commit -m "Publish FlyPix AI site"
if errorlevel 1 (
  echo No new commit was created. Continuing with the current files.
)

echo Uploading to GitHub...
git --git-dir="%PUBLISH_GIT_DIR%" --work-tree="%CD%" push -u origin main
if errorlevel 1 (
  echo.
  echo Upload failed. If GitHub asks for sign-in, finish sign-in and run this file again.
  pause
  exit /b 1
)

echo.
echo Upload finished successfully.
echo Return to Codex and send: DONE
pause
