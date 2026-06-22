<!--
Generated from CLAUDE.md by scripts/sync-agent-docs.mjs.
Edit CLAUDE.md, then run: node scripts/sync-agent-docs.mjs
-->

# NorthPoint Digital - Agent Operating Guide

Last reviewed: 2026-06-22

This file is the shared project memory for AI assistants working on NorthPoint Digital. `AGENTS.md` is generated from this file; after editing this file, run `node scripts/sync-agent-docs.mjs`.

## Sync Rule

- Treat `CLAUDE.md` as the source file for agent instructions.
- Keep `AGENTS.md` synchronized by running `node scripts/sync-agent-docs.mjs`.
- `node scripts/production-sync.mjs` also checks this sync, and updates `AGENTS.md` when run without `--check`.
- Update this file whenever project structure, positioning, delivery process, measurement rules, or active priorities change.
- Do not duplicate detailed strategy here when it already lives in `BUSINESS-BLUEPRINT.md`; link to the source of truth instead.

## Tracking Rule

Track reusable operating infrastructure so future sessions inherit the agency rules:

- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `agency-skills/`
- `client-templates/`
- `scripts/production-sync.mjs`
- `scripts/sync-agent-docs.mjs`

Keep internal strategy and deliverable artifacts local/gitignored:

- `clients/`
- `BUSINESS-BLUEPRINT.md`
- `90-day-rollout-plan.md`
- `NEXT-STEPS.md`
- `GA4-lead-logic.md`
- `weekly-report-template.md`
- `ai-search-reference.md`
- generated `ai-search-audit-*.html` reports
- design/sample/internal dashboard files

## Project Snapshot

NorthPoint Digital is a practical website, local SEO, AI-assisted discovery readiness, and lead tracking agency for local service businesses.

Core promise: websites that turn local searches into leads.

Positioning to preserve:

> NorthPoint Digital builds and improves websites for local service businesses, structures them for Google, local SEO, and AI-assisted discovery, then tracks real lead actions in GA4 so owners can see what is actually generating calls, quotes, and bookings.

The business is not a generic marketing shop, vague AI agency, ranking-guarantee SEO service, vanity-metric reporting service, or design-only studio. Never promise a #1 ranking, guaranteed Google placement, local pack placement, AI Overview inclusion, AI Mode citation, or guaranteed AI answer placement.

## Source Of Truth Order

Read these before making strategy, copy, SEO, offer, or reporting changes:

1. `BUSINESS-BLUEPRINT.md` - primary source of truth for positioning, offers, proof, operating model, and production snapshot.
2. `README.md` - project summary, local development, deployment, and production sync commands.
3. `90-day-rollout-plan.md` - current business rollout, offer stack, phase priorities, and income path.
4. `NEXT-STEPS.md` - current tooling status and next build priority.
5. `ai-search-reference.md` - AI search readiness claims, Google/web.dev source library, guardrails, and tool ideas.
6. `GA4-lead-logic.md` - what counts as a real lead, secondary intent, and diagnostics.
7. `weekly-report-template.md` - client reporting tone and structure.
8. `docs/brand/BRAND-GUIDE.md` - brand colors, logo rules, typography, and messaging themes.

When production-facing strategy changes, update `BUSINESS-BLUEPRINT.md` in the same change set and run `node scripts/production-sync.mjs`.

## Repo Shape

- `index.html` - single-file production landing page.
- `robots.txt` and `sitemap.xml` - crawl and sitemap metadata.
- `og-image.png` - social preview image.
- `assets/brand/` - approved SVG, PNG, and mockup brand assets.
- `client-templates/` - tracked reusable private-client workspace templates.
- `styles/northpoint-brand.css` - reusable brand tokens and classes.
- `docs/brand/` - brand export notes and brand guide.
- `scripts/production-sync.mjs` - keeps the blueprint aligned with production-facing files and validates guardrails.
- `scripts/sync-agent-docs.mjs` - regenerates `AGENTS.md` from `CLAUDE.md`.
- Internal strategy docs remain local/gitignored even though future sessions should read them when present.
- `clients/` is the local/private workspace root for real client intake, notes, reports, and assets.

