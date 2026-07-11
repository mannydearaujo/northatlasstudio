---
name: ai-search-readiness-audit
description: >-
  Run a North Atlas Studio "AI Search Readiness Audit" on a prospect's website (and optionally their
  Google Business Profile): fetch the key pages, score them against Google's official AI-search/SEO
  guidance, flag anti-patterns, and produce a branded, detailed KPI dashboard HTML report — for
  internal use, with prioritized fixes, GA4 lead-tracking recommendations, and a suggested
  pricing/scope section. Use this whenever someone wants to audit, review, score, or assess a local
  business website for AI search / SEO / "AI Overviews" / "AI Mode" readiness, generate a "free site
  audit" or "site audit" deliverable, or evaluate a prospect's site before a sales pitch — even if
  they don't say the words "AI search." It is the internal diagnostic behind the Free Site Audit CTA; the
  client-facing version is built separately with `offer-sheet-builder`. It DIAGNOSES an existing
  site; it does not write pages (builders: alpha-seo-content for Alpha Gutter, seo-content-writer
  otherwise).
metadata:
  updated: "2026-07-04"
---

# AI Search Readiness Audit

This skill turns North Atlas Studio's "Free Site Audit" CTA into a repeatable deliverable. It takes a
prospect's website (and optionally their Google Business Profile), evaluates it against **Google's
official AI-optimization and SEO guidance**, and produces a **branded KPI dashboard HTML report** for
**Manny's internal use** — prioritized fixes, severity, plain-English "what this means for you," a
GA4 lead-tracking recommendation tied to the business type, and a suggested pricing/scope section.

**This report is internal, not client-facing.** It is never sent to the prospect or owner as-is — see
the "Internal vs client-facing deliverable rule" in the root `CLAUDE.md`. When findings are ready to
go to the client, hand off to `offer-sheet-builder` to produce the actual client-facing offer/fix-pack
document, which presents only the chosen offer, price, and scope — no internal pricing exploration or
audit minutiae.

## Language routing

If a lead came through `/pt/` or the owner/client prefers Portuguese, keep this internal diagnostic in
English unless Manny asks otherwise, then hand off to `offer-sheet-builder` for the natural pt-BR
client-facing audit summary, offer sheet, or fix pack. Do not translate and send this internal dashboard
as the client deliverable.

It is a **scorer/diagnostic**, not a page generator. When the audit recommends rebuilding or adding a
page, that hand-off goes to a builder skill — `alpha-seo-content` for Alpha Gutter, otherwise
`local-service-site-builder` (site plan) + `seo-content-writer` (copy). Keep the division clean: this
skill **diagnoses**, those **produce**.

## The one rule that governs every word of output

**Never promise rankings or AI placements.** Google's own guidance is explicit that there is no special
"AI SEO" lever and no guaranteed citation. Frame everything as **readiness, structure, clarity, and
visibility** — "easier for Google and AI tools to understand and cite," not "will rank #1" or "will get
you into AI Overviews." The only thing North Atlas guarantees is **measurement**: GA4 real-lead tracking
so the owner sees the actual calls, quotes, and bookings. This honesty is the brand. A report that
over-promises is worse than no report.

## Workflow

