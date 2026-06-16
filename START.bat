@echo off
title ShopNest Full Stack
cd /d "%~dp0"

echo.
echo  ========================================
echo   ShopNest - Frontend + Backend
echo  ========================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
  echo  ERROR: Node.js install karo - https://nodejs.org
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo  Frontend dependencies install ho rahi hain...
  call npm install
)

if not exist "server\node_modules" (
  echo  Backend dependencies install ho rahi hain...
  cd server
  call npm install
  cd ..
)

echo.
echo  Syncing product catalog to database...
cd server
call node src/seed.js
cd ..
echo.

echo  Starting backend (port 5000) + frontend (port 5173)...
echo  Band karne ke liye Ctrl+C
echo.

call npm run dev:all
pause
