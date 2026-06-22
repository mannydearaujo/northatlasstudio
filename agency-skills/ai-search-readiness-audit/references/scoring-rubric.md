# AI Search Readiness — Scoring Rubric

This is the source of truth for scoring an audited site. It is built directly on Google's official
position: **AI features are not a separate SEO discipline — standard, people-first SEO is the
foundation.** There is no special "AI lever." So we score the things Google actually names, and we
reward the structural traits that make a page easy for both Google and AI tools to read, understand,
and cite.

Score **four categories, 25 points each, 100 total.** For each category, start from the descriptors
below and land on a number that the evidence would justify to a skeptical reader. Always tie a score to
something you actually saw on the site.

---

## Readiness bands (map the /100 total)

| Score | Band | What it means (owner-facing) |
|-------|------|------------------------------|
| 80–100 | **Strong** | Solid AI-ready foundation. Google and AI tools can clearly read, understand, and cite this site. Focus shifts to compounding gains. |
| 60–79 | **Developing** | A good base with clear, fixable gaps. A handful of changes meaningfully improve how the site is understood. |
| 40–59 | **Foundational** | The essentials are partly there but real structural work is needed before the site reliably gets understood and surfaced. |
| 0–39 | **At risk** | Major structural issues. The site is hard for Google and AI tools to read — likely leaving calls and quotes on the table. |

Never present a band as a ranking prediction. It describes **readiness/structure**, not placement.

---

## Category 1 — Content quality (25)

*Google's primary signal: helpful, reliable, people-first content. AI tools cite specific, original,
trustworthy content far more than vague or commodity copy.*

Look for:
- **Original, first-hand substance** — real specifics about *this* business: services, process, pricing
  signals, service area, named people, real photos. Not boilerplate that could belong to any competitor.
