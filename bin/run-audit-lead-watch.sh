#!/usr/bin/env bash
# Headless: run north-atlas-audit-lead-watch (every 15 min, narrow Free Site Audit form check).
source "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

GMAIL_TOOLS="mcp__87903d88-3a56-4224-88ef-47f55acae50a__search_threads,mcp__87903d88-3a56-4224-88ef-47f55acae50a__list_labels,mcp__87903d88-3a56-4224-88ef-47f55acae50a__create_label,mcp__87903d88-3a56-4224-88ef-47f55acae50a__label_thread,mcp__87903d88-3a56-4224-88ef-47f55acae50a__label_message,mcp__87903d88-3a56-4224-88ef-47f55acae50a__get_message,mcp__87903d88-3a56-4224-88ef-47f55acae50a__get_thread,mcp__87903d88-3a56-4224-88ef-47f55acae50a__create_draft"

run_skill "audit-lead-watch" "Read,Write,Bash,WebFetch,Skill,${GMAIL_TOOLS}" \
  "Use the north-atlas-audit-lead-watch skill. Run its account-identity check first and stop without reading further if the connected Gmail account is not northatlasstudio@gmail.com. Only process new Formspree Free Site Audit form notifications — ignore everything else in the inbox, that's the daily capture-curate job's responsibility. For each new submission, hand off to north-atlas-audit-lead-autodraft directly. That chain produces an offer-sheet draft file (needs full review before sending) AND drafts an instant-results email in Gmail via create_draft (policy-approved to send once ready, but still just a draft since no send tool exists — Manny does one click). Never actually send anything yourself."
