---
name: cro-offer-optimizer
description: Run conversion rate optimization on local service business websites — friction audits of quote/booking/call paths, CTA placement and copy, form field reduction, trust-signal and objection-handling analysis, and a GA4-based measurement plan using North Atlas's real-lead event conventions. Use when a site gets traffic but few leads, before/after a rebuild to lift conversion, on retainer optimization cycles, or to design the offer presentation on key pages. Trigger on "not getting leads", "conversion", "CRO", "improve the quote form", or "traffic but no calls".
metadata:
  updated: "2026-07-04"
---

# CRO & Offer Optimizer

Find and remove everything standing between a ready-to-buy visitor and the phone call/quote request — then measure the change honestly with GA4. For local service sites, CRO is friction removal + trust + offer clarity, not A/B-testing button colors on 200 visits a month.

## Workflow

1. **Establish the baseline.** Primary conversion action (per `lead-tracking-installer` definitions), current GA4 numbers (sessions, real-lead events, per-page), and traffic reality. **Sample-size honesty up front:** under ~1,000 sessions/month, formal A/B tests can't read — use sequential before/after measurement and best-practice fixes instead, and say so.
2. **Walk the conversion paths as a customer** (phone, 375px viewport, slow connection mindset): homepage → service page → quote/call; ad/GBP landing → action. Log every friction point with the taxonomy in `references/friction-audit-checklist.md` — every extra tap, every doubt, every "what happens next?" blank.
3. **Audit the offer presentation** (`references/offer-presentation-rules.md`): is the CTA a real offer ("Get your free gutter quote today — most quotes within 24 hours") or a label ("Contact Us")? Are price anxiety, timing anxiety, and trust anxiety each answered near the CTA?
4. **Audit trust & objections** (`references/trust-and-objections.md`): map the top 3–5 objections for this trade (cost, mess, time, trust-in-strangers, quality) to where they're answered — or not — along the path.
5. **Prioritize fixes** by expected impact ÷ effort: form-field cuts and CTA clarity usually top the list; rank each fix with its hypothesis ("removing the email requirement should lift form completions — phone is what we actually need").
6. **Define the measurement plan:** which GA4 events prove/disprove each fix, the before window, the after window, and the honest confounders (seasonality, GBP changes, ad spend). Real leads are the metric; secondary-intent events explain, never headline.
7. **Report/implement:** scored friction audit + prioritized fix list; implement directly on Manny-maintained sites when asked.

## Output

`cro-audit-[client-slug]-[YYYY-MM-DD].md` — friction findings (per path, with evidence), prioritized fixes with hypotheses, measurement plan. Save to `clients/[client-slug]/cro/`.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume — CRO promises a better-converting path, measured, not a number. No dark patterns: fake scarcity/countdown timers, fake "someone just booked" toasts, guilt-trip decline buttons, hidden fees revealed late. Don't recommend tests the traffic can't statistically support. Form fields only get ADDED with a business justification in writing.

## After this skill

- Fixes touching design → `website-design-standards`; copy → `human-copy-editor`; measurement setup → `lead-tracking-installer`.
- Before/after results (verified) → `case-study-and-proof-builder` and the client's weekly report.
