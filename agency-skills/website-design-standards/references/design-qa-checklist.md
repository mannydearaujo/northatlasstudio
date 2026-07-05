# Design QA Checklist

Walk every page at 375px and 1280px. Verdict per item: PASS / FIX BEFORE LAUNCH / POLISH. Evidence = element + page for every non-pass.

## 3-second test
- [ ] What + where + action obvious above the fold (both viewports)
- [ ] Primary CTA is the most visually prominent interactive element
- [ ] Header: logo, nav (≤7 items), phone, CTA button

## Layout & consistency
- [ ] Consistent spacing rhythm (8px multiples); aligned edges; no orphan elements
- [ ] Same component = same styling on every page (cards, buttons, FAQ blocks)
- [ ] Footer complete: NAP matching GBP, hours, service area, license #
- [ ] 404 page styled with nav + CTA

## Typography & color
- [ ] Body ≥16px, line length ≤75ch, line-height ≥1.5
- [ ] Heading hierarchy visually distinct; one H1
- [ ] Primary CTA color unique to CTAs; contrast passes on ALL conversion elements

## Mobile (375px)
- [ ] No horizontal scroll anywhere
- [ ] Sticky CTA bar works, doesn't cover content endings
- [ ] Tap targets ≥44px incl. nav and footer links
- [ ] Forms: correct keyboards (tel/email), labels visible, single column
- [ ] Images scale, don't overflow; text over images stays readable

## Conversion elements
- [ ] CTA after every major section; consistent primary action sitewide
- [ ] Trust strip present under hero
- [ ] Phone tap-to-call everywhere it appears
- [ ] Form ≤5 fields, response expectation stated, confirmation state designed

## Accessibility gate
- [ ] Contrast, labels, focus states, keyboard walk, alt text (per accessibility-baseline.md)

## Imagery
- [ ] Real business photos in hero and proof sections (flag every stock image)
- [ ] Consistent treatment (radius/aspect); optimized weights

**Blockers = any FIX in:** 3-second test, mobile layout, conversion elements, accessibility gate.
