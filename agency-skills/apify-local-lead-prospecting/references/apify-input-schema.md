# Apify Input Schema

Normalize scraped lead exports into these fields when available:

| Standard field | Common aliases | Notes |
|---|---|---|
| business_name | title, name, placeName | Required when available. |
| category | categoryName, categories, searchString | Keep primary category first. |
| phone | phone, phoneNumber, internationalPhone | Normalize only if safe. |
| website | website, url, site | Leave blank if missing. |
| email | email, emails | Preserve source. Do not invent. |
| address | address, street, fullAddress | Keep full address string. |
| city | city, municipality | Infer only from explicit address/source query. |
| state | state, region | Use postal state when available. |
| rating | stars, totalScore | Numeric if available. |
| review_count | reviewsCount, reviews | Numeric if available. |
| maps_url | url, placeUrl, googleMapsUrl | Public profile URL. |
| gbp_url | googleBusinessUrl, maps_url | Use Maps URL if GBP URL is unavailable. |
| claimed | isClaimed, ownerVerified | Optional. |
| hours | openingHours, hours | Keep raw if complex. |
| posts_recent | posts, lastPostDate | Often unavailable. Mark unknown, not missing. |
| notes | description, additionalInfo | Preserve useful source notes. |

If fields are absent, leave them blank or `unknown`; do not guess. Preserve a `source` column with the actor/export/query name.
