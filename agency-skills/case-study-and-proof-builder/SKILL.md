---
name: case-study-and-proof-builder
description: Create NorthPoint Digital case studies, proof blocks, testimonial requests, and sales proof from verified client work. Use when packaging Golden Paws, AlphaGutterCo, or future client results with real screenshots, GA4 events, before/after evidence, live URLs, structural improvements, and no fake performance claims. Also use when someone says "build a case study", "package the proof", "write up the results", or "I need something to show prospects".
metadata:
  updated: "2026-07-04"
---

# Case Study And Proof Builder

Turn verified client work into sales assets: full case studies, short proof blocks for the website/offer sheets, and testimonial requests. Every claim must trace to evidence you actually have in hand.

## Workflow

1. **Confirm scope and evidence inventory.** Ask which client and which engagement. Then list what evidence actually exists before writing a word:
   - Live URLs (before-state screenshots or archive.org captures if the old site is gone)
   - GA4 screenshots showing real lead events (phone_tap, quote_form_submit, booking clicks) with date ranges visible
   - Search Console screenshots (impressions/clicks trends — present as "visibility data," never as a ranking promise)
   - Structural facts: pages built, schema added, load-time improvements, tracking installed
   - Owner quotes or texts/emails that could become testimonials (with permission status noted)
   If a category has no evidence, the case study doesn't mention it. Never backfill with plausible-sounding numbers.
2. **Read `references/proof-rules.md`** and classify every candidate claim as allowed/not-allowed.
3. **Interview the owner (or Manny as proxy)** using `references/owner-interview-questions.md`. You need: what the business struggled with in their own words, why they acted, what changed operationally (not just metrics), what they'd tell another owner.
4. **Draft the case study** using the structure in `references/case-study-structure.md`. Lead with the business problem, not the technology. Metrics get exact numbers with date ranges; structural work gets before/after specifics.
5. **Draft the short-form derivatives** in the same pass: a 3–4 sentence proof block (website/offer-sheet ready), a 1-sentence stat line, and a LinkedIn/GBP-post version.
6. **If no testimonial exists yet**, draft the request using `references/testimonial-request-templates.md` — Manny sends it personally; never send on the client's behalf.
7. **QA pass:** re-check every number against its screenshot, confirm client-name approval, confirm no banned claim types, run copy through the `human-copy-editor` skill if it reads like marketing filler.

## Output

- Full case study: `case-study-[client-slug].html` (self-contained, NorthPoint-branded) or `.md` if it's feeding another page build.
- Proof block + stat line + social version: appended as a "Derivatives" section or separate `proof-blocks-[client-slug].md`.
- Save to the client workspace (`clients/[client-slug]/proof/`) when one exists.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Use verified facts and plain-English owner-facing recommendations. No invented lifts, revenue figures, or paraphrased "testimonials" the client never said. If the honest result is modest, write the modest version — a true "went from no tracking to 40 tracked calls a month" beats a fake "300% growth."

**Logo rule:** any case study or proof asset that carries NorthPoint Digital's own branding (cover page, header, footer credit) must use the filled cyan north-arrow/compass mark from `assets/brand/svg/northpoint-mark.svg` — never a hollow/cutout mark or a cyan square tile with a letter. See `docs/brand/BRAND-GUIDE.md`.

## After this skill

- Feed the proof block into `offer-sheet-builder` (proof section) and the agency site via `northpoint-project-sync`.
- New GA4 evidence worth capturing? Note it in the client workspace so `weekly-client-report-generator` and future case studies can reuse it.
