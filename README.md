# TubeRank 🎬
**Community-powered ratings for YouTube's greatest videos.**

Rate, discover, and rank the best content on YouTube across 12 categories — Science, History, AI & Technology, Business, Politics, Music, Sports, Gaming, Comedy, Film & TV, and more.

---

## 🚀 Deploy in 5 Minutes (Vercel — Recommended)

### Option A: Deploy via GitHub (easiest)

1. Create a free account at [github.com](https://github.com) and [vercel.com](https://vercel.com)
2. Create a new GitHub repository called `tuberank`
3. Upload this project folder to the repository
4. Go to [vercel.com/new](https://vercel.com/new)
5. Import your GitHub repository
6. Click **Deploy** — that's it! Vercel auto-detects Vite and builds it

Your site will be live at `https://tuberank.vercel.app` (or your custom domain)

---

### Option B: Deploy via CLI

```bash
# 1. Install dependencies
npm install

# 2. Test locally
npm run dev
# Open http://localhost:5173

# 3. Install Vercel CLI and deploy
npm install -g vercel
vercel

# Follow the prompts — your site goes live instantly
```

---

### Option C: Deploy to Netlify

```bash
npm install
npm run build

# Then drag the 'dist' folder to netlify.com/drop
```

---

## 🛠 Local Development

```bash
npm install        # Install dependencies
npm run dev        # Start dev server at localhost:5173
npm run build      # Build for production (creates dist/)
npm run preview    # Preview the production build
```

---

## 📁 Project Structure

```
tuberank/
├── public/
│   └── favicon.svg          # Site favicon
├── src/
│   ├── main.jsx             # React entry point
│   └── App.jsx              # Full application (all components)
├── index.html               # HTML shell with SEO meta tags
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── .gitignore
```

---

## 🔧 Customization

### Add Your Own Videos
Users can submit videos via the "+ Submit" button (must be logged in).
Alternatively, edit the `SEED` array in `src/App.jsx` to add your own curated videos.

### Change the Site Name
Search for "TubeRank" in `src/App.jsx` and `index.html` and replace with your brand name.

### Add a Custom Domain
In Vercel: Go to your project → Settings → Domains → Add your domain.

---

## 🗄 Data Storage

This MVP uses **localStorage** to store:
- User accounts (username, email, hashed password)
- Video ratings
- User-submitted videos

This means data is stored per-browser. For a production app with shared data across users, upgrade to:
- **Supabase** (free PostgreSQL database + auth)
- **Firebase** (Google's real-time database)
- **PlanetScale** (serverless MySQL)

---

## 📺 YouTube API Integration

To auto-fetch new videos from YouTube:

1. Get a free API key at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable the **YouTube Data API v3**
3. Add to your environment: `VITE_YOUTUBE_API_KEY=your_key_here`
4. Use the key to search for videos with 1M+ views from channels with 5M+ subscribers

---

## 🌐 Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool (fast hot reload)
- **Pure CSS** — No CSS frameworks, custom design system
- **localStorage** — Client-side data persistence
- **YouTube oEmbed API** — Video metadata fetching (no key required)
- **YouTube Thumbnail CDN** — Fast image loading

---

## 📋 Qualifying Videos

TubeRank only lists:
- ✅ Videos with **1M+ views**
- ✅ From channels with **5M+ subscribers**
- ✅ English language (for now)

---

Built with ❤️ using React + Vite
