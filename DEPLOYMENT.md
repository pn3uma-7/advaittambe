# Deployment Guide

This guide explains how to deploy your portfolio website with the backend on Render.com and frontend on Cloudflare Pages.

## Architecture

- **Backend**: Node.js/Express API hosted on Render.com (used for monthly data updates)
- **Frontend**: Static HTML/CSS/JS website hosted on Cloudflare Pages
- **Data**: Static JSON file with filmography data (updated monthly)
- **Update Process**: Run `update-filmography.js` script monthly to refresh data from IMDb

---

## Backend Deployment (Render.com)

### Prerequisites
- GitHub account
- Render.com account (free tier available)

### Steps

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Create a New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `advaittambe`

3. **Configure the Web Service**
   - **Name**: `advait-imdb-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables** (optional)
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (Render will set this automatically)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)
   - Your backend URL will be: `https://advait-imdb-backend.onrender.com`

6. **Verify Backend**
   - Visit: `https://advait-imdb-backend.onrender.com/api/health`
   - You should see: `{"status":"ok","timestamp":"...","cacheStats":{...}}`

### Important Notes for Render.com

- **Free Tier Limitations**:
  - Service spins down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds to respond
  - 750 hours/month of runtime (sufficient for personal projects)

- **Custom Domain** (optional):
  - Go to "Settings" → "Custom Domain"
  - Add your domain and configure DNS

---

## Frontend Deployment (Cloudflare Pages)

### Prerequisites
- GitHub account
- Cloudflare account (free tier available)

### Steps

1. **Update API URL in Frontend**
   - Open `advaittambe/assets/js/main.js`
   - Update line 8 with your actual Render.com backend URL:
     ```javascript
     const API_BASE_URL = 'https://YOUR-BACKEND-NAME.onrender.com';
     ```
   - Replace `YOUR-BACKEND-NAME` with your actual Render service name

2. **Commit Changes**
   ```bash
   git add advaittambe/assets/js/main.js
   git commit -m "Update API URL for production"
   git push origin main
   ```

3. **Create a Cloudflare Pages Project**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to "Workers & Pages"
   - Click "Create application" → "Pages" → "Connect to Git"
   - Connect your GitHub account
   - Select the repository: `advaittambe`

4. **Configure Build Settings**
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: Leave empty
   - **Build output directory**: `advaittambe`
   - **Root directory**: `/` (or leave empty)

5. **Advanced Settings** (optional)
   - **Environment Variables**: None needed for static site
   - **Functions**: Not needed

6. **Deploy**
   - Click "Save and Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - Your site URL will be: `https://advaittambe-xxx.pages.dev`

7. **Custom Domain** (optional)
   - Go to "Custom domains" tab
   - Click "Set up a custom domain"
   - Follow instructions to configure DNS

---

## CORS Configuration

The backend is already configured with CORS to allow requests from any origin:

```javascript
// In backend/server.js
app.use(cors());
```

For production, you may want to restrict CORS to your frontend domain only:

```javascript
app.use(cors({
  origin: 'https://your-custom-domain.pages.dev'
}));
```

---

## Testing the Deployment

1. **Test Backend API**
   ```bash
   curl https://advait-imdb-backend.onrender.com/api/health
   curl https://advait-imdb-backend.onrender.com/api/filmography
   ```

2. **Test Frontend**
   - Visit your Cloudflare Pages URL
   - Check browser console for any errors
   - Verify filmography section loads correctly

3. **Test End-to-End**
   - Navigate to the "FILMOGRAPHY" section
   - Verify movie posters and data load from the backend
   - Check Network tab in DevTools to confirm API calls succeed

---

## Updating the Website

### Backend Updates
```bash
cd backend
# Make your changes
git add .
git commit -m "Update backend"
git push origin main
```
Render will automatically redeploy.

### Frontend Updates
```bash
cd advaittambe
# Make your changes
git add .
git commit -m "Update frontend"
git push origin main
```
Cloudflare Pages will automatically redeploy.

---

## Monitoring and Logs

