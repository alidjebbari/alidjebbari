#!/bin/bash
# Quick setup script for Ali Djebbari Portfolio

set -e

echo "🚀 Ali Djebbari Portfolio - Backend Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Navigate to backend directory
cd backend || exit 1

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setting up environment..."

if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your credentials:"
    echo "   - EMAIL_USER: your Gmail address"
    echo "   - EMAIL_PASSWORD: your 16-character app password"
    echo "   - RECIPIENT_EMAIL: where form submissions go"
    echo ""
fi

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Edit backend/.env with your Gmail credentials"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000/health"
echo ""
echo "For full instructions, see: SETUP_GUIDE.md"
