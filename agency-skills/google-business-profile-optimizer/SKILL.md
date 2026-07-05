---
name: google-business-profile-optimizer
description: Audit, set up, or optimize Google Business Profile data for local service businesses using screenshots, owner intake, Apify/Maps exports, or provided profile details. Use when reviewing GBP categories, services, service areas, reviews, replies, photos, posts, Q&A, hours, website alignment, NAP consistency, local activity plans, or recurring GBP retainer work. Trigger on "Google Business Profile", "GBP audit", "Google Maps listing", or "why aren't we showing up locally".
metadata:
  updated: "2026-07-04"
---

# Google Business Profile Optimizer

Turn GBP screenshots, owner intake, or Apify/Maps-style data into a practical local visibility checklist and activity plan.

## Workflow

1. Identify the business type, city/service area, website URL, and source quality.
2. Read `references/gbp-checklist.md` and assess static completeness plus engagement activity.
3. Read `references/category-service-research.md` when categories/services need competitive research.
4. Read `references/review-policy-guardrails.md` before making review recommendations.
5. Read `references/gbp-post-types.md` if creating an activity calendar.
6. Output priority fixes, activity cadence, owner asks, and website alignment notes.

## Output

- Completeness score: Strong, Developing, Foundational, or At risk.
- Top 5 GBP fixes.
- Services/categories/service-area recommendations.
- Review and reply workflow.
- 30-day activity plan with posts/photos/Q&A/review asks.

## Guardrails

- Never promise local pack or map-pack rankings.
- Never recommend keyword-stuffed business names.
- Never recommend fake reviews, incentivized positive reviews, or review gating.
- If profile data is unavailable, mark it unknown and request screenshots rather than guessing.

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Use verified facts and plain-English owner-facing recommendations.

## After this skill

- Ongoing posting cadence → `gbp-posting-calendar`. Review operations → `compliant-review-engine`. Website/GBP URL and NAP alignment issues → the site build skills + `static-local-seo-launch-system`.
