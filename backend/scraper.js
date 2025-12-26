const axios = require('axios');
const cheerio = require('cheerio');

const IMDB_PROFILE_URL = 'https://www.imdb.com/name/nm13073718/';

/**
 * Scrapes Advait's IMDb profile for filmography data
 * Extracts from both "Upcoming" and "Previous" sections
 * @returns {Promise<Array>} Array of movie objects with title, role, year, and poster
 */
async function scrapeIMDbFilmography() {
    try {
        console.log('Fetching IMDb profile...');

        // Fetch the IMDb page
        const response = await axios.get(IMDB_PROFILE_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        const $ = cheerio.load(response.data);
        const filmography = [];
        const seen = new Set(); // Track duplicates

        console.log('Parsing filmography...');

        // Look for all credit links in the Visual Effects section
        // This includes both Upcoming and Previous sections
        $('a[href*="/title/"]').each(function() {
            try {
                const $link = $(this);
                const href = $link.attr('href');
                const title = $link.text().trim();

                // Extract IMDb ID
                const imdbIdMatch = href?.match(/\/title\/(tt\d+)/);
                if (!imdbIdMatch || !title) return;

                const imdbId = imdbIdMatch[1];

                // Skip if we've already seen this movie
                if (seen.has(imdbId)) return;
                seen.add(imdbId);

                // Try to find the parent container to get more info
                const $parent = $link.closest('.ipc-metadata-list-summary-item');

                // Get year
                let year = '';
                $parent.find('.ipc-metadata-list-summary-item__li').each(function() {
                    const text = $(this).text();
                    const yearMatch = text.match(/\b(19|20)\d{2}\b/);
                    if (yearMatch) {
                        year = yearMatch[0];
                    }
                });

                // Get role from parent text
                const parentText = $parent.text();
                let role = 'Production Coordinator';

                if (parentText.toLowerCase().includes('production coordinator')) {
                    role = 'Production Coordinator';
                } else if (parentText.toLowerCase().includes('visual effects')) {
                    role = 'VFX Production Coordinator';
                }

                filmography.push({
                    title,
                    role,
                    year: year || '',
                    imdbId,
                    poster: null
                });

                console.log(`Found: ${title} (${year || 'TBA'}) - ${role}`);

            } catch (err) {
                // Silently skip invalid entries
            }
        });

        console.log(`Found ${filmography.length} total credits, fetching posters...`);

        // Fetch poster images for each movie
        for (const movie of filmography) {
            if (movie.imdbId) {
                try {
                    const movieUrl = `https://www.imdb.com/title/${movie.imdbId}/`;
                    const movieResponse = await axios.get(movieUrl, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        },
                        timeout: 5000
                    });

                    const $movie = cheerio.load(movieResponse.data);

                    // Try multiple selectors for poster
                    const posterImg = $movie('img[class*="ipc-image"]').first().attr('src') ||
                                    $movie('.ipc-media img').first().attr('src') ||
                                    $movie('[data-testid="hero-media__poster"] img').attr('src') ||
                                    $movie('.poster img').attr('src');

                    if (posterImg) {
                        // Clean up poster URL to get high quality version
                        movie.poster = posterImg.replace(/_V1_.*\.jpg/, '_V1_UX300.jpg');
                    } else {
                        // Fallback placeholder
                        movie.poster = `https://via.placeholder.com/300x450/1a0a2e/ffd700?text=${encodeURIComponent(movie.title)}`;
                    }

                    // Small delay to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, 400));
                } catch (err) {
                    console.error(`Error fetching poster for ${movie.title}:`, err.message);
                    movie.poster = `https://via.placeholder.com/300x450/1a0a2e/ffd700?text=${encodeURIComponent(movie.title)}`;
                }
            }
        }

        // Sort by year (newest first), then by title
        filmography.sort((a, b) => {
            const yearA = parseInt(a.year) || 9999;
            const yearB = parseInt(b.year) || 9999;
            if (yearB !== yearA) {
                return yearB - yearA;
            }
            return a.title.localeCompare(b.title);
        });

        console.log(`Successfully scraped ${filmography.length} credits`);
        return filmography;

    } catch (error) {
        console.error('Error scraping IMDb:', error.message);
        throw new Error(`Failed to scrape IMDb profile: ${error.message}`);
    }
}

module.exports = { scrapeIMDbFilmography };
