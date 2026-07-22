# Instant-Results Email — Content Rules

The third tier, distinct from both the internal audit dashboard and the priced offer sheet. This is
what makes a "free audit" tool feel responsive without leaking internal pricing/scope thinking or
committing to a specific package before a human has looked at it.

## What it includes

1. **Score and band** — the same `/100` and band (Strong / Developing / Foundational / At risk) from
   the internal audit, framed plainly: "readiness," never a ranking promise.
2. **3–4 top findings**, in client-safe language (translate, don't paste — no severity labels, no
   internal jargon like "TBT" or "Lighthouse," just what it means for them in plain English).
3. **2–3 genuine strengths** — an audit that's all criticism doesn't land; always name what's
   actually working.
4. **A line that a follow-up is coming** — sets up the later offer-sheet outreach so it doesn't feel
   out of the blue. Something like: "We'll follow up soon with specific recommendations for your
   site" — no price, no specific package named here.
5. **No price. No specific offer.** That's the whole point of keeping this a separate, lighter tier
   — pricing and package selection stay a human-reviewed decision (the offer sheet), not something
   that goes out the moment an audit finishes.

## Voice

"We," never "I" — see `CLAUDE.md` "Messaging Guardrails." Plain, warm, not salesy. This is a
delivered-value email, not a pitch.

## English template

```
Subject: Your free site audit results — {{business}}

Hi {{name}},

Thanks for requesting a free site audit for {{business}}. Here's what we found.

Your score: {{score}}/100 — {{band}}

{{2-3 sentence plain-English verdict, same spirit as the internal audit's headline verdict but
translated to client-safe language}}

What we found:
- {{finding_1, client-safe}}
- {{finding_2, client-safe}}
- {{finding_3, client-safe}}

What's already working:
- {{strength_1}}
- {{strength_2}}

We'll follow up soon with specific recommendations for your site — no obligation either way.

— North Atlas Studio
```

## Portuguese template (pt-BR)

Formal, owner-friendly tone built around "sua empresa" per `CLAUDE.md`'s Portuguese client delivery
rule. "Nós," never "eu."

```
Assunto: Resultado da sua auditoria gratuita — {{business}}

Olá {{name}},

Obrigado por solicitar uma auditoria gratuita para {{business}}. Aqui está o que encontramos.

Sua pontuação: {{score}}/100 — {{band}}

{{veredito de 2-3 frases, em linguagem simples e segura para o cliente}}

O que encontramos:
- {{achado_1, linguagem segura}}
- {{achado_2, linguagem segura}}
- {{achado_3, linguagem segura}}

O que já está funcionando bem:
- {{ponto_forte_1}}
- {{ponto_forte_2}}

Em breve entraremos em contato com recomendações específicas para o seu site — sem compromisso.

— North Atlas Studio
```

## Guardrails

- No fabricated data — every finding and strength must trace to something the internal audit
  actually found. Same proof rules as everything else in this repo.
- Never promise rankings, placements, or guaranteed results — same no-guarantee standard as the
  offer sheet and the internal audit.
- Keep it short. This is a results delivery, not a full report — the internal dashboard has the
  detail; this has the headline.
