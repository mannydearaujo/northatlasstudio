---
name: north-atlas-inbox-capture
description: Pull new North Atlas Studio operational items (inbox messages, and GBP messages when a connector exists) into the vault's raw capture inbox on a schedule, without judging or filing them. Use when running the scheduled AI-native capture job, or when Manny asks to "check the North Atlas inbox" or "pull in what's new." Does not decide what matters — that is north-atlas-inbox-curate's job.
metadata:
  updated: "2026-07-22"
---

# North Atlas Inbox Capture

Mechanical pull step of the capture → curate → store → execute → experience → signal loop (see
`references/ai-native-loop.md`). This skill only moves raw items into the vault's
`01-projects/north-atlas-studio/INBOX.md`. It never decides what's important, never replies, never
files anything into `CURRENT-STATE.md`/`TASKS.md` — that's `north-atlas-inbox-curate`.

## Hard guardrail: verify the account before touching anything

North Atlas Studio and Golden Paws Pet Grooming are separate managed businesses with separate
inboxes. Before reading a single message, confirm the connected mail tool is actually authenticated
as `northatlasstudio@gmail.com`, not a client's inbox:

1. Call the Gmail-style tool's thread search with `query: "in:sent"`, `pageSize: 1`.
2. Read the `sender` field of the one returned message.
3. If it is not `northatlasstudio@gmail.com` (e.g. it's `goldenpawslexington@gmail.com` or any other
   client address), **stop immediately**, do not read further messages, and report to Manny that the
   wrong Gmail account is connected for this job. Do not proceed on a guess.

This check exists because a 2026-07-21 session found the only connected Gmail-style connector
authenticated as Golden Paws' inbox, not North Atlas's own — confirmed before any capture ran.

## Workflow

1. Run the account-identity check above. Abort on mismatch.
2. Call `list_labels` and find the ID for the `north-atlas-captured` label (create it via
   `create_label` if it doesn't exist yet). **Do not use the label's display name in a search
   query** — the Gmail tool's `label:` search operator requires the label ID (e.g. `Label_1`), not
   the name string. Using the name silently matches nothing, so the exclusion below has no effect
   and every run re-finds already-captured items. (Confirmed as a real bug 2026-07-22: a capture run
   using `-label:north-atlas-captured` returned already-labeled items alongside new ones.)
3. Read `01-projects/north-atlas-studio/INBOX.md` frontmatter for `last_run` (an ISO date). If the
   file or field doesn't exist yet, default to 7 days back for the first run.
4. Search Gmail for new items since `last_run`: threads in the inbox, excluding ones already
   labeled `north-atlas-captured`. Use a query like `in:inbox after:<last_run date> -label:<resolved label ID>`.
5. If a GBP messaging connector exists in this session (none does as of 2026-07-21 — check the
   available-tools list before assuming), pull new GBP messages the same way.
6. For each new item, append a raw entry to `01-projects/north-atlas-studio/INBOX.md` under
   `## Captured, unprocessed` — do not summarize, judge, or reword; capture sender, subject/snippet,
   date, and a link/id back to the source thread. See `references/inbox-file-format.md`.
7. Label each captured item with `north-atlas-captured` (the resolved ID from step 2) so re-runs
   don't duplicate it. Use `label_thread` first; if it returns "not found" for an ID that
   `search_threads` returned as the thread's top-level `id` (seen 2026-07-22 — the ID returned by
   search was actually a message ID, not a thread ID, for at least one real message), retry with
   `label_message` using the same ID instead.
8. Update `last_run` in the INBOX.md frontmatter to now.
9. Report a one-line count: "Captured N new items since <last_run>." Do not editorialize about
   what they mean — that's the curate skill's job, run separately (see `north-atlas-inbox-curate`).

## What this skill must never do

- Never send, reply, label as read/unread in a customer-visible way, or delete anything.
- Never touch a client's own inbox (Golden Paws, Alpha Gutter, or any future client) — this skill is
  scoped to North Atlas Studio's own operational inbox only.
- Never file captured items into `CURRENT-STATE.md`/`TASKS.md` directly; that's a separate,
  deliberate step (`north-atlas-inbox-curate`) so a bad capture run can't silently corrupt the
  project's source of truth.
