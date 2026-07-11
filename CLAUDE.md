# North Atlas Studio - Agent Operating Guide

Last reviewed: 2026-07-11

This file is the shared project memory for AI assistants working on North Atlas Studio. `AGENTS.md` is generated from this file; after editing this file, run `node scripts/sync-agent-docs.mjs`.

## Agentic OS Startup Rule

Every new North Atlas Studio Codex session must start from Manny's Agentic OS, not from repo memory alone.

Before doing build, audit, documentation, strategy, or content work:

1. Read the current Codex project-build prompt:
   `/Users/mannydearaujo/Agentic OS Build/codex/codex-project-build-prompt.md`
2. Read the engine config:
   `/Users/mannydearaujo/Agentic OS Build/config/os.config`
3. Use `VAULT_PATH` from that config to locate the Manny AI OS vault. Do not guess or hardcode the vault path beyond reading the config.
4. Read the North Atlas vault files:
   - `01-projects/north-atlas-studio/CURRENT-STATE.md`
   - `01-projects/north-atlas-studio/TASKS.md`
   - `01-projects/north-atlas-studio/HANDOFF.md`
5. Read this repo's local `AGENTS.md`.
6. If `graphify-out/graph.json` exists, use `graphify query/path/explain` before broad file reading.

After orienting, restate the current task and plan in 3-6 bullets. Wait for Manny's go-ahead before non-trivial changes.

For current North Atlas task selection, work from the next pending item in the vault. Codex should handle deterministic, repo-scoped code or structured documentation tasks. If the task requires strategy, copywriting, positioning, offer judgment, pricing judgment, or client-facing prose, stop and ask Manny whether Claude should handle it instead.

Do not deploy, change DNS, or publish without Manny's explicit approval. Do not push site/content changes directly to `main`; this repo deploys through GitHub Pages from `main`. Use a feature branch for anything that changes public site content, behavior, design, SEO, schema, or public-facing copy. Tooling/config-only changes may stay on `main` when Manny approves.

After meaningful work, sync back to the vault:

- update `CURRENT-STATE.md` with what changed;
- update `TASKS.md` with done/next status;
- update `HANDOFF.md` so Claude/Codex can continue;
- run `graphify update .` after code changes.

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

## Clarifying Questions Rule

Ask Manny a clarifying question before proceeding whenever any of the following is true, rather than
guessing and producing work that has to be redone:

- A required business fact is missing or unverified: business name, URL, services, target audience,
  geographic focus, pricing, CMS/platform, or which tool/integration is actually in use.
