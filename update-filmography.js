#!/usr/bin/env node

/**
 * Update Filmography Script
 *
 * This script fetches the latest filmography from the backend API
 * and updates the static JSON file in the frontend.
 *
 * Run this script monthly to keep the filmography data up to date:
 * node update-filmography.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BACKEND_URL = 'https://portfolio-website-y753.onrender.com/api/filmography';
const OUTPUT_FILE = path.join(__dirname, 'advaittambe', 'assets', 'data', 'filmography.json');

console.log('🎬 Fetching latest filmography from backend...');
console.log(`📍 Backend URL: ${BACKEND_URL}`);

https.get(BACKEND_URL, (res) => {
    let data = '';

    // Handle potential redirect or error
    if (res.statusCode !== 200) {
        console.error(`❌ Error: Received status code ${res.statusCode}`);
        process.exit(1);
    }

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const result = JSON.parse(data);

            if (!result.success || !result.data) {
                console.error('❌ Error: Invalid response format from backend');
                console.error(result);
                process.exit(1);
            }

            // Format the data for frontend
            const filmographyData = {
                lastUpdated: new Date().toISOString().split('T')[0],
                movies: result.data
            };

            // Write to file
            const outputDir = path.dirname(OUTPUT_FILE);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(filmographyData, null, 2), 'utf8');

            console.log(`✅ Successfully updated filmography!`);
            console.log(`📊 Movies count: ${result.data.length}`);
            console.log(`📝 Output file: ${OUTPUT_FILE}`);
            console.log(`📅 Last updated: ${filmographyData.lastUpdated}`);
            console.log('');
            console.log('🔄 Next steps:');
            console.log('   1. Review the changes: git diff');
            console.log('   2. Commit and push: git add . && git commit -m "Update filmography data" && git push');
            console.log('   3. Cloudflare Pages will auto-deploy');

        } catch (error) {
            console.error('❌ Error parsing response:', error.message);
            process.exit(1);
        }
    });

}).on('error', (error) => {
    console.error('❌ Error fetching filmography:', error.message);
    console.log('');
    console.log('💡 Tip: The backend might be sleeping (free tier).');
    console.log('   Wait 30-60 seconds and try again.');
    process.exit(1);
});
