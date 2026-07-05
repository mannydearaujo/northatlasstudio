---
name: schema-and-faq-sync-auditor
description: Audit client pages for SEO metadata, canonical URLs, heading structure, LocalBusiness/Service/FAQPage/BreadcrumbList schema, visible FAQ to JSON-LD alignment, sitemap inclusion, and launch readiness. Use before launch, after adding service or location pages, or when checking structured data consistency for local SEO and AI-search readiness. Trigger on "check the schema", "validate structured data", or "FAQ sync".
metadata:
  updated: "2026-07-04"
---

# Schema And FAQ Sync Auditor

Use this before launch and after SEO page edits to catch invisible mismatches that hurt trust and search clarity.

## Workflow

1. Fetch raw HTML for each page being checked.
2. Read `references/schema-checklist.md`.
3. Read `references/faq-sync-rules.md` when FAQPage schema exists or should exist.
4. If using a script, run `scripts/check-schema-faq-sync.js` against local HTML files.
5. Output findings by severity with exact page evidence.

## Guardrails

Structured data must match visible page content. Do not invent business data or add review schema unless it is visible, truthful, and policy-safe.

## After this skill

- This skill AUDITS existing schema; designing new/richer schema (Service, Offer, OpeningHours, entity linking) is `advanced-schema-architect`'s job — hand off there when pages need schema they don't have.
- Findings feed `static-local-seo-launch-system`'s launch gate.
