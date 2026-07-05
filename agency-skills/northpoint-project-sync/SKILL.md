---
name: northpoint-project-sync
description: Maintain NorthPoint Digital project documentation and production sync rules. Use when changing the agency site, offers, proof, positioning, project structure, tooling roadmap, skill library, CLAUDE.md, AGENTS.md, BUSINESS-BLUEPRINT.md, NEXT-STEPS.md, ai-search-reference.md, GA4-lead-logic.md, or production-facing copy. Trigger after ANY change to agency skills or production-facing agency files.
metadata:
  updated: "2026-07-04"
---

# NorthPoint Project Sync

Keep the agency's documentation truthful after changes: source-of-truth order respected, AGENTS.md generated from CLAUDE.md, BUSINESS-BLUEPRINT.md synced from production-facing files, skills validated and mirrored.

## Workflow

1. **Identify what changed:** agency site copy/pages, offers/pricing, proof, skills, or internal docs. Read `references/source-of-truth-order.md` — updates flow downhill from the source of truth, never sideways.
2. **Update the affected docs** in source-of-truth order. New client won? Follow `references/new-client-tasklist-rule.md`.
3. **Production-facing change?** Run the sync scripts from the agency repo (`~/Website & SEO Agency`):
   ```bash
   npm run sync:agents        # AGENTS.md regenerated from CLAUDE.md
   npm run sync:production    # BUSINESS-BLUEPRINT.md production snapshot
   npm run check:production   # verify sync is accurate
   ```
4. **Skill change?** Validate per `references/skill-validation-rule.md`, then re-mirror the skill library to the audit repo (`~/Temp AI Business Research Repo/skills/`) so Codex and other Claude surfaces see the same version.
5. **Report what was synced** — files touched, checks run, anything now stale that needs Manny's decision.

## Guardrails

Never promise rankings, map-pack placement, AI Overview inclusion, AI Mode citation, or guaranteed lead volume. Use verified facts and plain-English owner-facing recommendations.

## Skill Validation

Read `references/skill-validation-rule.md` before validating or mirroring agency skills.

## Logo Rule

NorthPoint Digital's primary mark is the filled cyan north-arrow/compass mark
(`assets/brand/svg/northpoint-mark.svg`, documented in `docs/brand/BRAND-GUIDE.md`). Never a
hollow/cutout mark, never a cyan square tile with a letter. When syncing or auditing project docs,
check that every NorthPoint-branded surface — `index.html` (nav, footer), `og-image.png`, and any
skill-generated deliverable (audit reports, case studies, offer sheets, weekly reports) — uses this
mark, not a placeholder.
