# AI Tells — Detection List & Scoring

## Banned lexicon (severity: high — each instance is a violation)
elevate · unlock · unleash · seamless(ly) · effortless(ly) · transform(ative) · empower · supercharge · turbocharge · game-changer/game-changing · revolutionize · cutting-edge · state-of-the-art · best-in-class · world-class · top-notch · unparalleled · robust · leverage (as a verb) · harness · dive in/into · delve · embark · journey (metaphorical) · landscape (metaphorical) · realm · tapestry · testament to · in today's fast-paced world · look no further · we've got you covered · rest assured · say goodbye to X, say hello to Y · take X to the next level · whether you're A, B, or C · from A to B, we do it all · nestled (for locations) · boasts (for features) · curated · meticulous(ly) · comprehensive suite · one-stop shop · peace of mind (allowed ONLY if the owner actually says it)

## Structural tells (severity: high)
- **"It's not just X, it's Y."** and its cousins ("more than just a haircut…"). Kill on sight.
- **Rule-of-three abuse:** three parallel phrases in every other sentence ("fast, friendly, and reliable"). One triple per page, max.
- **Em-dash chains** — clauses strung — like this — everywhere. (Golden Paws bans em-dashes entirely; check the client's rule.)
- **Uniform paragraph rhythm:** every paragraph 2–3 sentences of similar length. Real writing has lumps.
- **Every section ends with a mini-CTA or rhetorical question.**
- **Colon-headline disease:** "Dog Grooming: What You Need to Know."
- **Hedge-stacking:** "can help," "may provide," "is designed to" — commit or cut.
- **Empty transitions:** "Additionally," "Furthermore," "Moreover," "In conclusion" starting paragraphs.

## Voice/pronoun check (severity: high — North Atlas's own client-facing copy only)

North Atlas Studio speaks as "we"/"us"/"our," never "I"/"me"/"my," in any copy where the business
itself is the speaker — offer sheets, outreach, testimonial requests, proposals, reports (see
`CLAUDE.md` "Messaging Guardrails," added 2026-07-22). A personal sign-off ("— Manny") is fine; the
body copy still isn't first-person-singular. **Do not apply this to a client's own voice pack** —
a real solo-owner client speaking as "I" in their own site copy or their own review requests to
their own customers is a different, legitimate voice context; only flag this for North-Atlas-as-
speaker copy.

## Vagueness tells (severity: medium)
- Benefit with no mechanism: "we make it easy" (HOW?).
- Superlative with no evidence: "the best gutter service in MA."
- Audience flattery: "you deserve the best."
- Generic empathy: "we understand how stressful X can be."
- Any sentence that could sit unchanged on a competitor's site.

## What human sounds like (calibration)
- Specifics: "most single-family homes take about 4 hours" beats "fast, efficient service."
- Real constraints admitted: "we don't groom cats" / "December books up 3 weeks out."
- Owner-cadence: short declaratives, occasional fragments, contractions.
- One idea per sentence, mostly. A long sentence is fine when it's earning it.
- Price honesty: naming what affects cost beats hiding it behind "affordable."

## Scoring rubric (/100, audit mode)
Start at 100. −5 per high-severity violation, −2 per medium, −10 if the page contains zero concrete specifics (no number, place, process detail, or constraint anywhere). Floor 0.
**90+** ships · **70–89** fix highs, then ships · **<70** rewrite mode, don't patch.
