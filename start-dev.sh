#!/bin/bash

# CliniThink Development Startup Script
echo "🚀 Starting CliniThink Development Environment..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down CliniThink..."
    kill $PYTHON_PID $NEXTJS_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start Python backend
echo "🐍 Starting Python FastAPI backend..."
cd backend
python3 -m pip install -r requirements.txt
python3 main.py &
PYTHON_PID=$!
cd ..

# Wait a moment for Python backend to start
sleep 3

# Check if Python backend is running
if curl -s http://localhost:8000/health > /dev/null; then
    echo "✅ Python backend is running on http://localhost:8000"
else
    echo "⚠️  Python backend may not be fully started yet"
fi

# Start Next.js frontend
echo "⚛️  Starting Next.js frontend..."
npm run dev &
NEXTJS_PID=$!

# Wait a moment for Next.js to start
sleep 5

echo "🎉 CliniThink is starting up!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "📊 Backend Health: http://localhost:8000/health"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait 