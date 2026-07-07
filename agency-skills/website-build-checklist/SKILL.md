---
name: website-build-checklist
description: Create or run a practical North Atlas Studio website build checklist for local service business sites, from intake through launch. Use when Manny asks for a build checklist, pre-build checklist, handoff checklist, client website build steps, launch prep list, or future website build QA covering pages, copy, SEO metadata, schema, forms, tracking, mobile, Search Console, GBP, and post-launch follow-up.
metadata:
  updated: "2026-07-07"
---

# Website Build Checklist

Use this skill to keep a local service business website build organized from first intake through launch and the first follow-up report. It is the checklist layer between `local-service-site-builder` and `static-local-seo-launch-system`.

## Workflow

1. **Confirm scope and facts.** Read `references/build-checklist.md`. Ask for missing required facts: business name, URL/domain, services, service area, primary conversion action, proof, photos, platform, and tracking/access status.
2. **Create the build checklist.** Split work into phases: intake, strategy, architecture, copy, build, SEO/schema, tracking, QA, launch, Search Console/GBP, and post-launch reporting.
3. **Route specialist work.**
   - Site structure and page inventory: `local-service-site-builder`.
   - City/service clusters: `city-service-cluster-builder`.
   - Copy: `seo-content-writer`, then `human-copy-editor`.
   - Schema: `advanced-schema-architect`, then `schema-and-faq-sync-auditor`.
   - Tracking: `lead-tracking-installer`.
   - Design QA: `website-design-standards`.
   - Launch gate: `static-local-seo-launch-system`.
4. **Mark blockers separately from polish.** Block launch for noindex/canonical errors, broken forms, missing GA4, wrong domain, bad redirects, inaccessible pages, broken mobile nav, or unsupported claims. Track visual polish and optional content separately.
5. **End with owner asks.** Every checklist should say what Manny still needs from the owner: photos, proof, access, service details, local details, testimonials, approvals, or DNS action.

## Output

Use a concise Markdown checklist with statuses:

- `Not started`
- `In progress`
- `Blocked`
- `Ready for QA`
- `Done`

For client workspaces, save as `clients/[client-slug]/build/website-build-checklist-[YYYY-MM-DD].md` when requested.

## Guardrails

No fake proof, fake reviews, fake local detail, placeholder NAP, ranking guarantees, map-pack promises, AI Overview promises, or AI Mode citation promises. City/location pages must be useful and owner-verified, not doorway pages. Every public page must have a job: understanding, trust, action, or follow-up.

