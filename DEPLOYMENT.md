# 🚀 PersonaAI Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Vercel + Railway

**Frontend (Vercel):**
1. Install Vercel CLI: `npm i -g vercel`
2. In frontend folder: `cd frontend && npm run build`
3. Deploy: `vercel --prod`
4. Update `vercel.json` with your backend URL

**Backend (Railway):**
1. Visit [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "Deploy from GitHub repo"
4. Select your repo > backend folder
5. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `PORT`: 3000
   - `NODE_ENV`: production

### Option 2: Netlify + Render

**Frontend (Netlify):**
1. Build: `cd frontend && npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag & drop the `dist` folder

**Backend (Render):**
1. Visit [render.com](https://render.com)
2. Create "New Web Service"
3. Connect GitHub repo
4. Settings:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node.js

## 🔧 Environment Variables

### Backend (.env):
```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

### Frontend:
Update API calls to use production backend URL:
```javascript
// In App.jsx, replace localhost with your backend URL
const BACKEND_URL = 'https://your-backend.railway.app';
```

## 📦 Pre-deployment Checklist

### Frontend:
- [ ] Update API endpoints to production backend
- [ ] Test build: `npm run build`
- [ ] Check console for errors
- [ ] Verify all assets load correctly

### Backend:
- [ ] Add CORS for your frontend domain
- [ ] Set up environment variables
- [ ] Test API endpoints
- [ ] Ensure database connection (if using)

## 🌐 Domain Setup (Optional)

### Custom Domain:
1. **Vercel**: Project Settings > Domains
2. **Netlify**: Site Settings > Domain Management
3. **Railway**: Settings > Networking

## 🔒 Security Considerations

### Production Settings:
```javascript
// Backend CORS
app.use(cors({
  origin: [
    'https://your-frontend.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

## 📊 Monitoring & Analytics

### Free Options:
- **Vercel Analytics**: Built-in for Vercel deployments
- **Railway Metrics**: Monitor backend performance
- **Google Analytics**: Add to frontend for user tracking

## 🚨 Troubleshooting

### Common Issues:

**1. API Calls Failing:**
- Check CORS settings
- Verify backend URL in frontend
- Check environment variables

**2. Build Errors:**
- Run `npm run build` locally first
- Check for missing dependencies
- Verify Node.js version compatibility

**3. 404 Errors on Refresh:**
- Ensure SPA routing is configured
- Check `vercel.json` rewrites
- Verify index.html fallback

### Debug Commands:
```bash
# Test frontend build
cd frontend && npm run build && npm run preview

# Test backend locally
cd backend && npm start

# Check environment variables
echo $OPENAI_API_KEY
```

## 💰 Cost Breakdown (Free Tiers)

### Vercel:
- ✅ 100GB bandwidth/month
- ✅ 1000 serverless function executions/day
- ✅ Custom domains

### Railway:
- ✅ $5 credit/month (usually enough for hobby projects)
- ✅ 512MB RAM
- ✅ Automatic deployments

### Netlify:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Form handling

### Render:
- ✅ 750 hours/month free
- ✅ 512MB RAM
- ✅ Automatic SSL

## 🔄 CI/CD Setup

### Auto-deployment on push:
1. Connect GitHub to your deployment platform
2. Set up webhooks for automatic builds
3. Configure branch-based deployments

### GitHub Actions (Optional):
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

## 📱 Mobile Optimization

Your retro console is already mobile-responsive! The CSS includes:
```css
@media (max-width: 768px) {
  .retro-console {
    padding: 4px;
  }
}
```

## 🎉 Go Live!

1. Deploy backend first
2. Update frontend with backend URL
3. Deploy frontend
4. Test all functionality
5. Share your awesome retro AI chat! 🚀

---

**Need help?** Check the troubleshooting section or create an issue in your GitHub repo.