There is no build step for the static site. Open `index.html` directly for local review. Pushes to `main` auto-deploy through Vercel.

## Production Sync Workflow

Run after changing homepage copy, metadata, schema, robots, sitemap, offers, proof, or major positioning:

```bash
node scripts/production-sync.mjs
```

Run as a check without editing:

```bash
node scripts/production-sync.mjs --check
```

That script checks:

- `BUSINESS-BLUEPRINT.md` production snapshot.
- Stale copy such as old brand names, old positioning, placeholder proof metrics, or placeholder form endpoints.
- Required positioning phrases in `index.html`.
- `AGENTS.md` synchronization with `CLAUDE.md`.

## Current Site

- Brand: NorthPoint Digital.
- Live/canonical URL: `https://northpoint-digital.vercel.app/`.
- Repository: `github.com/mannydearaujo/northpoint_digital` (private).
- Deployment: Vercel project `northpoint_digital`, auto-deployed from `main`.
- Contact form currently uses a `mailto:` fallback to `mannydearaujo@gmail.com`.
- Future upgrade: branded email such as `hello@northpointdigital.com` and a real Formspree or CRM-backed form endpoint.

Current homepage structure:

1. Sticky header and CTA.
2. Hero: "Websites that turn local searches into leads."
3. Services: Conversion Website Builds, Local SEO & AI-Assisted Discovery, Lead Tracking & Reporting.
4. AI-assisted discovery education.
5. Search direction strategy: Google visibility, AI visibility, conversion visibility.
6. Proof: Golden Paws and AlphaGutterCo.
7. Why this works.
8. Process: Audit, Rebuild, Track, Report.
9. Case studies.
10. FAQ.
11. Contact / Free Site Audit form.
12. Footer.

## Brand Rules

Use the approved NorthPoint Digital brand system:

- Brand idea: Data. Discovery. Direction.
- Feel: serious local-growth technology partner, clear, measured, direct, premium but practical.
- Logo: filled cyan north-arrow / compass mark (`assets/brand/svg/northpoint-mark.svg`, documented in `docs/brand/BRAND-GUIDE.md`).
- Avoid hollow or cutout primary marks and avoid a cyan square tile behind the primary nav logo.
- This rule applies everywhere the NorthPoint Digital mark appears: `index.html` (nav + footer), favicon/apple-touch-icon, `og-image.png`, and any skill-generated deliverable (audit reports, case studies, offer sheets, weekly reports). Never a placeholder square-tile-with-letter badge.
- Main colors: Deep Navy `#0A0F1A`, Carbon Site BG `#0D1017`, Card `#141A25`, Steel Blue `#1D2736`, Neon Cyan `#00D2FF`, Site Cyan `#06B6D4`, Text `#F0F4FA`, Muted `#8A98A8`.
- Typography: Inter Tight for headings, Inter for body.
- Avoid making the visual direction look like crypto, gaming, or abstract AI hype.

## Report And Audit Format

Future NorthPoint client-facing audits and reports should use the approved KPI dashboard styling from
the branding package by default: charcoal grid background, cyan north-arrow mark, glowing dashboard
cards, compact KPI scores, and owner-friendly panels for strengths, weaknesses, corrections needed,
real leads, and next actions.

Default delivery format is **HTML** because it preserves the interactive/dashboard feel, works well in
the browser, can be hosted or shared as a file, and can still be printed or exported to PDF when needed.
Use PDF as a secondary/export format for attachments, print, contracts, or clients who explicitly ask
for a static file. Do not make PDF the source of truth for reports unless requested.

For audits, use `agency-skills/ai-search-readiness-audit/assets/report-template.html`.
For weekly reports, use `agency-skills/weekly-client-report-generator/assets/report-template.html`.

