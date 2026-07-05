---
name: local-service-site-builder
description: Plan or build North Atlas Studio local service business websites and rebuilds. Use for homepage, services, service-area pages, trust/proof blocks, FAQs, quote/booking/contact paths, semantic HTML, static/SSG crawlable architecture, local SEO foundations, schema requirements, and conversion-first client website delivery. Trigger on "build the site", "rebuild their website", "plan the new site", or any Conversion Website Build/Rebuild engagement.
metadata:
  updated: "2026-07-04"
---

# Local Service Site Builder

Plan and build the core agency deliverable: a local service business website whose every page does one of four jobs — **understanding** (what/where/for whom), **trust** (proof it's the right choice), **action** (call/quote/book with zero friction), **follow-up** (the business can respond and measure). This is the $1,500–$3,500 build offer; it has to be visibly better than what the prospect has.

## Workflow

1. **Confirm the business model before any structure.** Services (as the owner names them), service area (real coverage, not aspiration), the ONE primary conversion action (call? quote form? booking?), what makes them pick-able over the next result, and what proof exists. If a voice pack or audit exists, read both. Missing answers → get them now; guessing here poisons every page.
2. **Define the page inventory** from `references/site-architecture.md`. Homepage + services hub + one page per real service + about/trust + FAQ + contact/quote. Location pages: **delegate the cluster plan to `city-service-cluster-builder`** — this skill owns the site; that one owns which towns/service-combos get pages and how they stay non-doorway.
3. **Choose the stack** per `references/tech-stack-guide.md`. Default: static HTML or SSG, no client-side rendering for content, deployable to GitHub Pages/Vercel. The prospect's CMS only if they'll genuinely self-edit.
4. **Blueprint each core page** using the section maps in `references/page-blueprints.md` — hero/answer-first pattern, proof placement, CTA rhythm (a conversion action reachable without scrolling, repeated after each proof section, sticky mobile CTA bar for phone-first businesses).
5. **Bake in the technical foundations while building, not after:** semantic HTML (one H1, real heading tree, landmarks), per-page title/meta/canonical, schema per `advanced-schema-architect` (or minimum LocalBusiness + Service + FAQPage via `schema-and-faq-sync-auditor` rules), image alt text, lazy loading, and the GA4 hooks defined by `lead-tracking-installer` (tel: links tagged, form events named per convention).
6. **Copy:** hand page briefs to `seo-content-writer` (with the voice pack); design decisions follow `website-design-standards`. Don't write final copy or invent a design system inside this skill.
7. **Pre-delivery gate:** run `website-design-standards` QA checklist + `static-local-seo-launch-system` before anything ships.

## Output

- Build plan: `site-plan-[client-slug].md` — page inventory, per-page blueprint, stack decision, schema/tracking map, build order.
- Or, when building: the actual site files, following the plan, in the client's repo/workspace.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. No page exists without a job (understanding/trust/action/follow-up). No invented proof, reviews, or local claims. Every page must be reachable, crawlable, and in the sitemap — no orphans. Phone numbers are always tap-to-call. Don't build features the owner won't maintain (blogs that die after two posts hurt more than no blog).

## After this skill

- `city-service-cluster-builder` → location pages · `seo-content-writer` → copy · `website-design-standards` → design QA · `lead-tracking-installer` → tracking install · `static-local-seo-launch-system` → launch gate · `client-site-operating-manual` → document the build for future sessions.
