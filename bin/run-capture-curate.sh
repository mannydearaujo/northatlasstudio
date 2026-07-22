#!/usr/bin/env bash
# Headless: run north-atlas-inbox-capture, then north-atlas-inbox-curate.
source "$(dirname "${BASH_SOURCE[0]}")/_lib.sh"

GMAIL_TOOLS="mcp__87903d88-3a56-4224-88ef-47f55acae50a__search_threads,mcp__87903d88-3a56-4224-88ef-47f55acae50a__list_labels,mcp__87903d88-3a56-4224-88ef-47f55acae50a__create_label,mcp__87903d88-3a56-4224-88ef-47f55acae50a__label_thread,mcp__87903d88-3a56-4224-88ef-47f55acae50a__create_draft"

run_skill "capture-curate" "Read,Write,Bash,WebFetch,Skill,${GMAIL_TOOLS}" \
  "Use the north-atlas-inbox-capture skill to pull new items into 01-projects/north-atlas-studio/INBOX.md in the vault (VAULT_PATH is in this machine's Agentic OS config/os.config at /Users/mannydearaujo/Agentic OS Build/config/os.config). Run its account-identity check first and stop without reading further if the connected Gmail account is not northatlasstudio@gmail.com. Then use the north-atlas-inbox-curate skill to process whatever landed in INBOX.md's Captured, unprocessed section — this may invoke north-atlas-audit-lead-autodraft (which itself runs ai-search-readiness-audit, offer-sheet-builder, case-study-and-proof-builder, human-copy-editor, and drafts an instant-results email via create_draft) for a recognized Free Site Audit form submission; that chain only ever produces draft files/drafted emails, never actually sends anything. Do not send, publish, or act on anything external — file and draft only."
