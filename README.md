# Branch & Caffè — Website

A handcrafted website for **Branch & Caffè**, a cozy independent café at 10 Cross Street Upper, Galway, Ireland.

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Vercel via GitHub (Easiest)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Branch & Caffè website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/branch-caffe.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click **"Add New Project"**
   - Import your `branch-caffe` repository
   - Leave all settings as default (it's a static site)
   - Click **Deploy** ✅

   Your site will be live at `https://branch-caffe.vercel.app`

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts and you're live in seconds.

---

## 📁 Project Structure

```
branch-caffe/
├── index.html        # Main HTML — all sections
├── css/
│   └── style.css     # All styles
├── js/
│   └── main.js       # Nav, carousel, animations, lightbox
└── README.md
```

## ✨ Features

- **Fixed navigation** — transparent on hero, dark when scrolled, hamburger menu on mobile
- **Hero section** — full screen with parallax background and animated entrance
- **About section** — story, badges, image
- **Menu section** — tabbed menu (Coffees / Specialty / Food) with all real prices
- **Gallery** — 5-photo grid with hover overlay and lightbox on click
- **Reviews carousel** — 7 real Google reviews with auto-play, touch/swipe support, dot navigation
- **Visit section** — full opening hours, address, embedded Google Maps, payment info, pet policy
- **Footer** — links, Instagram handle, copyright

## 🎨 Design

- **Palette:** Espresso brown `#1a0f07`, warm cream `#f5ede0`, gold `#c9953a`
- **Fonts:** Playfair Display (display), Cormorant Garamond (body), Libre Baskerville (labels)
- **Style:** Warm editorial — artisan café meets Irish charm

## 🔧 Customisation Tips

- **Instagram:** Search `branchandcaffe` and update the real Instagram URL when available
- **Google Maps embed:** The iframe in `index.html` uses a placeholder — replace the `src` URL with your verified Maps embed link
- **Photos:** Replace Unsplash URLs in `index.html` with real photos (host on Cloudinary or in `/images/`)
- **Google Review link:** Update the `href` in the Reviews section CTA with the real Place ID link

## 📱 Responsive

Fully responsive — mobile, tablet, desktop.

---

Made with love for Branch & Caffè ☕
