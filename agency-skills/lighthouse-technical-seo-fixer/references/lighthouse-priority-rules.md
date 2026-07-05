# Lighthouse Priority Rules

Prioritize by lead impact → crawl impact → UX/accessibility → polish. A 90 score that loses phone taps to a mispositioned CTA is worse than an 80 that converts.

## P0 — Critical (fix before anything else)
- Content blocked from rendering/crawling (JS-dependent content, robots mistakes)
- Broken mobile layout, horizontal scroll, unusable viewport
- Inaccessible forms/buttons (no labels, no accessible names, keyboard traps) — these lose real leads, not just points
- Severe load delay (LCP > 4s on mobile)
- Missing/duplicate title + meta description

## P1 — High
- Oversized/unoptimized images (usually the whole performance problem on static local sites: convert to WebP, size to display dimensions, lazy-load below-fold — hero image excluded from lazy-load)
- Render-blocking CSS/JS (inline critical CSS on small static sites; defer the rest)
- Layout shift (CLS) around CTAs and phone numbers — shifting targets lose taps
- Poor tap-target spacing on mobile; missing form `autocomplete`/`inputmode`
- Color contrast failures on CTAs and body text

## P2 — Medium
- Font loading (font-display: swap; system-font stacks are fine for local sites)
- Unused CSS/JS payloads; third-party script weight (each widget must justify itself)
- Missing width/height attributes on images (CLS prevention)
- Redirect chains on internal links

## P3 — Polish (only when P0–P2 are clear and business value exists)
- Squeezing 90→100 scores; micro-optimizing already-fast pages
- Advanced formats (AVIF), preconnect/prefetch tuning

## Core Web Vitals quick map
- **LCP** (< 2.5s): almost always the hero image → optimize/preload it.
- **CLS** (< 0.1): image dimensions + no late-loading banners above content.
- **INP** (< 200ms): rarely a problem on static sites; check third-party scripts if it is.

## Reporting rule
Report to the owner in outcomes, not scores: "your homepage loads in 1.8s on a phone now (was 6.2s), and the quote button no longer jumps while loading." Screenshot before/after scores as proof for the case study file.
