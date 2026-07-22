# `01-projects/north-atlas-studio/SIGNAL-HISTORY.json` format

Stores the last reading per property so the health-watch skill can detect week-over-week (or
run-over-run) regressions. Not vault "brain" prose — a small structured data file the skill reads
and rewrites each run.

```json
{
  "lastRun": "2026-07-22T02:00:00Z",
  "properties": {
    "North Atlas Studio": {
      "ga4PropertyId": "544258578",
      "lastRunAt": "2026-07-22T02:00:00Z",
      "realLeadEvents": { "generate_lead": 1 },
      "searchConsole": { "clicks": 0, "impressions": 42, "ctr": 0, "position": 88.2 }
    },
    "Golden Paws Pet Grooming": {
      "ga4PropertyId": "531392086",
      "lastRunAt": "2026-07-22T02:00:00Z",
      "realLeadEvents": { "booking_click": 252, "phone_tap": 16 },
      "searchConsole": { "clicks": 62, "impressions": 310, "ctr": 0.2, "position": 3.1 }
    }
  }
}
```

Rules:

- Keyed by property `name` (must match `scripts/signal-registry.json` entries).
- Overwrite each property's entry every run — this is current-state, not an append-only log. If a
  trend history beyond "last run vs. this run" is ever needed, that's a deliberate future upgrade,
  not something to build ahead of need.
- If a property is removed from `signal-registry.json`, leave its old history entry in place rather
  than deleting it, in case it's re-added later — but don't report on it while it's absent from the
  registry.
