# Access And Tooling Workflow

Use this before setting up GA4, GTM, Search Console, dashboards, or key events for a NorthPoint client.

## Plain-English GTM Explanation

Google Tag Manager, or GTM, is a tag control panel for a website.

Instead of hard-coding every analytics script and tracking event directly into the site, you install one GTM container snippet. Then you can manage tracking tags, click triggers, form-submit triggers, GA4 events, pixels, and testing from GTM.

For NorthPoint, GTM is useful because it lets us add and adjust lead tracking without editing site code every time. It is not a reporting dashboard. GA4 is where event data is reported; GTM is usually how events are installed and tested.

## Best Access Workflow

1. Ask the client to add access first.
   - GA4: ask for property-level access with Editor or Administrator when setup changes are needed. Viewer is enough only for read-only reporting.
   - GTM: ask for container access with Publish rights only when NorthPoint is responsible for launch; otherwise request Edit access and have the client approve/publish.
   - Search Console: ask to be added as a user/owner, or have the client verify ownership.
   - Website/CMS/hosting: ask for the minimum access needed to install tags, verify Search Console, and QA forms.

2. If nobody has access, recover or verify ownership.
   - Search Console: verify with DNS, HTML file, HTML tag, existing GA tag, or existing GTM container. DNS Domain property is preferred when domain access is available.
   - GA4: if no one can access the existing property, create a new GA4 property and document that historical GA4 data was not recoverable.
   - GTM: if no one can access the existing container, create a new GTM container and install it only after confirming it will not conflict with existing scripts.

3. Install the baseline stack.
   - GA4 property and web data stream.
   - GTM container installed on every page, when GTM is the chosen method.
   - Search Console property verified.
   - Sitemap submitted in Search Console when available.
   - Optional Microsoft Clarity for behavior review.

4. Set up real-lead tracking.
   - Use GTM triggers or site code to send GA4 events for real lead actions.
   - Mark only real-lead events as GA4 Key Events.
   - Leave secondary and diagnostic events unmarked.
   - Confirm events in GA4 Realtime and GTM preview/debug tools.
   - Note that GA4 Admin and Key Event interfaces can lag after a new event starts firing.

5. Record the setup.
   - Add property/container IDs to the client operating manual.
   - Add who owns access and who can publish.
   - Record install date. Reporting starts from this date if old access/data was missing.
   - Save screenshots of Realtime, GTM preview, and Key Event setup in the client workspace.

## If Access Is Missing

Do not block the entire audit. Separate what can be audited without access from what needs access.

Can do without access:

- Crawl the website.
- Inspect visible source code for GA4/GTM snippets.
- Check forms, phone links, buttons, thank-you pages, metadata, schema, sitemap, and robots.
- Use external SEO tools and page crawlers.
- Recommend a tracking plan.

Cannot do reliably without access:

- Pull historical GA4 traffic/conversion data.
- Confirm existing GA4 Key Event settings.
- Confirm Search Console query/indexing data.
- Publish GTM tags.
- Verify exact attribution and source/medium performance.

Use this language with clients: "If the old analytics access is gone, we cannot recreate reliable historical GA4 data. We can recover access where possible or start clean tracking now so future reports are honest."

## Alternate / Add-On Tools

- Microsoft Clarity: free heatmaps and session recordings for UX friction.
- Plausible or Fathom: simple privacy-friendly analytics when GA4 is too heavy.
- CallRail or WhatConverts: stronger call/form attribution for clients who need real lead source tracking.
- Formspree, Tally, Typeform, HubSpot forms: form capture and notification routing.
- Looker Studio: reporting layer once GA4, Search Console, Sheets, or CRM data exists.
- AgencyAnalytics or Databox: paid dashboard convenience when reporting volume grows.
- Ahrefs, Semrush, SE Ranking, or BrightLocal: external SEO visibility, rank, citation, and local tracking.
- Screaming Frog or Sitebulb: technical crawls without analytics access.

## Official References

- GA4 user access: https://support.google.com/analytics/answer/9305788
- GA4 key events: https://support.google.com/analytics/answer/12966437
- GA4 create/modify key events: https://support.google.com/analytics/answer/12844695
- GA4 recommended events: https://support.google.com/analytics/answer/9267735
- Search Console verification: https://support.google.com/webmasters/answer/9008080
- Search Console users and permissions: https://support.google.com/webmasters/answer/7687615
- GTM users and permissions: https://support.google.com/tagmanager/answer/6107011
