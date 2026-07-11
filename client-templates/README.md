# North Atlas Client Workspace Template

Use this template when a new prospect or client enters the North Atlas workflow.

Recommended local path:

```text
clients/client-slug/
```

Keep `clients/` local/gitignored because it can contain private client intake, screenshots, reports, pricing notes, and credentials/status notes.

## Setup

1. Copy the files from `client-templates/new-client/` into `clients/client-slug/`.
2. Rename placeholders in the copied files.
3. Create a CRM record and link it from `intake.md`.
4. Start with `task-list.md` and move the client through the phases.
5. If the client gets a dedicated site repo, create that repo's own `AGENTS.md` using `client-operating-manual.md` as the source.

## Folder Shape

```text
clients/client-slug/
  README.md
  intake.md
  task-list.md
  client-operating-manual.md
  crm.md
  audit/
    README.md
  assets/
    README.md
    proof-examples.pt-BR.md
  sales/
    proposal-contract-style.pt-BR.md
  reports/
    README.md
    samples/
      weekly-report-sample.pt-BR.md
  notes/
    README.md
```
