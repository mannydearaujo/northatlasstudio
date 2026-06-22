# NorthPoint Digital

Conversion-focused landing page for NorthPoint Digital, a practical website,
local SEO, AI-assisted discovery readiness, and lead tracking agency for local
service businesses.

The homepage positions NorthPoint Digital around websites that turn local
searches into calls, quote requests, and bookings, measured with GA4 lead
tracking.

Static single-file site (`index.html`). Deployed on Vercel.

## Develop
Just open `index.html` in a browser — no build step.

## Production Sync
Run the production sync after changing homepage copy, metadata, schema, robots,
sitemap, offers, or proof:

```bash
node scripts/production-sync.mjs
```

To verify the business blueprint is still current without editing it:

```bash
node scripts/production-sync.mjs --check
```

This keeps `BUSINESS-BLUEPRINT.md` aligned with the production-facing site and
flags old naming, placeholder proof metrics, missing positioning language,
`AGENTS.md` / `CLAUDE.md` drift, and agency skill mirror drift.

## Agency Skills

Reusable NorthPoint workflows live in `agency-skills/`. Keep that folder as the
source of truth, then mirror changed skills into both `~/.codex/skills/` and
`~/.claude/skills/`. Future agency work should use the relevant skill for
prospecting, audits, GBP optimization, client builds, tracking, reporting,
launch QA, proof, and retainers.

Client-facing audits and weekly reports should default to the NorthPoint KPI
dashboard HTML style: compact score cards, strengths, weaknesses, corrections
needed, real-lead metrics, and plain-English next steps. Export to PDF only when
a client needs a static attachment or print-ready file.

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
Pushes to `main` auto-deploy via the Vercel Git integration.
