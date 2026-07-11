# [Client Name] Workspace

This folder is the working hub for [Client Name].

Use it to keep intake, tasks, audit notes, reports, assets, and delivery status organized. Keep private client details in this local workspace, not in public website files.

## Quick Links

- Website: [URL]
- Google Business Profile / Maps: [URL]
- CRM record: [URL]
- Client site repo: [URL or TBD]
- Hosting: [Vercel / Netlify / Squarespace / WordPress / other]
- Current phase: Lead intake

## Folder Map

- `intake.md` - lead/client facts and owner asks.
- `task-list.md` - phase-by-phase delivery checklist.
- `client-operating-manual.md` - project memory for future AI sessions.
- `crm.md` - CRM/deal notes and follow-up dates.
- `audit/` - website, GBP, SEO, and tracking audit notes.
- `assets/` - screenshots, logos, photos, testimonials, and proof.
- `sales/` - offer sheets, proposal/contract drafts, and client-facing sales follow-up.
- `reports/` - weekly reports, audit deliverables, proposals, and PDF exports when needed.
- `notes/` - call notes, decisions, risks, and deferred ideas.

For Portuguese-speaking owners, use the parallel `.pt-BR` templates and keep the tone formal,
clear, and owner-friendly. Default to "sua empresa" and name North Atlas Studio as the provider.

## PageSpeed

When PageSpeed/Lighthouse is requested for this client, run from the agency repo root:

```bash
npm run pagespeed -- [URL] --strategy=both --out=clients/client-slug/audit/pagespeed.json
```

Keep the saved `audit/pagespeed.json` with the client workspace so future audits, launch QA, and retainer reports can compare against it.
