# Advait Vikas Tambe - Personal Branding Website

A cinema-inspired personal branding website for VFX Production Coordinator Advait Vikas Tambe. Built with HTML, CSS, and JavaScript, featuring a bold purple and gold color scheme that reflects the energy and creativity of the film industry.

## Features

- **Animated Film Reel Background** - Dynamic canvas animation with film strip perforations
- **Movie Carousel** - Auto-rotating showcase of projects with manual controls
- **Responsive Timeline** - Interactive career journey display
- **Animated Stats Counters** - Eye-catching statistics on scroll
- **Smooth Navigation** - Fixed sidebar with active section tracking
- **Resume Download** - Floating CTA button for easy resume access
- **Mobile Responsive** - Optimized for all device sizes

## Tech Stack

- HTML5
- CSS3 (Custom properties, Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Canvas API for background animation

## Project Structure

```
advaittambe/
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── images/
│   │   └── profile.jpg (add your photo here)
│   └── Advait_Tambe_Resume.pdf
└── README.md
```

## Setup Instructions

### 1. Add Profile Photo

1. Add Advait's profile photo to `assets/images/`
2. Rename it to `profile.jpg`
3. Recommended size: 300x300px or larger (square aspect ratio)

### 2. Local Development

Simply open `index.html` in your browser. No build process required!

```bash
# Navigate to project directory
cd advaittambe

# Open in default browser (Windows)
start index.html

# Or use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000
```

## Deployment to Cloudflare Pages

### Prerequisites

- GitHub account
- Cloudflare account (free tier works perfectly)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Advait Tambe personal website"

# Create a new repository on GitHub
# Then add the remote and push
git remote add origin https://github.com/YOUR_USERNAME/advaittambe.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Cloudflare Pages

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** in the sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Choose your GitHub repository (`advaittambe`)
6. Configure build settings:
   - **Build command**: Leave empty (static site)
   - **Build output directory**: `/`
   - **Root directory**: `/`
7. Click **Save and Deploy**

Your site will be live at: `https://advaittambe.pages.dev`

### Step 3: Custom Domain (Optional)

1. In Cloudflare Pages, go to your project
2. Click **Custom domains**
3. Add your domain (e.g., `advaittambe.com`)
4. Follow DNS configuration instructions
5. SSL/TLS will be automatically configured

## Customization Guide

### Update Movie Posters

Edit the `movies` array in `assets/js/main.js`:

```javascript
const movies = [
    {
        title: "Movie Name",
        role: "Your Role",
        year: "Year",
        poster: "URL to poster image"
    },
    // Add more movies...
];
```

### Change Color Scheme

Edit CSS variables in `assets/css/style.css`:

```css
:root {
    --bg-primary: #1a0a2e;          /* Background color */
    --accent-gold: #ffd700;          /* Primary accent */
    --accent-magenta: #d946ef;       /* Secondary accent */
}
```

### Update Content

All content is in `index.html`:
- **Home Section**: Update name, title, stats
- **Credits Section**: Update work timeline
- **Skills Section**: Update skills and software
- **About Section**: Update bio and education

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight: < 100KB total (excluding images)
- No external dependencies
- Optimized animations using `requestAnimationFrame`
- Lazy loading for images
- Mobile-first responsive design

## Maintenance

### Updating Resume

1. Replace `assets/Advait_Tambe_Resume.pdf` with new version
2. Keep the same filename
3. Push changes to GitHub
4. Cloudflare Pages will auto-deploy

### Adding New Projects

1. Update the `movies` array in `assets/js/main.js`
2. Update the Credits timeline in `index.html`
3. Commit and push changes

## Credits

- **Design & Development**: Inspired by modern cinema aesthetics
- **Fonts**: Google Fonts (Bebas Neue, Oswald, Poppins)
- **Icons**: Custom SVG icons

## License

This is a personal portfolio website. All rights reserved.

## Contact

For questions or updates, contact:
- **Email**: advaittambe24@gmail.com
- **IMDb**: [Advait Vikas Tambe](https://www.imdb.com/name/nm13073718/)

---

Built with passion for cinema and code.
