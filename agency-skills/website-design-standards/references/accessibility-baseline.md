# Accessibility Baseline (WCAG 2.1 AA essentials)

Framed honestly: these are conversion fixes wearing compliance clothes — every item loses real customers when it fails. Older homeowners ARE the local-service customer base.

## Must pass (blockers)
- **Contrast:** body text ≥ 4.5:1; large text (≥24px or ≥19px bold) ≥ 3:1; UI components/CTA boundaries ≥ 3:1. Check the CTA button text specifically — brand-color buttons with white text often fail.
- **Tap targets:** ≥ 44×44px (48px preferred) with ≥8px spacing between adjacent targets. Phone numbers, nav items, form controls.
- **Form labels:** every input has a programmatic label (visible label + `for`/`id`). Placeholder-only = fail. Errors identified in text, not color alone.
- **Keyboard:** everything reachable and operable by Tab/Enter; visible focus states (never `outline: none` without a replacement); logical tab order.
- **Images:** meaningful images get descriptive alt; decorative get `alt=""`. The logo's alt is the business name.
- **Headings/landmarks:** one H1, no skipped levels, `<header>/<nav>/<main>/<footer>` present; nav is a `<nav>` with real links.
- **Zoom:** page usable at 200% zoom / 320px effective width; no horizontal scroll; text can actually reflow (no text in images for content).

## Should pass (fix-soon)
- `lang` attribute on `<html>` (and `lang="pt"` spans if Portuguese content appears).
- Link text meaningful out of context ("see grooming prices" not "click here").
- Motion: no autoplaying animation over 5s without pause; respect `prefers-reduced-motion`.
- Color never the sole carrier of meaning (required-field asterisks get text too).

## Quick tools
- Contrast: WebAIM contrast checker or DevTools color picker.
- Structure: Lighthouse accessibility audit (via `lighthouse-technical-seo-fixer`) catches labels/alt/contrast programmatically — but keyboard-walk the page yourself; automation misses focus order and traps.
