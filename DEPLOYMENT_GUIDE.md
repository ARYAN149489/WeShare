# 🚀 Donor-Receiver Platform - Deployment Guide (Render + Netlify)

Complete step-by-step guide to deploy your Donor-Receiver Platform using **Render** for backend and **Netlify** for frontend.

---

## 📋 Prerequisites

Before starting deployment:

- ✅ GitHub account
- ✅ MongoDB Atlas account (database already configured)
- ✅ Render account (free tier available)
- ✅ Netlify account (free tier available)
- ✅ Gmail account for email notifications
- ✅ Your project pushed to GitHub repository

---

## 🎯 Deployment Overview

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  Frontend (Netlify)  →  Backend (Render)  →  MongoDB Atlas
│  React Application       Node.js/Express      Database
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Part 1: Prepare Your Project for Deployment

### Step 1: Create Environment Variable Examples

Create `backend/.env.example`:
```bash
PORT=5001
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_min_32_chars
NODE_ENV=production
FRONTEND_URL=https://your-netlify-app.netlify.app
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

Create `frontend/.env.example`:
```bash
REACT_APP_API_URL=https://your-render-backend.onrender.com/api
```

### Step 2: Update Backend for Production

Add this to `backend/server.js` (if not already present):

```javascript
// Update CORS configuration for production
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000' // Keep for local development
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### Step 3: Create Netlify Configuration

Create `frontend/netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Step 4: Update Package.json Scripts

Ensure your `backend/package.json` has:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 5: Push Everything to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Prepare for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/donor-receiver-platform.git
git branch -M main
git push -u origin main
```

---

## 🖥️ Part 2: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with GitHub (recommended)
4. Authorize Render to access your GitHub repositories

### Step 2: Create New Web Service

1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the repository: `donor-receiver-platform`
4. Configure the service:

   ```
   Name: donor-receiver-backend
   Region: Choose closest to your users
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

### Step 3: Select Free Plan

- Choose **"Free"** plan (or upgrade for better performance)
- Free tier specs:
  - 512 MB RAM
  - Shared CPU
  - Sleeps after 15 minutes of inactivity

### Step 4: Add Environment Variables

In the **Environment** section, add these variables:

```
PORT = 5001
MONGODB_URI = mongodb+srv://We_Share_2025:We_Share_2111@weshare.rmgz2oi.mongodb.net/donor-receiver-platform?retryWrites=true&w=majority&appName=WeShare
JWT_SECRET = donor-receiver-platform-super-secret-jwt-key-2025-production
NODE_ENV = production
FRONTEND_URL = https://YOUR-APP-NAME.netlify.app
EMAIL_USER = Aryankansal113@gmail.com
EMAIL_PASSWORD = qfpm svsc oiem bxcw
```

⚠️ **Note:** You'll update `FRONTEND_URL` after deploying to Netlify

### Step 5: Deploy Backend

1. Click **"Create Web Service"**
2. Wait for the build to complete (3-5 minutes)
3. Once deployed, you'll get a URL like: `https://donor-receiver-backend.onrender.com`
4. **Save this URL** - you'll need it for frontend configuration

### Step 6: Test Backend Deployment

```bash
# Test health endpoint
curl https://donor-receiver-backend.onrender.com/api/health

# Should return: {"status":"OK","message":"Server is running"}
```

### Step 7: Seed Production Database (Optional)

If you want to populate production database:

1. Go to Render Dashboard → Your service
2. Click **"Shell"** tab
3. Run: `node seed-comprehensive.js`

Or use the Render CLI:
```bash
render shell donor-receiver-backend
node seed-comprehensive.js
```

---

## 🌐 Part 3: Deploy Frontend to Netlify

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"**
3. Sign up with GitHub (recommended)
4. Authorize Netlify to access your GitHub repositories

### Step 2: Import Your Project

1. From Netlify Dashboard, click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select your repository: `donor-receiver-platform`
4. Configure build settings:

   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/build
   ```

### Step 3: Add Environment Variables

Before deploying, click **"Show advanced"** → **"New variable"**

Add this variable:
```
REACT_APP_API_URL = https://donor-receiver-backend.onrender.com/api
```

Replace `donor-receiver-backend.onrender.com` with your actual Render URL from Part 2.

### Step 4: Deploy Frontend

1. Click **"Deploy site"**
2. Wait for build to complete (2-4 minutes)
3. Once deployed, you'll get a URL like: `https://dancing-unicorn-123456.netlify.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to:
   - Buy a domain (from Netlify or external provider)
   - Or use a subdomain from your existing domain
