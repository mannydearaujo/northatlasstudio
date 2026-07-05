# North Atlas Studio — Brand Guide v2

_Supersedes the v1 guide after the 2026-07-05 rename. Source of truth: the
board images in `North_Atlas_Studio_Brand_Pack/` at the repo root._

## Brand idea
**Strategic · Data-Driven · Local-First · Future-Ready.**

North Atlas Studio should feel like a premium, modern, strategic digital studio for local service
businesses — clarity, measurement, and forward motion. Tagline: **Websites that turn local searches
into leads.** Services line: Web Design · Local SEO · Tracking · AI Search Readiness.

## Logo
Compass ring (open at the top) + lower-hemisphere globe grid + location pin, with an Atlas Blue
north arrow. Vector recreations (per the pack's "recreate in true vector" instruction) live in
`assets/brand/atlas/`:

| File | Use |
|---|---|
| `atlas-mark-white.svg` | Mark on Atlas Navy / dark backgrounds (site nav, footer) |
| `atlas-mark-navy.svg` | Mark on white / light backgrounds (docs, letterhead) |
| `favicon.svg` | Navy rounded-tile app icon (browser favicon) |
| `favicon-512.png` | Apple touch icon / raster app icon |

Usage rules (per pack page 2): keep clear space equal to the "N" height, minimum 120px wordmark /
24px icon digital, don't stretch, recolor, rotate, add effects, crowd, alter the icon, or place on
busy backgrounds. Approved backgrounds: White, Atlas Navy, Atlas Blue.

Legacy assets in `assets/brand/svg/` and `assets/brand/png/` are retired — never reference them in
new work.

## Colors
| Token | Hex | Use |
|---|---:|---|
| Atlas Navy | `#0B1D3A` | Primary background, dark surfaces |
| Atlas Blue | `#2563EB` | CTAs, accents, north arrow, links |
| Slate | `#475569` | Secondary text on light backgrounds |
| Stone | `#E2E8F0` | Light surfaces, dividers |
| White | `#FFFFFF` | Text on navy/blue, light backgrounds |

Site-derived tones (cards, lines, muted text) live as tokens in `styles/atlas-brand.css` (the
`--npd-*` var names are kept for backwards compatibility). Text on Atlas Blue is always white —
navy-on-blue fails WCAG contrast.

## Typography
- Headings: **Sora SemiBold** (Google Fonts). Modern. Geometric. Confident.
- Body: **Inter** Regular. Clean, readable, optimized for digital.

## Motifs
Dotted world-map texture, rising blue chart line with location-pin marker, compass/direction cues.
Use sparingly; avoid crypto/gaming/abstract-AI-hype styling.

## Guardrail
The brand-pack application boards (business card, letterhead, email signature) contain TEMPLATE
placeholder people and contact details — a fictional "founder & strategy lead" persona, a made-up
Providence RI street address, and 401-prefix phone numbers. Never copy those into real
deliverables. The founder is Manny de Araujo; the service area is Greater Boston, MetroWest, and
Southcoast Massachusetts. `scripts/production-sync.mjs` flags those placeholder strings as stale
patterns.
