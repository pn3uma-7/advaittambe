# Preview Your Site Locally

## Quick Start

### Option 1: Direct File Open (Simple)
1. Navigate to the project folder
2. Double-click `index.html`
3. Your default browser will open the site

**Note**: Some features may not work due to CORS restrictions. Use Option 2 for full functionality.

### Option 2: Local Web Server (Recommended)

#### Using Python (if installed)
```bash
# Navigate to project directory
cd "d:\My Side Projects\advaittambe\advaittambe"

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

#### Using Node.js (if installed)
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run server
cd "d:\My Side Projects\advaittambe\advaittambe"
http-server -p 8000
```

Then open: `http://localhost:8000`

#### Using VS Code (if you have it)
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## What to Check

### Desktop View
- [ ] Film reel animation running smoothly in background
- [ ] Profile photo loads (you need to add this first!)
- [ ] Name appears with gradient gold/magenta effect
- [ ] Stats counter animates when you scroll to home section
- [ ] Movie carousel auto-rotates every 4 seconds
- [ ] Previous/Next buttons work on carousel
- [ ] Carousel pauses when you hover over it
- [ ] Timeline items appear with stagger animation
- [ ] Skill tags have hover effects
- [ ] All navigation links work
- [ ] Active nav item highlights correctly
- [ ] Resume download buttons work
- [ ] Floating resume button appears after scrolling down

### Mobile View (Resize Browser)
- [ ] Navigation moves to bottom
- [ ] Profile image stays centered
- [ ] Text is readable
- [ ] Buttons are tap-friendly
- [ ] Carousel still swipeable
- [ ] All sections stack vertically
- [ ] No horizontal scroll

### Browser Testing
Test in multiple browsers:
- Chrome/Edge ✓
- Firefox ✓
- Safari (if on Mac) ✓
- Mobile browsers ✓

## Common Issues & Fixes

### Profile Photo Not Showing
**Issue**: Broken image icon appears
**Fix**: Add `profile.jpg` to `assets/images/` folder

### Movie Posters Not Loading
**Issue**: Some posters show placeholder
**Fix**: Normal - some IMDb URLs may be temporary. You can replace with direct image links.

### Animations Not Smooth
**Issue**: Choppy animations
**Fix**:
- Close other browser tabs
- Update browser to latest version
- Check if hardware acceleration is enabled

### Resume Not Downloading
**Issue**: 404 error when clicking download
**Fix**: Verify `assets/Advait_Tambe_Resume.pdf` exists

### Carousel Not Auto-Rotating
**Issue**: Carousel stays still
**Fix**:
- Check browser console for errors (F12)
- Refresh the page
- Make sure JavaScript is enabled

### Navigation Not Highlighting
**Issue**: Active link doesn't change color
**Fix**: Make sure you're scrolling, not just clicking navigation

## Testing Checklist

Before deploying to Cloudflare Pages, verify:

### Visual
- [x] Colors match cinema theme (purple background, gold accents)
- [ ] Profile photo displays correctly
- [x] All fonts load properly (Bebas Neue, Oswald, Poppins)
- [x] Film reel animation visible but not distracting
- [x] Mobile layout works on small screens

### Functional
- [x] All internal links navigate correctly
- [x] External links (IMDb, email) open in new tab
- [x] Resume downloads successfully
- [x] Carousel auto-rotates
- [x] Carousel manual controls work
- [x] Stats counter animates
- [x] Smooth scroll works
- [x] Hover effects on all interactive elements

### Content
- [ ] Profile photo is current
- [x] Contact information is correct
- [x] All movie titles spelled correctly
- [x] Work dates are accurate
- [x] Skills list is up-to-date
- [x] Resume PDF is latest version

### Performance
- [x] Page loads in under 3 seconds
- [x] No console errors
- [x] Animations are smooth (60fps)
- [x] Images are optimized

## Browser Console

To check for errors:
1. Press F12 (or right-click → Inspect)
2. Click "Console" tab
3. Look for red error messages
4. If you see errors, note them and fix

## Next Step

Once everything looks good locally, you're ready to:
1. Push to GitHub
2. Deploy to Cloudflare Pages
3. Share your live site!

See [README.md](README.md) for deployment instructions.

---

**Tip**: Keep this browser window open while developing. Refresh (F5) to see changes.
