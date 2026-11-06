NerveHoney USA — /images/ Folder
================================
Site: https://nervehoney-us.vercel.app/
Images served from: https://nervehoney-us.vercel.app/images/

Required image files (place in this folder before deploying):
--------------------------------------------------------------

Product Images (WebP format):
  nervehoney-6-bottle.webp   — 6-bottle best value pack (suggested: 520x480px min)
  nervehoney-3-bottle.webp   — 3-bottle most popular pack (suggested: 520x480px min, also used as OG image at 1200x630)
  nervehoney-2-bottle.webp   — 2-bottle starter pack (suggested: 420x400px min)

Review Author Avatars (WebP format):
  nervehoney-review-1.webp   — Review avatar for Michael T. (suggested: 88x88px, displayed at 52x52)
  nervehoney-review-2.webp   — Review avatar for Sarah R. (suggested: 88x88px, displayed at 52x52)
  nervehoney-review-3.webp   — Review avatar for Lauren R. (suggested: 88x88px, displayed at 52x52)

Guarantee Badge (WebP format):
  nervehoney-guarantee.webp  — 60-day money-back guarantee badge (suggested: 400x400px, displayed at 280x280)

Bonus Guide Covers (WebP format):
  nervehoney-bonus-1.webp    — Nerve Renew Guide cover (suggested: 200x250px min)
  nervehoney-bonus-2.webp    — Natural Nerve Recovery cover (suggested: 200x250px min)
  nervehoney-bonus-3.webp    — Fortifying Vitamins cover (suggested: 200x250px min)
  nervehoney-bonus-4.webp    — Renewed Nerves Challenge cover (suggested: 200x250px min)
  nervehoney-bonus-5.webp    — Personalized Usage Guide cover (suggested: 200x250px min)

Favicon / PWA Icon (PNG format):
  favicon.png                — Site icon (required: 512x512px for PWA; also used as 192x192 icon)

Color Palette Reference:
  Primary Espresso:  #1a0a00 (deep espresso — backgrounds, nav)
  Gold Accent:       #c8860a (deep gold — CTA buttons, accents)
  Honey Accent:      #f5c842 (warm honey amber — highlights, stats)
  Cream Base:        #fdf8ef (warm cream — page background)

Image Loading Strategy:
  - nervehoney-3-bottle.webp: fetchpriority="high" (above-fold hero image, no lazy load)
  - All other images: loading="lazy"
  - All images include explicit width/height attributes for CLS prevention
  - WebP format used throughout for optimal Lighthouse performance scores

SEO Notes:
  - All images referenced in sitemap.xml with descriptive titles and captions
  - All images have descriptive alt text in index.html
  - Open Graph image: nervehoney-3-bottle.webp (1200x630 crop recommended)
