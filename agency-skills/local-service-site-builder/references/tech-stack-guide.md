# Tech Stack Guide

## Decision rule
Choose the simplest stack the client's actual maintenance reality supports. Local service sites are content + conversion, not apps.

| Situation | Stack | Hosting | Why |
|---|---|---|---|
| Default: agency-maintained | Static HTML + shared CSS (no build step) | GitHub Pages or Vercel | Crawlable, fast, zero dependencies to rot, Manny's proven pattern (Golden Paws: 126 pages, no framework) |
| Larger site / templated location clusters | SSG (Astro or Next.js SSG export) | Vercel | Templates keep 20+ town pages consistent; still fully static output |
| Owner insists on self-editing | Their existing CMS or a simple managed one | per CMS | Only if they'll genuinely edit — most won't; agency retainer is usually the better answer |
| Needs booking/portal/app behavior | Next.js on Vercel | Vercel | Only when there's real dynamic behavior; don't default here |

## Non-negotiables regardless of stack
- Content in HTML at load (no client-side-rendered copy — AI crawlers and Google both read static best).
- Custom domain with HTTPS from launch; `www` vs apex decided once, redirected the other way.
- Git repo, direct-to-prod only for static sites with QA gate; anything with a build gets a preview deploy check first.
- Page weight budget: hero image optimized (WebP, sized), total page < ~1.5MB, no JS frameworks loaded for static content.
- Forms: Tally or the platform's native forms with a webhook path (proven pattern: Tally → webhook → n8n/Apps Script → email + sheet/CRM).
