# agency-skills is a snapshot, not the source

The source of truth for every skill moved on 2026-11-12 to the shared skills repo:
`~/agent-skills/<skill-name>/`. That repo is symlinked into Claude Code (`~/.claude/skills`) and
Codex (`~/.agents/skills`), so both tools read the same files.

This folder is kept only because docs and scripts in this repo reference paths such as
`agency-skills/audit-site/assets/report-template.html`. Do not edit skills here: edit them in
`~/agent-skills`, run `~/agent-skills/bin/link-skills.sh --check`, and commit there. Refresh this
snapshot from `~/agent-skills` when a referenced asset changes.
