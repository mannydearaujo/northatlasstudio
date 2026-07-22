---
name: north-atlas-audit-lead-watch
description: Hourly, narrow check for new Free Site Audit form submissions specifically — not a general inbox sweep. Labels them captured and hands off directly to north-atlas-audit-lead-autodraft, so a fresh prospect doesn't wait for the once-daily north-atlas-inbox-capture/curate run. Use when running the scheduled hourly audit-lead job, or when Manny asks "did anyone submit the audit form recently."
metadata:
  updated: "2026-07-22"
---

# North Atlas Audit Lead Watch

A prospect who just filled out the Free Site Audit form shouldn't wait until the next 6 AM
capture-curate run for a draft offer to start coming together. This skill runs a narrow, hourly
check for exactly one thing — new Formspree audit-form notifications — and fires the autodraft
chain immediately. It does **not** replace `north-atlas-inbox-capture`/`north-atlas-inbox-curate`,
which still run daily and handle everything else in the inbox (general noise, other triggers).
This skill only ever touches audit-form emails; it ignores everything else in the inbox, on
purpose, so it doesn't duplicate the daily sweep's work.

## Workflow

1. **Account-identity check first, every run, no exceptions** — same as
   `north-atlas-inbox-capture`: `search_threads` with `query: "in:sent"`, `pageSize: 1`, confirm the
   sender is `northatlasstudio@gmail.com`. Abort and report if it's anything else.
2. Call `list_labels` and resolve the ID for `north-atlas-captured` (create it if missing — same
   label `north-atlas-inbox-capture` uses, so both skills stay in sync on what's already handled).
3. Search Gmail narrowly:
   `from:noreply@formspree.io subject:("Free Site Audit request" OR "Pedido de auditoria gratuita") -label:<resolved label ID>`
4. If nothing new: report "No new audit submissions this run" and stop. Don't touch anything else
   in the inbox — that's out of scope for this skill.
5. For each new match:
   a. Fetch the full message body (`get_message`, `FULL_CONTENT`) — if `get_thread`/`label_thread`
      report "not found" for the ID `search_threads` returned, that ID is likely a message ID, not
      a thread ID (seen 2026-07-22); retry with `get_message`/`label_message` instead.
   b. Label it `north-atlas-captured` immediately, before processing — so a crash mid-run can't
      cause a duplicate autodraft attempt on retry.
   c. Also append a raw entry to `01-projects/north-atlas-studio/INBOX.md`'s "Captured, unprocessed"
      → "Processed" (same file/format `north-atlas-inbox-capture` uses) so there's one consistent
      record of every captured item regardless of which watcher caught it first.
   d. Invoke `north-atlas-audit-lead-autodraft` directly with the parsed fields — do not route
      through `north-atlas-inbox-curate`'s general noise-classification first; this skill already
      knows exactly what the trigger is.
6. Report what ran: N submissions found and processed, or "none."

## What this skill must never do

- Never process anything that isn't a Formspree Free Site Audit notification — general inbox
  triage stays exclusively `north-atlas-inbox-capture`/`curate`'s job, run daily.
- Never send, publish, or contact the prospect — same drafting-only boundary as
  `north-atlas-audit-lead-autodraft`.
- Never run more than once an hour in practice — if launchd/the scheduler fires it more often than
  intended, the label-before-processing step (5b) still prevents double-drafting the same
  submission, but the schedule itself should stay hourly, not tighter, to avoid unnecessary API use.