4. Netlify will automatically provision SSL certificate

### Step 6: Update Site Name

1. Go to **Site settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Choose a better name: `donor-receiver-platform`
4. Your URL becomes: `https://donor-receiver-platform.netlify.app`

---

## 🔄 Part 4: Update CORS Configuration

### Step 1: Update Backend Environment Variable on Render

1. Go to Render Dashboard → Your backend service
2. Click **"Environment"** tab
3. Update `FRONTEND_URL` to your Netlify URL:
   ```
   FRONTEND_URL = https://donor-receiver-platform.netlify.app
   ```
4. Click **"Save Changes"**
5. Render will automatically redeploy

### Step 2: Verify CORS is Working

Open browser console on your Netlify site and check for CORS errors. Should be none!

---

## ✅ Part 5: Post-Deployment Testing

### Test Backend (Render)

```bash
# Health check
curl https://donor-receiver-backend.onrender.com/api/health

# Test login
curl -X POST https://donor-receiver-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"donor@test.com","password":"password123"}'
```

### Test Frontend (Netlify)

1. Open: `https://donor-receiver-platform.netlify.app`
2. Try logging in with test credentials:
   - Email: `donor@test.com`
   - Password: `password123`
3. Test creating a donation
4. Test browsing donations
5. Check notifications

### Complete Testing Checklist

- [ ] Frontend loads without errors
- [ ] User can register new account
- [ ] User can login with test credentials
- [ ] Donor can create donations
- [ ] Receiver can browse donations
- [ ] Receiver can create requests
- [ ] Notifications appear
- [ ] Email notifications sent (check spam folder)
- [ ] Profile updates work
- [ ] Logout works

---

## 🚨 Common Issues & Solutions

### Issue 1: "Cannot connect to backend"

**Solution:**
1. Check Render backend is running (not sleeping)
2. Verify `REACT_APP_API_URL` in Netlify environment variables
3. Check browser console for exact error
4. Ensure Render backend URL is correct (no trailing slash)

### Issue 2: "CORS Policy Error"

**Solution:**
1. Update `FRONTEND_URL` in Render environment variables
2. Make sure it matches your exact Netlify URL
3. Redeploy backend on Render
4. Hard refresh browser (Cmd+Shift+R)

### Issue 3: "Backend Not Responding / 503 Error"

**Cause:** Render free tier sleeps after 15 minutes of inactivity

**Solutions:**
- Wait 30-60 seconds for backend to wake up (first request is slow)
- Upgrade to paid Render plan for 24/7 uptime
- Use UptimeRobot to ping backend every 5 minutes (keeps it awake)

### Issue 4: "Build Failed on Netlify"

**Solution:**
1. Check build logs in Netlify dashboard
2. Ensure `package.json` has all dependencies
3. Verify Node version compatibility
4. Try: Remove `node_modules`, `package-lock.json`, reinstall locally, push again

### Issue 5: "MongoDB Connection Timeout"

**Solution:**
1. Go to MongoDB Atlas → Network Access
2. Add IP address: `0.0.0.0/0` (allow all) for testing
3. Or add Render's IP ranges:
   - Get IPs from Render documentation
   - Add each IP to MongoDB Atlas whitelist

### Issue 6: "Email Notifications Not Working"

**Solution:**
1. Enable 2FA on Gmail account
2. Generate App Password (not regular password)
3. Use App Password in `EMAIL_PASSWORD` environment variable
4. Check Gmail "Less secure app access" settings

---

## 🔄 Continuous Deployment (Auto-Deploy)

### Render Auto-Deploy

✅ **Already Enabled!** Render automatically deploys when you push to `main` branch.

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Render will detect changes and redeploy automatically.

### Netlify Auto-Deploy

✅ **Already Enabled!** Netlify automatically rebuilds when you push to `main` branch.

To deploy frontend updates:
```bash
cd frontend
# Make your changes
git add .
git commit -m "Update frontend"
git push origin main
```

Netlify will detect changes and rebuild automatically.

---

## ⚡ Performance Optimization

### Backend (Render)

1. **Upgrade to Paid Plan** for better performance:
   - Standard: $7/month (1GB RAM, no sleep)
   - Pro: $25/month (4GB RAM, priority support)

