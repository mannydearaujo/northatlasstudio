---
name: lead-tracking-installer
description: Plan, install, or audit GA4/GTM lead tracking for NorthPoint Digital client sites. Use when defining real-lead events, secondary-intent events, diagnostic events, phone taps, quote forms, booking clicks, SMS/email taps, widget interactions, Key Events, Realtime QA, or weekly reporting event conventions. Trigger on "GA4", "tracking", "are we counting calls", or "install analytics".
metadata:
  updated: "2026-07-04"
---

# Lead Tracking Installer

Define honest lead measurement for a local service business. NorthPoint guarantees measurement, not rankings.

## Workflow

1. Identify how the business gets leads: phone, quote form, booking, contact form, ecommerce, SMS, email.
2. Read `references/access-and-tooling-workflow.md` before asking for access, creating new properties, or recommending alternate tools.
3. Read `references/business-type-event-map.md` and map events.
4. Read `references/ga4-lead-taxonomy.md` to separate real leads from secondary intent and diagnostics.
5. Read `references/event-naming-conventions.md` before naming events.
6. Create the tracking plan and QA checklist.

## Guardrails

Do not count form opens, widget loads, or quote clicks as headline leads. Count `phone_tap` as a real lead for local service businesses. Note GA4 Admin lag. If the client lacks GA4, GTM, or Search Console access, do not pretend historical data exists; document the access gap, recover or verify ownership where possible, and start clean tracking from installation date.

## After this skill

- Event names/definitions get recorded in the client operating manual (`client-site-operating-manual`) — they are the contract `weekly-client-report-generator` and `cro-offer-optimizer` report against.
- Realtime QA is part of `static-local-seo-launch-system`'s launch gate.
