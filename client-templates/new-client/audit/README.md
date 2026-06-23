# Audit Folder

Use this folder for website, GBP, SEO, AI-search readiness, schema, launch, and tracking audit notes.

Suggested files:

- `website-audit-notes.md`
- `pagespeed.json`
- `gbp-audit-notes.md`
- `tracking-plan.md`
- `schema-faq-check.md`
- `launch-qa.md`

For PageSpeed/Lighthouse data, run from the agency repo root:

```bash
npm run pagespeed -- https://example.com --strategy=both --out=clients/client-slug/audit/pagespeed.json
```
