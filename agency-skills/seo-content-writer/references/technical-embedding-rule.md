# Technical Embedding Rule

- GA4 tracking code should be present on every public, indexable page that needs to be measured.
- Google Search Console HTML verification meta tags belong on the canonical homepage only, unless the
  client is intentionally using a different verification method (DNS, HTML file, existing GA/GTM tag).
- Before marking a new or rewritten page done, confirm it carries the required analytics snippet and
  that homepage verification tags were not accidentally removed during the edit.
- Whenever a page is newly created or substantially rewritten, also apply the sitemap-and-indexing
  rule in `static-local-seo-launch-system`'s `references/static-launch-checklist.md` — add/update the
  `sitemap.xml` entry and request indexing for the URL in Search Console.
