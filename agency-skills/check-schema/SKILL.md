---
name: check-schema
allowed-tools: Read, Write, Bash, WebFetch
description: Verify structured data that already exists on client pages - LocalBusiness/Service/FAQPage/BreadcrumbList JSON-LD parses, matches the visible page (FAQ text, headings, NAP), and agrees with the page title and canonical. Use after adding or editing service or location pages, or when checking structured data consistency for local SEO and AI-search readiness. Trigger on "check the schema", "validate structured data", or "FAQ sync". This CHECKS existing schema; to write new schema use write-schema, and for the full pre-publish gate use launch-check.
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

- This skill AUDITS existing schema; designing new/richer schema (Service, Offer, OpeningHours, entity linking) is `write-schema`'s job — hand off there when pages need schema they don't have.
- Findings feed `launch-check`'s launch gate.
