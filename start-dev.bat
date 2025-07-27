@echo off
echo 🚀 Starting CliniThink Development Environment...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo 🐍 Starting Python FastAPI backend...
cd backend
python -m pip install -r requirements.txt
start "Python Backend" python main.py
cd ..

echo ⚛️ Starting Next.js frontend...
start "Next.js Frontend" npm run dev

echo.
echo 🎉 CliniThink is starting up!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:8000
echo 📊 Backend Health: http://localhost:8000/health
echo.
echo Press any key to stop...
pause 