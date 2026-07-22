#!/usr/bin/env bash
# Remove the North Atlas Studio autopilot launchd agents.
set -euo pipefail
UID_NUM="$(id -u)"

for label in com.northatlasstudio.capture-curate com.northatlasstudio.signal-watch com.northatlasstudio.audit-lead-watch; do
  launchctl bootout "gui/${UID_NUM}/${label}" 2>/dev/null || true
  rm -f "$HOME/Library/LaunchAgents/${label}.plist"
  echo "removed: ${label}"
done
