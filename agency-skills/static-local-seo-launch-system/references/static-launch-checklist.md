# Static Launch Checklist

Check domain, canonical, sitemap, robots, title/meta, OG/Twitter, favicon, schema, forms, phone/email/SMS links, GA4/GTM, Search Console, mobile layout, 404 behavior, SSL, and GBP URL alignment.

## Duplicate URL Check (run before every launch and after a host/CMS migration)

Some static hosts (confirmed on GitHub Pages) serve a `name.html` file at both `/name.html` and `/name` — identical content, both HTTP 200, no redirect between them. If the canonical tag, sitemap, and internal links don't all agree on one form, Google ends up indexing one URL and sitting on the other as "Discovered – currently not indexed," which silently caps how many pages can ever get indexed.

1. Pick 2–3 representative pages and `curl -sI` both the extensionless and `.html` form. If both return 200, the host has this behavior.
2. Confirm `canonical` tags, `sitemap.xml`, and internal links all use the same single form (the canonical one).
3. If the host can't redirect the non-canonical form (no `_redirects`/`vercel.json`-equivalent), add `Disallow: /*.html$` (or the inverse, matching whichever form is non-canonical) to `robots.txt` so it never gets crawled in the first place.
4. In Google Search Console → Pages report, check for "Alternate page with proper canonical tag" or "Duplicate, Google chose different canonical than user" — either is a sign this is already happening on a live site and needs the fix above plus URL removal requests for the wrong indexed form.

See `local-service-site-builder/references/site-architecture.md` for the build-time rule and `clients/alphagutterco/client-operating-manual.md` (2026-06-26) for a worked example.

## Sitemap And Indexing Rule

Whenever a page is created or substantially revamped — new service/location page, homepage rebuild, or major content/structure change — do all of the following before calling the page launch-ready:

1. Add or update the page's `<url>` entry in `sitemap.xml`, with a fresh `<lastmod>` matching the actual change date.
2. Confirm the page is allowed in `robots.txt` (not blocked) and that the sitemap itself is referenced in `robots.txt`.
3. In Google Search Console, use the URL Inspection tool to request indexing/crawling for the new or changed URL so Google recrawls it promptly instead of waiting for the next scheduled crawl.
4. If multiple pages launched at once (a page cluster), resubmit the sitemap in Search Console (Sitemaps report) in addition to requesting indexing for the highest-priority URLs individually — Search Console rate-limits manual indexing requests, so don't rely on it alone for large batches.
5. Record the submission/request date in the client workspace so a later audit can tell what was crawled and when.

Do not claim or imply guaranteed indexing or ranking from this step — submitting a sitemap or requesting indexing tells Google a page is ready to be crawled; it does not guarantee inclusion, ranking, or AI Overview/AI Mode citation.
