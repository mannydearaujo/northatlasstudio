---
name: weekly-client-report-generator
description: Generate NorthPoint Digital weekly client reports from GA4, Search Console, GBP, and work-log inputs. Use for retainer reporting, real-lead summaries, secondary-intent context, funnel health, owner-facing next steps, internal notes, and plain-English reporting that avoids vanity metrics.
---

# Weekly Client Report Generator

Lead with real leads. Separate supporting activity from headline results. Summarize trend, funnel health, work completed, next work, owner asks, and internal QA notes.

Default client-facing output should be a branded **KPI dashboard HTML report**, not a plain markdown note.
Use `assets/report-template.html` when producing a polished report for a client. The markdown reference
template is a content map and fallback draft format only.

## Workflow

1. Confirm the client/business context and source material.
2. Read the references in this skill before producing final output.
3. Produce a concise, owner-facing KPI dashboard deliverable plus implementation notes where useful.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Use verified facts and plain-English owner-facing recommendations.

**Logo rule:** any weekly report that carries NorthPoint Digital's own branding (header, footer, "prepared by" credit) must use the filled cyan north-arrow/compass mark from `assets/brand/svg/northpoint-mark.svg` — never a hollow/cutout mark or a cyan square tile with a letter. See `docs/brand/BRAND-GUIDE.md`.

**Dashboard style rule:** future weekly reports must match the NorthPoint KPI dashboard styling from the branding package: charcoal grid background, cyan mark, compact KPI cards, real-lead headline, supporting activity, funnel health, completed work, next work, and owner asks. Use HTML for the polished report unless the user explicitly asks for a PDF or text-only version.
