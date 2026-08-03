---
name: north-atlas-pipeline-smoke-test
description: >-
  Daily end-to-end health check for the Free Site Audit lead pipeline (Formspree form →
  mannydearaujo@gmail.com → Gmail filter → northatlasstudio@gmail.com → capture/curate or
  north-atlas-audit-lead-watch → north-atlas-audit-lead-autodraft's decline logic). Submits a
  clearly-marked synthetic test through the real form, then checks whether a *previous* run's
  test was correctly picked up and declined as test data, catching silent breakage anywhere in the
  chain before it costs a real lead. Use when running the scheduled daily pipeline health-check
  job, or when Manny asks "is the audit form pipeline actually still working."
metadata:
  updated: "2026-07-23"
---

# North Atlas Pipeline Smoke Test

Inspired by the end-to-end signup test pattern described in the Ryan Carson/Untangle review
(2026-07-23 session): a real business shouldn't have to be the one who discovers the lead pipeline
silently broke. This skill periodically sends a real, harmless submission through the actual
Formspree form and confirms the whole chain — webhook, email delivery, Gmail filter, capture,
and the decline logic in `north-atlas-audit-lead-autodraft` — is still alive, without ever risking
a real audit running against an unrelated business.

**This never contacts a real prospect and never runs a real audit.** The synthetic submission is
designed to be caught by `north-atlas-audit-lead-autodraft`'s existing Step 0 test-data guardrail
every time — this skill exercises that guardrail on purpose, it doesn't bypass or duplicate it.

## Why one skill, not "submit" and "check" as two skills

Verifying a submission requires waiting for Gmail delivery and the next `north-atlas-audit-lead-watch`
cycle — that can't happen inside a single synchronous run. Instead this skill carries state between
runs: each run first checks on the *previous* run's pending submission, then (if nothing is
currently pending) submits a fresh one for the next run to check. Exactly one test is ever "in
flight" at a time.

## State file

`01-projects/north-atlas-studio/PIPELINE-SMOKE-TEST-STATE.json` in the vault (same directory as
`SIGNAL-HISTORY.json`, following that existing pattern). Shape:

```json
{
  "status": "resolved | pending | failed",
  "lastMarker": "SMOKETEST-2026-07-23T06:00:00Z",
  "lastSubmittedAt": "2026-07-23T06:00:00Z",
  "lastResolvedAt": "2026-07-22T06:14:00Z",
  "history": [
    {"marker": "...", "submittedAt": "...", "resolvedAt": "...", "outcome": "resolved|failed"}
  ]
}
```

If the file doesn't exist yet, treat it as `{"status": "resolved", "lastMarker": null, "history": []}`
(i.e., safe to submit a first test immediately).

## Workflow

### Step 1 — Load state and branch

Read the state file. If `status` is `"pending"`, go to Step 2 (check for resolution). If `status` is
`"resolved"`, go to Step 3 (submit a new test). If `status` is `"failed"`, go to Step 2a first
(staleness check) before deciding whether to retry.

### Step 2 — Check whether the pending test resolved

1. **Account-identity check first, every run** — same as every other skill that touches this
   inbox: `search_threads` with `query: "in:sent"`, `pageSize: 1`, confirm the sender is
   `northatlasstudio@gmail.com`. Abort and report if it's anything else — don't silently check the
   wrong mailbox.
2. Compute elapsed time since `lastSubmittedAt`.
3. Look for evidence the chain processed `lastMarker` **and declined it correctly**:
   - Search Gmail: `subject:"Free Site Audit request" "<lastMarker>"` — check whether it's labeled
     `north-atlas-captured`.
   - Grep the vault's `01-projects/north-atlas-studio/TASKS.md` and `INBOX.md` for `<lastMarker>` —
     a correctly-working chain files this as "likely test data, not run" (the exact pattern used for
     the real accidental test case on 2026-07-22), per `north-atlas-audit-lead-autodraft`'s Step 0.4.
4. **Outcome — resolved (success):** the marker shows up captured/labeled AND declined as test
   data, not actually audited. Update state: `status: "resolved"`, `lastResolvedAt: now`, append to
   `history` with `outcome: "resolved"`. Report "Pipeline healthy — smoke test resolved in
   `<elapsed>`." Proceed to Step 3 in the same run (submit the next one) only if this run's cadence
   calls for it — otherwise stop here and let the next scheduled run submit fresh.
5. **Outcome — unexpected processing (a different kind of failure):** the marker was captured but
   an actual audit was run against `https://example.com` instead of being declined. This means the
   test-data guardrail itself regressed — flag this explicitly and distinctly from "no response at
   all," since it's a bug in `north-atlas-audit-lead-autodraft`, not a delivery-chain break. File it
   in `TASKS.md` under "Flagged for separate investigation."
