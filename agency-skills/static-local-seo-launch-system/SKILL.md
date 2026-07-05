---
name: static-local-seo-launch-system
description: Run final launch QA for North Atlas Studio static or SSG local business websites. Use before publishing or after domain changes to check canonical URLs, sitemap, robots, schema, metadata, favicons, social previews, forms, CTAs, tracking, mobile layout, Search Console readiness, GBP website alignment, and deployment visibility. Trigger on "launch QA", "ready to publish?", "pre-launch check", or after any new page cluster ships.
metadata:
  updated: "2026-07-04"
---

# Static Local SEO Launch System

The launch gate: nothing client-facing publishes until this passes. Catches the failures that silently kill results — noindexed pages, broken forms, untracked CTAs, GBP pointing at the wrong URL.

## Workflow

1. **Confirm scope:** full-site launch, new page cluster, or domain change. Get the production URL(s) and access to the deployed (or staging) environment — QA runs against what users will actually receive, not local files, whenever possible.
2. **Crawl/index pass:** domain + HTTPS + www/apex redirect, `robots.txt` allows the site and references the sitemap, `sitemap.xml` complete with fresh `<lastmod>`, canonical on every page pointing at the real production URL (staging canonicals are the classic launch killer), no stray `noindex`, no auth wall, 404 page works.
3. **Page-level pass (every new/changed page):** unique title + meta description, one H1, OG/Twitter tags render (test a share preview), favicon set, images have alt text and load, no lorem/placeholder text, no broken internal links.
4. **Schema pass:** run `schema-and-faq-sync-auditor` (script: `check-schema-faq-sync.js`) — JSON-LD parses, visible FAQ matches FAQPage schema, LocalBusiness NAP matches GBP exactly.
5. **Conversion pass — actually operate the site:** submit the real form (then delete the test lead and tell the owner one is coming), tap every tel:/sms:/mailto: link, click the booking CTA through to its destination, verify the confirmation states.
6. **Tracking pass:** GA4 fires on the production domain (Realtime check), lead events fire with the names defined by `lead-tracking-installer`, GTM container published not just previewed, no duplicate GA4 tags.
7. **Mobile pass:** 375px width — sticky CTA bar works, no horizontal scroll, tap targets usable, forms usable with the right keyboards.
8. **Ecosystem pass:** Search Console property verified, sitemap submitted, indexing requested per the sitemap rule in `references/static-launch-checklist.md`; GBP website field + appointment links point at the new URLs; old URLs 301 if this was a rebuild.
9. **Report:** pass/fail per section with the specific failing URLs and fixes. Blockers (index/forms/tracking/wrong canonicals) stop launch; polish items get a punch list.

## Output

`launch-qa-[client-slug]-[YYYY-MM-DD].md` — checklist results, blockers vs punch list, submission log (what was requested in Search Console and when). Save to `clients/[client-slug]/qa/`.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume — submitting a sitemap tells Google a page is ready; it guarantees nothing, and the report must say so. Never mark an item passed that wasn't actually exercised (a form is tested by submitting it, not by looking at it). Test leads get cleaned up and announced.

## After this skill

- Failures route to the owning skill: schema → `schema-and-faq-sync-auditor`, performance → `lighthouse-technical-seo-fixer`, design → `website-design-standards`, tracking → `lead-tracking-installer`.
- Record launch date + submission log in the client operating manual (`client-site-operating-manual`).
