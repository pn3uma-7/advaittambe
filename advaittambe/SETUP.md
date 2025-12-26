# Quick Setup Guide

## Before Deploying

### 1. Add Profile Photo

**IMPORTANT**: You need to add Advait's profile photo before the site will display correctly.

1. Take the profile photo from his resume or get a professional headshot
2. Save it as `profile.jpg` in the `assets/images/` folder
3. Recommended specifications:
   - Format: JPG or PNG
   - Size: At least 300x300 pixels
   - Aspect ratio: Square (1:1)
   - File size: Keep under 500KB for fast loading

**To extract from resume PDF:**
- Open the resume PDF
- Take a screenshot of his photo
- Crop it to square
- Save as `assets/images/profile.jpg`

### 2. Verify Resume PDF

Make sure `assets/Advait_Tambe_Resume.pdf` is the latest version.

### 3. Test Locally

Open `index.html` in a browser and check:
- [ ] Profile photo loads correctly
- [ ] All sections scroll smoothly
- [ ] Movie carousel auto-rotates
- [ ] Resume downloads when clicking buttons
- [ ] Mobile view works (resize browser)

### 4. Customize (Optional)

#### Update Stats (in index.html)
```html
<span class="stat-number" data-target="20">0</span> <!-- Number of projects -->
<span class="stat-number" data-target="4">0</span>  <!-- Number of studios -->
<span class="stat-number" data-target="4">0</span>  <!-- Years experience -->
```

#### Update Movies (in assets/js/main.js)
The movie posters are fetched from IMDb. If any don't load:
1. Find the movie on IMDb
2. Copy the poster image URL
3. Replace in the `movies` array

### 5. Deploy

Follow the instructions in [README.md](README.md) for deploying to Cloudflare Pages.

## Need Help?

If you encounter any issues:
1. Check browser console for errors (F12)
2. Verify all file paths are correct
3. Make sure profile.jpg exists in assets/images/
4. Test in a different browser

---

Once you've completed these steps, your site is ready to deploy!
