---
name: localized-blog-opportunity-finder
description: Find and prioritize localized blog/content opportunities for NorthPoint Digital clients. Use when planning next-of-kin content, service-adjacent local guides, seasonal support content, internal link opportunities, blog briefs, FAQ expansion, social/GBP repurposing, and retainer content that supports real customer intent. Trigger on "what should we blog about", "content ideas", "blog calendar", or planning retainer content.
metadata:
  updated: "2026-07-04"
---

# Localized Blog Opportunity Finder

Find blog topics that serve REAL customers of a specific local business — pre-purchase questions, preparation, cost anxiety, seasonal needs — and rank them by business value, not traffic potential. This is the planner; `seo-content-writer` writes the winners.

## Workflow

1. **Confirm context:** client, services, service area, existing content inventory (site FAQ, published posts, GBP posts), and real customer-question sources (owner's most-asked questions, review content, intake form answers, chat/call logs if available).
2. **Generate candidates** across the categories in `references/blog-opportunity-framework.md`. Every candidate must name the customer moment it serves ("homeowner comparing 5-inch vs 6-inch before requesting a quote").
3. **Score each candidate** with the rubric in `references/prioritization-rubric.md` (business relevance, local specificity, proof availability, internal-link value, seasonal timing). Kill anything scoring 0 on business relevance regardless of other scores — traffic-only content is explicitly out.
4. **Map internal links before writing:** for each surviving topic, list the 2–4 service/location pages it should link TO (money pages) and which existing content should link to it. A post with no internal-link plan is a content orphan.
5. **Produce briefs for the top picks:** working title, customer moment, the question the first paragraph must answer, outline (H2s), local details to verify with the owner (never invent — anti-doorway rules apply to blogs too), proof/photos needed, target length, internal links, repurposing note (GBP post / social caption potential).
6. **Sequence into the retainer calendar:** 1–2/month is a sustainable retainer default; seasonal topics scheduled 4–6 weeks ahead of the season.

## Output

`blog-opportunities-[client-slug]-[YYYY-QQ].md` — scored candidate table + full briefs for the top 3–6. Save to `clients/[client-slug]/content/`.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. No traffic-bait unrelated to purchase intent ("10 cutest dog breeds"). No topics requiring local facts nobody can verify. Don't plan more cadence than the retainer/owner can sustain.

## After this skill

- Briefs → `seo-content-writer` (which reads the voice pack). Published posts → repurpose via `gbp-posting-calendar` → verify schema/links via `schema-and-faq-sync-auditor`.
