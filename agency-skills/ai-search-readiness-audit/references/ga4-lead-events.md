# GA4 Lead-Tracking Recommendation

Readiness work only matters if it produces **leads the owner can see**. This is the piece North Atlas
actually guarantees — not rankings, but **measurement**. Use this to recommend what to track on the
audited site, matched to how that specific business converts.

## The tiering rule (apply consistently)

| Tier | Meaning | How to use it |
|------|---------|---------------|
| **Real lead** | A high-intent action that directly creates a sales opportunity — the closest digital proxy to "a human is trying to give this business money." | The headline number. Mark as a **Key Event** (conversion) in GA4. |
| **Secondary intent** | Real interest, not yet a committed contact. Explains the funnel. | Track and report as context. Do **not** mark as Key Event — it keeps conversion data honest. |
| **Diagnostic / load** | A component rendered or was seen. No intent on its own. | QA and funnel-drop analysis only. Never report as a result. |

The honesty rule that makes the reports trustworthy: **a form *open* is not a lead; a booking *click*
is not a booking.** Only count the committed action as a real lead. `phone_tap` is the exception we do
count — on mobile, tap-to-call is the strongest available buying signal and the phone is the primary
close channel for local service businesses.

## Match the events to the business

Identify how this business turns a visitor into a customer, then recommend accordingly:

**Phone-driven (most local service businesses):**
- Real lead: `phone_tap` (tap-to-call)
- Secondary: `sms_tap`, `email_click`

**Booking-driven (grooming, salons, appointments — e.g., the Golden Paws pattern):**
- Real leads: `booking_click` (clicked through to book), `phone_tap`
- Secondary: `sms_tap`, `booking_embed_interaction` (engaged the embedded widget)
- Diagnostic: `booking_embed_load` (widget rendered — QA/funnel only)
- Funnel: `booking_embed_load` → `booking_embed_interaction` → `booking_click`. High load + low
  interaction = the widget is seen but not used (friction/trust issue).

**Quote/form-driven (contractors, home services — e.g., the AlphaGutterCo pattern):**
- Real leads: `quote_request_submit` (completed form — the money event), `phone_tap`
- Secondary: `quote_request_click` (opened/started but didn't submit), `sms_tap`, `email_click`
- Funnel: `quote_request_click` → `quote_request_submit`. Click-without-submit is the #1 optimization
  target — warm people abandoning the form.

**E-commerce / product:** use GA4's standard ecommerce events (`begin_checkout`, `purchase`); treat
`purchase` as the real lead.

## How to phrase it in the report

Keep it to the essentials the owner cares about:
1. **What we'd track as a real lead** (1–2 events) and why those are the money signals for this business.
2. **What we'd track as supporting context** (the secondary events that explain changes).
3. **The one-line promise:** "We can't promise a ranking, but we *can* show you exactly how many calls,
   quotes, and bookings the site generates — and prove it's improving."

Keep naming consistent across clients (one Looker-ready convention) so reports stay comparable. Note the
normal GA4 lag: new events can take 24–48h to appear in the Admin/Key Events list even when firing live
in Realtime.
