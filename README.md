# North Atlas Studio

Conversion-focused landing page for North Atlas Studio, a practical website,
local SEO, AI-assisted discovery readiness, and lead tracking agency for local
service businesses.

The homepage positions North Atlas Studio around websites that turn local
searches into calls, quote requests, and bookings, measured with GA4 lead
tracking.

Static single-file site (`index.html`). Deployed with GitHub Pages.
The landing page follows the brand pack's Digital & Social Applications layout:
dark Atlas Navy hero, white feature strip, Atlas Blue CTA, and clean white
sections without the older grid-line background.

## Develop
Just open `index.html` in a browser — no build step.

## PageSpeed Insights

PageSpeed is available as a reusable agency command for any client or prospect.
For the first setup only, store the Google key in a local env file:

```bash
cp .env.example .env
```

Then set `PAGESPEED_API_KEY` inside `.env`. The real `.env` file is ignored by
git.

Run a quick mobile and desktop check:

```bash
npm run pagespeed -- https://goldenpawspetgrooming.com --strategy=both
```

Run mobile and desktop, then save compact JSON for a client audit:

```bash
npm run pagespeed -- https://goldenpawspetgrooming.com --strategy=both --out=clients/client-slug/audit/pagespeed.json
```

Use the `lighthouse-technical-seo-fixer` skill to turn the output into a
prioritized fix list. The PageSpeed Insights API runs Lighthouse under the hood,
so the same scores and audit checks are available through one endpoint.

Standard rule for future work: when PageSpeed, Lighthouse, Core Web Vitals,
performance scores, or technical SEO speed checks are requested for a
client/prospect, use this command. If the client has a workspace, save the JSON
to `clients/client-slug/audit/pagespeed.json`; otherwise print the summary.

Useful commands:

```bash
npm run pagespeed:goldenpaws
npm run check:pagespeed-tool
npm run check:production
```

## Production Sync
Run the production sync after changing homepage copy, metadata, schema, robots,
sitemap, offers, or proof:

```bash
npm run sync:production
```

To verify the business blueprint is still current without editing it:

```bash
npm run check:production
```

This keeps `BUSINESS-BLUEPRINT.md` aligned with the production-facing site and
flags old naming, placeholder proof metrics, missing positioning language,
`AGENTS.md` / `CLAUDE.md` drift, and agency skill mirror drift.

## Agency Skills

Reusable North Atlas workflows live in `agency-skills/`. Keep that folder as the
source of truth, then mirror changed skills into both `~/.codex/skills/` and
`~/.claude/skills/`. Future agency work should use the relevant skill for
prospecting, audits, GBP optimization, client builds, tracking, reporting,
launch QA, proof, and retainers.

Client-facing audits and weekly reports should default to the North Atlas KPI
dashboard HTML style: compact score cards, strengths, weaknesses, corrections
needed, real-lead metrics, and plain-English next steps. Export to PDF only when
a client needs a static attachment or print-ready file.

Use `styles/atlas-brand.css` as the shared style source for the landing page
and report/audit templates. Self-contained reports can inline the same tokens,
but the visual system should stay uniform project-wide.

## Tracking Rule

Track reusable operating infrastructure:

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

## New Client Workflow

For each new prospect/client, copy `client-templates/new-client/` into
`clients/client-slug/`, then fill `intake.md`, `task-list.md`,
`client-operating-manual.md`, and `crm.md`. The demo workspace at
`clients/demo-brighton-roofing/` shows the full local folder structure.

For tracking, ask for GA4, GTM, Search Console, website/CMS, and domain/DNS
access during onboarding. If old analytics/search access cannot be recovered,
create a clean new setup, record the install date, and report only from that
point forward.

## Deploy
Pushes to `main` publish through GitHub Pages from the repository root.
The custom domain is set by the root `CNAME` file:

```text
www.northatlasstudio.com
```

Namecheap DNS should point the apex domain to GitHub Pages `A` records and
`www` to Manny's GitHub Pages default domain, `mannydearaujo.github.io`.