- **Direct, useful answers** — does a page actually answer the question a customer would ask, early and
  plainly? (AI retrieval leans heavily on a page's opening content.)
- **Specific, verifiable facts** — numbers, turnaround times, certifications, years in business, phone
  number. Specifics get cited; vague claims ("best service in town") do not.
- **Trust signals** — reviews/testimonials, credentials, guarantees, real contact info.
- **Supporting media** — relevant, real images/video (not just stock).

Scoring guide:
- **21–25**: Rich, original, specific, people-first; clearly written by/for this business; strong trust signals.
- **14–20**: Helpful and mostly original but generic in places, thin on specifics or trust signals.
- **7–13**: Largely commodity/boilerplate copy, vague claims, little first-hand detail.
- **0–6**: Thin, templated, or near-empty content; nothing an AI tool would confidently cite.

---

## Category 2 — Technical foundation (25)

*Can the page be crawled, indexed, and read at all? If you can't fetch it, neither can an AI crawler.*

Look for:
- **Crawlable & indexable** — not blocked by `robots.txt`; no stray `noindex`; a sitemap referenced.
- **Server-rendered content** — the real content is in the HTML you fetch, not painted in by JS that a
  crawler may never run. (If the fetched HTML is an empty shell, that's a serious finding.)
- **Page experience** — mobile-responsive (viewport meta, fluid layout), fast, no obvious bloat.
- **Canonicalization** — canonical tags present where needed; no obvious duplicate-content sprawl.
- **Snippet eligibility** — title tags and meta descriptions present and distinct per page.

Scoring guide:
- **21–25**: Crawlable, server-rendered, mobile-friendly, clean titles/meta, canonical handled.
- **14–20**: Mostly fine with one real gap (e.g., weak/missing meta, no sitemap, some JS dependence).
- **7–13**: Multiple issues — heavy JS dependence, missing meta, mobile problems, indexation doubt.
- **0–6**: Fundamentally hard to crawl/read — blocked, JS-only empty shell, or not reachable.

> If the site cannot be fetched at all, this category is near 0 and the finding is **Critical** — lead
> the report with it.

---

## Category 3 — Content organization (25)

*Structure is what makes content extractable. AI engines pattern-match headings to questions and pull
clean answer blocks. This is the category most local sites lose points on — and the easiest to fix.*

Look for:
- **Semantic HTML & heading hierarchy** — one clear `<h1>`, logical `<h2>`/`<h3>` structure, real
  headings (not styled `<div>`s).
- **Question-shaped headings** — headings phrased the way customers ask ("How much does X cost?",
  "Do you serve [town]?"). These match how AI tools retrieve.
- **Extractable answer blocks** — a clear, self-contained answer right under each heading, in plain
  prose an engine can lift cleanly.
- **Clear sections & scannability** — short paragraphs, sensible sections, an FAQ where it fits.
- **Image/link hygiene** — descriptive `alt` text, meaningful link text.

Scoring guide:
- **21–25**: Clean semantic structure, question-shaped headings, extractable answers, FAQ present.
- **14–20**: Decent structure but headings are generic/marketing-y, or answers aren't cleanly extractable.
- **7–13**: Weak hierarchy, wall-of-text or div-soup, no question framing, no FAQ.
- **0–6**: No meaningful structure; content is one undifferentiated block or image-only.

---

## Category 4 — Business / local data (25)

*For local service businesses this is where searches actually convert. GBP + structured data is how a
business gets understood as a real entity in a real place.*

Look for:
- **NAP consistency** — Name, Address/Service-area, Phone clearly present and consistent across pages.
- **Google Business Profile** — if provided, assess completeness: category, hours, services, photos,
  reviews + responses, posts, Q&A. In 2026 Google weights *ongoing engagement* (reviews, posts,
  activity) over historical prominence — note staleness explicitly. If GBP wasn't provided, score from
  on-site signals and flag GBP as the biggest unmeasured lever.
- **Structured data / schema** — `LocalBusiness`/`Service`/`FAQPage` JSON-LD present and accurate?
  Not strictly required for AI but strongly recommended; its absence is a common, high-value fix.
- **Local relevance** — service-area/town pages, local specifics, embedded map/directions.
- **Conversion clarity** — is the primary action (call / book / quote) obvious and repeated?

Scoring guide:
- **21–25**: Consistent NAP, schema present, strong local signals, clear repeated CTA (and active GBP if known).
- **14–20**: Present but incomplete — e.g., no schema, thin local pages, or inconsistent NAP.
- **7–13**: Sparse local signals, no schema, unclear contact/conversion path.
- **0–6**: No real local/business data; a stranger (or AI) couldn't tell what/where this business is.

---

## Google Business Profile checklist (when a screenshot/intake is provided)

You can't crawl GBP — score it from the owner's screenshot (dashboard or public panel). Walk these and
note each as present/strong, thin, or missing. In 2026 Google weights **ongoing engagement** (reviews,
posts, activity) over historical prominence, so treat the *activity* items as heavily as the static
ones — stale-but-complete profiles now lose to active ones.

**Static completeness (table stakes):**
- **Categories** — a correct primary category + relevant secondaries (more accurate categories = more
  queries matched).
- **Description** — present, specific, keyword-natural (not stuffed; Google is suspending stuffed listings).
- **NAP** — name, address (or service area), phone — and do they match the website exactly? Flag any
  duplicate/old phone numbers or `http://` (vs `https://`) website links as NAP-consistency issues.
- **Hours** set and current; **services/products** listed; **service areas** listed (and aligned with
  the site's location pages — a mismatch is a real, fixable finding).

**Engagement signals (the 2026 lever — and the retainer case):**
- **Reviews** — rating and count; and crucially, does the owner **respond** to them? Responses are an
  activity signal and a trust signal.
- **Posts** — is there a recent, regular posting cadence, or is it idle? Idle posting is the most common
  gap and the clearest argument for ongoing (retainer) work.
- **Photos** — a healthy, recent set, or is Google prompting "add photos"?
- **Q&A** and **Chat/messaging** — populated/enabled or ignored?
- **Profile strength / completeness** indicator (dashboard only) — is Google itself flagging it as
  incomplete?

**How GBP affects the score:** fold this into **Category 4 (Business / local data)**. A strong, *active*
profile pushes toward the top of the band; strong fundamentals but idle engagement (no posts, few
photos, unanswered reviews) is exactly the "good base, clear lever" story — score the fundamentals well
but make the activity gaps prominent High-impact fixes, since that's where the local leads are won.

## What to flag against (anti-patterns — Google says NOT to do these)

These are not point deductions on their own — they are **things to stop/remove**, called out in their
own report section. Finding none is a good sign and worth stating.

- **`llms.txt` or AI-only markup files** — Google does not use them; it's wasted effort and a tell of
  hype-driven "AI SEO."
- **Artificial content chunking** — breaking content into tiny fragments to "help AI." Hurts readability.
- **Rewriting existing content specifically for AI** — write for people; the AI gain follows.
- **Chasing inauthentic mentions/citations** — fake or spammy mentions across the web. Risk, not reward.
- **Keyword stuffing / exact-match obsession** — including stuffed GBP listings (Google is suspending
  these in 2026). Clean, accurate, specific info wins.

**Core quote to anchor the report's philosophy:** *"focus on what your visitors would enjoy, find
helpful, and feel satisfied with after visiting your website."*

---

## Severity scale (for each finding)

- **Critical** — blocks the site from being read/understood/found, or breaks the conversion path
  (e.g., uncrawlable, JS-only empty shell, no contact method, not mobile usable).
- **High** — materially limits how well the site is understood or how many leads it captures
  (e.g., no structured data, no question-shaped structure, thin commodity content, no FAQ).
- **Medium** — a real but contained gap (e.g., weak meta descriptions, missing alt text, no sitemap).
- **Low** — polish that compounds over time (e.g., a stale "last updated" date, minor heading tweaks).

Always pair severity with **"what this means for you"** in money/trust/findability terms — that
translation is what makes the owner act.
