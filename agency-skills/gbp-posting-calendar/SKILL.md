---
name: gbp-posting-calendar
description: Create Google Business Profile post calendars and drafts for North Atlas Studio retainers. Use when planning weekly GBP activity, turning services/photos/reviews/FAQs/blogs into posts, creating update/offer/event/service/FAQ posts, selecting CTAs, or batching a month of GBP content. Trigger on "GBP posts", "Google posts", "posting calendar", or any retainer content-cadence planning.
metadata:
  updated: "2026-07-04"
---

# GBP Posting Calendar

Plan and draft a 4-week or 12-week Google Business Profile calendar from the client's REAL services, photos, offers, proof, and season. GBP activity is the highest-leverage recurring local signal — but only when posts are specific to the business; generic posts are noise.

## Workflow

1. **Confirm inputs.** Client, cadence (default: 2 posts/week for retainers, 1/week minimum), and the raw material inventory: services list, photo library status, current real offers, recent reviews worth spotlighting, seasonal context, published blogs to repurpose. **If the client has a voice pack, read it first.** No real offers? Then no offer posts — don't invent one.
2. **Read `references/post-types-and-ctas.md`** and build the mix. Default 4-week rhythm: 3 service spotlights, 2 proof/review posts, 1 seasonal/timely, 1 FAQ answer, 1 offer/event (only if real).
3. **Draft every post in the calendar**, not just topics. Per post: type, publish date, full copy (150–300 chars ideal, front-load the first 100 — GBP truncates), CTA button choice, photo direction ("the van in front of a Lexington job" — specific enough that the owner knows which photo), and the UTM-tagged link if linking to the site.
4. **Apply the anti-AI pass.** Posts must sound like the owner posted them. Read 2–3 through the `human-copy-editor` lens: no "Did you know…?", no "We're thrilled to announce," no emoji walls.
5. **Deliver the calendar** using `references/content-calendar-template.md`, plus a short "how to publish" note for the owner or the retainer workflow.
6. **Automation (optional, confirm first):** if the client's retainer includes automated publishing, format posts as webhook-ready JSON (date, type, copy, cta, image-ref) for the automation tool (Make.com/n8n). Only after Manny confirms the workflow exists and has been tested — otherwise deliver as drafts for manual publishing and say so explicitly.

## Output

`gbp-calendar-[client-slug]-[YYYY-MM].md` — calendar table + full post drafts. If automation confirmed: also `gbp-posts-[client-slug]-[YYYY-MM].json`. Save to `clients/[client-slug]/gbp/`.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Never invent offers, events, discounts, or photos. Offer posts need real terms and an end date from the owner. Review-spotlight posts quote real reviews verbatim (and only positive ones the owner is comfortable amplifying). Keep posting frequency honest — a calendar the owner can't sustain is worse than a lighter one they can.

## After this skill

- Review-spotlight candidates come from `compliant-review-engine` operations; blog-repurpose posts come from `seo-content-writer` output.
- Log posting activity so `weekly-client-report-generator` can report "what we did" accurately.
