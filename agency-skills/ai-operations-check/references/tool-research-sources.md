# Tool research sources and order of preference

Check in this order. Stop as soon as a genuine fit is found — don't keep shopping past a good match.

## 1. North Atlas's own AI Operations catalog (always check first)

From `BUSINESS-BLUEPRINT.md`'s Offer Stack, Core Service #4:

- **Back-office report automation** — a report currently rebuilt by hand each week/month from
  software the client already uses (MoeGo, Jobber, QuickBooks, Square, etc.), regenerated instead by
  an automation. The Golden Paws MoeGo transaction report is the internal proof model for this.
- **Missed-call text-back and lead capture** — wired to GA4 as a real-lead key event.
- **Review request/reply support and overdue-invoice follow-up** — always owner-approved before
  anything sends; never fully autonomous outreach.

These are the only fixes North Atlas already knows how to build, price, and support end to end.
Prefer them whenever the bottleneck genuinely matches — don't reach for a general SaaS tool when one
of these three already solves the problem.

## 2. General AI/SaaS tool directories (when nothing above fits)

Use these to research what already exists rather than assuming a custom build is needed — most of the
time the owner's problem is solved by a plain tool they simply never heard of, no AI required:

- **futurepedia.io** — large AI tool directory, browsable by category/industry.
- **thereisanaifor.com** — similar directory, often filterable by use case (e.g. real estate, field
  service).

Use these for research and orientation, not as an endorsement list — verify pricing, data-handling,
and whether the tool is still actively maintained before naming it in a report.

## 3. Judgment-call substitution

Never take a tool suggestion (yours or an AI's) at face value. Before it goes in a report, check:

- **Size fit** — a 3–20 person local business almost never needs an enterprise tool (e.g., don't
  recommend Salesforce to a business that doesn't run a sales team; a lighter CRM almost always fits
  better).
- **Cost fit** — the tool's monthly cost should look small next to the hours it's meant to save. If it
  doesn't, either the tool is wrong or the time-savings estimate is wrong — recheck both.
- **Setup complexity** — favor tools the owner (or their existing staff) can actually turn on and use,
  not something that requires ongoing technical maintenance nobody on their team can provide. If real
  ongoing maintenance is required, that's a signal for the AI Operations retainer conversation, not a
  one-time install.

## Beyond the current catalog (not yet priced or approved — flag, don't quote)

Two categories of finding come up that don't map to anything in the Offer Stack today. Note them as
findings when genuinely present — do not assign them a price or pitch them as an offer without
checking with Manny first, per the pricing-judgment rule in the root `CLAUDE.md`:

- **Process redesign** — the bottleneck is a broken/bloated process (e.g., a 16-step workflow that
  should be 7), not a missing tool. The right fix here is fixing the process itself before any
  automation is layered on top — automating a broken process just makes it fail faster.
- **Custom knowledge system** — a business has a recurring, narrow, high-volume question pattern from
  customers or partners (the same 5 questions asked hundreds of times, for example) that a small
  custom knowledge base or trained assistant could absorb. This is a genuinely different deliverable
  from the three cataloged installs — it's built around the business's own material, not a
  configuration of an existing tool.

If either of these shows up repeatedly across real AI Operations Checks, that's a signal worth
surfacing to Manny as a candidate Offer Stack addition — but that decision belongs to him, not to this
skill.
