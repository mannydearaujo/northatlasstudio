# Skill Validation Rule

All self-written skills live in one git repo, `~/agent-skills`, one folder per skill. Each folder is
symlinked into Claude Code (`~/.claude/skills/<name>`) and Codex (`~/.agents/skills/<name>`), so an
edit in `~/agent-skills` is live in both tools immediately. Never edit the symlinked locations as
if they were separate copies, and never copy a skill by hand into either runtime.

After editing or adding a skill, run:

```bash
~/agent-skills/bin/link-skills.sh --check
```

It validates every skill (frontmatter parses, `name` matches the folder, description is present and
at most 1,024 characters, only allowed frontmatter keys, every `../other-skill/...` path resolves)
and reports any missing or broken links. If it reports missing links, run it with `--link`.

Then commit the change in `~/agent-skills`.

Rules that keep one skill working in both Claude Code and Codex:

- Frontmatter keys: only `name`, `description`, `license`, `allowed-tools`, `metadata`.
- Describe capabilities, not one tool's names: "web fetch", "web search", "browser automation",
  "the Gmail connector's search". A tool name may follow in parentheses as an example.
- Refer to project instructions as `CLAUDE.md`/`AGENTS.md`.
- Reference another skill's files as `../<skill-name>/...`, relative to this skill's folder.
- Skills that must only run when asked get `agents/openai.yaml` with
  `policy.allow_implicit_invocation: false` (Codex).