Use `styles/northpoint-brand.css` as the shared visual source of truth for public pages and reusable
deliverables. Landing pages, report templates, audit templates, and future client-facing assets should
share the same tokens: charcoal grid background, translucent dashboard shells, gradient KPI cards,
cyan meters/glows, 14px card radius, 22px dashboard radius, Inter Tight headings, and Inter body text.
Self-contained HTML reports may inline these styles for portability, but their values should stay
aligned with `styles/northpoint-brand.css`.

## Messaging Guardrails

Use plain, practical language. The offer is local growth infrastructure:

- clearer local service business websites;
- stronger local SEO foundations;
- AI-assisted discovery readiness;
- GA4 lead tracking;
- plain-English reporting.

Do not publish fake or unverified performance metrics. Acceptable proof today includes live builds, real client names already used on the site, confirmed GA4 event setup, confirmed event counts such as "5 lead actions tracked" when tied to real configured events, and structural improvements completed.

Needed stronger proof:

- GA4 screenshots for Golden Paws and AlphaGutterCo;
- before/after screenshots;
- testimonials from owners;
- real weekly report screenshots;
- real lead volume trends once enough time has passed.

## Measurement Rules

NorthPoint Digital reports real business-intent actions. Reporting should not inflate results.

Assume Manny may not know Google Tag Manager yet. Explain GTM plainly when tracking work comes up: GTM is a tag control panel installed on a website so NorthPoint can manage GA4 events, click/form tracking, pixels, and testing without editing website code for every change. GTM installs and tests tracking; GA4 reports the data.

Best access workflow for new clients:

1. Ask for GA4, GTM, Search Console, website/CMS, and domain/DNS access with the minimum permissions needed.
2. If access is missing, recover or verify ownership where possible. Use Search Console DNS, HTML file, HTML tag, existing GA tag, or existing GTM verification depending on what access exists.
3. If old GA4/GTM access cannot be recovered, create a new GA4 property and/or GTM container and record the install date.
4. Do not claim historical GA4/Search Console performance when access or data is unavailable.
5. Use Microsoft Clarity, CallRail/WhatConverts, Formspree/HubSpot forms, Looker Studio, and external SEO tools as add-ons or temporary visibility, not as replacements for honest lead tracking.

Real leads are the headline KPI and should be marked as GA4 Key Events:

- phone taps;
- completed quote forms;
- booking clicks or booking-start actions;
- completed contact forms.

Secondary intent helps explain the funnel but is not the headline result:

- form open without submission;
- booking widget interaction;
- SMS tap;
- email click;
- quote request click without submission.

Diagnostic events are for QA only:

- widget load;
- component visibility;
- page-load events.

## Client Website Standards

Every client page should serve one of four jobs:

- Understanding: explains the service, audience, location, process, or expected outcome.
- Trust: shows reviews, credentials, proof, case studies, photos, policies, or first-hand expertise.
- Action: drives a call, quote request, booking, appointment request, or form submission.
- Follow-up: answers practical questions that reduce friction before or after contact.

Use semantic HTML. Buttons should be buttons, links should be links, forms should be labeled, headings should be hierarchical, and important content should be visible and stable.

## Active Priorities

From `NEXT-STEPS.md`, the AI Search Readiness Audit skill and the broader agency skill library are built, tested, and mirrored into Codex and Claude. Do not rebuild them from scratch.

Suggested next moves:

1. Run `apify-local-lead-prospecting` on a real Apify or Google Maps export.
2. Send the highest-fit prospects through `ai-search-readiness-audit` and `google-business-profile-optimizer`.
3. Use `offer-sheet-builder` to package the next step before outreach or follow-up.
4. Send the Golden Paws, AlphaGutterCo, and third audit reports to a fresh eye or business owners as the first real Free Site Audit deliverables.

From the 90-day plan, Phase 1 priorities remain:

