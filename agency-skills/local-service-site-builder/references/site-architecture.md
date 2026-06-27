# Site Architecture

Core pages: homepage, services hub, service detail pages, location/service-area pages, about/trust, FAQ/support, contact/quote/book.

## URL format rule (pick one, enforce it everywhere)

Decide the canonical URL format before building any page — extensionless (`/seamless-gutters-boston-ma`) is the default for new builds — and make sure every layer agrees: file/route output, internal links, sitemap.xml, and canonical tags. Some static hosts (confirmed on GitHub Pages) auto-serve a `name.html` file at both `/name.html` and `/name` with identical content and no redirect between them. Left unchecked, this creates a duplicate-URL pair for every page: Google may index one form while sitting on the other as "Discovered – currently not indexed," splitting crawl signal across two URLs for the same content.

Before launch, on any rebuild, or before adding new page types:
- Confirm the live host actually serves only one form, or block the non-canonical one (e.g. `Disallow: /*.html$` in `robots.txt` if `.html` is not the canonical form).
- Confirm `sitemap.xml` and all internal links use only the canonical form.
- Spot-check 2–3 pages by curling both `name.html` and `name` directly — if both return 200, the host has this behavior and needs the robots.txt block.

See `lighthouse-technical-seo-fixer` and `static-local-seo-launch-system` for the launch-time check, and `AlphaGutterCo` (`clients/alphagutterco/client-operating-manual.md`, 2026-06-26 entry) for a worked example of diagnosing and fixing this after the fact.
