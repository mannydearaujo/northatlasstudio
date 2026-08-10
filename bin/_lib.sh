#!/usr/bin/env bash
# Shared helpers for headless skill wrappers (mirrors the Agentic OS engine's bin/_lib.sh pattern,
# scoped to this repo per CLAUDE.md's "AI-Native Operating Loop" decision to keep implementation
# here, not in the vault or engine repo).
set -euo pipefail

REPO_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# launchd hands jobs a minimal PATH that does NOT include ~/.local/bin, so `claude`
# is not found and every scheduled run dies with "claude: command not found".
# Mirrors the engine's bin/autopilot.sh, which sets the same PATH for the same reason.
export PATH="$HOME/.local/bin:$HOME/Library/Python/3.9/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

mkdir -p "${REPO_PATH}/.ops/logs"
LOG="${REPO_PATH}/.ops/logs/runs.log"

log_run() {
  # log_run <job> <status>
  echo "$(date '+%Y-%m-%d %H:%M:%S')  ${1}  ${2}" >> "$LOG"
}

# run_skill <job-name> <allowed-tools-csv> <prompt>
# Headless `claude -p` with a scoped tool allowlist. Requires --permission-mode auto — without it,
# even an allow-listed tool hits an unanswerable permission prompt in headless mode (confirmed
# 2026-07-22: the allowlist alone was not enough; auto mode is required for it to take effect).
run_skill() {
  local job="$1"; shift
  local tools="$1"; shift
  local prompt="$1"; shift
  cd "$REPO_PATH"
  local out rc=0
  out="$(mktemp)"
  claude -p "$prompt" --allowedTools "$tools" --permission-mode auto "$@" > "$out" 2>&1 || rc=$?
  cat "$out" >> "${REPO_PATH}/.ops/logs/autopilot.log"
  if grep -qiE "hit your (weekly|session|usage) limit|usage limit reached" "$out"; then
    log_run "$job" "LIMIT"; rm -f "$out"; return 2
  fi
  rm -f "$out"
  if [ "$rc" -eq 0 ]; then
    log_run "$job" "OK"
  else
    log_run "$job" "FAIL"
    return 1
  fi
}
