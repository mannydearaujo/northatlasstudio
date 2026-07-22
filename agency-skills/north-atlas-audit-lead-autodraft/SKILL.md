---
name: north-atlas-audit-lead-autodraft
description: Turn a captured Free Site Audit form submission into (1) a drafted, ready-to-review offer pack and (2) an auto-drafted client-safe instant-results email, ready in Gmail for Manny to send with one click. Runs ai-search-readiness-audit, then both offer-sheet-builder (+ case-study-and-proof-builder + human-copy-editor) and the instant-results email in parallel. Invoked by north-atlas-inbox-curate or north-atlas-audit-lead-watch when it recognizes a Formspree "Free Site Audit request"/"Pedido de auditoria gratuita" email; not normally invoked directly. This is Phase 2 of the AI-native operating loop (see CLAUDE.md).
metadata:
  updated: "2026-07-22"
---

# North Atlas Audit Lead Autodraft

Closes the "execute" gap Phase 2 of the AI-native operating loop names: instead of Manny noticing a
Free Site Audit submission and invoking the audit → offer chain by hand, this skill runs it the
moment `north-atlas-inbox-curate`/`north-atlas-audit-lead-watch` recognize the trigger.

**Two outputs, two different approval bars (decided 2026-07-22):**
- The **offer sheet / proposal** (priced, specific) stays fully manual — drafted only, needs Manny's
  explicit review and a deliberate send action, same as always.
- The **instant-results email** (score, top findings, strengths — no price, no specific package) is
  policy-approved to send **without per-email review** once it's genuinely ready (real audit
  completed, not test/placeholder data). **Mechanically it still lands as a Gmail draft, not a sent
  email** — the connected Gmail tool has no send action, only `create_draft` (confirmed 2026-07-22,
  even after Manny re-authorized the connector looking for one). So today "no approval gate" means
  "auto-drafted, one click to send," not literally zero-touch. Revisit this the moment a real send
  capability exists (a re-authorized connector with send scope, or a transactional email API).

## When this runs

`north-atlas-inbox-curate` invokes this skill when a captured item is from `noreply@formspree.io`
with subject `Free Site Audit request` (English) or `Pedido de auditoria gratuita` (Portuguese).
Don't invoke this skill for anything else — it is not a general lead-processing tool.

## Step 0 — Parse and sanity-check the submission

1. Parse the email's plaintext body. Formspree's format is reliably `field:\nvalue\n\n` per field.
   Extract: `name`, `business`, `website`, `email`, `goal`, `message` (message may be absent on the
   homepage form variant).
