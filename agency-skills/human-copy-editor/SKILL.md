---
name: human-copy-editor
description: Audit or rewrite copy so it reads like a real business owner wrote it, not AI. Use on any North Atlas Studio client copy (web pages, blogs, GBP posts, outreach emails, offer sheets, case studies) before it ships — to detect AI-tells, banned phrases, rhythm problems, and vague filler, and to rewrite in the client's real voice. Trigger on "sounds like AI", "make this sound human", "humanize this", "review the copy", "does this pass", or as the standard pre-publish pass after seo-content-writer or any content generation.
metadata:
  updated: "2026-07-04"
---

# Human Copy Editor

The last line of defense against AI-sounding copy. Two modes: **audit** (score existing copy, list violations with line evidence) and **rewrite** (fix it in the client's voice). Local business customers trust copy that sounds like the person who'll show up at their door; AI-flavored copy quietly kills that trust — and increasingly, readers can smell it.

## Workflow

1. **Confirm mode and voice source.** Audit, rewrite, or both? Is there a client voice pack (`clients/[slug]/voice/`)? Read all five voice files if so. No voice pack → say the rewrite will be "generic-human" and recommend `client-voice-pack-builder`.
2. **Run the tell detector** (`references/ai-tells.md`): banned lexicon, structural tells (rule-of-three abuse, "it's not just X, it's Y", em-dash chains, every-paragraph-is-three-sentences rhythm), and vagueness tells (benefits with no mechanism, superlatives with no evidence).
3. **Run the specificity test** (`references/specificity-rules.md`): could this sentence appear on any competitor's site? If yes, it says nothing. Every claim should carry a concrete: a number, a place, a process detail, a real constraint, a price factor.
4. **Audit mode output:** score /100 (rubric in `references/ai-tells.md`), violations grouped by severity with quoted evidence and a suggested fix for each. Top of report: the three sentences that most need to die.
5. **Rewrite mode:** fix worst-first. Preserve meaning, SEO intent (keep the H-structure and answer-first blocks — this skill de-AIs copy, it doesn't de-SEO it), and all verified facts. Inject voice-pack vocabulary and rhythm. Read it aloud mentally — if a sentence can't be said in one breath by a person on a job site, break it.
6. **Diff summary:** show before/after for the biggest fixes so Manny can calibrate his own writing over time.

## Output

- Audit: `copy-audit-[slug]-[YYYY-MM-DD].md` (score, violations, evidence, fixes) or inline when quick.
- Rewrite: the corrected file/text + a short before/after diff of the top changes.

## Guardrails

Never introduce facts, claims, offers, or local details the source didn't contain — humanizing is style surgery, not fact surgery. Never strip verified proof points to make copy "punchier." Keep the client's banned-phrases list absolute (e.g., Golden Paws: no em-dashes anywhere, never "one dog at a time"). Don't over-correct into fake folksiness — a real owner is plain, not cute. Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume.

## After this skill

- This is the standard pre-publish gate after `seo-content-writer`, `gbp-posting-calendar`, `case-study-and-proof-builder`, `offer-sheet-builder`, and outreach drafting.
- Recurring client-specific violations → add them to the client's `banned-phrases.md` via `client-voice-pack-builder`.
