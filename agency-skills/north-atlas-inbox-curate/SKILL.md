---
name: north-atlas-inbox-curate
description: File captured North Atlas Studio inbox items (from north-atlas-inbox-curate's companion capture step) into the vault's CURRENT-STATE.md/TASKS.md, discard noise, and flag anything that looks like a trigger for another skill or workflow. Use after north-atlas-inbox-capture has run, or when Manny asks to "process the North Atlas inbox" or "what's new that needs my attention."
metadata:
  updated: "2026-07-22"
---

# North Atlas Inbox Curate

Judgment step of the capture → curate → store loop. Reads
`01-projects/north-atlas-studio/INBOX.md`'s "Captured, unprocessed" section and decides, per item,
whether it's noise, a task, a decision Manny needs to make, or a trigger for another skill/workflow.

## Workflow

1. Read `01-projects/north-atlas-studio/INBOX.md`. If "Captured, unprocessed" is empty, report that
   and stop — nothing to do.
2. For each unprocessed item, classify it:
   - **Noise** — automated notifications, spam, anything with no action or record value. Discard:
     move to "Processed" with a one-line "discarded — <reason>" note, nothing else.
   - **Task** — a concrete follow-up (reply to a prospect, confirm a detail, chase a payment). Add
     it to `01-projects/north-atlas-studio/TASKS.md` under `## Now` or `## Next` using the existing
     checkbox format, then mark it processed in INBOX.md with a pointer to the TASKS.md line.
   - **Decision Manny needs to make** — pricing, scope, or anything the Clarifying Questions Rule in
     this repo's `CLAUDE.md` would flag. Add it to TASKS.md tagged `Manny decision needed` (matching
     the existing convention already used in `CURRENT-STATE.md`'s "Open Work" section) rather than
     guessing.
   - **Trigger** — an event another workflow should react to: a prospect replied, a client asked a
     direct question, a review posted. Record it under a new `## Open Triggers` section in
     `TASKS.md` (create the section if it doesn't exist) with: what happened, which skill/workflow
     should handle it, and whether it's approved to run automatically or needs Manny's go-ahead
     first. Every trigger defaults to "needs Manny's go-ahead" before anything **external** happens
     — do not assume approval just because a trigger was detected. **Exception below** for the one
     trigger type Phase 2 auto-drafts.
   - **Free Site Audit form submission (special case, Phase 2)** — recognized by sender
     `noreply@formspree.io` with subject `Free Site Audit request` or `Pedido de auditoria
     gratuita`. Don't just file this as a generic Open Trigger — invoke the
     `north-atlas-audit-lead-autodraft` skill on it directly. That skill produces only a draft
     (pre-approved territory, same as any other drafted report), never sends anything, and files its
     own "ready for review" entry in `TASKS.md` when done. If that skill declines to run (missing
     website, likely test data), file whatever it reports instead of retrying or guessing.
3. Update `CURRENT-STATE.md`'s "Recent Work" / "Open Work" if the curated items add real new
   context (a new prospect, a client update) — don't restate what's already there.
4. Never draft outreach, send anything, or act on a trigger during curation itself. Curation only
   files and flags; execution is a separate, explicitly approved step.
5. Report a short summary: N items curated, broken down by noise/task/decision/trigger, and call
   out anything filed under "Manny decision needed" or "Open Triggers" by name so it doesn't get lost
   in a file diff.

## Guardrails

- This skill never has send/publish/delete authority — it only writes to the vault's own
  `TASKS.md`/`CURRENT-STATE.md`, which is internal, already-approved territory per the vault's
  `05-automations/APPROVAL-MATRIX.md` ("Allowed without extra approval: update internal task lists,
  update internal project current-state files").
- If an item looks like it needs an immediate external reply (e.g. an urgent client issue), still
  don't reply from here — file it as a high-priority "Open Trigger" and say so plainly in the report
  back to Manny, rather than silently queuing it at normal priority.
- Keep noise-discarding conservative: if genuinely unsure whether something matters, file it as a
  task or decision rather than discarding it. Silent data loss is worse than an extra line in
  TASKS.md.
