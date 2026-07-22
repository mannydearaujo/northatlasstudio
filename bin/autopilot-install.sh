#!/usr/bin/env bash
# Install the North Atlas Studio autopilot launchd agents (capture-curate + signal-watch).
# Idempotent: safe to re-run. Uninstall with bin/autopilot-uninstall.sh
set -euo pipefail
REPO_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LA="$HOME/Library/LaunchAgents"
UID_NUM="$(id -u)"
mkdir -p "$LA" "${REPO_PATH}/.ops/logs"

for label in com.northatlasstudio.capture-curate com.northatlasstudio.signal-watch com.northatlasstudio.audit-lead-watch; do
  SRC="${REPO_PATH}/bin/autopilot/${label}.plist"
  DST="${LA}/${label}.plist"
  sed "s|__REPO__|${REPO_PATH}|g" "$SRC" > "$DST"
  # Reload cleanly if already present.
  launchctl bootout "gui/${UID_NUM}/${label}" 2>/dev/null || true
  launchctl bootstrap "gui/${UID_NUM}" "$DST"
  launchctl enable "gui/${UID_NUM}/${label}"
  echo "installed: ${label}"
done

echo
echo "Schedule:"
echo "  capture-curate    → daily 6:00 AM (pulls + files North Atlas's own inbox)"
echo "  signal-watch      → daily 6:20 AM (GA4 + Search Console health-watch)"
echo "  audit-lead-watch  → every 15 min (narrow check: new Free Site Audit form submissions only)"
echo "Runs catch up on next wake if the laptop was asleep."
echo "Verify: launchctl list | grep northatlasstudio"
echo "Logs:   ${REPO_PATH}/.ops/logs/autopilot.log"
