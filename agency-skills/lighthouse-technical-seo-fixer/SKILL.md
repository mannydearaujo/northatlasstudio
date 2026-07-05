---
name: lighthouse-technical-seo-fixer
description: Interpret Lighthouse, PageSpeed, Core Web Vitals, accessibility, mobile, and technical SEO findings for North Atlas Studio client sites. Use when prioritizing performance fixes, accessibility improvements, crawlability issues, image optimization, render blocking resources, semantic HTML, and local-site launch quality. Trigger on "pagespeed", "lighthouse", "core web vitals", "site is slow", or performance scores.
metadata:
  updated: "2026-07-04"
---

# Lighthouse Technical SEO Fixer

Turn Lighthouse/PageSpeed output into a prioritized fix list ranked by business impact. Do not chase perfect scores when no business value exists.

## Workflow

1. **Get the data.** Use the shared runner from the North Atlas repo when API access is available:
   ```bash
   npm run pagespeed -- https://example.com --strategy=both --out=clients/client-slug/audit/pagespeed.json
   ```
   Use `.env` or `.env.local` for `PAGESPEED_API_KEY`; never hardcode, print, or commit keys. No API key → use a local Lighthouse JSON export. Run mobile AND desktop; mobile is the verdict that matters for local service.
2. **Triage with `references/lighthouse-priority-rules.md`:** bucket every finding P0–P3 by lead impact → crawl impact → UX/accessibility → polish.
3. **Diagnose, don't just relay.** For each P0/P1: the specific cause on THIS site (which image, which script), the concrete fix, and the expected effect. On Manny-maintained static sites, implement the mechanical fixes (image conversion/sizing, lazy-load, dimensions, font-display) directly when asked.
4. **Re-run after fixes** and record before/after scores + Core Web Vitals — screenshot both for the client proof file.
5. **Report in outcomes:** "homepage now loads in 1.8s on a phone (was 6.2s)" — scores go in the appendix, not the headline.

## Output

Fix list + before/after: `pagespeed-fixes-[client-slug]-[YYYY-MM-DD].md` in `clients/[client-slug]/audit/`; JSON runs saved beside it.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Performance work is framed as UX + eligibility, not ranking magic. Don't recommend infrastructure changes (CDN migrations, framework swaps) to fix what an oversized hero image is causing.

## After this skill

- Accessibility findings that are design-level (contrast, tap targets) → `website-design-standards`. Pre-launch → results feed `static-local-seo-launch-system`. Before/after proof → `case-study-and-proof-builder`.