6. **Outcome — still pending, within window:** elapsed time is under the failure threshold (48
   hours — roughly 190x the 15-minute `north-atlas-audit-lead-watch` cadence, generous on purpose to
   avoid false alarms from a slow morning). Report "Still pending, `<elapsed>` since submission,
   within the 48h window" and stop. Do not submit a new test while one is already in flight.
7. **Outcome — failed (no trace after 48h):** File a clearly-flagged entry in `TASKS.md`'s "Flagged
   for separate investigation" section: submission marker, submitted timestamp, and a concrete
   checklist of what to look at first — Formspree dashboard delivery log for that submission, the
   `mannydearaujo@gmail.com` → `northatlasstudio@gmail.com` Gmail filter rule, the
   `north-atlas-captured` Gmail label, and `north-atlas-audit-lead-watch`'s launchd job/logs. Update
   state: `status: "failed"`, append to `history` with `outcome: "failed"`. **Do not submit a new
   test in the same run** — a known failure shouldn't get buried under a fresh one.

### Step 2a — Staleness check (only when `status` is already `"failed"`)

If the last flagged failure is itself more than 7 days old, treat it as stale (Manny may not have
seen it yet) and proceed to Step 3 to try again automatically — but note in the new TASKS.md/history
entry that this is "retry after unresolved prior failure," so it's clear this isn't a fresh, isolated
incident. If the failure is less than 7 days old, stop here — don't resubmit or re-flag on every run;
one clear flag is enough until it's acknowledged or ages out.

### Step 3 — Submit a new synthetic test

1. Generate a marker: `SMOKETEST-<current UTC ISO 8601 timestamp>`.
2. POST to the real form endpoint, matching the exact field names in `contact/index.html`'s
   `#audit-form` — **do not guess these, they must match production exactly:**
   ```bash
   curl -sS -X POST https://formspree.io/f/xbdvwyka \
     -H "Accept: application/json" \
     -F "_subject=Free Site Audit request" \
     -F "_gotcha=" \
     -F "name=North Atlas Pipeline Smoke Test" \
     -F "business=<marker> — automated pipeline check, do not process" \
     -F "website=https://example.com" \
     -F "email=mannydearaujo@gmail.com" \
     -F "message=Automated end-to-end pipeline smoke test. Expected to be auto-declined as placeholder test data — see agency-skills/north-atlas-pipeline-smoke-test."
   ```
   **`_gotcha` must be submitted empty** — it's Formspree's honeypot field; filling it causes
   Formspree to silently discard the submission as spam, which would look identical to a real
   pipeline failure. Leave `goal` unset — it's not required and isn't needed for this check.
3. Check the HTTP response. A non-2xx status or an error in the JSON body means **the submission
   itself failed** — flag this immediately as "Formspree submission failed" (a different, faster
   failure signal than a downstream chain break) rather than waiting 48 hours to notice nothing
   arrived. Do not update state to `"pending"` in this case — nothing is actually in flight.
4. On a successful submission: update state — `status: "pending"`, `lastMarker`, `lastSubmittedAt:
   now`. Report "Smoke test submitted, marker `<marker>`, will verify on a future run."

## Recommended cadence

Once daily, scheduled shortly before the existing 6:00 AM `com.northatlasstudio.capture-curate`
launchd job (e.g. 5:45 AM) — so a submission has already had a full day (and the 15-minute
`audit-lead-watch` cadence, many times over) to resolve before the next run checks it. Not tied to
Formspree's notification volume in any way that matters at this frequency, but avoid running it more
often than daily — there's no benefit to catching a break faster than a day, and it needlessly adds
to Formspree's submission count against the account's plan limits.

## What this skill must never do

- **Never let a synthetic submission reach `offer-sheet-builder`, `case-study-and-proof-builder`, or
  any client-facing output.** If that ever happens, it's the most serious possible failure mode this
  skill can surface (see Step 2.5) — report it loudly, don't quietly clean it up.
- **Never fill the `_gotcha` honeypot field.** Doing so would make every test look like a delivery
  failure regardless of whether the pipeline actually works.
- **Never submit a new test while one is already `"pending"` or a `"failed"` flag is less than 7
  days old.** Exactly one test in flight at a time, and don't pile retries on top of an
  unacknowledged failure.
- **Never treat "captured but not yet declined" as a failure inside the 48-hour window** — Gmail
  delivery and the watch cadence both take a little real time; only flag after the window elapses.
- **Never touch anything else in the inbox.** Like `north-atlas-audit-lead-watch`, this skill only
  ever looks for its own marker — general inbox triage stays `inbox-pull`/`curate`'s
  job.
