# The six-stage AI-native loop (North Atlas Studio)

Source: 2026-07-21 handoff, "make North Atlas Studio fully AI-native" (Greg Isenberg / Theo Taba
framing: people manage agents, agents read and write to a shared context, the company gets smarter
over time).

| Stage | What it means here | Status as of 2026-07-21 |
|---|---|---|
| Store | The vault (`manny-ai-os`) + this repo's own docs are the shared brain | Full |
| Execute | Skill chains exist (content-pipeline, site-auditor, new-client-onboarding, offer-sheet-builder, etc.) | Full, but Manny invokes them by hand |
| Capture | Pull new inbox/GBP items in automatically | Gap — this skill starts closing it |
| Curate | File captured items into the brain, discard noise, flag triggers | Gap — see `north-atlas-inbox-curate` |
| Experience | Clients see the output (site, reports), never the machine | Partial, by design — no change needed here |
| Signal | GA4/Search Console data flows back into priorities automatically | Gap — needs a GA4 Data API + Search Console API service account (Phase 3, not yet built as of 2026-07-21) |

Full phased build plan lives in the 2026-07-21 conversation handoff and should be mirrored into
`01-projects/north-atlas-studio/HANDOFF.md` in the vault. This skill implements Phase 1 (capture
half); `north-atlas-inbox-curate` implements the curate half.
