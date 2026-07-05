---
name: offer-sheet-builder
description: Create NorthPoint Digital one-page offer sheets, audit follow-up offers, rebuild proposals, and retainer pitch summaries. Use when packaging the Free Site Audit follow-up, Conversion Website Build/Rebuild, Local SEO plus AI Search Pages, Growth Retainer, pricing bands, deliverables, proof, and no-guarantee language. Trigger on "offer sheet", "proposal", "pitch", "what do I send them after the audit", or pricing a specific prospect.
metadata:
  updated: "2026-07-04"
---

# Offer Sheet Builder

Turn audit findings into the one-page pitch a prospect actually reads: the problem in their terms, ONE recommended offer, the price, the proof, the next step.

**This is the client-facing deliverable.** When an `ai-search-readiness-audit` dashboard exists, treat it as internal source material only — pull the findings and the suggested price band from it, but never copy its internal pricing exploration, margin notes, or raw audit detail into the offer sheet. The output here is the polished pitch the client actually sees. See the "Internal vs client-facing deliverable rule" in the root `CLAUDE.md`.

## Workflow

1. **Confirm inputs:** the prospect, the internal audit (if one exists), any conversation notes about their pain points and budget signals, and which proof assets are approved for use.
2. **Read `references/offer-stack.md`** and pick the ONE offer that fixes their diagnosed problem. Menu-dumping all four offers is the classic mistake — the sheet recommends, the conversation negotiates.
3. **Structure the sheet:** (a) their problem in plain language, anchored to 2–3 specific audit findings they can verify themselves; (b) what I'll do — itemized deliverables; (c) price (band from the stack, tightened to a number when scope is clear); (d) proof block (from `case-study-and-proof-builder`); (e) the required no-guarantee language; (f) ONE next step with a real response window.
4. **Translate, don't paste:** internal findings become client-safe language ("your site has no way to know which calls come from Google" not "GA4 tel: click events unconfigured").
5. **Voice check:** run the sheet through the `human-copy-editor` standard — owners smell agency-speak; write like Manny talks.

## Output

`offer-[prospect-slug]-[YYYY-MM-DD].html` (branded one-pager) or `.md`/PDF per context. Save to `clients/[prospect-slug]/sales/` or the prospecting workspace.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume — the no-guarantee block from the offer stack is mandatory on every sheet. Keep it client-safe: no internal pricing strategy, margin reasoning, or audit minutiae. One page means one page.

**Logo rule:** any offer sheet, proposal, or pitch summary that carries NorthPoint Digital's own branding must use the filled cyan north-arrow/compass mark from `assets/brand/svg/northpoint-mark.svg` — never a hollow/cutout mark or a cyan square tile with a letter. See `docs/brand/BRAND-GUIDE.md`.

## After this skill

- Sent sheets get logged in the prospect tracker (cohort, date, offer, price) so replies/closes are measurable per NEXT-STEPS.md.
- On close → `client-site-operating-manual` (project setup) and `client-voice-pack-builder` (onboarding) start the delivery chain.
