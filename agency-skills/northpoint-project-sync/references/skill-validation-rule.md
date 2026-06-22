# Skill Validation Rule

When editing or validating agency skills, run the official Codex skill validator:

```bash
PYTHONPATH=/private/tmp/northpoint-skill-validator-python \
/Users/mannydearaujo/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
/Users/mannydearaujo/.codex/skills/.system/skill-creator/scripts/quick_validate.py \
"/Users/mannydearaujo/Website & SEO Agency/agency-skills/<skill-name>"
```

If validation fails with `ModuleNotFoundError: No module named 'yaml'`, install PyYAML into the temporary validation folder:

```bash
/Users/mannydearaujo/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 \
-m pip install PyYAML --target /private/tmp/northpoint-skill-validator-python
```

Notes:

- The `/private/tmp/northpoint-skill-validator-python` folder is temporary and may disappear.
- This folder is only a helper for running `quick_validate.py`; it is not part of the agency skill library.
- Skills can still be used without this package. It is needed only for official validation after skill edits.
- After editing shared skills, mirror the changed skill folder into both `~/.codex/skills/` and `~/.claude/skills/`.