### Render.com (Backend)
- View logs: Dashboard → Your Service → "Logs" tab
- Monitor metrics: Dashboard → Your Service → "Metrics" tab

### Cloudflare Pages (Frontend)
- View deployments: Dashboard → Your Project → "Deployments" tab
- View logs: Click on a deployment → "View build logs"

---

## Troubleshooting

### Backend Issues

**Problem**: Backend is slow to respond
- **Cause**: Free tier spins down after inactivity
- **Solution**: First request takes time; subsequent requests are fast

**Problem**: Scraping fails
- **Cause**: IMDb may block requests or change HTML structure
- **Solution**: Check logs on Render, verify User-Agent headers, update selectors if needed

### Frontend Issues

**Problem**: API requests fail with CORS error
- **Cause**: CORS not properly configured
- **Solution**: Verify `cors()` middleware in backend/server.js

**Problem**: Movies don't load
- **Cause**: API URL incorrect or backend not deployed
- **Solution**: Check browser console, verify API_BASE_URL in main.js

### General Issues

**Problem**: Changes not appearing
- **Solution**:
  - Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
  - Verify Git push succeeded
  - Check deployment status on hosting platform

---

## Cost Breakdown

### Free Tier Limits

**Render.com**:
- 750 hours/month of runtime
- 512 MB RAM
- Service spins down after 15 min inactivity
- No credit card required

**Cloudflare Pages**:
- Unlimited static requests
- 500 builds/month
- 100 custom domains/project
- No credit card required

**Total Monthly Cost**: $0

---

## Security Considerations

1. **API Rate Limiting**: Consider adding rate limiting to prevent abuse
2. **Environment Variables**: Never commit sensitive data to Git
3. **CORS**: Restrict to your domain in production
4. **Caching**: Backend uses 24-hour cache to avoid excessive scraping

---

## Updating Filmography Data

The site now uses **static JSON data** for instant loading without backend dependency.

### Monthly Update Process

1. **Run the update script** (once a month or when IMDb profile changes):
   ```bash
   node update-filmography.js
   ```

2. **Review the changes**:
   ```bash
   git diff advaittambe/assets/data/filmography.json
   ```

3. **Commit and push**:
   ```bash
   git add advaittambe/assets/data/filmography.json
   git commit -m "Update filmography data"
   git push origin main
   ```

4. **Auto-deploy**: Cloudflare Pages will automatically deploy the update

### Benefits of Static Data Approach

✅ **Instant loading** - No waiting for backend to wake up
✅ **No API costs** - Static files served from CDN
✅ **Better UX** - Page loads immediately for all users
✅ **Backend optional** - Only needed for monthly updates
✅ **Reliable** - No dependency on external services for page loads

---

## Next Steps

- [ ] Set up custom domain for frontend
- [ ] Set up monthly reminder to run `update-filmography.js`
- [ ] Add analytics to frontend (e.g., Cloudflare Web Analytics)
- [ ] Consider automated GitHub Action to run update script monthly
- [ ] Optionally: Keep backend alive with UptimeRobot for faster updates

---

## Support

For issues or questions:
- **Render.com**: [Render Docs](https://render.com/docs)
- **Cloudflare Pages**: [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- **Project Issues**: Contact the maintainer

---

## Quick Reference

### Important URLs
- **Backend API**: `https://advait-imdb-backend.onrender.com`
- **Frontend**: `https://advaittambe-xxx.pages.dev`
- **GitHub Repo**: `https://github.com/YOUR-USERNAME/advaittambe`

### Key Files
- `backend/server.js` - Main backend server
- `backend/scraper.js` - IMDb scraping logic
- `backend/render.yaml` - Render.com configuration
- `advaittambe/assets/js/main.js` - Frontend JavaScript (API URL here)
- `advaittambe/_redirects` - Cloudflare Pages routing

### Useful Commands
```bash
# Test backend locally
cd backend
npm install
npm start

# Test frontend locally
cd advaittambe
python -m http.server 8000
# or
npx serve .
```
