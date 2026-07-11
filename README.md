# Cartridge & Currency - GitHub Pages Site

## Quick Start

### 1. Create the Repository
1. Go to GitHub and create a new repository named `yourusername.github.io`
2. Replace `yourusername` with your actual GitHub username
3. Make it **public** (GitHub Pages requires public repos on free accounts)

### 2. Upload Files
Upload all files from this project to your repository:
- All folders (`_layouts`, `_includes`, `_posts`, `assets`)
- All root files (`_config.yml`, `feed.json`, `index.html`, etc.)

### 3. Enable GitHub Pages
1. Go to your repository Settings
2. Scroll to "Pages" in the left sidebar
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
4. Click Save

Your site will be live at `https://yourusername.github.io` in a few minutes!

### 4. Configure Your Site
Open `_config.yml` and change:
- `url:` to your actual GitHub Pages URL
- Any other settings you want to customize

### 5. Protect Your YouTube API Key
**IMPORTANT:** Your API key is visible in source code on static sites.
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Click on your API key
4. Under "Application restrictions", select "HTTP referrers"
5. Add your GitHub Pages URL (e.g., `https://yourusername.github.io/*`)
6. Save

This restricts the key so it only works from your website.

---

## How to Write a New Article

1. Create a new file in `_posts/` folder
2. Name it: `YYYY-MM-DD-your-article-title.md`
3. Add front matter at the top:

```yaml
---
title: "Your Article Title"
date: 2026-07-15
category: "Free Resources"
image: "/assets/img/your-image.png"
---
