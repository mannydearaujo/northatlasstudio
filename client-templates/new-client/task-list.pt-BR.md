# Lista De Tarefas Do Cliente - [Nome Do Cliente]

Fase atual: Entrada do lead
Próxima fase: Auditoria do site

## Fase 1 - Entrada Do Lead

- [ ] Status: Não iniciado - Criar a pasta local do cliente.
- [ ] Status: Não iniciado - Criar ou atualizar o registro no CRM.
- [ ] Status: Não iniciado - Registrar nome da empresa, site, link GBP/Maps, contato, segmento, cidade/área atendida, origem e motivo de encaixe.
- [ ] Status: Não iniciado - Anotar pedidos do cliente e arquivos faltando.

Fluxo relevante: `north-atlas-project-sync`

## Fase 2 - Qualificação Do Prospect

- [ ] Status: Não iniciado - Se o lead veio de Apify/Maps/lista raspada, normalizar e pontuar o prospect.
- [ ] Status: Não iniciado - Anotar um motivo claro para continuar ou entrar em contato.
- [ ] Status: Não iniciado - Verificar opt-out/supressão antes de qualquer outreach.

Fluxo relevante: `apify-local-lead-prospecting`

## Fase 3 - Auditoria Interna Do Site

- [ ] Status: Não iniciado - Ler homepage, página de serviço, área atendida/localização, FAQ/contato, sitemap, robots e HTML bruto.
- [ ] Status: Não iniciado - Rodar PageSpeed mobile e desktop e salvar `audit/pagespeed.json`.
- [ ] Status: Não iniciado - Pontuar prontidão para busca local e IA.
- [ ] Status: Não iniciado - Recomendar eventos de leads reais e eventos secundários no GA4.
- [ ] Status: Não iniciado - Salvar o dashboard interno como `audit/ai-search-audit-[business-slug].html`.
- [ ] Status: Não iniciado - Não enviar o dashboard interno ao cliente como está.

Fluxos relevantes: `ai-search-readiness-audit`, `lighthouse-technical-seo-fixer`

## Fase 4 - GBP / Auditoria Local

- [ ] Status: Não iniciado - Solicitar prints do Google Business Profile, URL do Maps ou intake do dono.
- [ ] Status: Não iniciado - Revisar categorias, serviços, avaliações/respostas, posts, fotos, perguntas, horários, NAP e alinhamento com o site.
- [ ] Status: Não iniciado - Criar plano de atividade de 30 dias no GBP quando fizer sentido.

Fluxos relevantes: `google-business-profile-optimizer`, `gbp-posting-calendar`

## Fase 5 - Resumo Para O Cliente E Oferta

- [ ] Status: Não iniciado - Resumir os principais problemas em linguagem simples.
- [ ] Status: Não iniciado - Selecionar apenas os achados que ajudam o cliente a decidir o próximo passo.
- [ ] Status: Não iniciado - Escolher a oferta: rebuild, páginas locais, rastreamento ou retainer.
- [ ] Status: Não iniciado - Criar a auditoria resumida / offer sheet para cliente em `sales/` ou `reports/`.
- [ ] Status: Não iniciado - Incluir escopo, preço, prova, linguagem sem garantia e um próximo passo claro.

Fluxo relevante: `offer-sheet-builder`

## Fase 6 - Onboarding Do Cliente

- [ ] Status: Não iniciado - Criar ou atualizar o manual operacional do cliente.
- [ ] Status: Não iniciado - Criar o pacote de voz do cliente.
- [ ] Status: Não iniciado - Confirmar serviços, áreas atendidas, provas, arquivos, acessos e convenções de rastreamento.
- [ ] Status: Não iniciado - Confirmar acessos ao GA4, GTM, Search Console, site/CMS e domínio/DNS.
- [ ] Status: Não iniciado - Se faltar acesso, documentar se o caminho é recuperar propriedade ou criar nova configuração.

Fluxos relevantes: `client-site-operating-manual`, `client-voice-pack-builder`, `lead-tracking-installer`

## Fase 7 - Entrega / Correções

- [ ] Status: Não iniciado - Criar branch ou worktree no repositório do site do cliente.
- [ ] Status: Não iniciado - Construir/corrigir homepage, páginas de serviço, páginas locais, FAQ, prova, CTAs, schema e pontos de rastreamento.
- [ ] Status: Não iniciado - Evitar páginas doorway e verificar detalhes locais antes de publicar.

Fluxos relevantes: `local-service-site-builder`, `city-service-cluster-builder`, `schema-and-faq-sync-auditor`, `lighthouse-technical-seo-fixer`

## Fase 8 - Lançamento E QA

- [ ] Status: Não iniciado - Verificar domínio, SSL, canonical, sitemap, robots, schema, formulários, links de telefone/e-mail/SMS, GA4/GTM, Search Console, mobile e alinhamento com o GBP.
- [ ] Status: Não iniciado - Confirmar que o site ao vivo não está bloqueado por staging, senha ou noindex.
- [ ] Status: Não iniciado - Salvar notas de lançamento.

Fluxo relevante: `static-local-seo-launch-system`

## Fase 9 - Relatórios E Retainer

- [ ] Status: Não iniciado - Gerar relatório semanal em pt-BR quando o cliente preferir português.
- [ ] Status: Não iniciado - Planejar posts GBP, pedidos/respostas de avaliações, conteúdo local, ajustes de conversão e coleta de provas.
- [ ] Status: Não iniciado - Pedir depoimento/indicação quando houver prova real.

Fluxos relevantes: `weekly-client-report-generator`, `gbp-posting-calendar`, `compliant-review-engine`, `localized-blog-opportunity-finder`, `case-study-and-proof-builder`

## Próximas 3 Ações

1. Criar registro no CRM e preencher `intake.pt-BR.md`.
2. Fazer a auditoria interna do site e a revisão local/GBP.
3. Transformar os achados em uma oferta simples para o cliente.
