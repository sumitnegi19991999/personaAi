# 🚀 PersonaAI Deployment Checklist - Vercel + Render

## ✅ Step-by-Step Deployment

### 🎨 **1. Deploy Backend to Render**
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub → Select `personaAi` repository
- [ ] Configure:
  - [ ] Name: `personaai-backend`
  - [ ] Environment: `Node`
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Deploy and wait for completion
- [ ] **Save your Render URL**: `https://your-backend.onrender.com`

### ⚙️ **2. Configure Render Environment Variables**
Go to Render dashboard → Environment tab → Add:
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `OPENAI_API_KEY` = `your_openai_api_key_here`
- [ ] `CORS_ORIGIN` = `https://your-frontend.vercel.app` (add after step 3)

### 🚀 **3. Deploy Frontend to Vercel**

**Option A: CLI (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Go to frontend folder
cd frontend

# Build project
npm run build

# Deploy
vercel --prod
```

**Option B: Web Interface**
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Import GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Deploy
- [ ] **Save your Vercel URL**: `https://your-frontend.vercel.app`

### 🔗 **4. Connect Frontend to Backend**

**In Vercel Dashboard:**
- [ ] Go to project → Settings → Environment Variables
- [ ] Add `VITE_API_URL` = `https://your-backend.onrender.com`
- [ ] Redeploy frontend

**In Render Dashboard:**
- [ ] Go to Environment tab
- [ ] Update `CORS_ORIGIN` = `https://your-frontend.vercel.app`
- [ ] Render auto-redeploys

### 🧪 **5. Test Your Live App**
- [ ] Visit your Vercel URL
- [ ] Check console for errors
- [ ] Test persona selection
- [ ] Send a test message
- [ ] Switch between personas
- [ ] Verify chat history persistence

## 🔍 **Troubleshooting**

### Common Issues:

**❌ "Failed to fetch personas":**
- Check `VITE_API_URL` in Vercel
- Verify Render backend is running (may take 30s cold start)
- Check CORS settings

**❌ CORS Error:**
- Update `CORS_ORIGIN` in Render
- Ensure exact URL match (no trailing slash)

**❌ OpenAI API Error:**
- Verify `OPENAI_API_KEY` in Render
- Check API key has credits

**❌ 503 Service Unavailable:**
- Render is starting up (cold start)
- Wait 30 seconds and retry

**❌ 404 on refresh:**
- Verify `vercel.json` rewrites are correct

### Debug URLs:
- **Backend Health**: `https://your-backend.onrender.com/health`
- **Backend API**: `https://your-backend.onrender.com/api/personas`
- **Frontend**: `https://your-frontend.vercel.app`

## 🎉 **Success!**

Once everything is working:
- [ ] Share your live app URL!
- [ ] Test on mobile devices
- [ ] Consider adding custom domain
- [ ] Monitor usage in dashboards

---

**Your ChaiCode Castle is now live! 🏰✨**