# Friction Audit Checklist

Walk each path on a phone. Log every instance of the five friction types with page + element evidence.

## The five friction types
1. **Effort friction** — extra taps, long forms, typing that could be tapping, scroll distance to the CTA, pinch-zooming.
2. **Doubt friction** — "is this the right business for my problem?" (vague headlines, no service specifics, no area confirmation).
3. **Trust friction** — "will I regret calling?" (no reviews visible, no faces, no license info, stock photos, dated design).
4. **Expectation friction** — "what happens if I submit this?" (no response-time promise, no process explanation, fear of sales pressure).
5. **Technical friction** — slow load, broken elements, keyboard covering the form, mis-typed input types, dead links.

## Path walk protocol
- **Path A:** Homepage → primary CTA. Count taps and seconds to a submitted action. Target: callable in 1 tap from anywhere (sticky bar), quote form reachable in ≤2 taps, completable in <60 seconds.
- **Path B:** Google/GBP → landing page (service or location page) → action. The lander must confirm what the searcher already searched (message match) — a GBP click landing on a generic homepage is friction.
- **Path C:** The skeptic's loop: CTA → about → reviews → back to CTA. Is trust reachable WITHOUT losing the action? (Proof near CTAs beats proof on a separate page.)

## Form-specific checks
- Field count (target ≤4: name, phone, town, message). For each extra field: who uses this data, or does it go?
- Phone-first: is phone the required field and email optional (local service reality) or backwards?
- Error states: inline, specific, keep entered data. Submit button: specific verb label, ≥48px, thumb-reachable.
- Confirmation: sets response expectation, offers the phone as a faster path, fires the GA4 event.

## Scoring
Per path: count friction instances weighted by type (trust/doubt ×2 — they end journeys silently; effort/technical ×1; expectation ×1.5). Lower is better; track the score across optimization cycles.
