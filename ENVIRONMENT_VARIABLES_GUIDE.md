# 🔧 Environment Variable Configuration Guide

## ✅ Fixed: Hardcoded URLs Removed

All hardcoded `localhost:5001` URLs have been replaced with environment variables.

---

## 📝 Backend Environment Variables (Render)

Add these in **Render Dashboard** → **Your Service** → **Environment**:

```env
PORT=5001
MONGODB_URI=mongodb+srv://We_Share_2025:We_Share_2111@weshare.rmgz2oi.mongodb.net/donor-receiver-platform?retryWrites=true&w=majority&appName=WeShare
JWT_SECRET=donor-receiver-platform-super-secret-jwt-key-2025-production
NODE_ENV=production
FRONTEND_URL=https://your-netlify-app.netlify.app
EMAIL_USER=Aryankansal113@gmail.com
EMAIL_PASSWORD=qfpmsvscoiembxcw
```

**Important:** Replace `your-netlify-app.netlify.app` with your actual Netlify URL after deployment.

---

## 🌐 Frontend Environment Variables (Netlify)

Add this in **Netlify Dashboard** → **Site Settings** → **Environment Variables**:

```env
REACT_APP_API_URL=https://your-render-backend.onrender.com/api
```

**Important:** Replace `your-render-backend.onrender.com` with your actual Render backend URL.

---

## 📂 Files Modified

### 1. `/frontend/src/services/api.js`
✅ Changed from hardcoded URL to:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
```

### 2. `/frontend/src/context/AuthContext.js`
✅ Changed login and register endpoints to use `API_URL` variable

### 3. `/frontend/src/pages/Donor/BrowseDonationRequests.js`
✅ Changed all API calls to use `API_URL` variable

### 4. `/frontend/.env.example` (Created)
✅ Template for environment variables

---

## 🚀 Next Steps

### Step 1: Update Netlify Environment Variable

1. Go to Netlify Dashboard
2. Select your deployed site
3. Go to **Site settings** → **Environment variables**
4. Click **"Add a variable"**
5. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://your-actual-render-url.onrender.com/api`
6. Click **"Save"**

### Step 2: Trigger Rebuild

After adding the environment variable:

**Option A: Manual Rebuild**
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**

**Option B: Push to GitHub (Auto-rebuild)**
```bash
cd /Users/aryankansal/Downloads/UiUx\ 2
git add .
git commit -m "Fix: Replace hardcoded URLs with environment variables"
git push origin main
```

### Step 3: Verify After Rebuild

1. Wait for Netlify build to complete (2-4 minutes)
2. Open your Netlify site
3. Try logging in with: `donor@test.com` / `password123`
4. Check browser console - should see no errors

---

## ✅ How Environment Variables Work

### Development (localhost)
```javascript
// When REACT_APP_API_URL is not set, it uses fallback
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
// Result: http://localhost:5001/api
```

### Production (Netlify)
```javascript
// When REACT_APP_API_URL is set in Netlify
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
// Result: https://your-render-backend.onrender.com/api
```

---

## 🔍 Verify Environment Variables

### Check Backend (Render)
```bash
# Go to Render Dashboard → Shell tab
echo $FRONTEND_URL
# Should output your Netlify URL
```

### Check Frontend Build Logs (Netlify)
1. Go to Netlify Dashboard → Deploys → Latest deploy
2. Check build logs
3. Should see: "Using REACT_APP_API_URL from environment"

---

## 🐛 Troubleshooting

### Issue: Still seeing localhost:5001 errors

**Solution 1: Clear Cache**
```bash
# In Netlify, trigger "Clear cache and deploy site"
```

**Solution 2: Verify Environment Variable**
- Go to Netlify → Site settings → Environment variables
- Confirm `REACT_APP_API_URL` exists and is correct
- Must include `/api` at the end
- Must NOT have trailing slash

**Solution 3: Check Browser**
- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Or open in Incognito/Private mode

### Issue: CORS errors after fixing URLs

**Solution:**
1. Update `FRONTEND_URL` in Render to match your Netlify URL exactly
2. Render will auto-redeploy
3. Wait 30 seconds for backend to restart

---

## 📋 Deployment Checklist

- [x] Remove hardcoded URLs from `api.js`
- [x] Remove hardcoded URLs from `AuthContext.js`
- [x] Remove hardcoded URLs from `BrowseDonationRequests.js`
- [x] Create `.env.example` for frontend
- [ ] Update `REACT_APP_API_URL` in Netlify
- [ ] Rebuild frontend on Netlify
- [ ] Update `FRONTEND_URL` in Render (with Netlify URL)
- [ ] Test login on deployed site
- [ ] Verify no console errors

---

## 🎉 Success Criteria

✅ Login page loads without errors  
✅ Can login with test credentials  
✅ No "ERR_CONNECTION_REFUSED" errors  
✅ No "localhost" references in browser console  
✅ API calls go to Render backend  
✅ CORS works correctly  

---

**Last Updated:** January 4, 2026  
**Status:** Ready for deployment testing
