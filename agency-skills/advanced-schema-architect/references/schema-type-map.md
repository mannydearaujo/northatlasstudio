# Schema Type Map — What Goes Where

## Sitewide business entity (every page, consistent `@id`)
Use the most specific LocalBusiness subtype that truly fits:
- Trades: `HomeAndConstructionBusiness` → `RoofingContractor`, `Plumber`, `Electrician`, `HousePainter`, `GeneralContractor`, `HVACBusiness`, `MovingCompany`, `Locksmith`. Gutters: no exact subtype — use `HomeAndConstructionBusiness` with a precise `description`; do NOT force a wrong subtype.
- Pet: `LocalBusiness` with `description` (no PetGrooming subtype exists); `additionalType` can point to a Wikidata/Wikipedia concept URL.
- Required: `name` (exact GBP name), `address` (PostalAddress, char-identical to GBP), `telephone`, `url`, `image`, `openingHoursSpecification`.
- Strongly recommended: `geo`, `priceRange` (only if the owner stands behind it, e.g. "$$"), `areaServed` (array of `City` objects for real service towns), `sameAs` (all official profiles incl. the Google Maps URL), `hasMap`, `logo`, `slogan` (if real), `foundingDate` (if verified).

## Per-page additions
| Page | Types |
|---|---|
| Homepage | Business entity (full) + `WebSite` + BreadcrumbList |
| Service page | `Service` (name, description, `provider` → business `@id`, `areaServed`, `serviceType`) + optional `Offer`/`OfferCatalog` (priceSpecification only with owner-approved real pricing; `priceCurrency` USD) + BreadcrumbList + FAQPage if visible FAQs |
| Location page | Business entity ref + `Service` with `areaServed` → that specific `City` + BreadcrumbList + FAQPage if visible |
| About | Business entity + `Person` for the owner if featured (name, jobTitle, worksFor → `@id`) — real E-E-A-T entity data |
| FAQ page | `FAQPage` with `Question`/`acceptedAnswer` matching visible text EXACTLY (sync rule) |
| Blog post | `Article`/`BlogPosting`: headline, datePublished, dateModified, `author` → Person/Organization `@id`, image |
| Contact | Business entity ref + BreadcrumbList (a `ContactPage` type is fine but adds little) |

## Review & rating policy (the part everyone gets wrong)
- Google IGNORES (and can penalize) LocalBusiness `aggregateRating`/`review` markup that is **self-serving**: ratings collected on Google/Yelp cannot be marked up on your own site.
- Allowed ONLY when reviews are collected and displayed **on the site itself** (first-party, e.g., a real testimonials system with visible individual reviews). Then: `aggregateRating` must match visible math; individual `Review` markup mirrors visible reviews verbatim.
- Practical default for NorthPoint clients: **skip rating markup**, show real Google review quotes as visible content (no markup), link the GBP via `sameAs`/`hasMap` and let Google connect the entity to its own review data.

## Entity linking for AI search
- Stable `@id` convention: `https://domain.com/#business` referenced by every page's graph.
- `sameAs`: every OFFICIAL profile — GBP short URL/Maps link, Facebook, Instagram, Yelp, BBB, state license lookup page if public. Quality over quantity; wrong links are worse than none.
- NAP consistency is entity consistency: one canonical business name string everywhere (site footer, schema, GBP).
