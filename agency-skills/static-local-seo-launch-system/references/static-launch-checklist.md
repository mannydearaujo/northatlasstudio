# Static Launch Checklist

Check domain, canonical, sitemap, robots, title/meta, OG/Twitter, favicon, schema, forms, phone/email/SMS links, GA4/GTM, Search Console, mobile layout, 404 behavior, SSL, and GBP URL alignment.

## Duplicate URL And Clean URL Rule

Before launch, on any rebuild, or after a host/CMS migration, confirm the live host serves only the canonical URL form for each page.

1. Pick 2-3 representative pages and request both the canonical clean URL and likely alternate forms such as `.html`, trailing-slash, and non-trailing-slash versions.
2. Confirm non-canonical forms either redirect to the canonical URL or are consistently blocked/handled by the host. Do not leave duplicate 200 responses for the same page.
3. Confirm canonical tags, `sitemap.xml`, and internal links all use the same canonical form.
4. If the host cannot redirect the non-canonical form, block the non-canonical pattern in `robots.txt` only after confirming it will not block the canonical URL.
5. In Google Search Console, check for duplicate canonical warnings after launch, especially "Alternate page with proper canonical tag" or "Duplicate, Google chose different canonical than user."

For Vercel static sites with `cleanUrls: true`, use extensionless URLs in canonicals, internal links, and `sitemap.xml`.

## Sitemap And Indexing Rule

Whenever a page is created or substantially revamped — new service/location page, homepage rebuild, or major content/structure change — do all of the following before calling the page launch-ready:

1. Add or update the page's `<url>` entry in `sitemap.xml`, with a fresh `<lastmod>` matching the actual change date.
2. Confirm the page is allowed in `robots.txt` (not blocked) and that the sitemap itself is referenced in `robots.txt`.
3. In Google Search Console, use the URL Inspection tool to request indexing/crawling for the new or changed URL so Google recrawls it promptly instead of waiting for the next scheduled crawl.
4. If multiple pages launched at once (a page cluster), resubmit the sitemap in Search Console (Sitemaps report) in addition to requesting indexing for the highest-priority URLs individually — Search Console rate-limits manual indexing requests, so don't rely on it alone for large batches.
5. Record the submission/request date in the client workspace so a later audit can tell what was crawled and when.

Do not claim or imply guaranteed indexing or ranking from this step — submitting a sitemap or requesting indexing tells Google a page is ready to be crawled; it does not guarantee inclusion, ranking, or AI Overview/AI Mode citation.
