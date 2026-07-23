---
name: ai-operations-check
description: >-
  Run North Atlas Studio's "AI Operations Check" — the free ~20-minute discovery call named in
  BUSINESS-BLUEPRINT.md's Offer Stack — with a local business owner: pull out real time-consuming
  bottlenecks, and prescribe fixes (existing AI Operations installs first, off-the-shelf AI/SaaS
  tools second) sized to a business that small. Use this whenever Manny is prepping for, running, or
  has just finished an AI Operations Check call; needs to analyze a business-workflow discovery call
  transcript; or needs to work out which install(s) to recommend and roughly price for a prospect. It
  is the AI-operations analog to `ai-search-readiness-audit` — same internal-diagnostic role, applied
  to a business's day-to-day workflows instead of its website. It DIAGNOSES; it does not build the
  automation (that's a hand-built n8n workflow, Claude skill, or custom GPT once scope is agreed) and
  it does not write the client-facing pitch (`offer-sheet-builder` does that from this skill's
  findings).
metadata:
  updated: "2026-07-23"
---

# AI Operations Check

This skill turns North Atlas Studio's "AI Operations Check" — the free, ~20-minute call in Core
Service #4 (`BUSINESS-BLUEPRINT.md` § "AI Operations Installs") — into a repeatable diagnostic. It
takes a discovery-call transcript (or Manny's own notes if there's no recorder), pulls out the
owner's real bottlenecks, and prescribes fixes: **the existing AI Operations catalog first, general
off-the-shelf AI/SaaS tools second.** Output is an internal findings note for Manny's own scoping and
pricing decision — never a client-facing document.

**This report is internal, not client-facing**, exactly like `ai-search-readiness-audit`. When
findings are ready to become a real pitch, hand off to `offer-sheet-builder`. That skill decides the
client-facing framing, price, and format; this skill only diagnoses and suggests.

## Where this sits relative to the rest of the AI Ops line

- The free call itself can still end in a **live-priced offer on the spot** — that's the whole point
  of keeping it to ~20 minutes, per the Offer Stack. This skill is not a mandatory extra step between
  the call and closing; most calls don't need it.
- Reach for this skill when the call surfaced **more than fits in 20 minutes of live judgment** — a
  business with several real bottlenecks, a prospect worth a written follow-up, or any case where
  Manny wants a documented internal record before deciding scope/price. Running it is a judgment
  call, not a checklist requirement for every call.
- It never invents a new offer tier. Recommendations map back to the **Offer Stack rows that already
  exist** (`report automation` / `missed-call text-back and lead capture` / `review request and
  reply, invoice follow-up`) wherever the fit is real. Only reach past that catalog when nothing in it
  actually solves the stated bottleneck — see Step 3.

## Messaging guardrails (apply to every word of output)

- **Augment, never replace.** Per `CLAUDE.md`'s AI Operations guardrail: every recommendation frames
  AI as giving the owner (and their existing team) time back for higher-value work. Never suggest or
  imply headcount reduction, "doing more with fewer people," or replacing staff — even as a passing
  aside.
- **No fabricated or inflated ROI.** Estimate hours reclaimed conservatively from what the owner
  actually described, not from a generic industry benchmark. If you can't find a real, defensible
  time-saving in the conversation, say so — do not manufacture one to make the report look better,
  per the no-fake-data guardrails already governing `ai-search-readiness-audit` and
  `seo-content-writer`.
- **Right-size every recommendation to the business.** A 3-person landscaping outfit does not need
  Salesforce. Treat any AI-suggested tool as a first draft, not a final answer — always sanity-check
  scale, cost, and complexity against the actual business size and stated budget signals before it
  goes in the report.
- **Never promise a specific dollar ROI as guaranteed.** Financial-impact framing is illustrative
  ("could free up roughly N hours/week") not a commitment — consistent with the no-guarantee language
  already required on offer sheets.

## Language routing

Keep this internal diagnostic in English regardless of the prospect's language, same as
`ai-search-readiness-audit`. If the lead is Portuguese-speaking or came through `/pt/`, the
client-facing hand-off (`offer-sheet-builder`) is where Portuguese applies — not here.

## Workflow

### Step 1 — Confirm inputs

You need either a **call transcript** (Fathom, Otter, Fireflies, or similar AI notetaker — put one on
every AI Operations Check call going forward) or, if no recorder was used, **Manny's own notes** from
the call. You also need basic business context: name, industry/vertical, rough size (employee count,
revenue band if known) — this is what makes Step 3's right-sizing possible.

If neither a transcript nor notes exist yet, this skill has nothing to work from — say so rather than
guessing at what the call covered.

### Step 2 — Extract bottlenecks

Read the transcript/notes and pull out concrete, specific pain points — not categories. Anchor each
one to something the owner actually said (a quote or close paraphrase), the way `seo-content-writer`
and `ai-search-readiness-audit` require evidence over general assertion. Good prompts to listen for,
borrowed from the discovery-call pattern this skill assumes Manny is already running:

- What eats the most time in a typical week?
- What have they already tried to fix or automate, and why did it not stick?
- What's the one process they'd delete if they could?

Note anything that sounds like a workaround for a missing tool (e.g., "I just keep it all in my
head" / "my wife does that on Sundays") — those are often the highest-signal findings.

### Step 3 — Match bottlenecks to fixes

For each bottleneck, check in this order:

1. **Does an existing AI Operations install solve it?** Check the three cataloged in
   `BUSINESS-BLUEPRINT.md` first — report automation, missed-call text-back/lead capture, review
   request/reply and invoice follow-up. Prefer these whenever the fit is real: North Atlas already
   knows how to build, price, and support them.
2. **If not, does a general off-the-shelf SaaS/AI tool solve it outright?** Read
   `references/tool-research-sources.md` for where and how to research this responsibly. Most of the
   time this is a plain SaaS tool the owner simply didn't know existed — it doesn't need to involve AI
   at all.
3. **If the "fix" is really a broken process, not a missing tool, say so.** Some bottlenecks (e.g., a
   16-step workflow that should be 7) need to be redesigned before anything gets automated — recommend
   fixing the process itself as the finding, flagged as a candidate for a **process redesign**
   engagement (see `references/tool-research-sources.md` § "Beyond the current catalog" — this is a
   candidate addition to the Offer Stack, not yet priced or approved; note it as a finding, don't
   quote a price for it without checking with Manny first).
4. **If nothing off-the-shelf fits and the workflow is genuinely proprietary to this business**, note
   it as a **custom build candidate** (a purpose-built Claude skill, or a small knowledge base/custom
   GPT trained on the business's own materials) rather than forcing a generic tool onto it. Same
   pricing caveat as above — flag it, don't price it here.

### Step 4 — Classify effort vs. impact

Sort every recommendation into one of two buckets, using `references/effort-impact-framework.md`:

- **Quick wins** — high impact, low effort. This is almost always where the existing AI Operations
  catalog and simple SaaS swaps land. These are what the free check itself can typically close on the
  spot.
- **Bigger opportunities** — high impact, higher effort (process redesign, custom builds, anything
  needing more than a sign-up-and-go install). These are what turn into a follow-up conversation, not
  something to close live in a 20-minute call.

### Step 5 — Estimate time impact (conservatively)

For each quick win, estimate hours/week reclaimed **based on what the owner actually described**, not
a generic benchmark. State the estimate as a range, not a single confident number, and note the
guardrail from above: this is illustrative, not a guarantee. Do not attempt a formal "monthly net ROI"
dollar figure unless the owner gave you their own hourly-value estimate to multiply against — don't
invent one.

### Step 6 — Suggested scope/pricing (internal only)

For each recommended fix, note which existing Offer Stack row it maps to (with its existing price
band from `BUSINESS-BLUEPRINT.md`) or, if it's a candidate for something not yet in the Offer Stack
(process redesign, knowledge system, custom build), say so plainly and **do not assign it a number** —
that's a pricing decision for Manny, not this skill. This section is for Manny's own scoping, the same
way `ai-search-readiness-audit`'s Step 7 works — internal shorthand, not a pitch.

### Step 7 — Write the internal findings note

Default output is a **concise internal Markdown note** — most AI Operations Checks are short calls
that close live, and a full branded dashboard would be overkill for that. Structure:

1. **Business snapshot** — name, vertical, rough size, call date.
2. **Bottlenecks found** — each with its supporting quote/evidence.
3. **Recommended fixes** — grouped Quick wins / Bigger opportunities, each tied to a bottleneck, each
   noting which Offer Stack row it maps to (or flagged as "not yet in the Offer Stack" per Step 6).
4. **Estimated time impact** — conservative range, framed as illustrative.
5. **Suggested next step** — close live vs. needs a follow-up conversation, and why.

Save as `clients/prospecting/<slug>/ai-ops-check-<slug>-<date>.md` (or the client's own
`clients/<slug>/` workspace if this is an existing client, not a new prospect).

**Escalate to the full branded HTML KPI-dashboard format** (matching `ai-search-readiness-audit`'s
`assets/report-template.html` shell and the shared dashboard styling in `styles/atlas-brand.css`)
only when the opportunity clearly warrants the fuller writeup — several real findings, a
larger/higher-value prospect, or Manny explicitly asks for the dashboard version. That template does
not exist yet for this skill; build it reusing the existing shell's visual system rather than
inventing a new one, and treat that as a follow-up task, not a blocker to shipping the Markdown
version today.

## What good looks like

- Every bottleneck is **specific to this business**, backed by something the owner actually said —
  never a generic checklist.
- Every recommendation is **right-sized** — no enterprise tooling pitched at a 3-person shop, no
  vague "just use AI" hand-waving.
- The existing AI Operations catalog is checked **before** reaching for anything else.
- Time-impact estimates are **conservative and framed as illustrative**, never a guarantee.
- Nothing outside the current Offer Stack gets a price attached without flagging it as a decision for
  Manny first.
- It ends pointing at a decision for Manny — close live, or hand off to `offer-sheet-builder` — never
  a client-facing CTA.
