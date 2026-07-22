#!/usr/bin/env bash
# Headless: run north-atlas-signal-health-watch.
source "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

run_skill "signal-watch" "Read,Write,Bash,Skill" \
  "Use the north-atlas-signal-health-watch skill. Run it from this repo (already the cwd). Write findings into 01-projects/north-atlas-studio/CURRENT-STATE.md and SIGNAL-HISTORY.json in the vault (VAULT_PATH is in this machine's Agentic OS config/os.config at /Users/mannydearaujo/Agentic OS Build/config/os.config). Raise any anomaly as a new INBOX.md entry per the skill's workflow. Do not send, publish, or act on anything external — file and flag only."
