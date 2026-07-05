---
name: seo-content-writer
description: Write, rewrite, draft, or optimize SEO page and blog content for NorthPoint Digital clients — homepage/service/location copy, blog posts, and the social captions distributed from them. Use when someone asks to write, rewrite, draft, create, or optimize a page or blog post (not just plan or audit one), ports the Autonomous SEO Content & Distribution Engine ruleset (business-context confirmation, competitive/keyword research, anti-doorway-page rule for location pages, E-E-A-T operator voice, GA4/Search Console technical embedding rule, social caption distribution). This is the WRITER — hand off to city-service-cluster-builder or localized-blog-opportunity-finder first if the topic/cluster isn't planned yet, and to schema-and-faq-sync-auditor or ai-search-readiness-audit afterward to check the result.
metadata:
  updated: "2026-07-04"
---

# SEO Content Writer

This skill is the gap-filler between NorthPoint's *planners* (`city-service-cluster-builder`,
`localized-blog-opportunity-finder`) and *auditors* (`schema-and-faq-sync-auditor`,
`ai-search-readiness-audit`) — it's the one that actually produces page and blog copy. It ports the
rules from the Golden Paws "Autonomous SEO Content & Distribution Engine" so any NorthPoint client
gets the same discipline: confirm real business facts first, research before writing, never template
a location page, write in the owner's real voice, and never invent what can't be verified.

## Division Of Labor — Read This First

- **Topic/cluster not planned yet?** Run `city-service-cluster-builder` (location/service clusters) or
  `localized-blog-opportunity-finder` (blog topics) first. This skill writes from an approved brief —
  it does not replace cluster/topic planning.
- **Need the client's voice defined?** Run `client-voice-pack-builder` first if no voice pack exists yet.
- **Writing for Alpha Seamless Gutter specifically?** Use the existing `alpha-seo-content` skill instead
  — do not duplicate its work here. This skill is for other NorthPoint clients.
- **After writing:** hand off to `schema-and-faq-sync-auditor` (schema/FAQ/canonical check) and, before
  launch, `static-local-seo-launch-system`.
- **Distributing the finished post to GBP:** hand off to `gbp-posting-calendar`. This skill only drafts
  Instagram/Facebook captions for the post itself (Step 5 below) when asked — it does not schedule or
  post them.

## Workflow

1. **Confirm business context** — read `references/content-confirmation-checklist.md`. If any required
   fact is missing, stop and ask before writing anything.
2. **Research before writing** — identify keyword clusters, search intent, and real internal-link
   targets (service, location, booking, contact pages) from the approved brief or cluster plan.
3. **Write the page or post** — clear H1–H3 structure, accurate and helpful copy, natural CTAs, correct
   internal links. Apply `references/eeat-voice-rule.md` for tone and `references/anti-doorway-page-rule.md`
   whenever the piece is one of several location/service-area pages.
4. **Social captions (only if requested)** — 1–2 caption variations per platform (Instagram, Facebook)
   from the *final, approved* article. Never caption a draft that hasn't been approved.
5. **Technical embedding check** — apply `references/technical-embedding-rule.md` before calling the
   page done.
6. **Quality control** — run `references/quality-control-checklist.md` before handing off for audit/launch,
   then run the copy through the `human-copy-editor` skill's audit pass — no page ships reading like AI filler.

## Guardrails

- Never invent facts, reviews, offers, guarantees, pricing, or visuals.
- Never publish near-duplicate location/service-area pages that differ only by a place name — every
  page needs genuinely unique copy and structure (see `references/anti-doorway-page-rule.md`).
- Never promise rankings, map-pack placement, AI Overview inclusion, or AI Mode citation — frame as
  readiness, clarity, and structure per NorthPoint's standing rule.
- If a route, distance, landmark, or local claim can't be verified, leave it out rather than guessing.
- Pause and ask when a CMS, publishing tool, or integration (e.g. Arvow, Blotato) is named but not
  confirmed as real, available, and correctly identified.
