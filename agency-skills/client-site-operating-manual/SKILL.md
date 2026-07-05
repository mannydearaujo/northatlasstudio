---
name: client-site-operating-manual
description: Create or update client website operating manuals such as AGENTS.md, CLAUDE.md, and optional BUSINESS-BLUEPRINT.md for NorthPoint Digital projects. Use when starting a new client build, documenting deployment rules, project structure, design system, content guardrails, tracking conventions, proof rules, history, deferred work, or keeping Codex and Claude guidance aligned. Also trigger at the END of significant work sessions to update the manual's current-state section.
metadata:
  updated: "2026-07-04"
---

# Client Site Operating Manual

Create concise project memory for each client site so future AI sessions understand the rules before changing anything.

## Workflow

1. Gather business, repo, deploy, stack, design, content, SEO, tracking, and proof facts.
2. Read `references/client-rule-intake.md` for the minimum intake.
3. Use `references/operating-manual-template.md` for `AGENTS.md` and `CLAUDE.md`.
4. Use `references/project-history-format.md` to record meaningful changes.
5. If the project has offers, proof, or business strategy, create or update `BUSINESS-BLUEPRINT.md`.

## Guardrails

Keep docs operational, include deployment warnings, record owner-specific content rules, and keep outstanding/deferred work honest.

## Session-handoff rule

Every operating manual gets a **"Current state"** section near the top: what shipped last, what's open, the next step. Update it at the end of any significant session — this is what makes "pick up where we left off" work without re-explaining context.

## After this skill

- Register the client's voice pack location (`client-voice-pack-builder`) and tracking conventions (`lead-tracking-installer`) in the manual so every future skill finds them.
