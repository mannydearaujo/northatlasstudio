---
name: website-design-standards
description: Apply NorthPoint Digital's conversion-first design standards to local service business websites — layout, visual hierarchy, typography, spacing, color/contrast, mobile patterns, form UX, trust-block placement, and WCAG 2.1 AA accessibility baseline. Use when designing or reviewing any client site's look and usability, running a pre-launch design QA, or answering "does this page look professional / why does this feel off / is this mobile-friendly". Trigger on "design review", "design QA", "make it look better", "check the layout", or before any client build ships.
metadata:
  updated: "2026-07-04"
---

# Website Design Standards

The design quality bar for every NorthPoint build: a local service site must look trustworthy in 3 seconds, read effortlessly, and make the conversion action unmissable — on a phone, first. Two modes: **design guidance** (while building) and **design QA** (scored review before launch).

## Workflow

1. **Confirm context:** which site/pages, client brand assets (logo, colors — or do we define them), primary conversion action, and mode (guidance vs QA).
2. **Apply/check the visual system** (`references/visual-standards.md`): hierarchy, typography scale, spacing rhythm, color and contrast rules, imagery standards (real photos over stock, always).
3. **Apply/check conversion patterns** (`references/conversion-patterns.md`): above-fold answer + CTA, trust-strip placement, CTA rhythm down the page, sticky mobile CTA bar, form design rules.
4. **Apply/check the accessibility baseline** (`references/accessibility-baseline.md`) — WCAG 2.1 AA essentials that also happen to be conversion fixes (contrast, tap targets, labels, focus states).
5. **QA mode:** walk every page at 375px and 1280px. Score each page against the checklist in `references/design-qa-checklist.md` (pass/fix-before-launch/polish per item, with screenshots or specific element references as evidence). Blockers: illegible text, broken mobile layout, invisible/ambiguous CTA, unusable form, contrast failures on conversion elements.
6. **Guidance mode:** produce the concrete spec for the build — type scale, spacing tokens, component patterns (hero, trust strip, service card, FAQ block, footer), stated in plain CSS values the static-site stack can implement directly.

## Output

- QA: `design-qa-[client-slug]-[YYYY-MM-DD].md` — scored checklist, blockers vs polish, per-item evidence.
- Guidance: a design spec section in the site plan (or standalone `design-spec-[client-slug].md`).

## Guardrails

Design serves conversion and trust, not novelty — no trends that cost clarity (thin gray text, low-contrast "aesthetic" palettes, hero carousels, scroll-jacking). Real photos of the real business beat stock every time; say so when stock creeps in. Never approve a page that fails contrast or tap-target minimums on conversion elements. Brand consistency: on NorthPoint-branded deliverables the logo rule applies (filled cyan north-arrow mark, per `docs/brand/BRAND-GUIDE.md`).

## After this skill

- QA blockers route back to the build (`local-service-site-builder`); performance-flavored findings to `lighthouse-technical-seo-fixer`.
- Design QA pass is a prerequisite for `static-local-seo-launch-system`'s launch gate.
