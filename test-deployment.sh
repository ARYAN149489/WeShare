#!/bin/bash

# Test script for Render backend deployment
# Run this after 5 minutes to verify deployment

echo "🧪 Testing Render Backend Deployment..."
echo "========================================"
echo ""

echo "⏳ Test 1: Root Endpoint"
echo "URL: https://weshare-at2o.onrender.com/"
echo "Response:"
curl -s -w "\nHTTP Status: %{http_code}\n" https://weshare-at2o.onrender.com/ || echo "❌ Failed"
echo ""
echo "---"
echo ""

echo "⏳ Test 2: Health Check Endpoint"
echo "URL: https://weshare-at2o.onrender.com/api/health"
echo "Response:"
curl -s -w "\nHTTP Status: %{http_code}\n" https://weshare-at2o.onrender.com/api/health || echo "❌ Failed"
echo ""
echo "---"
echo ""

echo "⏳ Test 3: Login Endpoint (POST)"
echo "URL: https://weshare-at2o.onrender.com/api/auth/login"
echo "Credentials: donor@test.com / password123"
echo "Response:"
curl -s -w "\nHTTP Status: %{http_code}\n" -X POST https://weshare-at2o.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"donor@test.com","password":"password123"}' || echo "❌ Failed"
echo ""
echo "---"
echo ""

echo "📊 Test Summary"
echo "==============="
echo ""
echo "✅ If all tests return HTTP Status 200 and JSON responses:"
echo "   → Backend is working correctly!"
echo ""
echo "❌ If tests show 404 or 'Not Found':"
echo "   → Render hasn't deployed yet. Wait 2-3 more minutes and run again."
echo ""
echo "❌ If tests show 502/503:"
echo "   → Backend is waking up (Render free tier). Wait 30 seconds and try again."
echo ""
echo "🔍 Next Steps:"
echo "   1. If backend is working, test frontend on Netlify"
echo "   2. Try logging in at your Netlify URL"
echo "   3. Test refreshing pages (should not show 404)"
echo ""