### Step 1 — Confirm inputs
You need the **website URL**. The **Google Business Profile** matters just as much for a local business
(it's the single biggest local lever in 2026), but **you cannot crawl it** — Google blocks programmatic
reading of the profile/knowledge panel, and a web search only confirms it exists. So GBP is
**screenshot/intake-driven**: ask the owner for a screenshot of either their **Business Profile manager
dashboard** (business.google.com — richest, shows posts, photos count, profile strength, insights) or
the **public profile panel** (search their name on a phone, screenshot the box). Read the GBP checklist
in `references/scoring-rubric.md` for exactly what to extract. If no GBP input is available, proceed
with the website-only audit and flag GBP as the biggest unmeasured lever rather than guessing at it.

### Step 2 — Fetch the key pages
Aim for a representative read of: **home, a services/what-we-do page, a location/service-area page, an
FAQ page, and the contact page.** Start at the homepage, read its nav/links, follow the relevant ones,
and check `/sitemap.xml` for the full page inventory (it reveals location pages, FAQ, etc.). Fetch 4–6
pages — you need a representative read, not the whole site. If a page type doesn't exist, that absence
is itself a finding (e.g., "no FAQ page" weakens AI extractability).

**Use the right fetch for the right check — this matters:**
- **For content & structure** (reading copy, headings, FAQ presence, scannability) — `WebFetch` is fine;
  its markdown conversion is good for the *body*.
- **For the technical foundation & schema** (title tag, meta description, viewport, canonical, JSON-LD
  structured data, robots/sitemap) — **fetch the raw HTML**, e.g.
  `curl -sL --max-time 20 <url> -o /tmp/page.html` then grep for `<title>`, `name="description"`,
  `name="viewport"`, `rel="canonical"`, and `"@type"`. **WebFetch strips the `<head>` and JSON-LD when
  it converts to markdown** — if you judge schema/meta/title from WebFetch alone you will falsely report
  them as missing. Always confirm these from the raw HTML before flagging them.

Also fetch **`/robots.txt`** and note whether a sitemap is referenced and whether anything important is
disallowed.

If a site can't be fetched at all (blocked, down, or the raw HTML is an empty JS shell with no real body
content), say so plainly and report what that means: if *you* can't read it, neither can an AI crawler —
that's a Critical finding, not a reason to abandon the audit.

### Step 3 — Pull PageSpeed/Lighthouse data
Check whether PageSpeed/Lighthouse data already exists for this site in `clients/<slug>/audit/` (or
ask Manny if he has a share link). If not, and the audit is real (not a quick pressure-test), run it
per the root `CLAUDE.md` "PageSpeed And Lighthouse Workflow":

```bash
npm run pagespeed -- https://example.com --strategy=both --out=clients/client-slug/audit/pagespeed.json
```

Save the results (or a notes file summarizing them) under `clients/<slug>/audit/`. This data is
**evidence for Category 2 (Technical Foundation) below — it is not a 5th score and not a separate
report section.** Performance and mobile Core Web Vitals feed the rubric's "page experience" criterion;
Accessibility findings feed the Priority Fixes list directly (e.g., a form control missing an
accessible name). Don't run `lighthouse-technical-seo-fixer` as part of this skill — that's a separate
skill for prioritizing the fixes once they're already in the audit; this step is just about getting the
numbers into evidence. If no PageSpeed data is available and running it isn't practical, score Technical
Foundation from the static signals only and say so rather than guessing at performance.

### Step 4 — Score against the rubric
Read **`references/scoring-rubric.md`** and score the site across the four categories Google names.
Each is worth 25 points (100 total). The rubric tells you exactly what to look for, how to assign
points, and how to map a score to a readiness band. Do not score from memory — the rubric is the
source of truth and is built directly on Google's official guidance. Fold any PageSpeed/Lighthouse
data from Step 3 into Category 2 here.

For every gap, capture: **what you saw** (specific evidence — quote the page, name the missing element),
**severity**, **the fix**, and **what it means for the owner** in plain English.

### Step 5 — Flag anti-patterns
The rubric's anti-pattern list (§ "What to flag against") covers things Google explicitly says NOT to
do — `llms.txt`, content chunking, rewriting-for-AI, fake mentions/citations, keyword stuffing. If you
find any, flag them as something to **stop/remove**, with the reason. Finding none is a good sign; say so.

### Step 6 — GA4 lead-tracking recommendation
Read **`references/ga4-lead-events.md`**. Based on how this business converts (booking? quote form?
phone? e-commerce?), recommend the specific **real-lead Key Events** to track and the **secondary
intent** events that explain them. This is what ties readiness work back to measurable money. Keep the
real-lead vs. secondary split honest — a form *open* is not a lead; a booking *click* is not a booking.