- write Golden Paws and AlphaGutterCo case studies with real GA4 screenshots;
- finalize a one-page offer sheet;
- create a client-facing education asset for Google visibility + AI visibility + conversion visibility;
- get testimonials;
- run weekly reports every Monday;
- lock niche target and geographic radius.

## Editing Guidance

- Keep copy direct, credible, and non-hypey.
- Tie recommendations back to calls, quote requests, bookings, appointments, or measurable owner outcomes.
- Use Google and web.dev sources as the basis for public AI/search education.
- Use Ahrefs AI Overview research only as directional market context with attribution, not as a universal claim.
- Keep public copy careful: "readiness", "structure", "visibility", "easier to understand", "easier to cite", never guaranteed placement.
- Preserve the single-page static site unless the user explicitly asks for a larger restructure.
- After production copy or metadata edits, run the production sync check.

## Agency Skill Library

NorthPoint Digital now maintains a shared, platform-neutral skill library at `agency-skills/`. This is the source of truth for reusable agency workflows, including AI Search Readiness Audit, Apify local lead prospecting, Google Business Profile optimization, lead tracking, schema/FAQ sync, city-service page planning, reporting, review workflows, launch QA, and proof packaging.

Install/sync targets:

- Codex: `~/.codex/skills/`
- Claude: `~/.claude/skills/`

Keep the shared `agency-skills/` source authoritative, then mirror skills into Codex and Claude when they change. The existing `ai-search-readiness-audit` skill was ported into the shared library and Codex; do not rebuild it from scratch.

Future agency sessions should apply the relevant NorthPoint skill automatically:

- New prospect, audit form, paid audit, or client start: use `northpoint-project-sync` and create a practical phase-by-phase task list.
- Scraped/Apify/Maps lead lists: use `apify-local-lead-prospecting`.
- Existing website audit or Free Site Audit deliverable: use `ai-search-readiness-audit`.
- GBP screenshots, profile data, reviews, posts, categories, or service areas: use `google-business-profile-optimizer`.
- New client site/rebuild: use `client-site-operating-manual`, `client-voice-pack-builder`, `local-service-site-builder`, and `lead-tracking-installer`.
- Location/service page clusters: use `city-service-cluster-builder` and verify local detail before publishing.
- Launch QA: use `static-local-seo-launch-system`, `schema-and-faq-sync-auditor`, and `lighthouse-technical-seo-fixer`.
- Retainers: use `weekly-client-report-generator`, `gbp-posting-calendar`, `compliant-review-engine`, and `localized-blog-opportunity-finder`.
- Proof, case studies, and proposals: use `case-study-and-proof-builder` and `offer-sheet-builder`.

Outreach and scraping guardrail: Apify, Google Maps, and GBP-style scraped data may be used for prospect research and personalized outreach drafting, but do not send bulk outreach without human approval, opt-out handling, and compliance review. Email outreach must follow CAN-SPAM basics; SMS/call automation is out of scope unless a compliant consent workflow is explicitly added.

Skill validation rule: when editing or validating agency skills, run the official `quick_validate.py` validator. If it fails with `ModuleNotFoundError: No module named 'yaml'`, install PyYAML into a temporary local validation folder and run the validator with `PYTHONPATH=/private/tmp/northpoint-skill-validator-python`. This temporary folder is only a validator helper, not part of the skill library or client delivery system.

New client task-list rule: whenever Manny brings in a new prospect/client, submits an audit form, starts a Free Site Audit, starts a paid AI Search Readiness Audit, or begins any NorthPoint service delivery, create a phase-by-phase task list for him to follow. The task list should keep him on track from intake through audit, findings, proposal, onboarding, build/fixes, tracking, launch, reporting, and retainer follow-up. Include owner asks, files/assets needed, decisions pending, due-next actions, and what skill/workflow to use at each phase. Keep the list practical, non-technical when possible, and update it as phases are completed.
