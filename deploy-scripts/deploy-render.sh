#!/bin/bash

# PersonaAI Backend Deployment Script for Render

echo "🎨 Deploying PersonaAI Backend to Render..."

# Check if in backend directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the backend directory."
    exit 1
fi

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Make sure you're in the backend directory."
    exit 1
fi

echo "✅ Configuration files found!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://render.com"
echo "2. Sign up with GitHub"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Connect GitHub and select your repository"
echo "5. Configure service:"
echo "   - Name: personaai-backend"
echo "   - Environment: Node"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "6. Add Environment Variables:"
echo "   - NODE_ENV=production"
echo "   - PORT=10000"
echo "   - OPENAI_API_KEY=your_key_here"
echo "   - CORS_ORIGIN=https://your-frontend.vercel.app"
echo ""
echo "🚀 Deploy and save your URL: https://your-backend.onrender.com"
echo ""
echo "💡 Pro tip: Render services sleep after 15 minutes of inactivity."
echo "💡 Cold starts take ~30 seconds on the free tier."