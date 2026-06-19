# NorthPoint Digital

Conversion-focused landing page for NorthPoint Digital, a practical website,
local SEO, AI-assisted discovery readiness, and lead tracking agency for local
service businesses.

The homepage positions NorthPoint Digital around websites that turn local
searches into calls, quote requests, and bookings, measured with GA4 lead
tracking.

Static single-file site (`index.html`). Deployed on Vercel.

## Develop
Just open `index.html` in a browser — no build step.

## Production Sync
Run the production sync after changing homepage copy, metadata, schema, robots,
sitemap, offers, or proof:

```bash
node scripts/production-sync.mjs
```

To verify the business blueprint is still current without editing it:

```bash
node scripts/production-sync.mjs --check
```

This keeps `BUSINESS-BLUEPRINT.md` aligned with the production-facing site and
flags old naming, placeholder proof metrics, or missing positioning language.

## Deploy
Pushes to `main` auto-deploy via the Vercel Git integration.
