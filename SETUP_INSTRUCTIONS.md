# Setup Instructions - Advait's Portfolio with Dynamic IMDb Integration

This guide will help you set up the complete portfolio website with automatic IMDb filmography updates.

## Quick Start

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 2: Start the Backend Server

```bash
npm start
```

You should see:
```
🎬 Advait IMDb Scraper API running on port 3000
📍 API available at: http://localhost:3000
🔗 IMDb Profile: https://www.imdb.com/name/nm13073718/
```

### Step 3: Open the Frontend

Open `advaittambe/index.html` in your browser or use a local server:

```bash
# Option 1: Using Python
cd advaittambe
python -m http.server 8000

# Option 2: Using Node.js (http-server)
npx http-server advaittambe -p 8000

# Option 3: Using VS Code Live Server extension
# Right-click index.html and select "Open with Live Server"
```

Visit: `http://localhost:8000`

## How It Works

1. **Backend Server** (Port 3000):
   - Scrapes https://www.imdb.com/name/nm13073718/
   - Extracts movie titles, roles, years, and posters
   - Caches data for 24 hours
   - Serves via REST API

2. **Frontend** (Port 8000 or any):
   - Fetches filmography from backend API
   - Displays in a beautiful carousel
   - Falls back to static data if API is unavailable

## Updating Filmography

The filmography automatically updates when:
- Cache expires (after 24 hours)
- Server restarts
- You manually call refresh endpoint

### Manual Refresh

```bash
curl -X POST http://localhost:3000/api/refresh
```

Or visit in browser and use console:
```javascript
fetch('http://localhost:3000/api/refresh', { method: 'POST' })
  .then(r => r.json())
  .then(data => console.log(data));
```

## Deployment

### Backend Deployment (Choose One)

#### Option A: Heroku (Free Tier)
```bash
cd backend
heroku create advait-imdb-api
git push heroku main
```

#### Option B: Railway.app (Free Tier)
1. Visit https://railway.app
2. Connect GitHub repository
3. Deploy backend folder
4. Copy the deployment URL

#### Option C: Vercel (Serverless)
```bash
cd backend
npm i -g vercel
vercel
```

### Frontend Deployment

#### Option 1: GitHub Pages
```bash
cd advaittambe
# Update API_BASE_URL in assets/js/main.js to your deployed backend URL
git add .
git commit -m "Deploy portfolio"
git push origin main
```

Then enable GitHub Pages in repository settings.

#### Option 2: Netlify
1. Drag and drop the `advaittambe` folder to https://app.netlify.com
2. Update `API_BASE_URL` in settings before deploying

#### Option 3: Vercel
```bash
cd advaittambe
vercel
```

## Configuration

### Update API URL for Production

Edit `advaittambe/assets/js/main.js`:

```javascript
// Change this line (around line 102):
const API_BASE_URL = 'http://localhost:3000';

// To your deployed backend URL:
const API_BASE_URL = 'https://your-backend-url.herokuapp.com';
```

## Testing

### Test Backend API

```bash
# Health check
curl http://localhost:3000/api/health

# Get filmography
curl http://localhost:3000/api/filmography

# Refresh cache
curl -X POST http://localhost:3000/api/refresh
```

### Test Frontend

1. Open browser console (F12)
2. Navigate to filmography section
3. Check console logs for:
   - "Fetching filmography from API..."
   - "Loaded X movies from cache/scrape"

## Troubleshooting

### Backend Issues

**Server won't start:**
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Use different port
PORT=3001 npm start
```

**CORS errors:**
- Make sure backend is running on port 3000
- Check `API_BASE_URL` matches backend URL
- CORS is already enabled in server.js

**Empty filmography:**
- Check server logs for errors
- IMDb may have changed structure - update selectors in `backend/scraper.js`

### Frontend Issues

**Movies not loading:**
- Check browser console for errors
- Verify backend is running: visit http://localhost:3000/api/health
- Fallback data will be used if API is unavailable

**Posters not showing:**
- Check if poster URLs are valid
- Some movies may use placeholder images
- Verify internet connection

## File Structure

```
advaittambe/
├── backend/
│   ├── server.js          # Express API server
│   ├── scraper.js         # IMDb scraping logic
│   ├── package.json       # Dependencies
│   ├── README.md          # Backend documentation
│   └── .gitignore
│
├── advaittambe/
│   ├── index.html         # Main HTML
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── main.js    # Updated with API integration
│   └── assets/images/
│
└── SETUP_INSTRUCTIONS.md  # This file
```

## Features

✅ Automatic IMDb data scraping
✅ Movie poster carousel
✅ 24-hour caching
✅ Graceful fallback
✅ Responsive design
✅ Auto-rotating carousel
✅ Easy deployment

## Next Steps

1. **Customize**: Update profile image, bio, and contact info in `index.html`
2. **Deploy Backend**: Choose a hosting platform and deploy
3. **Deploy Frontend**: Deploy to GitHub Pages, Netlify, or Vercel
4. **Update API URL**: Point frontend to production backend
5. **Test**: Verify everything works in production

## Support

- Backend Documentation: `backend/README.md`
- IMDb Profile: https://www.imdb.com/name/nm13073718/
- Contact: advaittambe24@gmail.com

---

**Enjoy your automatically-updating portfolio! 🎬✨**
