# Advait's IMDb Filmography API

A Node.js backend service that scrapes Advait's IMDb profile and serves filmography data to the portfolio website.

## Features

- **Automatic IMDb Scraping**: Fetches filmography data from https://www.imdb.com/name/nm13073718/
- **Smart Caching**: Caches data for 24 hours to avoid excessive scraping
- **Movie Posters**: Automatically extracts high-quality poster images
- **CORS Enabled**: Ready to serve frontend applications
- **Fallback Support**: Frontend gracefully falls back to static data if API is unavailable

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### 1. Get Filmography
```
GET /api/filmography
```

Returns Advait's complete filmography from IMDb (cached for 24 hours).

**Response:**
```json
{
  "success": true,
  "source": "cache|scrape",
  "data": [
    {
      "title": "Movie Title",
      "role": "Production Coordinator",
      "year": "2024",
      "poster": "https://...",
      "imdbId": "tt1234567"
    }
  ],
  "count": 10
}
```

### 2. Force Refresh Cache
```
POST /api/refresh
```

Forces a refresh of the filmography cache.

**Response:**
```json
{
  "success": true,
  "message": "Filmography cache refreshed",
  "data": [...],
  "count": 10
}
```

### 3. Health Check
```
GET /api/health
```

Returns server status and cache statistics.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-12-26T10:00:00.000Z",
  "cacheStats": {
    "keys": 1,
    "hits": 10,
    "misses": 1
  }
}
```

## Frontend Integration

Update the `API_BASE_URL` in your frontend JavaScript:

```javascript
// For local development
const API_BASE_URL = 'http://localhost:3000';

// For production (replace with your deployed URL)
const API_BASE_URL = 'https://your-api-domain.com';
```

## Deployment

### Option 1: Deploy to Heroku

1. Create a Heroku app:
```bash
heroku create advait-imdb-api
```

2. Deploy:
```bash
git push heroku main
```

3. The app will be available at: `https://advait-imdb-api.herokuapp.com`

### Option 2: Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 3: Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Create new project from GitHub
3. Select this repository
4. Railway will auto-detect Node.js and deploy

### Option 4: Run on VPS (DigitalOcean, AWS, etc.)

1. SSH into your server
2. Clone the repository
3. Install dependencies: `npm install`
4. Use PM2 to keep it running:
```bash
npm install -g pm2
pm2 start server.js --name advait-imdb-api
pm2 save
pm2 startup
```

## Environment Variables

You can configure the following environment variables:

- `PORT`: Server port (default: 3000)

Example `.env` file:
```
PORT=3000
```

## Cache Management

- Cache duration: 24 hours (86400 seconds)
- Cache is stored in memory using `node-cache`
- To manually clear cache, restart the server or call `/api/refresh`

## How It Works

1. When `/api/filmography` is called, the server first checks the cache
2. If cache exists and is valid (< 24 hours old), return cached data
3. If cache is missing or expired:
   - Scrapes https://www.imdb.com/name/nm13073718/
   - Extracts movie titles, years, and roles
   - Fetches poster images for each movie
   - Stores in cache and returns data
4. Frontend displays the filmography in a carousel

## Troubleshooting

### Issue: CORS errors
**Solution**: Make sure the backend server is running and the `API_BASE_URL` in frontend matches the backend URL.

### Issue: Empty filmography
**Solution**: Check the server logs. IMDb may have changed their HTML structure. Update the scraper selectors in `scraper.js`.

### Issue: Missing posters
**Solution**: The scraper tries to fetch posters from individual movie pages. If IMDb rate-limits, some posters may fall back to placeholders.

### Issue: API not responding
**Solution**:
- Check if the server is running: `curl http://localhost:3000/api/health`
- Check server logs for errors
- Ensure firewall allows traffic on the configured port

## Notes

- **IMDb Terms of Service**: This scraper is for personal/portfolio use only. Be mindful of IMDb's terms.
- **Rate Limiting**: The scraper includes delays between requests to avoid overloading IMDb servers.
- **Poster Quality**: Posters are fetched at 300px width for optimal carousel display.

## Updates

To update the filmography when Advait gets new credits:

1. Call the refresh endpoint: `POST http://localhost:3000/api/refresh`
2. Or simply restart the server to clear the cache
3. The scraper will automatically fetch the latest data from IMDb

## Support

For issues or questions, contact: advaittambe24@gmail.com

## License

MIT License - Free to use for personal portfolio projects.
