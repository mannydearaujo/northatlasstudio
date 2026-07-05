# Client Task List - [Client Name]

Current phase: Lead intake
Next phase: Website audit

## Phase 1 - Lead Intake

- [ ] Status: Not started - Create local client workspace.
- [ ] Status: Not started - Add or update CRM record.
- [ ] Status: Not started - Capture business name, website, GBP/Maps link, contact info, niche, city/service area, source, and fit reason.
- [ ] Status: Not started - Note owner/client asks and missing files.

Relevant workflow: `north-atlas-project-sync`

## Phase 2 - Prospect Qualification

- [ ] Status: Not started - If lead came from Apify/Maps/scraping, normalize and score the prospect.
- [ ] Status: Not started - Note one plain-English reason to contact or continue.
- [ ] Status: Not started - Check suppression/opt-out status before outreach.

Relevant workflow: `apify-local-lead-prospecting`

## Phase 3 - Website Audit

- [ ] Status: Not started - Fetch homepage, service page, location/service-area page, FAQ/contact pages, sitemap, robots, and raw HTML.
- [ ] Status: Not started - Run PageSpeed Insights for mobile and desktop, then save `audit/pagespeed.json`.
- [ ] Status: Not started - Score AI/search readiness.
- [ ] Status: Not started - Recommend GA4 real-lead and secondary events.
- [ ] Status: Not started - Save audit deliverable in `reports/`.

Relevant workflows: `ai-search-readiness-audit`, `lighthouse-technical-seo-fixer`

## Phase 4 - GBP / Local Audit

- [ ] Status: Not started - Request GBP screenshots, Maps URL, or owner intake.
- [ ] Status: Not started - Review categories, services, reviews/replies, posts, photos, Q&A, hours, NAP, and site alignment.
- [ ] Status: Not started - Create 30-day GBP activity plan when relevant.

Relevant workflows: `google-business-profile-optimizer`, `gbp-posting-calendar`

## Phase 5 - Findings And Offer Match

- [ ] Status: Not started - Summarize top fixes and business impact.
- [ ] Status: Not started - Match to offer: rebuild, local pages, tracking setup, or retainer (audit itself stays free).
- [ ] Status: Not started - Draft next-step offer.

Relevant workflow: `offer-sheet-builder`

## Phase 6 - Client Onboarding

- [ ] Status: Not started - Create or update client operating manual.
- [ ] Status: Not started - Create client voice pack.
- [ ] Status: Not started - Confirm services, areas, proof, assets, access, and tracking conventions.
- [ ] Status: Not started - Confirm GA4, GTM, Search Console, website/CMS, and domain/DNS access.
- [ ] Status: Not started - If access is missing, document whether to recover ownership or create new GA4/GTM/Search Console setup.

Relevant workflows: `client-site-operating-manual`, `client-voice-pack-builder`, `lead-tracking-installer`

## Phase 7 - Build / Fix Delivery

- [ ] Status: Not started - Create branch or worktree in the client site repo.
- [ ] Status: Not started - Build/fix homepage, service pages, location pages, FAQ, trust/proof, CTAs, schema, and tracking hooks as needed.
- [ ] Status: Not started - Avoid doorway pages and verify local details.

Relevant workflows: `local-service-site-builder`, `city-service-cluster-builder`, `schema-and-faq-sync-auditor`, `lighthouse-technical-seo-fixer`

## Phase 8 - Launch And QA

- [ ] Status: Not started - Verify domain, SSL, canonical, sitemap, robots, schema, forms, phone/email/SMS links, GA4/GTM, Search Console readiness, mobile layout, and GBP URL alignment.
- [ ] Status: Not started - Confirm no staging/auth wall is blocking the live site.
- [ ] Status: Not started - Save launch notes.

Relevant workflow: `static-local-seo-launch-system`

## Phase 9 - Reporting And Retainer

- [ ] Status: Not started - Generate weekly report.
- [ ] Status: Not started - Plan GBP posts, review asks/replies, localized content, conversion fixes, and proof collection.
- [ ] Status: Not started - Ask for testimonial/referral when proof exists.

Relevant workflows: `weekly-client-report-generator`, `gbp-posting-calendar`, `compliant-review-engine`, `localized-blog-opportunity-finder`, `case-study-and-proof-builder`

## Next 3 Actions

1. Create CRM record and fill `intake.md`.
2. Run website audit and GBP/local review.
3. Match findings to the next best offer.
