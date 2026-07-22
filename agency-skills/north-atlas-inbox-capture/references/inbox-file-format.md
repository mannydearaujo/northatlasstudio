# `01-projects/north-atlas-studio/INBOX.md` format

```markdown
---
type: inbox
project: north-atlas-studio
status: active
owner: Manny
last_run: 2026-07-21T00:00:00Z
tags: [north-atlas-studio, inbox]
---

# North Atlas Studio - Capture Inbox

Raw, unprocessed items land here. Nothing in this file has been judged, filed, or acted on yet —
that happens in `north-atlas-inbox-curate`, which reads this file and clears processed entries into
`CURRENT-STATE.md`/`TASKS.md`.

## Captured, unprocessed

- [2026-07-21T14:03:00Z] Gmail thread `19f7aed...` — from prospect@example.com — "Re: Free Site
  Audit follow-up" — snippet: "...thanks for sending this over, can we..." — source: inbox

## Processed (curate appends here with a pointer, does not delete the raw entry)

- [2026-07-21T15:00:00Z] Curated → filed as TASKS.md item "Follow up with [prospect]" — trigger:
  prospect reply
```

Rules:

- Capture only ever appends under "Captured, unprocessed" and updates `last_run`.
- Curate is the only skill allowed to move an entry from "Captured, unprocessed" to "Processed."
- Keep raw entries factual (sender, subject, snippet, date, source id) — no interpretation, so a
  bad curate run can always be re-derived from the untouched raw capture.
