---
name: apify-local-lead-prospecting
description: Normalize and qualify local business lead lists from Apify, Google Maps, Google Business Profile-style exports, scraped directories, or CSV/JSON prospect datasets. Use when building North Atlas Studio prospect lists, scoring local businesses for outreach, finding weak websites or GBP gaps, preparing a CSV plus outreach brief, or drafting personalized outreach that requires human approval before sending. Trigger on "find prospects", "build a lead list", "who should I pitch", or any outreach-cohort work.
metadata:
  updated: "2026-07-04"
---

# Apify Local Lead Prospecting

Turn Apify, Google Maps, GBP-style, or scraped local-business exports into a clean prospect list for North Atlas Studio outreach. This skill is for research, scoring, CSV cleanup, and outreach drafting. It does not send messages.

## Workflow

1. Confirm the source file, target niche, city/radius, and whether a suppression list exists.
2. Read `references/apify-input-schema.md` to map inconsistent export fields into the standard prospect schema.
3. Read `references/prospect-scoring-rubric.md` and score each lead for likely North Atlas fit.
4. Read `references/outreach-compliance.md` before drafting any outreach.
5. Produce `prospects.csv` plus a short outreach brief with the strongest reason to contact each business.
6. If asked for copy, use `references/outreach-draft-templates.md` and keep every draft specific, honest, and manually approved.

## Required output

- A normalized CSV with source fields preserved where useful.
- A prioritized prospect list grouped by opportunity score.
- One plain-English reason to contact each high-priority lead.
- Optional email drafts only. Sending requires the user's explicit approval and compliant tooling.

## Guardrails

- Use scraped data for research and qualification, not deception.
- Do not fabricate website findings or claim you performed an audit unless you actually reviewed the site.
- Do not bulk-send outreach.
- Do not recommend SMS/call automation unless the user has a compliant consent workflow.
- Do not include deceptive subject lines, fake urgency, fake familiarity, or fake performance claims.
- Keep opt-outs and suppression lists respected across every generated batch.

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Use verified facts and plain-English owner-facing recommendations.

## After this skill

- Top-scored prospects → `ai-search-readiness-audit` (run the real diagnostic before claiming findings in outreach) → `offer-sheet-builder` for the follow-up.
- Log each cohort (niche, geo, date, count) so replies/meetings/closes are trackable per NEXT-STEPS.md.
