# Anti-Doorway-Page Rule

When writing more than one location or service-area page (e.g. a "[service] near [town]" page for
each nearby town), every page must earn its own place in the index:

- Genuinely unique copy per page. Never template one page and swap the town or service name —
  near-duplicate pages that differ only by a place name are doorway/spam pages and risk algorithmic
  or manual action.
- Differentiate on real, verifiable local detail: actual roads, exits, town borders, neighborhoods,
  parks, commuter patterns, and the kinds of customers common to that area. Vary structure too
  (headings, section order, FAQ questions) — not just the nouns.
- Never invent local facts. If a route, distance, landmark, or local claim can't be verified, leave it
  out rather than guessing.
- Keep structured data (FAQ, LocalBusiness, BreadcrumbList) consistent with each page's own visible
  content — keep visible FAQ text and FAQ schema in sync. Hand off to `schema-and-faq-sync-auditor` to
  verify this after writing.

This mirrors `city-service-cluster-builder`'s doorway-risk guardrails — if a cluster plan already
exists from that skill, write from it rather than re-deriving local detail from scratch.
