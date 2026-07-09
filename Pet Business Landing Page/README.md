# PawVita Care — Premium Pet Business Landing Page

A production-quality, fully responsive landing page template for pet businesses — veterinary clinics, grooming salons, and pet marketing agencies. Built with pure HTML5, CSS3, and Vanilla JavaScript. No frameworks, no libraries.

---

## Folder Structure

```
Pet Business Landing Page/
├── index.html          ← Main HTML document
├── style.css           ← Complete stylesheet (1 400+ lines)
├── script.js           ← Vanilla JavaScript (ES6+, strict mode)
├── assets/
│   ├── favicon.svg     ← SVG paw print favicon
│   └── og-image.svg    ← Open Graph / social preview image
└── README.md           ← This file
```

---

## Sections

| # | Section        | Description                                              |
|---|----------------|----------------------------------------------------------|
| 1 | **Hero**       | Full-viewport hero with animated card cluster, trust stats, and dual CTAs |
| 2 | **Services**   | Three-column service cards — PawClinic, PawGroom, PawMark |
| 3 | **Benefits**   | Sticky left panel + animated benefit items               |
| 4 | **Statistics** | Animated counting numbers (Intersection Observer)        |
| 5 | **Testimonials** | Three client testimonials with star ratings            |
| 6 | **Pricing**    | Three-tier membership pricing with featured card         |
| 7 | **FAQ**        | Keyboard-accessible accordion                            |
| 8 | **Contact**    | Validated contact form + info panel                      |
| 9 | **Footer**     | Brand, links, social icons, copyright                    |

---

## Features

### Responsive & Mobile-First
- Fully responsive across all breakpoints: mobile (480px), tablet (768px), laptop (1024px), desktop (1280px), large desktop (1400px+)
- Landscape orientation support
- Horizontal scroll testimonials on mobile

### SEO Ready
- `<title>`, `<meta description>`, `<meta keywords>`
- Open Graph tags (og:title, og:description, og:image, og:url)
- Twitter Card tags
- `<link rel="canonical">`
- `<meta name="robots" content="index, follow">`
- JSON-LD Structured Data (Schema.org `LocalBusiness` + `AggregateRating`)

### Accessibility (WCAG 2.1 AA target)
- Skip navigation link (`#main-content`)
- All interactive elements have `aria-label` or visible labels
- Hamburger button with `aria-expanded` and `aria-controls`
- FAQ accordion with `aria-expanded`, `aria-controls`, `aria-hidden`
- Form inputs linked to labels and `aria-describedby` error messages
- `role="alert"` + `aria-live="polite"` on error messages
- Form success state with `role="status"` and `aria-live`
- `focus-visible` keyboard indicators on all focusable elements
- Semantic HTML5 landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Proper heading hierarchy (h1 → h2 → h3)
- Decorative SVGs have `aria-hidden="true"`
- `prefers-reduced-motion` media query disables all animations

### Performance
- 90+ Lighthouse score target
- No render-blocking scripts (JS at bottom of `<body>`)
- Google Fonts loaded with `preconnect` and `display=swap`
- CSS animations use only `transform` and `opacity` (GPU-composited)
- Intersection Observer for lazy-triggered animations (no scroll listeners on animations)
- Minimal DOM, no unnecessary wrappers

### Security
- `'use strict'` mode throughout `script.js`
- All form error messages set via `textContent` — never `innerHTML`
- `sanitizeText()` utility function strips `<`, `>`, `&`, `"`, `'`
- No third-party scripts (only Google Fonts CDN)
- No `eval()`, no `document.write()`
- Input validation on all form fields before any processing

### Animations
- Loading screen with paw-print animation and progress bar
- Hero elements reveal on load (JS-triggered after loader)
- Scroll reveal: `IntersectionObserver`-powered fade-up with staggered delays
- Statistics counter: smooth ease-out cubic animation
- Floating hero cards: pure CSS `@keyframes`
- Button ripple: click-spawned `<span>` with CSS animation
- Hamburger → X transition
- FAQ accordion: `max-height` CSS transition

### JavaScript Architecture
- IIFE-based modules for encapsulation
- Each controller returns `{ init }` — no global state leakage
- Event listeners properly scoped; no anonymous arrow functions in hot paths
- Loading controller has both `window.load` and a 4-second safety fallback

---

## Technology Stack

| Layer      | Technology                                   |
|------------|----------------------------------------------|
| Markup     | HTML5 (Semantic)                             |
| Styling    | CSS3 (Custom Properties, Grid, Flexbox)      |
| Scripting  | Vanilla JavaScript (ES6+, Strict Mode)       |
| Fonts      | Google Fonts (Playfair Display + Inter)      |
| Icons      | Inline SVG (handcrafted, no icon library)    |
| Images     | SVG-based (no raster images required)        |

---

## CSS Architecture

- **CSS Custom Properties** — all colors, typography, spacing, shadows, transitions defined in `:root`
- **BEM-inspired naming** — e.g. `.service-card__title`, `.hero__badge-pulse`
- **No duplicate rules** — each selector appears once
- **No inline styles** — all styling via stylesheet
- **25 documented sections** with a table of contents at the top

---

## Setup (Zero Dependencies)

1. Download or clone the project folder
2. Open `index.html` in any modern browser
3. Done — no npm, no build step, no config files required

---

## Deployment

### Netlify (Recommended — Free)
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag and drop the project folder onto the deploy area
3. Your site is live instantly at a free `.netlify.app` URL

### GitHub Pages
1. Create a new GitHub repository
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source** → Deploy from branch `main` / `/ (root)`
4. Your site is live at `https://username.github.io/repo-name`

### Vercel
```bash
npx vercel --prod
```

### Manual FTP / cPanel
Upload all files to your hosting provider's `public_html` directory via FTP.

---

## Customization

### Colors
Edit the CSS custom properties in `style.css` under `:root`:
```css
--clr-navy:      #0b1e35;   /* Primary dark color  */
--clr-gold:      #c49a3c;   /* Accent/brand color  */
--clr-gold-light: #d4b060;  /* Lighter gold hover  */
```

### Content
Replace all placeholder content in `index.html`:
- Business name: `PawVita Care`
- Address, phone, email in the Contact section
- Testimonial names and quotes
- Service descriptions and feature lists
- Pricing amounts and features

### Fonts
Update the Google Fonts `<link>` tag in `<head>` and change:
```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body:    'Inter', -apple-system, sans-serif;
```

### Adding a Real Form Backend
Replace the `setTimeout` demo submission in `script.js` → `FormController.handleSubmit()` with a real `fetch()` POST to your preferred backend (Formspree, Netlify Forms, custom API, etc.).

---

## Browser Support

| Browser           | Support |
|-------------------|---------|
| Chrome 90+        | ✅ Full  |
| Firefox 88+       | ✅ Full  |
| Safari 14+        | ✅ Full  |
| Edge 90+          | ✅ Full  |
| iOS Safari 14+    | ✅ Full  |
| Samsung Internet  | ✅ Full  |

---

## License

MIT License — free to use for personal and commercial projects.

---

*Crafted with ♥ for pet lovers everywhere.*
