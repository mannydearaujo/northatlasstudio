---
name: weekly-client-report-generator
description: Generate NorthPoint Digital weekly client reports from GA4, Search Console, GBP, and work-log inputs. Use for retainer reporting, real-lead summaries, secondary-intent context, funnel health, owner-facing next steps, internal notes, and plain-English reporting that avoids vanity metrics. Trigger on "weekly report", "client report", or "what do I send the client this week".
metadata:
  updated: "2026-07-04"
---

# Weekly Client Report Generator

Lead with real leads. Separate supporting activity from headline results. Summarize trend, funnel health, work completed, next work, owner asks, and internal QA notes.

Default client-facing output should be a branded **KPI dashboard HTML report**, not a plain markdown note.
Use `assets/report-template.html` when producing a polished report for a client. The markdown reference
template is a content map and fallback draft format only.

## Workflow

1. **Confirm inputs:** client, reporting window, GA4 data (screenshots/exports), Search Console if relevant, GBP activity, and the work log (what NorthPoint actually did this week). Read the client's event conventions from their operating manual — headline numbers use the REAL-lead definitions from `lead-tracking-installer`, nothing else.
2. **Read `references/weekly-report-template.md`** for the content map: real leads (headline) → supporting activity (secondary intent, honestly labeled) → funnel health → work completed → next week's work → owner asks.
3. **Verify every number against its source before it goes in the report.** If a number can't be verified, it doesn't ship — write "not yet measurable" instead. Never fill gaps with estimates.
4. **Write plain-English trend context:** what moved, why (if known), what we're doing about it. One honest sentence beats a chart the owner won't read. Vanity metrics (impressions without clicks, sessions without leads) appear only as context, never as wins.
5. **Produce the branded HTML dashboard** from `assets/report-template.html`, filling every placeholder. Save as `weekly-report-[client-slug]-[YYYY-MM-DD].html` in `clients/[client-slug]/reports/`. Include the internal-notes section (QA observations, upsell signals) as a SEPARATE internal file, never in the client deliverable.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Use verified facts and plain-English owner-facing recommendations.

**Logo rule:** any weekly report that carries NorthPoint Digital's own branding (header, footer, "prepared by" credit) must use the filled cyan north-arrow/compass mark from `assets/brand/svg/northpoint-mark.svg` — never a hollow/cutout mark or a cyan square tile with a letter. See `docs/brand/BRAND-GUIDE.md`.

**Dashboard style rule:** future weekly reports must match the NorthPoint KPI dashboard styling from the branding package: charcoal grid background, cyan mark, compact KPI cards, real-lead headline, supporting activity, funnel health, completed work, next work, and owner asks. Use HTML for the polished report unless the user explicitly asks for a PDF or text-only version.