### Step 7 — Suggested pricing/scope (internal only)
Based on the band and findings, recommend whether this looks like a **fix pack** (live site, Developing/
Strong band, contained findings) or a **fuller rebuild/local-pages bundle** (At Risk/Foundational band,
structural gaps). Suggest a rough price band and what would be in/out of scope, the way
`offer-sheet-builder`'s price-band references do. This section is for Manny's own decision-making — it
is not the client-facing offer itself, and it should read like internal notes, not a pitch.

### Step 8 — Generate the branded KPI dashboard report
Produce a **single self-contained HTML file** using `assets/report-template.html` as the shell. The
template carries the approved North Atlas KPI dashboard style from the branding package:
charcoal/navy dashboard background, Atlas compass mark, glowing dashboard cards, compact score KPIs, and
detailed panels for strengths, weaknesses, corrections needed, and suggested pricing. Fill in every
`{{PLACEHOLDER}}`. Save as `ai-search-audit-[business-slug].html` and tell the user the file path plus
a one-paragraph summary of the headline score, the top 3 fixes, and the suggested price band.

Do **not** fall back to a plain text/markdown-style report unless the user specifically asks for a text
draft. The HTML dashboard is the default format for all future North Atlas audits. Remember this file is
internal — do not soften or omit findings to make them "client-safe"; that translation happens in
`offer-sheet-builder`, not here.

**Logo rule:** the header logo in `assets/report-template.html` is the Atlas compass/location
mark from `assets/brand/atlas/`. Never replace it with a
square/rounded-tile badge or a single-letter placeholder — see `docs/brand/BRAND-GUIDE.md`. If you
copy this template elsewhere, copy the SVG mark with it.

## Report structure (fixed)

Fill the template in this order — it leads with the result, then the detail, then the path forward:

1. **Header** — North Atlas mark, "AI Search Readiness Audit," business name, site URL, date.
2. **Dashboard headline** — overall score `/100`, readiness band, and a 2–3 sentence plain-English verdict.
3. **KPI scorecards** — the four categories, each with its score `/25`, progress meter, and one-line read.
4. **Dashboard insight panels** — detailed strengths, detailed weaknesses, and corrections needed.
5. **Priority fixes** — the findings as cards, **sorted by severity (Critical → Low)**. Each card:
   the issue, what we saw (evidence), the fix, and **"What this means for you."** This is the heart of
   the report — it must be specific to *this* site, never generic.
6. **What's already working** — 2–4 genuine strengths. Always find real ones; a report that's all
   criticism doesn't get acted on, and an honest audit names what's right too.
7. **Anti-patterns** — anything to stop/remove, or a clean bill if none.
8. **Google Business Profile** — completeness/accuracy read if GBP was provided; otherwise a short note
   on why it's the biggest local lever and an offer to include it.
9. **Measure what matters (GA4)** — the recommended real-lead events for this business and why
   measurement is the only guarantee.
10. **Suggested pricing/scope (internal)** — fix-pack vs. rebuild/bundle call, rough price band, and
    in/out-of-scope notes for Manny's own decision-making. Never copy this section into a client-facing
    document verbatim.
11. **Footer note** — internal reminder of next step (e.g., "package via offer-sheet-builder once
    scope is decided"), not a client-facing CTA.

## Tone

Findings and "what this means for you" framing should still be written plain-English and owner-translatable
— that's what makes them easy to repackage for the client later — but remember the audience for *this*
document is Manny. Translate every technical finding into a consequence the owner would care about
(calls, quotes, trust, being found), but the pricing/scope section and any internal notes should read as
internal shorthand, not a pitch. Confident but never hype. Short sentences. No jargon without a
plain-language gloss in the same breath.

## What good looks like

- Every finding is **specific to the audited site** with real evidence — not a checklist printed back.
- The score is **defensible**: someone could re-read the rubric and the evidence and arrive near it.
- The report is **honest** — names strengths, never promises rankings, and points to measurement as the
  guarantee.
- It's **branded and self-contained** — one HTML file that looks like it came from North Atlas Studio.
- It ends pointing at action for Manny: the top fixes, GA4 tracking, and a suggested price band —
  not a client-facing CTA. The client-facing version is a separate `offer-sheet-builder` deliverable.
