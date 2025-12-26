const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const { scrapeIMDbFilmography } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// Cache for 24 hours (86400 seconds)
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

/**
 * GET /api/filmography
 * Returns Advait's filmography from IMDb
 * Cached for 24 hours to avoid excessive scraping
 */
app.get('/api/filmography', async (req, res) => {
    try {
        // Check cache first
        const cachedData = cache.get('filmography');

        if (cachedData) {
            console.log('Returning cached filmography data');
            return res.json({
                success: true,
                source: 'cache',
                data: cachedData,
                cachedAt: cache.getTtl('filmography')
            });
        }

        // If not in cache, scrape IMDb
        console.log('Cache miss - scraping IMDb...');
        const filmography = await scrapeIMDbFilmography();

        // Store in cache
        cache.set('filmography', filmography);

        res.json({
            success: true,
            source: 'scrape',
            data: filmography,
            count: filmography.length
        });

    } catch (error) {
        console.error('Error in /api/filmography:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * POST /api/refresh
 * Forces a refresh of the filmography cache
 */
app.post('/api/refresh', async (req, res) => {
    try {
        console.log('Force refresh requested');

        // Clear cache
        cache.del('filmography');

        // Scrape fresh data
        const filmography = await scrapeIMDbFilmography();

        // Store in cache
        cache.set('filmography', filmography);

        res.json({
            success: true,
            message: 'Filmography cache refreshed',
            data: filmography,
            count: filmography.length
        });

    } catch (error) {
        console.error('Error in /api/refresh:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        cacheStats: cache.getStats()
    });
});

/**
 * GET /
 * Root endpoint with API documentation
 */
app.get('/', (req, res) => {
    res.json({
        name: 'Advait IMDb Filmography API',
        version: '1.0.0',
        endpoints: {
            '/api/filmography': 'GET - Fetch filmography (cached for 24 hours)',
            '/api/refresh': 'POST - Force refresh filmography cache',
            '/api/health': 'GET - Health check'
        },
        imdbProfile: 'https://www.imdb.com/name/nm13073718/'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🎬 Advait IMDb Scraper API running on port ${PORT}`);
    console.log(`📍 API available at: http://localhost:${PORT}`);
    console.log(`🔗 IMDb Profile: https://www.imdb.com/name/nm13073718/`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    cache.close();
    process.exit(0);
});
