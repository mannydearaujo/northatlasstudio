---
name: advanced-schema-architect
description: Design and write complete JSON-LD structured data for local service business sites, beyond basic LocalBusiness/FAQPage — Service, Offer, OpeningHoursSpecification, Organization, BreadcrumbList, Review/AggregateRating (policy-safe), areaServed, and sameAs entity linking for AI search. Use when adding schema to new pages, upgrading thin schema, connecting a business's entity across the web, or answering "what schema should this page have". Trigger on "add schema", "structured data", "JSON-LD", "rich results", or "entity".
metadata:
  updated: "2026-07-04"
---

# Advanced Schema Architect

Design the full structured-data layer for a local service site: the right types per page, correct nesting, entity linking that helps Google and AI systems understand WHO this business is — grounded in schema.org and Google's structured-data documentation. This skill DESIGNS and WRITES schema; `schema-and-faq-sync-auditor` verifies it against the visible page.

## Workflow

1. **Confirm the facts:** business NAP exactly as GBP shows it, hours, service list with real descriptions, service area (towns), price info the owner will stand behind, review counts/ratings visible on the site, and every official profile URL (GBP/Maps link, Facebook, Instagram, Yelp, licensing directories) for `sameAs`.
2. **Map types to pages** with `references/schema-type-map.md`: LocalBusiness subtype sitewide (pick the most specific — `HairSalon`? no: `PetGroomingService` isn't a type; use the map's subtype guidance), Service + Offer per service page, breadcrumbs everywhere, FAQPage where visible FAQs exist, Organization/entity block on the homepage.
3. **Write the JSON-LD** per the patterns in `references/jsonld-patterns.md`: one `@graph` per page with stable `@id`s linking entities (business ↦ services ↦ offers ↦ areaServed), not disconnected blobs.
4. **Entity-linking pass:** homepage `sameAs` array covering every verifiable official profile; consistent `@id` for the business across all pages; NAP character-identical to GBP. This cross-referencing is what lets AI search connect the site, the GBP, and the reviews into one entity it can cite confidently.
5. **Validate:** every block parses (run through a JSON parser), passes Google's Rich Results Test expectations (required/recommended properties present per the type map), and — the honesty gate — **every value is visible or verifiable on the page or GBP.** Then hand to `schema-and-faq-sync-auditor` for the sync audit.
6. **Document** the schema decisions in the client operating manual (which types live where, what to update when hours/services change).

## Output

Ready-to-paste JSON-LD blocks per page (in the site files when building, or `schema-plan-[client-slug].md` when planning), plus the maintenance note for the operating manual.

## Guardrails

Schema states only what the page/GBP visibly supports — schema that inflates (fake aggregateRating, invented priceRange, self-serving Review markup Google forbids on LocalBusiness) risks manual actions and destroys the trust the markup exists to build. Review/AggregateRating markup ONLY per the policy rules in `references/schema-type-map.md` (§ Review policy). No `sameAs` to profiles that aren't actually the business's. Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume — schema makes a site easier to understand and cite; it guarantees nothing.

## After this skill

- `schema-and-faq-sync-auditor` verifies schema-vs-visible-content before launch; `static-local-seo-launch-system` gates the launch.
- Hours/service/price changes → schema updates are part of retainer maintenance; note in the operating manual.
