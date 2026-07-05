# JSON-LD Patterns

One `<script type="application/ld+json">` per page containing a single `@graph`. Entities reference each other by `@id` — never duplicate the full business object on every page; reference it and include the fields that page needs.

## Homepage graph (the master entity)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": "https://alphagutterco.com/#business",
      "name": "Alpha Seamless Gutter",
      "description": "Seamless gutter fabrication and cut-and-drop supply for homeowners and contractors on the South Shore of Massachusetts.",
      "url": "https://alphagutterco.com/",
      "telephone": "+1-XXX-XXX-XXXX",
      "image": "https://alphagutterco.com/assets/img/crew.jpg",
      "logo": "https://alphagutterco.com/assets/img/logo.png",
      "address": { "@type": "PostalAddress", "streetAddress": "…", "addressLocality": "…", "addressRegion": "MA", "postalCode": "…", "addressCountry": "US" },
      "geo": { "@type": "GeoCoordinates", "latitude": 0.0, "longitude": 0.0 },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "07:00", "closes": "17:00" }
      ],
      "areaServed": [ { "@type": "City", "name": "Weymouth" }, { "@type": "City", "name": "Braintree" } ],
      "sameAs": [ "https://maps.google.com/…", "https://www.facebook.com/…" ]
    },
    { "@type": "WebSite", "@id": "https://alphagutterco.com/#website", "url": "https://alphagutterco.com/", "name": "Alpha Seamless Gutter", "publisher": { "@id": "https://alphagutterco.com/#business" } }
  ]
}
```

## Service page graph (references, doesn't repeat)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://alphagutterco.com/5-inch-gutters/#service",
      "name": "5-Inch Seamless Gutter Installation",
      "serviceType": "Gutter installation",
      "description": "…matches the page's answer-first block…",
      "provider": { "@id": "https://alphagutterco.com/#business" },
      "areaServed": [ { "@type": "City", "name": "Weymouth" } ],
      "offers": { "@type": "Offer", "priceCurrency": "USD", "priceSpecification": { "@type": "UnitPriceSpecification", "price": "8.00", "unitText": "per linear foot, starting at" } }
    },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alphagutterco.com/" },
      { "@type": "ListItem", "position": 2, "name": "5-Inch Gutters", "item": "https://alphagutterco.com/5-inch-gutters/" } ] }
  ]
}
```
(Offer/price block ONLY with owner-approved public pricing — otherwise omit `offers` entirely.)

## FAQPage (sync rule is absolute)
`Question.name` and `acceptedAnswer.text` match the visible FAQ text exactly — same wording, all visible FAQs or a subset, never questions that aren't on the page. `schema-and-faq-sync-auditor` will diff them.

## Hygiene
- Escape quotes properly; validate JSON parses before shipping; no trailing commas.
- Absolute URLs everywhere. HTTPS everywhere.
- `dateModified` on Articles updates when content actually changes (ties into the sitemap `<lastmod>` rule).
- When a value is unknown: OMIT the property. Never placeholder ("TBD", 0.0 coordinates left in = a bug that ships).
