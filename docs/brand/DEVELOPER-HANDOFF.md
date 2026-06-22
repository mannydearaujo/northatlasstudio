# Claude / Developer Handoff — NorthPoint Digital Brand Export

## Status — historical (import already completed)
This was the original import handoff for the `northpoint-brand-export/` package. The
import is done: all assets, styles, and docs below already live at their destination
paths, and the filled cyan arrow mark has been live in production (nav logo, favicon,
apple-touch-icon, og-image.png) since 2026-06-19. Kept here for history; the "Do not do
yet" section below no longer applies.

## Task
Import the brand system into the NorthPoint Digital source folder. This task is complete.

## Source-safe import path
Create these folders if missing:

```text
assets/brand/svg/
assets/brand/png/
assets/brand/mockups/
styles/
docs/brand/
```

Copy:

```text
assets/brand/svg/*        -> assets/brand/svg/
assets/brand/png/*        -> assets/brand/png/
assets/brand/mockups/*    -> assets/brand/mockups/
styles/northpoint-brand.css -> styles/northpoint-brand.css
docs/BRAND-GUIDE.md       -> docs/brand/BRAND-GUIDE.md
README-BRAND-EXPORT.md    -> docs/brand/README-BRAND-EXPORT.md
```

## Original caution
The original export warned not to edit `index.html`, replace the live logo, or change metadata until
Manny approved the exact production update. That approval has since happened, and production now uses
the filled cyan mark.

## Current implementation
The homepage uses the filled cyan arrow mark, and future reports/audits use the approved KPI dashboard
styling from the branding package.

## Approved logo direction
Filled cyan north-arrow / compass mark. No hollow top-left mark. No cyan square behind the nav icon unless specifically used for app icons or avatars.
