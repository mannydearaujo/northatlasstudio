# Site Architecture

## Core page inventory (every build)
| Page | Job | Notes |
|---|---|---|
| Homepage | Understanding + action | Answer "what, where, for whom, why you" above the fold. Primary CTA visible without scrolling. |
| Services hub | Understanding | One card per service linking to detail pages. No dead-end text lists. |
| Service detail (one per REAL service) | Understanding + trust + action | What it is, who needs it, what it costs (band or "factors" if owner won't publish), proof, FAQ block, CTA. |
| Location/service-area pages | Understanding + trust | Planned by `city-service-cluster-builder` — never generate town pages ad hoc from this skill. |
| About / trust | Trust | Real people, real photos, licenses/insurance, years, the story in owner voice. |
| FAQ | Understanding + trust | Real questions from real customers; each maps to FAQPage schema. |
| Contact / quote / book | Action | The primary conversion path, minimal fields, confirmation state that sets response expectations. |

## Structure rules
- Flat URLs: `/gutter-installation/`, `/dog-grooming-lexington-ma/` — no `/services/category/item/` nesting for small sites.
- Pick the canonical URL format before building page clusters. Extensionless clean URLs are the default for new static/Vercel builds, and file output, internal links, canonical tags, and `sitemap.xml` must all agree.
- Some static hosts can serve both `/page` and `/page.html` as separate 200 URLs. Before launch, spot-check representative pages and route any duplicate-URL findings to `static-local-seo-launch-system`.
- Internal links: every service page ↔ relevant location pages ↔ homepage. Location pages are the most orphan-prone — link them from a visible service-area section, not just the sitemap.
- Navigation: max 7 top-level items; primary CTA as a visually distinct nav button; phone number in header (tap-to-call on mobile).
- 404 page with nav + CTA. Favicon set. `robots.txt` + `sitemap.xml` from day one.

## What NOT to build
- Pages for services the owner doesn't actually want to sell.
- A blog section with no content plan behind it (add later via `localized-blog-opportunity-finder`).
- Sliders/carousels (nobody sees slide 2), autoplay video, chat widgets the owner won't answer.
