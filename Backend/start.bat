@echo off
setlocal enabledelayedexpansion

:: ================================
::   Setup colors for readability
:: ================================
for /f "delims=" %%a in ('echo prompt $E^| cmd') do set "ESC=%%a"

set "GREEN=%ESC%[32m"
set "RED=%ESC%[31m"
set "CYAN=%ESC%[36m"
set "RESET=%ESC%[0m"

cls
echo %CYAN%==========================================
echo          Song Library Backend Launcher
echo ==========================================%RESET%

echo.
echo %CYAN%Checking for Node.js installation...%RESET%
node -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo %RED%ERROR: Node.js is not installed on this machine.%RESET%
    echo Download it here: https://nodejs.org/
    pause
    exit /b 1
)
echo %GREEN%Node.js detected!%RESET%

echo.
echo %CYAN%Installing backend dependencies (npm install)...%RESET%
npm install
if %ERRORLEVEL% neq 0 (
    echo %RED%ERROR: Failed to install dependencies.%RESET%
    echo Check your package.json or reinstall Node.js.
    pause
    exit /b 1
)
echo %GREEN%Dependencies installed successfully!%RESET%

echo.
echo %CYAN%Starting the backend server...%RESET%
npm start
if %ERRORLEVEL% neq 0 (
    echo %RED%ERROR: Server failed to start.%RESET%
    echo Fix any server errors and run this script again.
    pause
    exit /b 1
)

echo.
echo %GREEN%==========================================%RESET%
echo       Backend server running successfully!
echo %GREEN%==========================================%RESET%
echo Press any key to close this window...
pause >nul