- A request could reasonably map to more than one file, skill, or client workspace (for example, which
  client under `clients/`, which skill in `agency-skills/`, or whether a change is North Atlas's own
  site vs. a client's).
- The task would touch a gitignored strategy file (`BUSINESS-BLUEPRINT.md`, `90-day-rollout-plan.md`,
  etc.) in a way that changes positioning, pricing, or claims — confirm before committing to wording.
- A local/verifiable detail (route, distance, landmark, claim, metric) cannot be confirmed from
  provided material — ask rather than inventing it, per the no-fake-data guardrails already in this
  file and in `agency-skills/seo-content-writer` and `city-service-cluster-builder`.
- The action is hard to reverse or affects shared/production state (deploy, push, delete, overwrite a
  client workspace) and intent isn't fully explicit.

Do not ask when the request is unambiguous, the answer is already established in this file, a skill's
`SKILL.md`/`references/`, or prior context in the same session, or when a reasonable default clearly
matches how this agency already operates. Default to moving forward on small, reversible, in-scope
work; reserve questions for points that would otherwise force a guess that's expensive to undo.

## Project Snapshot

North Atlas Studio is a practical website, local SEO, AI-assisted discovery readiness, and lead tracking agency for local service businesses.

Core promise: websites that turn local searches into leads.

Positioning to preserve:

> North Atlas Studio builds and improves websites for local service businesses, structures them for Google, local SEO, and AI-assisted discovery, then tracks real lead actions in GA4 so owners can see what is actually generating calls, quotes, and bookings.

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

- `index.html` - production homepage. The site is multi-page: `about/`, `services/` (three service sub-pages), `faq/`, `contact/`, `who-we-help/`, `website-optimization-process/`, `free-site-audit/`, `service-area/eastern-massachusetts/`, plus a full Brazilian Portuguese tree under `pt/` with localized slugs, reciprocal hreflang, and matching schema.
- `robots.txt` and `sitemap.xml` - crawl and sitemap metadata (sitemap lists all 24 indexable EN + PT pages).
- `og-image.png` - social preview image.
- `assets/brand/` - approved SVG, PNG, and mockup brand assets.
- `client-templates/` - tracked reusable private-client workspace templates.
- `styles/atlas-brand.css` - reusable brand tokens and classes.
- `docs/brand/` - brand export notes and brand guide.
- `scripts/production-sync.mjs` - keeps the blueprint aligned with production-facing files and validates guardrails.
- `scripts/sync-agent-docs.mjs` - regenerates `AGENTS.md` from `CLAUDE.md`.
- Internal strategy docs remain local/gitignored even though future sessions should read them when present.
- `clients/` is the local/private workspace root for real client intake, notes, reports, and assets.

There is no build step for the static site. Open `index.html` directly for local review. Pushes to `main` auto-deploy through GitHub Pages (custom domain via root `CNAME`).

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

- Brand: North Atlas Studio (renamed from the prior brand on 2026-07-05; old brand names are stale patterns the production sync flags).
- Live/canonical URL: `https://www.northatlasstudio.com/` (registered on Namecheap 2026-07-05; GitHub Pages serves the site).
- Vercel duplicate status: `https://northatlasstudio.vercel.app/` was rechecked on 2026-07-07 and returns Vercel `DEPLOYMENT_NOT_FOUND`. Treat GitHub Pages from `main` as the only production deployment. Periodically recheck the Vercel URL after major launch changes; if it ever serves a copy again, recover/delete the old Vercel project before requesting indexing.
- Repository: `github.com/mannydearaujo/northatlasstudio` (public; also the schema `sameAs` entity link).
- Deployment: GitHub Pages from the `main` branch repository root. The repo root includes `CNAME` set to `www.northatlasstudio.com` and `.nojekyll` to keep GitHub Pages from running Jekyll processing.
- GA4 property installed: measurement ID `G-N7Q7ZZ4E64`; `generate_lead` fires on audit-form success.
- Google Search Console: the HTTPS URL-prefix property `https://www.northatlasstudio.com/` is verified as of 2026-07-07. Chrome/Search Console showed successful verification by HTML file, HTML tag, and Google Analytics; the old `http://www.northatlasstudio.com/` property was removed from the account. Root verification files `google43697d4e4131ee21.html` and `google18038ce1f52d5cfa.html` remain tracked, and the HTML meta verification token `thEPkSWpGlUy5tHTng0ZGTCb6wVoXkBwHeN4rC2u6iQ` belongs on the canonical homepage only.
- Contact form posts to Formspree endpoint `https://formspree.io/f/xbdvwyka` with inline success/error states; footer keeps a `mailto:` fallback link.
- Future upgrade: branded email such as `hello@northatlasstudio.com`.
- Header includes an English/Portuguese language switcher for English-speaking and Brazilian Portuguese-speaking local business owners. This is a usability/sales layer, not a full Portuguese SEO route yet.

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

Use the approved North Atlas Studio brand system:

- Brand source of truth: `North_Atlas_Studio_Brand_Pack/` boards (identity system, logo usage, applications). Brand words: Strategic · Data-Driven · Local-First · Future-Ready.
- Feel: premium, modern, strategic digital studio — clear, measured, direct, practical.
- Public landing page visual direction: match the Digital & Social Applications board — dark Atlas Navy hero, white feature strip, compact uppercase nav, bright Atlas Blue CTA, atlas/map/pin growth graphic, and clean white content sections. Do not bring back the older grid-line website background on the public page.
- Logo: compass ring + globe grid + location pin with Atlas Blue north arrow. Vector recreations live in `assets/brand/atlas/` (`atlas-mark-white.svg` for dark backgrounds, `atlas-mark-navy.svg` for light, `favicon.svg`/`favicon-512.png` navy app-icon tile). Old pre-rename assets in `assets/brand/svg|png` are retired and removed — do not reference them.
- Logo usage per the pack: keep clear space (height of the "N"), don't stretch, recolor, rotate, add effects, or place on busy backgrounds.
- This rule applies everywhere the North Atlas Studio mark appears: `index.html` (nav + footer), favicon/apple-touch-icon, `og-image.png`, and any skill-generated deliverable (audit reports, case studies, offer sheets, weekly reports). Never a placeholder square-tile-with-letter badge.
- Main colors: Atlas Navy `#0B1D3A`, Atlas Blue `#2563EB`, Slate `#475569`, Stone `#E2E8F0`, White `#FFFFFF`. Site derives darker navy card tones from Atlas Navy (see `styles/atlas-brand.css` tokens). Text on Atlas Blue buttons is always white (navy-on-blue fails contrast).
- Typography: Sora SemiBold for headings, Inter for body.
- IMPORTANT: the brand pack application boards contain TEMPLATE placeholders ("Alex Mercer", "123 Atlas Way, Providence, RI", "401 555" numbers, `northatlasstudio.com` emails). Never copy those into real deliverables — the founder is Manny de Araujo and the service area is Eastern Massachusetts. The production sync flags these placeholder strings.
- Avoid making the visual direction look like crypto, gaming, or abstract AI hype.

## Report And Audit Format

Future North Atlas audits and reports should use the approved KPI dashboard styling from
the branding package by default: charcoal/navy dashboard background, Atlas compass mark, glowing dashboard
cards, compact KPI scores, and owner-friendly panels for strengths, weaknesses, corrections needed,
real leads, and next actions.

### Internal vs client-facing deliverable rule

Every audited site produces two distinct documents — do not collapse them into one:

- **Audit dashboard (`ai-search-audit-*.html`)** — internal, for Manny only. Goes in full detail:
  every finding, evidence, severity, and a **suggested pricing/scope section** so Manny can decide
  what to charge. This file is never sent to the prospect or client as-is.
- **Fix/offer pack (offer sheet, fix-pack offer, proposal)** — client-facing only. Built with
  `offer-sheet-builder` from the audit's findings, but presents only the chosen offer, price, and
  scope. It must not surface internal pricing exploration, margin notes, or audit minutiae the
  client doesn't need to see.

When in doubt about whether something belongs in a deliverable: if it helps Manny price/scope the
work, it goes in the audit dashboard. If it's part of the pitch the client actually sees, it goes in
the offer pack.

### Portuguese client delivery rule

If a prospect/client language is Brazilian Portuguese, or the lead came through the `/pt/` website
route, client-facing materials default to natural pt-BR: onboarding, access requests, concise audit
follow-ups, offer sheets, weekly reports, and owner communication. Keep English templates intact and
add Portuguese versions alongside them. Internal audit dashboards, raw findings, and pricing/scope
notes may remain in English unless Manny asks otherwise. Use a formal owner-friendly tone built around
"sua empresa" and name North Atlas Studio as the provider/sender in Portuguese-facing documents.

Default delivery format is **HTML** because it preserves the interactive/dashboard feel, works well in
the browser, can be hosted or shared as a file, and can still be printed or exported to PDF when needed.
Use PDF as a secondary/export format for attachments, print, contracts, or clients who explicitly ask
for a static file. Do not make PDF the source of truth for reports unless requested.

For audits, use `agency-skills/ai-search-readiness-audit/assets/report-template.html`.
For weekly reports, use `agency-skills/weekly-client-report-generator/assets/report-template.html`.

Use `styles/atlas-brand.css` as the shared visual source of truth for public pages and reusable
deliverables. Landing pages, report templates, audit templates, and future client-facing assets should
share the same tokens: charcoal grid background, translucent dashboard shells, gradient KPI cards,
cyan meters/glows, 14px card radius, 22px dashboard radius, Inter Tight headings, and Inter body text.
Self-contained HTML reports may inline these styles for portability, but their values should stay
aligned with `styles/atlas-brand.css`.

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

North Atlas Studio reports real business-intent actions. Reporting should not inflate results.

Assume Manny may not know Google Tag Manager yet. Explain GTM plainly when tracking work comes up: GTM is a tag control panel installed on a website so North Atlas can manage GA4 events, click/form tracking, pixels, and testing without editing website code for every change. GTM installs and tests tracking; GA4 reports the data.

Best access workflow for new clients:

1. Ask for GA4, GTM, Search Console, website/CMS, and domain/DNS access with the minimum permissions needed.
2. If access is missing, recover or verify ownership where possible. Use Search Console DNS, HTML file, HTML tag, existing GA tag, or existing GTM verification depending on what access exists.
3. If old GA4/GTM access cannot be recovered, create a new GA4 property and/or GTM container and record the install date.
4. Do not claim historical GA4/Search Console performance when access or data is unavailable.
5. Use Microsoft Clarity, CallRail/WhatConverts, Formspree/HubSpot forms, Looker Studio, and external SEO tools as add-ons or temporary visibility, not as replacements for honest lead tracking.

No website/CMS access fallback: if the client cannot get into the existing site's CMS or host (old developer/agency unresponsive, lost login), check whether they at least control the domain registrar/DNS first. If yes, treat it as a rebuild: build the new/edited site on a new host, recover the old copy from a live crawl or the Wayback Machine to avoid losing existing SEO content, then cut over by repointing DNS/nameservers when ready — no CMS login required. If they do not control the domain either, access recovery (registrar support with proof of business ownership, WHOIS lookup for the actual registrant, or contacting the old developer/agency directly) has to happen before any edit or rebuild can go live. Default to the rebuild path rather than waiting indefinitely on CMS access recovery, consistent with the Audit → Rebuild → Track → Report process.

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

## PageSpeed And Lighthouse Workflow

Whenever Manny asks for PageSpeed, Lighthouse, Core Web Vitals, performance scores, or technical SEO speed checks for any client/prospect, use the shared PageSpeed Insights runner in this folder. Do not ask him to set it up again unless `.env` is missing `PAGESPEED_API_KEY`.

For a client/prospect with a workspace, save mobile and desktop results here:

```bash
npm run pagespeed -- https://example.com --strategy=both --out=clients/client-slug/audit/pagespeed.json
```

For a quick one-off check without a client workspace, run:

```bash
npm run pagespeed -- https://example.com --strategy=both
```

Store the API key only in `.env` or `.env.local` as `PAGESPEED_API_KEY`; never hardcode, print, or commit it. Keep `.env.example` as the tracked placeholder. If a PageSpeed request is part of an audit, launch QA, rebuild, or retainer check, save the JSON under the private `clients/` workspace and use `lighthouse-technical-seo-fixer` to prioritize fixes by lead impact, crawl impact, UX/accessibility impact, and polish. PageSpeed Insights runs Lighthouse through Google's API, so it can supply Performance, Accessibility, Best Practices, SEO, field data availability, and detailed audit findings from one endpoint. Use `npm run check:pagespeed-tool` after editing the runner.

`lighthouse` is also installed as a local devDependency (no global/sudo install needed), shared by both Claude and Codex since both run shell commands inside this repo. Use it directly when a local/offline Lighthouse run is needed without the PageSpeed API (e.g. no API key, or auditing a non-public/staging URL):

```bash
npm run lighthouse -- https://example.com --output=json --output-path=clients/client-slug/audit/lighthouse.json --chrome-flags="--headless"
```

Prefer the `pagespeed` npm script (Google's API) as the default workflow described above; use the local `lighthouse` CLI as a fallback or for ad hoc checks.

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
- Preserve the current static multi-page structure (no build step, no framework) unless the user explicitly asks for a larger restructure.
- After production copy or metadata edits, run the production sync check.

## Agency Skill Library

North Atlas Studio now maintains a shared, platform-neutral skill library at `agency-skills/`. This is the source of truth for reusable agency workflows, including AI Search Readiness Audit, Apify local lead prospecting, Google Business Profile optimization, lead tracking, schema/FAQ sync, city-service page planning, website build checklists, reporting, review workflows, launch QA, and proof packaging.

Install/sync targets:

- Codex: `~/.codex/skills/`
- Claude: `~/.claude/skills/`

Keep the shared `agency-skills/` source authoritative, then mirror skills into Codex and Claude when they change. The existing `ai-search-readiness-audit` skill was ported into the shared library and Codex; do not rebuild it from scratch.

Future agency sessions should apply the relevant North Atlas skill automatically:

- New prospect, audit form, or client start: use `north-atlas-project-sync` and create a practical phase-by-phase task list.
- Scraped/Apify/Maps lead lists: use `apify-local-lead-prospecting`.
- Existing website audit or Free Site Audit deliverable: use `ai-search-readiness-audit`.
- GBP screenshots, profile data, reviews, posts, categories, or service areas: use `google-business-profile-optimizer`.
- New client site/rebuild: use `website-build-checklist`, `client-site-operating-manual`, `client-voice-pack-builder`, `local-service-site-builder`, and `lead-tracking-installer`.
- Location/service page clusters: use `city-service-cluster-builder` and verify local detail before publishing.
- Writing, rewriting, or optimizing an SEO page or blog post (not just planning or auditing one): use `seo-content-writer` — it hands off to `city-service-cluster-builder`/`localized-blog-opportunity-finder` for planning first and to `schema-and-faq-sync-auditor` afterward. Use `alpha-seo-content` instead when the client is Alpha Seamless Gutter specifically.
- Launch QA: use `static-local-seo-launch-system`, `schema-and-faq-sync-auditor`, and `lighthouse-technical-seo-fixer`.
- Retainers: use `weekly-client-report-generator`, `gbp-posting-calendar`, `compliant-review-engine`, and `localized-blog-opportunity-finder`.
- Proof, case studies, and proposals: use `case-study-and-proof-builder` and `offer-sheet-builder`.
- Any client-facing copy before it ships (pages, blogs, GBP posts, outreach, offer sheets, case studies): run `human-copy-editor` as the standard pre-publish pass after `seo-content-writer` or any content generation.
- Design review/QA of any client site's look, layout, mobile patterns, or accessibility: use `website-design-standards` before a build ships.
- Traffic-but-no-leads, CTA/form friction, or conversion optimization work: use `cro-offer-optimizer`.
- Complete JSON-LD design beyond basic LocalBusiness/FAQPage (Service, Offer, Organization, reviews, entity linking): use `advanced-schema-architect`; keep `schema-and-faq-sync-auditor` for auditing what already exists.

Outreach and scraping guardrail: Apify, Google Maps, and GBP-style scraped data may be used for prospect research and personalized outreach drafting, but do not send bulk outreach without human approval, opt-out handling, and compliance review. Email outreach must follow CAN-SPAM basics; SMS/call automation is out of scope unless a compliant consent workflow is explicitly added.

Skill validation rule: when editing or validating agency skills, run the official `quick_validate.py` validator. If it fails with `ModuleNotFoundError: No module named 'yaml'`, install PyYAML into a temporary local validation folder and run the validator with `PYTHONPATH=/private/tmp/north-atlas-skill-validator-python`. This temporary folder is only a validator helper, not part of the skill library or client delivery system.

New client task-list rule: whenever Manny brings in a new prospect/client, submits an audit form, starts a Free Site Audit, or begins any North Atlas service delivery, create a phase-by-phase task list for him to follow. The task list should keep him on track from intake through audit, findings, proposal, onboarding, build/fixes, tracking, launch, reporting, and retainer follow-up. Include owner asks, files/assets needed, decisions pending, due-next actions, and what skill/workflow to use at each phase. Keep the list practical, non-technical when possible, and update it as phases are completed.
