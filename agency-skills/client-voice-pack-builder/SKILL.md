---
name: client-voice-pack-builder
description: Create reusable client voice reference files for North Atlas Studio website copy, GBP posts, blogs, outreach, reports, and case studies. Use when onboarding a client, extracting tone from existing copy/reviews/social/email, defining vocabulary, banned phrases, proof points, offer language, owner voice, or preventing generic AI-sounding content. Also use when copy "doesn't sound like the client" or a new client needs a voice pack before any writing starts.
metadata:
  updated: "2026-07-04"
---

# Client Voice Pack Builder

Extract how a real business owner actually talks and lock it into five compact files every writing skill reads before producing copy. A voice pack is the difference between "trusted local groomer since 2015" written by a person and generic AI filler.

## Workflow

1. **Gather source material** (in priority order — more owner-authored material beats more volume):
   - Anything the owner wrote themselves: texts, emails, quote replies, social captions
   - Existing site copy (note which parts the owner likes/hates)
   - Google reviews — BOTH directions: how customers describe the business (their vocabulary becomes your vocabulary) and how the owner replies
   - Intake conversation notes; competitor copy (only to define what to avoid)
2. **Extract patterns** using `references/voice-extraction-checklist.md`: recurring phrases, sentence length/rhythm, formality level, humor, how they handle price talk, what they refuse to say.
3. **Write the five files** using the templates in `references/voice-pack-file-templates.md`:
   - `tone.md` — register, rhythm, 3 verbatim owner lines as calibration examples
   - `vocabulary.md` — words the owner/customers use, including "wrong" trade terms customers search for
   - `banned-phrases.md` — client-specific bans + the universal AI-tell list (inherit from `human-copy-editor`)
   - `proof-points.md` — verifiable facts only (years in business, certifications, real differentiators); mark anything unconfirmed as NEEDS CONFIRMATION
   - `service-language.md` — how THEY describe each service, price-talk rules (e.g., Golden Paws: "cash discount," never "card price"), CTA phrasing
4. **Calibration test:** write two 3-sentence samples about the same service — one in-voice, one generic. Show the owner (or Manny). If they can't instantly pick theirs, extract deeper.
5. **File placement:** save to `clients/[client-slug]/voice/`. Note the pack's location in the client's operating manual (`client-site-operating-manual`).

## Output

Five markdown files in `clients/[client-slug]/voice/` + a one-paragraph usage note at the top of `tone.md` telling any future writer/skill to read all five before drafting.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Facts in `proof-points.md` must be verified or explicitly flagged — a voice pack with an unverified "20 years in business" poisons every future deliverable. Don't sand the owner's quirks off: if they're blunt about pricing or funny about wet dogs, that IS the voice.

## After this skill

- `seo-content-writer`, `gbp-posting-calendar`, `case-study-and-proof-builder`, and `human-copy-editor` must read the voice pack before producing client copy.
- Register the pack in the client operating manual via `client-site-operating-manual`.
