---
name: ai-search-readiness-audit
description: >-
  Run a NorthPoint Digital "AI Search Readiness Audit" on a prospect's website (and optionally their
  Google Business Profile): fetch the key pages, score them against Google's official AI-search/SEO
  guidance, flag anti-patterns, and produce a branded, plain-English KPI dashboard HTML report with prioritized
  fixes and GA4 lead-tracking recommendations. Use this whenever someone wants to audit, review,
  score, or assess a local business website for AI search / SEO / "AI Overviews" / "AI Mode"
  readiness, generate a "free site audit" or "site audit" deliverable, check if a site is structured
  to be understood and cited by AI search tools, or evaluate a prospect's site before a sales pitch —
  even if they don't say the words "AI search." This is the deliverable behind the agency's Free Site
  Audit CTA. It is a DIAGNOSTIC/scoring tool — it evaluates an existing site; it does not write new
  pages (for building pages, use alpha-seo-content instead).
---

# AI Search Readiness Audit

This skill turns NorthPoint Digital's "Free Site Audit" CTA into a repeatable deliverable. It takes a
prospect's website (and optionally their Google Business Profile), evaluates it against **Google's
official AI-optimization and SEO guidance**, and produces a **branded KPI dashboard HTML report** the owner can
actually read — prioritized fixes, severity, plain-English "what this means for you," and a
GA4 lead-tracking recommendation tied to the business type.

It is a **scorer/diagnostic**, not a page generator. When the audit recommends rebuilding or adding a
page, that hand-off goes to the `alpha-seo-content` skill (the builder). Keep the division clean: this
skill **diagnoses**, that one **produces**.

## The one rule that governs every word of output

**Never promise rankings or AI placements.** Google's own guidance is explicit that there is no special
"AI SEO" lever and no guaranteed citation. Frame everything as **readiness, structure, clarity, and
visibility** — "easier for Google and AI tools to understand and cite," not "will rank #1" or "will get
you into AI Overviews." The only thing NorthPoint guarantees is **measurement**: GA4 real-lead tracking
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

### Step 3 — Score against the rubric
Read **`references/scoring-rubric.md`** and score the site across the four categories Google names.
Each is worth 25 points (100 total). The rubric tells you exactly what to look for, how to assign
points, and how to map a score to a readiness band. Do not score from memory — the rubric is the
source of truth and is built directly on Google's official guidance.

For every gap, capture: **what you saw** (specific evidence — quote the page, name the missing element),
**severity**, **the fix**, and **what it means for the owner** in plain English.

### Step 4 — Flag anti-patterns
The rubric's anti-pattern list (§ "What to flag against") covers things Google explicitly says NOT to
do — `llms.txt`, content chunking, rewriting-for-AI, fake mentions/citations, keyword stuffing. If you
find any, flag them as something to **stop/remove**, with the reason. Finding none is a good sign; say so.

### Step 5 — GA4 lead-tracking recommendation
Read **`references/ga4-lead-events.md`**. Based on how this business converts (booking? quote form?
phone? e-commerce?), recommend the specific **real-lead Key Events** to track and the **secondary
intent** events that explain them. This is what ties readiness work back to measurable money. Keep the
real-lead vs. secondary split honest — a form *open* is not a lead; a booking *click* is not a booking.

### Step 6 — Generate the branded KPI dashboard report
Produce a **single self-contained HTML file** using `assets/report-template.html` as the shell. The
template carries the approved NorthPoint KPI dashboard style from the branding package:
charcoal grid background, cyan north-arrow mark, glowing dashboard cards, compact score KPIs, and
owner-friendly panels for strengths, weaknesses, and corrections needed. Fill in every
`{{PLACEHOLDER}}`. Save as `ai-search-audit-[business-slug].html` and tell the user the file path plus
a one-paragraph summary of the headline score and the top 3 fixes.

Do **not** fall back to a plain text/markdown-style report for client-facing delivery unless the user
specifically asks for a text draft. The HTML dashboard is the default format for all future NorthPoint
audits.

**Logo rule:** the header logo in `assets/report-template.html` is the filled cyan north-arrow/compass
mark (inline SVG, same path data as `assets/brand/svg/northpoint-mark.svg`). Never replace it with a
square/rounded-tile badge or a single-letter placeholder — see `docs/brand/BRAND-GUIDE.md`. If you
copy this template elsewhere, copy the SVG mark with it.

## Report structure (fixed)

Fill the template in this order — it leads with the result, then the detail, then the path forward:

1. **Header** — NorthPoint mark, "AI Search Readiness Audit," business name, site URL, date.
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
10. **Footer CTA** — soft, honest next step (e.g., "Want NorthPoint to action the top fixes? Reply to
   this report.") and the contact. Never a rankings promise.

## Tone

Plain English, owner-facing. Assume a smart business owner who is **not** technical. Translate every
technical finding into a consequence they care about — calls, quotes, trust, being found. Confident but
never hype. Short sentences. No jargon without a plain-language gloss in the same breath.

## What good looks like

- Every finding is **specific to the audited site** with real evidence — not a checklist printed back.
- The score is **defensible**: someone could re-read the rubric and the evidence and arrive near it.
- The report is **honest** — names strengths, never promises rankings, and points to measurement as the
  guarantee.
- It's **branded and self-contained** — one HTML file that looks like it came from NorthPoint Digital.
- It ends pointing at action: the top fixes, GA4 tracking, and a low-pressure way to engage.
