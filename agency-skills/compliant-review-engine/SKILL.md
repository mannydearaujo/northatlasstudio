---
name: compliant-review-engine
description: Create review request, follow-up, reply, and service recovery workflows for North Atlas Studio clients. Use when asking customers for honest reviews, drafting Google review replies, building review velocity plans, handling negative reviews manually, or avoiding review gating and policy violations. Trigger on "review requests", "reply to this review", "get more Google reviews", or "bad review" situations.
metadata:
  updated: "2026-07-04"
---

# Compliant Review Engine

Build honest review operations: ask every real customer, reply to everything, recover service failures privately, and never gate. Reviews are the most durable local ranking + trust signal, and the fastest thing to lose to a policy violation.

## Workflow

1. **Confirm the client context:** platform focus (Google first), current review count/average, how customers are contacted post-job (text, email, in person), and who will send requests (owner, staff, automation).
2. **Read `references/review-policy-guardrails.md`.** Everything downstream obeys it.
3. **Build the request workflow** from `references/review-request-templates.md`:
   - Trigger: ask EVERY completed customer, same-day or next-day, while the experience is fresh.
   - Channel: match how the business already talks to customers (SMS converts best for local service).
   - Include the direct review link (`g.page/r/.../review` short link).
   - One follow-up after 5–7 days, then stop. Never incentivize, never pre-screen by satisfaction.
4. **Build the reply system** from `references/review-reply-playbook.md`: every review gets a reply within a week — positive ones get specific thanks (echoing a service keyword naturally, never stuffed), negative ones get the recovery flow.
5. **Negative review recovery:** respond publicly once (calm, factual, take it offline), then handle the actual fix privately. Draft both the public reply and the private outreach for the owner. Flag review-removal candidates (fake, competitor, policy-violating) with the specific Google policy they violate.
6. **Deliver the workflow doc** the owner/staff can actually run: when to ask, exact scripts, the link, who replies, escalation rule ("anything 3★ or below → owner before replying").

## Output

`review-engine-[client-slug].md` — request scripts, reply playbook, recovery flow, escalation rules. Save to `clients/[client-slug]/reviews/`. Individual reply drafts: deliver inline for owner approval; **never post replies directly.**

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. **No review gating** (filtering who gets the link by predicted rating), no incentives for reviews, no fake or seeded reviews, no discouraging negative reviewers, no employee/family reviews. Replies never admit legal liability, never share customer details (HIPAA-adjacent caution for anything health/pet-medical), never argue. All outbound messages and public replies require owner approval before sending/posting.

## After this skill

- Great new reviews → spotlight candidates for `gbp-posting-calendar` and testimonial candidates for `case-study-and-proof-builder`.
- Review-link clicks are trackable — coordinate with `lead-tracking-installer` conventions if the client wants velocity measured in reports.
