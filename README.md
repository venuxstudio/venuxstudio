# VENUX STUDIO — Standalone Multi-Page Website (V2)

Zero-build, high-performance HTML/CSS/Vanilla JS version ready for drag-and-drop deployment or double-click local viewing.

## File & Page Structure

```
v2-standalone/
├── index.html            # Home Page (Smooth 15-Work Orbit Showcase + Center Emblem)
├── about.html            # About Page (Gokul Eashwar Bio, Philosophy, Pillars)
├── portfolio.html        # Portfolio (15 Works, Category Filters, Search, Lightbox, PDF Link)
├── vibe-builds.html      # Vibe Builds (6 AI & Generative Coding Projects)
├── contact.html          # Contact Page (WhatsApp, Telegram, Email + Interactive Form)
├── robots.txt            # Search engine crawler instructions
├── sitemap.xml           # Multi-page SEO & index sitemap
├── css/
│   └── style.css         # Glassmorphism, 3-color theme, typography, responsive rules
└── js/
    ├── data.js           # Central CMS: Edit videos, images, portfolio works, links
    └── app.js            # Engine: Orbit physics, circular arc nav, modals, forms
```

---

## Key Customization Points

### 1. Change the Background Video or Image
Open **`js/data.js`** and update:
```javascript
window.VENUX_CONFIG = {
  bgVideoUrl: "https://res.cloudinary.com/nnzbikiu/video/upload/v1787066009/bg2_l8jbki.mp4",
  bgImageUrl: "https://res.cloudinary.com/nnzbikiu/image/upload/v1785316410/BG1_i8uujd.jpg",
  // ...
};
```
To adjust the dark overlay transparency, open **`css/style.css`** and find `.video-bg-overlay`:
```css
.video-bg-overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.20); /* Change 0.20 (20%) to any value */
  z-index: 1;
}
```

### 2. Update the "VIEW ALL PROJECTS" PDF Portfolio Link
Open **`js/data.js`** and edit:
```javascript
pdfPortfolioUrl: "YOUR_GOOGLE_DRIVE_OR_DIRECT_PDF_LINK_HERE"
```

### 3. Add or Modify Portfolio Works
All 15 portfolio works and 6 vibe code builds are defined in **`js/data.js`** with titles, categories, imagery, deliverables, and tags.

---

## How to View and Deploy

1. **Local View**: Double-click `index.html` (or any other `.html` file) in your file manager. It opens directly in your browser.
2. **Netlify**: Drag and drop the `v2-standalone` folder into [app.netlify.com/drop](https://app.netlify.com/drop).
3. **Vercel / GitHub Pages**: Upload the repository or static files directly.