2. **Add Redis Caching** (Render Redis):
   ```bash
   # In Render, add Redis service
   # Update backend to use Redis for session storage
   ```

3. **Enable Compression**:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

### Frontend (Netlify)

1. **Enable Performance Features** (Auto-enabled on Netlify):
   - Asset optimization
   - Image optimization
   - Brotli compression
   - HTTP/2 & HTTP/3

2. **Add Performance Headers** in `netlify.toml`:
   ```toml
   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       Cache-Control = "public, max-age=31536000"
   ```

---

## 💰 Cost Breakdown

### Free Tier (Current Setup)

| Service | Plan | Cost | Limits |
|---------|------|------|--------|
| **Render** | Free | $0/month | 512MB RAM, Sleeps after 15min |
| **Netlify** | Free | $0/month | 100GB bandwidth, 300 build minutes |
| **MongoDB Atlas** | Free (M0) | $0/month | 512MB storage, Shared cluster |
| **Total** | - | **$0/month** | Good for testing/demo |

### Production Tier (Recommended)

| Service | Plan | Cost | Benefits |
|---------|------|------|----------|
| **Render** | Starter | $7/month | 1GB RAM, No sleep, Custom domain |
| **Netlify** | Pro | $19/month | 1TB bandwidth, Background functions |
| **MongoDB Atlas** | M10 | $0.08/hour (~$57/month) | 10GB storage, Dedicated cluster |
| **Total** | - | **~$83/month** | Production-ready |

---

## 🔒 Security Best Practices

### Before Going Live

1. **Change All Secrets**:
   ```bash
   # Generate new JWT secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Update in Render environment variables
   ```

2. **Restrict MongoDB Access**:
   - Remove `0.0.0.0/0` from IP whitelist
   - Add specific IPs or use VPC peering

3. **Enable Rate Limiting**:
   ```bash
   npm install express-rate-limit
   ```

4. **Add Helmet.js**:
   ```bash
   npm install helmet
   ```

5. **Enable HTTPS Only**:
   - Render: Automatic SSL
   - Netlify: Automatic SSL

---

## 📊 Monitoring & Analytics

### Setup Monitoring

1. **Render Dashboard**:
   - View logs
   - Monitor CPU/Memory usage
   - Track deploy history

2. **Netlify Analytics** (Optional - $9/month):
   - Page views
   - Unique visitors
   - Traffic sources

3. **Free Alternatives**:
   - Google Analytics
   - Plausible Analytics
   - Umami

### Error Tracking

Add Sentry for error monitoring:
```bash
npm install @sentry/react @sentry/node
```

---

## 🎉 Success! Your App is Live!

### Your Live URLs

- **Frontend**: `https://donor-receiver-platform.netlify.app`
- **Backend**: `https://donor-receiver-backend.onrender.com`
- **API Health**: `https://donor-receiver-backend.onrender.com/api/health`

### Share Your Project

- Add live URLs to GitHub README
- Share with stakeholders
- Test on mobile devices
- Submit to project directories

---

## 📞 Support Resources

### Documentation
- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com

### Community
- Render Discord: https://discord.gg/render
- Netlify Forum: https://answers.netlify.com
- Stack Overflow

---

## 🔄 Updating Your Deployed App

### Quick Update Process

```bash
# 1. Make changes locally
cd /Users/aryankansal/Downloads/UiUx\ 2

# 2. Test locally
cd backend && npm start  # Test backend
cd frontend && npm start # Test frontend

# 3. Commit and push
git add .
git commit -m "Update: your changes"
git push origin main

# 4. Wait for auto-deployment (2-5 minutes)
# Render deploys backend automatically
# Netlify rebuilds frontend automatically
```

---

## ✅ Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] MongoDB Atlas configured with IP whitelist
- [ ] Render account created
- [ ] Backend deployed to Render
- [ ] Environment variables set on Render
- [ ] Backend URL copied
- [ ] Netlify account created
- [ ] Frontend deployed to Netlify
- [ ] Environment variables set on Netlify
- [ ] CORS updated with Netlify URL
- [ ] Both services tested and working
- [ ] Test credentials verified
- [ ] Email notifications tested
- [ ] Mobile responsiveness checked
- [ ] Custom domain configured (optional)
- [ ] Monitoring setup (optional)

---

**🎊 Congratulations! Your Donor-Receiver Platform is now live and accessible worldwide!**

**Last Updated:** January 4, 2026  
**Version:** 1.0.0
