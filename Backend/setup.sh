#!/bin/bash

# SNS Backend Setup Script
echo "🚀 Setting up SNS Backend..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please configure your environment variables."
    echo "�� Copy .env.example to .env and update the values."
    exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""
echo "🗄️  Next steps:"
echo "1. Make sure PostgreSQL is running"
echo "2. Create database: CREATE DATABASE sns_db;"
echo "3. Update .env file with your database credentials"
echo "4. Run migration: python migration_script.py"
echo "5. Start server: python run.py"
echo ""
echo "📚 API Documentation will be available at: http://localhost:8000/docs"
echo "🔐 Default admin credentials: admin / admin123"