---
name: north-atlas-signal-health-watch
description: Pull real-lead GA4 events and Search Console performance for every property in scripts/signal-registry.json, compare against the last run, write current numbers into the vault's north-atlas-studio CURRENT-STATE.md, and raise anomalies (a lead-volume drop, a ranking/clicks drop) as new INBOX.md items for north-atlas-inbox-curate to act on. Use when running the scheduled signal-loop job, or when Manny asks "how are the tracked properties doing" or "did anything drop this week."
metadata:
  updated: "2026-07-22"
---

# North Atlas Signal Health Watch

The "signal" stage of the capture → curate → store → execute → experience → signal AI-native loop
(see `north-atlas-inbox-capture`'s `references/ai-native-loop.md`). Pulls real GA4/Search Console
data via a service account (headless, no interactive OAuth — see `scripts/ga4-report.mjs` and
`scripts/search-console-report.mjs`), writes findings back into the brain, and flags anomalies as
triggers — closing the loop from "something changed in the market" back to "something to work on."

## Prerequisites

- `GA4_SERVICE_ACCOUNT_KEY_PATH` set in `.env`, pointing at a service-account JSON key stored
  **outside this repo** (e.g. `~/.secrets/`).
- That service account granted Viewer access on each GA4 property (GA4 Admin > Property Access
  Management) and Restricted/Full access on each Search Console property (Settings > Users and
  permissions) listed in `scripts/signal-registry.json`.
- Verify access with `node scripts/ga4-report.mjs --list` and
  `node scripts/search-console-report.mjs --list` before trusting a run — if a property that should
  be visible isn't, stop and flag it rather than silently skipping it.

## Workflow

1. Read `scripts/signal-registry.json` for the list of watched properties (name, GA4 property ID,
   real-lead event names, Search Console site URL).
2. Read `01-projects/north-atlas-studio/SIGNAL-HISTORY.json` in the vault (create it, empty, if it
   doesn't exist yet — see `references/signal-history-format.md`).
3. For each property in the registry:
   a. Run `node scripts/ga4-report.mjs <ga4PropertyId> --events=<realLeadEvents joined by comma> --days=7 --format=json` from the repo root.
   b. Run `node scripts/search-console-report.mjs <searchConsoleSiteUrl> --dimensions= --days=28 --format=json` (empty `--dimensions=` returns one aggregate row for the period: total clicks/impressions/CTR/position).
   c. If either pull fails (auth error, property not found, API disabled), don't skip silently —
      this is itself a signal (the service account may have lost access). Record it as its own
      anomaly: "Signal pull failed for <property>: <error>".
   d. Compare this run's real-lead event counts and Search Console clicks against the last stored
      reading for that property. Flag an anomaly if:
      - A real-lead event that was previously non-zero drops to zero, or drops more than ~40%
        run-over-run.
      - Search Console clicks drop more than ~30% run-over-run.
      - Do not flag improvements — only regressions need a trigger.
   e. Update the history entry for that property with this run's numbers and timestamp.
4. Rewrite (not append-forever) a "Signal Watch" section in
   `01-projects/north-atlas-studio/CURRENT-STATE.md` with the latest numbers per property and the
   run timestamp — this section always reflects the most recent pull, not a growing log.
5. For each anomaly found, append a new entry to `01-projects/north-atlas-studio/INBOX.md` under
   "Captured, unprocessed" (same file `north-atlas-inbox-capture` writes to), tagged as a signal
   trigger so `north-atlas-inbox-curate` picks it up on its next pass like any other trigger — it
   still defaults to "needs Manny's go-ahead," never auto-acts.
6. Write `SIGNAL-HISTORY.json` back to the vault.
7. Report a short summary: current numbers per property, and call out any anomalies by name. If
   nothing changed meaningfully, say so plainly rather than padding the report.

## Guardrails

- This is internal signal only — it feeds the vault's own task/priority tracking, never a
  client-facing report. Weekly client reports still go through `weekly-client-report-generator`.
- Apply the same measurement philosophy as everywhere else in this repo (see `CLAUDE.md`
  "Measurement Rules" and `BUSINESS-BLUEPRINT.md` "Proof Rules"): a phone tap is not a completed
  job or customer; don't editorialize beyond what the numbers actually show.
- Never make or draft a public/client-facing claim from a health-watch finding without going
  through the normal proof/approval process.
- This skill only ever writes to internal vault files (`CURRENT-STATE.md`, `INBOX.md`,
  `SIGNAL-HISTORY.json`) — already-approved territory per the vault's `APPROVAL-MATRIX.md`. It
  never sends, publishes, or acts on a flagged anomaly itself.
