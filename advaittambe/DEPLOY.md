# Cloudflare Pages Deployment Guide

## Step-by-Step Deployment

### Prerequisites
- [x] GitHub account
- [x] Cloudflare account (sign up free at cloudflare.com)
- [x] Profile photo added to `assets/images/profile.jpg`
- [x] Site tested locally (see PREVIEW.md)

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon in top right → **New repository**
3. Repository settings:
   - Name: `advaittambe` (or any name you prefer)
   - Description: "Personal branding website for Advait Vikas Tambe"
   - Visibility: **Public** (required for free Cloudflare Pages)
   - Do NOT initialize with README (we already have one)
4. Click **Create repository**

### Step 2: Push Code to GitHub

Open terminal/command prompt and run:

```bash
# Navigate to project directory
cd "d:\My Side Projects\advaittambe\advaittambe"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/advaittambe.git

# Verify remote was added
git remote -v

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use a Personal Access Token (not your password)
  - Go to GitHub → Settings → Developer settings → Personal access tokens
  - Generate new token with `repo` scope
  - Use token as password

### Step 3: Connect Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Log in or sign up (free account is fine)
3. In left sidebar, click **Workers & Pages**
4. Click **Create application**
5. Go to **Pages** tab
6. Click **Connect to Git**

### Step 4: Authorize GitHub

1. Click **GitHub** as your Git provider
2. Click **Authorize Cloudflare Pages**
3. If prompted, select which repositories to grant access
   - Option A: Select "All repositories"
   - Option B: Select "Only select repositories" → Choose `advaittambe`
4. Click **Install & Authorize**

### Step 5: Configure Build Settings

1. Select your repository: `YOUR_USERNAME/advaittambe`
2. Click **Begin setup**
3. Configure settings:

```
Project name: advaittambe
Production branch: main
Build command: (leave empty)
Build output directory: /
Root directory (advanced): (leave empty)
Environment variables: (none needed)
```

4. Click **Save and Deploy**

### Step 6: Wait for Deployment

- Cloudflare will build and deploy your site
- This usually takes 30-60 seconds
- You'll see a progress indicator
- Once complete, you'll see: **Success! Your site is live!**

### Step 7: Get Your Live URL

Your site will be live at:
```
https://advaittambe.pages.dev
```

Or if Cloudflare assigned a different name:
```
https://advaittambe-xxx.pages.dev
```

Click the URL to view your live site!

## Custom Domain (Optional)

Want to use your own domain like `advaittambe.com`?

### If You Have a Domain

1. In Cloudflare Pages project, click **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `advaittambe.com`
4. Click **Continue**
5. Follow DNS instructions:
   - Add a CNAME record pointing to `advaittambe.pages.dev`
   - If domain is already on Cloudflare, this is automatic
6. Wait for DNS propagation (can take up to 24 hours)
7. SSL certificate will be automatically provisioned

### If You Need a Domain

1. Purchase from registrar (Namecheap, Google Domains, etc.)
2. Transfer nameservers to Cloudflare (free)
3. Follow steps above

## Automatic Deployments

Every time you push to GitHub, Cloudflare automatically redeploys!

```bash
# Make changes to your site
# Then commit and push:

git add .
git commit -m "Update projects section"
git push

# Cloudflare will automatically rebuild and deploy
# Check the Pages dashboard to see progress
```

## Updating Your Site

### Update Content
1. Edit HTML files locally
2. Test changes locally (see PREVIEW.md)
3. Commit and push to GitHub:
```bash
git add .
git commit -m "Description of changes"
git push
```

### Update Resume
1. Replace `assets/Advait_Tambe_Resume.pdf`
2. Commit and push:
```bash
git add assets/Advait_Tambe_Resume.pdf
git commit -m "Update resume"
git push
```

### Add New Movies
1. Edit `assets/js/main.js`
2. Add to `movies` array
3. Commit and push:
```bash
git add assets/js/main.js
git commit -m "Add new project to filmography"
git push
```

## Rollback to Previous Version

If something breaks:

1. Go to Cloudflare Pages dashboard
2. Click on your project
3. Click **View build history**
4. Find working deployment
5. Click **•••** → **Rollback to this deployment**

Or via Git:
```bash
git revert HEAD
git push
```

## Troubleshooting

### Site Not Loading
- Check Cloudflare Pages dashboard for build errors
- Verify GitHub repository is public
- Check if deployment is still in progress

### 404 Errors
- Make sure `index.html` is in the root directory
- Check file paths are relative (not absolute)
- Verify case-sensitive paths (use lowercase)

### Images Not Loading
- Check image paths in HTML/CSS
- Verify images exist in `assets/images/`
- Check file extensions match exactly

### JavaScript Errors
- Open browser console (F12)
- Check for errors
- Verify all JS files are committed to Git

## Monitoring

### View Analytics
1. Go to Cloudflare Pages dashboard
2. Click your project
3. View:
   - Page views
   - Unique visitors
   - Bandwidth usage
   - Geographic distribution

### Performance
Cloudflare Pages provides:
- Free SSL/HTTPS
- Global CDN (fast worldwide)
- Automatic minification
- Brotli compression
- HTTP/2 and HTTP/3
- DDoS protection

## Costs

**Everything is FREE** on Cloudflare Pages:
- Unlimited sites
- Unlimited bandwidth
- Unlimited requests
- 500 builds per month
- Custom domains
- SSL certificates

## Support

### Getting Help
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare Community](https://community.cloudflare.com/)
- [GitHub Issues](https://github.com/YOUR_USERNAME/advaittambe/issues)

### Useful Links
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **GitHub Repo**: https://github.com/YOUR_USERNAME/advaittambe
- **Live Site**: https://advaittambe.pages.dev

---

## Quick Commands Reference

```bash
# Check git status
git status

# Stage all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub (auto-deploys to Cloudflare)
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

**Your site will be live and accessible worldwide in under 5 minutes!**
