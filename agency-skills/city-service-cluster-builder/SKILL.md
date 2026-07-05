---
name: city-service-cluster-builder
description: Plan service-area, town, city plus service, or localized service page clusters for local SEO and AI-search readiness. Use when applying the zipper strategy, creating unique location/service briefs, researching keyword clusters, requiring verifiable local detail, avoiding doorway pages, syncing FAQs/schema, and building internal-link plans for NorthPoint Digital clients. Trigger on "town pages", "location pages", "service area pages", or planning which cities get pages.
metadata:
  updated: "2026-07-04"
---

# City Service Cluster Builder

Plan local SEO page clusters that are useful enough to deserve indexing. This is the PLANNER for location/service-area pages — `local-service-site-builder` owns the overall site; this skill decides which town/service pages exist, what makes each one genuinely unique, and how they interlink. `seo-content-writer` writes them from these briefs.

## Workflow

1. **Confirm reality first:** real services, towns actually served (owner-confirmed — capacity, not aspiration), and any GBP service-area constraints (site pages and GBP claims should tell one coherent story).
2. **Read `references/location-page-guardrails.md`** — the anti-doorway rules govern every decision below.
3. **Build the cluster matrix** with `references/keyword-cluster-template.md`: which town × service combinations get pages (zipper strategy), which merge into a single service-area page, and which don't deserve a page at all. A town with nothing unique to say and no business history gets NO page yet.
4. **Per-page uniqueness plan:** for every planned page, list the verifiable local details it will carry (`references/local-detail-verification.md`) — real jobs done there, owner-confirmed local conditions, town-specific FAQs. Every claim needs an owner-confirmed source or it's out.
5. **Internal-link plan:** each location page links to/from its service pages, the service-area hub, and neighbors where natural. No orphans.
6. **Doorway gate:** run `references/doorway-risk-checklist.md` on the whole plan before finalizing. If two briefs read the same except the town name, merge or differentiate them.

## Output

`cluster-plan-[client-slug].md` — the matrix (build/merge/skip per combo), one brief per approved page (unique angle, verified local details, FAQ topics, internal links, schema notes), and the build order. Save to `clients/[client-slug]/content/`.

## Guardrails

Do not make near-duplicate pages that only swap city names. Do not invent drive times, landmarks, neighborhoods, routes, or local claims. Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume.

## After this skill

- Briefs → `seo-content-writer` (with the client voice pack) → `schema-and-faq-sync-auditor` → `static-local-seo-launch-system` (includes sitemap/indexing submissions for the new cluster).
