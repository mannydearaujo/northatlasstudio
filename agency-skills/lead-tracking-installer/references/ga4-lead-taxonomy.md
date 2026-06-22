# NorthPoint Digital — GA4 Lead Logic & Measurement Spec

_Last reviewed: 2026-06-22_

This is NorthPoint Digital's single source of truth for what counts as a **real lead** vs. a **support/intent metric** across all client sites. Apply it consistently so reports are comparable client-to-client.

---

## Core definitions

| Tier | Meaning | How to use it |
|------|---------|---------------|
| **Real lead** | A high-intent action that directly creates a sales opportunity. The closest digital proxy to "a human is trying to give this business money." | This is the headline number on every report. Mark as **Key Event** (conversion) in GA4. |
| **Secondary intent** | Real interest, but not yet a committed contact. Useful for diagnosing the funnel and spotting friction. | Track and report as supporting context. Do **not** mark as Key Event (keeps conversion data clean). |
| **Diagnostic / load** | Tells us a component rendered or was seen. No intent on its own. | Use only for QA and funnel-drop analysis. Never report as a result. |

---

## Golden Paws Pet Grooming

**Real leads (Key Events):**
- `booking_click` — user clicked through to book (intent to schedule)
- `phone_tap` — user tapped the phone number to call

**Secondary intent:**
- `sms_tap` — tapped to text
- `booking_embed_interaction` — engaged with the embedded booking widget

**Diagnostic / load:**
- `booking_embed_load` — booking widget rendered (QA + funnel-drop only)

**Funnel read:**
`booking_embed_load` → `booking_embed_interaction` → `booking_click` = the booking path.
A high load count with low interaction = the widget is seen but not used (friction or trust issue).

---

## AlphaGutterCo

**Real leads (Key Events):**
- `quote_request_submit` — completed quote form (the money event)
- `phone_tap` — tapped to call

**Secondary intent:**
- `quote_request_click` — opened/started the quote form but didn't submit
- `sms_tap` — tapped to text
- `email_click` — clicked the email link

**Funnel read:**
`quote_request_click` → `quote_request_submit` = the quote path.
Click-without-submit is your #1 optimization target — those are warm people abandoning the form.

---

## Why this split matters

- **Counting `_click` and `_load` events as leads inflates results and erodes trust.** A booking *click* is not a booking; a form *open* is not a quote. Only count the committed action.
- `phone_tap` is treated as a real lead even though we can't confirm the call connected — on mobile a tap-to-call is the strongest available signal of buying intent, and for local service businesses the phone is the primary close channel.
- Secondary metrics exist to **explain** changes in real leads, not to pad the topline.

---

## GA4 setup checklist (per site)

- [ ] GA4 access confirmed, recovered, or new property created
- [ ] GTM access confirmed, recovered, or new container created when GTM is the install method
- [ ] Search Console access confirmed or ownership verification plan documented
- [ ] Install date recorded if historical analytics access/data is unavailable
- [ ] All events firing and confirmed in **Realtime**
- [ ] Real-lead events marked as **Key Events** in Admin → Events
- [ ] Note: new events can take 24–48h to appear in the Admin events list / Key Events even when firing live in Realtime (this is normal GA4 lag — verify in Realtime, then confirm in Admin a day later)
- [ ] Secondary/diagnostic events left **unmarked**
- [ ] One **looker-ready** naming convention kept identical across clients

If the client has no access to old GA4, GTM, or Search Console, do not claim historical performance. Recover/verify ownership where possible, or start clean tracking from the install date and explain the gap plainly.

> Open item (2026-06-16): AlphaGutterCo `quote_request_submit` is firing in Realtime but may not yet show in the Admin Key Events list — recheck within 48h and mark as Key Event once visible.