2. **Detect language from the subject and apply it to every client-facing output in this chain —
   not just the offer sheet** (made explicit 2026-07-22, per Manny's instruction): English subject
   (`Free Site Audit request`) → English throughout; Portuguese subject (`Pedido de auditoria
   gratuita`) → natural pt-BR throughout, per `CLAUDE.md`'s "Portuguese client delivery rule"
   (formal tone built around "sua empresa"). This currently covers:
   - the offer sheet (`offer-sheet-builder`'s existing language-routing rule,
     `assets/offer-template.pt-BR.html` for PT)
   - the instant-results email (`references/instant-results-email.md`, both templates included)
   - the proof block pulled in by `case-study-and-proof-builder` (translate the proof language, not
     just paste the English version, per the same Portuguese delivery rule)
   - any future client-facing addition to this chain — default new outputs to following this same
     rule rather than treating language routing as a one-off feature of the offer sheet specifically.
   **The internal audit dashboard (`ai-search-readiness-audit`'s output) stays English regardless**
   — it's for Manny's own use, never sent to the prospect, so there's nothing to route.
3. **Require a usable `website` value** (a real URL). If missing or clearly not a URL, don't run the
   chain — file this in `TASKS.md` as "needs manual follow-up: no website provided" instead, with
   the name/business/contact info that *was* given, and stop here.
4. **Sanity-check for test/placeholder data before touching a real third party's site.** If `name`
   and/or `business` look like obvious placeholders (very short, generic, or literally "test"/"Te"/
   similar) while `website` points to what looks like a real, unrelated business, do not run the
   audit against that real site — a real business didn't ask for this. File it in `TASKS.md` as
   "likely test data, not run" with the parsed fields, and stop here. (This guardrail exists because
   exactly this happened during the 2026-07-22 build: a test submission used a real, unrelated
   pizza restaurant's URL as a placeholder.) If genuinely unsure, run it anyway — false negatives
   here just mean a missed real lead; false positives mean auditing an uninvolved business for no
   reason, which is the worse failure mode.

## Step 1 — Set up the prospect workspace

Create `clients/prospecting/<YYYY-MM-DD>-<business-slug>/` (matching the existing prospecting
workspace convention already used elsewhere in this repo). Everything below saves there.

## Step 2 — Run the chain

1. **`ai-search-readiness-audit`** on the submitted `website`. This produces the internal
   `ai-search-audit-<business-slug>.html` dashboard (findings, severity, suggested pricing/scope).
   Keep this internal — never send it to the prospect as-is.
2. **`offer-sheet-builder`**, using that audit's findings plus the submitted `goal` and `message` as
   context for which offer to recommend. Produce the client-facing draft in the language detected in
   Step 0. This is the document Manny would actually send.
3. **`case-study-and-proof-builder`**, to attach the most relevant existing proof (Golden Paws or
   AlphaGutterCo) if the prospect's business type is a reasonable match. Skip this step rather than
   force a bad fit — no proof is better than mismatched proof.
4. **`human-copy-editor`**, as the mandatory pre-publish pass on the offer sheet draft — this is the
   standard gate this repo already requires before any client-facing copy ships.
5. **Instant-results email** — compose using `references/instant-results-email.md` (English or
   Portuguese per Step 0's language detection). Run this through `human-copy-editor` too — same
   pre-publish bar as the offer sheet, just because it auto-drafts doesn't mean it skips the voice/
   quality gate. Then call `create_draft`:
   - `to`: the submitter's own `email` field (not the Formspree notification address — those differ,
     confirmed on the "So Clean" lead where the notification went to `mannydearaujo@gmail.com` but
     the submitted contact was `manny878@hotmail.com`).
   - `subject`: a plain, specific line (e.g. "Your free site audit results — <business>" /
     "Resultado da sua auditoria gratuita — <business>").
   - `body`/`htmlBody`: the composed instant-results content.
   Save the exact content sent (well, drafted) to the prospect workspace too, e.g.
   `instant-results-<slug>-<date>.html`, so there's a durable record alongside the offer sheet.

## Step 3 — File it for review, per the new-client task-list rule

Per `CLAUDE.md`'s "New client task-list rule," create a practical phase-by-phase task list for this
prospect (intake → audit → findings → proposal → onboarding → build/fixes → tracking → launch →
reporting → retainer) in the prospect workspace, using `north-atlas-project-sync`'s conventions.

Then update the vault's `01-projects/north-atlas-studio/TASKS.md`: replace or resolve the "Open
Trigger" entry with **two** lines, since there are now two outputs with different next actions:
- "**Draft offer pack ready for review:** `<business>` — `clients/prospecting/<slug>/offer-<slug>-<date>.html`
  — needs Manny's go-ahead before anything is sent." (unchanged bar — full review required)
- "**Instant-results email drafted in Gmail:** `<business>` — subject '<subject>' — policy-approved
  to send, just needs Manny's one click since there's no automated send capability yet."
Do this every time, even if a draft turned out weak — Manny reviewing and deciding not to send is a
valid outcome; silently dropping a processed lead is not.

## What this skill must never do

- **Never actually send anything** — there is no send capability wired up (`create_draft` only), so
  this is enforced by the tooling today, but don't build toward auto-send without re-confirming a
  real send mechanism exists and Manny has explicitly approved skipping the click for it.
- If Step 0 declines to run (missing website, likely test/placeholder data), **neither** the offer
  sheet nor the instant-results email gets created — the decline applies to the whole chain, not
  just one output.
- Never email, message, or otherwise contact the prospect beyond the drafted (not sent)
  instant-results email. It produces files/drafts for Manny to review or one-click send, nothing
  more.
- Never skip `human-copy-editor` — a chain-generated offer sheet is exactly the case that rule
  exists for.
- Never fabricate proof, metrics, or guarantees — all the usual proof rules
  (`BUSINESS-BLUEPRINT.md` "Proof Rules") and no-guarantee language apply exactly as they would to a
  manually-built offer sheet.
- Never re-run the chain for a submission already processed (check the prospect workspace/TASKS.md
  entry first) — if something needs re-running, that's a deliberate manual call, not automatic.
