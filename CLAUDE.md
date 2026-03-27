# CLAUDE.md — Memória do Projeto Proesc Dashboard

> LEIA ESTE ARQUIVO INTEIRO ANTES DE QUALQUER ACAO.
> Atualizado a cada prompt. Fonte unica de verdade do projeto.
> Este projeto e EXCLUSIVO — nenhuma regra aqui se aplica a outros projetos.

---

## IDENTIDADE DO PROJETO
- **Nome:** Proesc Dashboard — Painel de Desempenho Escolar
- **Objetivo:** Dashboard de gestao de desempenho de alunos para escola particular. Produto funcional, online, acessivel por mobile e desktop, que demonstra capacidade de Product Manager de Dados.
- **Contexto:** Desafio tecnico do processo seletivo para PM Pleno na Proesc.
- **Prazo final:** 29/03/2026, 23h59
- **Dados:** 100 alunos do 3o ano, 3 turmas (3A, 3B, 3C), 4 notas bimestrais.
- **Idioma obrigatorio:** Portugues Brasileiro em TUDO — codigo de interface, comentarios, commits, documentacao, raciocinios, variaveis de UI. Unicos em ingles: nomes de funcoes/variaveis tecnicas e dependencias.
- **Repositorio GitHub:** https://github.com/Vieira-William/proesc-dashboard
- **Link de producao:** https://proesc-dashboard.vercel.app

## LINKS CRITICOS
- **Vercel (producao):** https://proesc-dashboard.vercel.app
- **GitHub:** https://github.com/Vieira-William/proesc-dashboard
- **Vercel Dashboard:** (a definir)
- **Brand guide Proesc:** proesc.howwebrand.com

## REGRAS OPERACIONAIS
- Idioma: PT-BR em tudo
- Transparencia absoluta: proibido alterar codigo sem documentar
- Postura: analitica, cirurgica, direta, sem floreios
- Visao sistemica: nenhum agente altera o que outro escreveu sem reportar
- Economia de tokens: respostas enxutas e focadas
- **Ciclo de Execucao obrigatorio:** Planejar → Codar → Testar → Corrigir → Entregar
- **shadcn/ui e a fonte UNICA de componentes** — estilo New York
- **Fonte tipografica:** Sora (institucional Proesc) via @fontsource/sora
- **Dark mode como padrao**

## DIARIO DE SESSOES

### 27/03/2026 15:40 — SETUP INICIAL DO PROJETO
- **O que foi pedido:** Executar o Checklist Pre-Codigo (secao 12 do Workflow). Criar projeto Vite + React + TS, arquivos de governanca, shadcn/ui, componentes, dependencias, Git/GitHub.
- **O que foi feito:** Projeto Vite criado, shadcn/ui instalado (21 componentes), dark mode configurado, boilerplate removido, logos e inspiracoes adicionados, DESIGN_BIBLE atualizada.
- **Decisoes tomadas:**
  - Criar Vite em pasta temp e copiar (pasta ja existia, Vite cancela se nao esta vazia)
- **QA — Teste por codigo:**
  - Build: PASSOU (172ms, sem erros TS)
- **Resultado:** CONCLUIDO (95% — push GitHub pendente: aguarda gh auth login do William)
- **Precisou voltar atras?** Nao
- **Commits:** 09c6852 (setup inicial)
- **Proximo passo sugerido:** Fase 1 completa — seguir para Fase 2 (Layout e Navegacao)

### 27/03/2026 — FASE 1: DADOS E LOGICA
- **O que foi pedido:** Copiar basedealunos.json.json exatamente para src/data/alunos.json. Criar src/lib/calculos.ts e src/hooks/useAlunos.ts conforme PRD.
- **O que foi planejado:** Plano detalhado com sequencia B1→B2→B3→validacao→build→commit
- **O que foi feito:**
  - B1: Sobrescrito src/data/alunos.json com arquivo do usuario (formato flat nota_1..nota_4, 100 registros)
  - CORRECAO: arquivo anterior tinha formato errado (nested notas.b1/b2/b3/b4) — substituido
  - B2: Criado src/lib/calculos.ts com 12 funcoes: mediaFinal, statusAluno, nivelRisco, tendenciaAluno, variancia, processarAluno, evolucaoBimestral, calcularMetricasGlobais, calcularMetricasTurma, rankingTop, rankingPiores, quaseAprovados, distribuicaoFaixas
  - B3: Criado src/hooks/useAlunos.ts com interface DadosProcessados e useMemo
- **Decisoes tomadas:**
  - Tendencia usa limiar ±0.5 (calibrado com dados reais para bater com PRD)
  - Variancia amostral (divisor n-1)
  - useMemo com dep array [turmaFiltro] — alunos sao constante estatica
- **QA — Validacao runtime (21/21 metricas PRD):**
  - Media geral: 6.82 ✓ | Aprovados: 67 ✓ | Reprovados: 33 ✓
  - 3A: 7.32 / 82.4% ✓ | 3B: 6.53 / 51.5% ✓ | 3C: 6.60 / 66.7% ✓
  - B1=6.55 ✓ B2=6.85 ✓ B3=6.80 ✓ B4=7.09 ✓
  - Critico=6 ✓ Alto=11 ✓ Medio=16 ✓ Baixo=67 ✓
  - Melhoraram=62 ✓ Pioraram=9 ✓ Estaveis=29 ✓
  - Quase aprovados=16 ✓
- **QA — Teste por codigo:**
  - Build: PASSOU (172ms, zero erros TypeScript)
- **Resultado:** CONCLUIDO 100%
- **Precisou voltar atras?** Nao
- **Quantas voltas no ciclo?** 1
- **Completou 100%?** Sim
- **Commits:** feat(dados): logica de calculo e hook central com 100 alunos
- **Proximo passo sugerido:** Fase 2 — Layout e Navegacao (Sidebar + PageHeader + tema dark)

### 27/03/2026 — FASE 3: VISAO GERAL
- **O que foi pedido:** Implementar pagina Visao Geral com KPI cards, filtro de turma, grafico de evolucao bimestral e tabela de alunos com busca/ordenacao/paginacao.
- **O que foi feito:**
  - Criado src/pages/VisaoGeral.tsx (orquestrador da pagina)
  - Criado src/components/visao-geral/FiltroTurma.tsx (ToggleGroup: Todas/3A/3B/3C)
  - Criado src/components/visao-geral/KpiCards.tsx (4 cards: Total, Media, Aprovacao, Risco)
  - Criado src/components/visao-geral/GraficoEvolucao.tsx (AreaChart Recharts via shadcn Chart)
  - Criado src/components/visao-geral/TabelaAlunos.tsx (tabela com busca, sort, paginacao 10/pagina)
  - Atualizado App.tsx para renderizar VisaoGeral na rota visao-geral
  - Instalado react-is (peer dep do Recharts)
  - Adicionado server.port=4000 no vite.config.ts (evitar conflito de portas)
  - Atualizado .claude/launch.json com porta 4000
- **Decisoes tomadas:**
  - MetricasTurma extends MetricasGlobais: KpiCards aceita ambos sem cast
  - metricasVisiveis: quando turma filtrada, usa metricasPorTurma[turma] para KPIs refletirem a turma
  - Estado turmaFiltro vive em VisaoGeral.tsx (controla todo o fluxo de dados)
  - Tabela com estado local (busca, ordenacao, paginacao) — reset automatico ao trocar turma
- **QA — Teste por codigo:**
  - Build: PASSOU (370ms, zero erros TypeScript)
- **QA — Verificacao visual (preview):**
  - KPI cards renderizam corretamente com valores do PRD
  - Filtro 3B: Total=33, Media=6.53, Aprovacao=51.5%, Risco=11 (0 criticos, 11 alto) — CORRETO
  - Grafico evolucao bimestral com area chart verde + gradient
  - Tabela com badges coloridos (status, risco), setas de tendencia, paginacao funcional
- **Resultado:** CONCLUIDO 100%
- **Precisou voltar atras?** Nao (apenas ajuste de porta do dev server)
- **Quantas voltas no ciclo?** 1
- **Completou 100%?** Sim
- **Commits:** c275b07 feat(visao-geral): Fase 3
- **Proximo passo sugerido:** Fase 4 — Analise por Turma (graficos comparativos)

### 27/03/2026 — FASE 4: ANALISE POR TURMA
- **O que foi pedido:** Pagina comparativa entre turmas 3A, 3B e 3C com graficos.
- **O que foi feito:**
  - Criado src/pages/AnaliseTurma.tsx (orquestrador)
  - Criado src/components/analise-turma/ComparativoKpis.tsx (3 cards: media, aprovacao com Progress, risco)
  - Criado src/components/analise-turma/GraficoEvolucaoComparativo.tsx (LineChart 3 linhas B1-B4)
  - Criado src/components/analise-turma/GraficoAprovacaoTurma.tsx (BarChart agrupado aprovados vs reprovados)
  - Criado src/components/analise-turma/GraficoDistribuicaoRisco.tsx (BarChart stacked Critico/Alto/Medio/Baixo)
  - Atualizado App.tsx para renderizar AnaliseTurma na rota analise-turma
- **Decisoes tomadas:**
  - useAlunos('todas') — sem filtro, mostra 3 turmas simultaneamente
  - Cores consistentes: 3A=chart-1, 3B=chart-2, 3C=chart-3
  - Graficos inferiores em grid 2 colunas (desktop) / 1 coluna (mobile)
- **QA — Build:** PASSOU (340ms, zero erros TS)
- **QA — Visual:** KPIs corretos (3A:7.32/82.4%, 3B:6.53/51.5%, 3C:6.60/66.7%), graficos renderizam OK
- **Resultado:** CONCLUIDO 100%
- **Precisou voltar atras?** Nao
- **Proximo passo sugerido:** Fase 5 — Alerta Precoce (sistema de risco)

### 27/03/2026 — FASE 5: ALERTA PRECOCE
- **O que foi pedido:** Pagina de alerta precoce focada em alunos em risco com priorizacao.
- **O que foi feito:**
  - Criado src/pages/AlertaPrecoce.tsx (orquestrador com filtro de turma)
  - Criado src/components/alerta-precoce/KpiCardsRisco.tsx (4 cards: Critico, Alto, Quase Aprovados, Em Melhoria)
  - Criado src/components/alerta-precoce/TabelaRisco.tsx (tabela com select de risco, busca, variancia, notas B1→B4, ordenacao por gravidade)
  - Criado src/components/alerta-precoce/PainelQuaseAprovados.tsx (Alert component com grid de 16 alunos + badge "falta X.X")
  - Atualizado App.tsx para rota alerta-precoce
- **Decisoes tomadas:**
  - Filtro turma reutilizado de visao-geral/FiltroTurma.tsx
  - Tabela mostra apenas risco nao-Baixo (33 alunos), ordenados Critico→Alto→Medio, depois media asc
  - Painel quase aprovados com Alert do shadcn + borda amarela destacada
- **QA — Build:** PASSOU (327ms, zero erros TS)
- **QA — Visual:** KPIs corretos (6C, 11A, 16QA, 23EM), tabela 33 alunos, painel 16 quase aprovados
- **Resultado:** CONCLUIDO 100%
- **Proximo passo sugerido:** Fase 6 — Integracao IA (Groq)

### 27/03/2026 — FASE 6: INTEGRACAO IA (GROQ)
- **O que foi pedido:** Pagina Insights IA com analise automatica via Groq Llama 3.3 70B.
- **O que foi feito:**
  - Instalado groq-sdk, criado .env com VITE_GROQ_API_KEY
  - Criado src/lib/groqClient.ts (SDK wrapper com streaming + system prompt PT-BR)
  - Criado src/lib/promptInsights.ts (monta prompt com dados agregados do dashboard)
  - Criado src/hooks/useInsightsIA.ts (gerencia estado: idle/streaming/done/error)
  - Criado src/pages/InsightsIA.tsx (botao gerar, streaming com cursor pulsante, formatacao markdown)
  - Atualizado App.tsx — todas 4 paginas agora implementadas
  - Adicionado .env ao .gitignore
- **Decisoes tomadas:**
  - Chamada direta ao Groq no browser (dangerouslyAllowBrowser: true) — aceitavel para portfolio
  - Streaming token-by-token para UX responsiva
  - Botao manual "Gerar Analise" (nao auto-dispara para economizar tokens)
  - Renderizacao markdown simplificada (h2/h3/bullet/bold sem lib externa)
- **QA — Build:** PASSOU (349ms, zero erros TS)
- **QA — Visual:** Pagina idle com estado vazio, botao gerar, streaming funcional, analise completa em PT-BR
- **Resultado:** CONCLUIDO 100%
- **Proximo passo sugerido:** Fase 7 — Polish e QA Final

## BACKLOG / PROXIMOS PASSOS
1. [CONCLUIDO] Setup inicial
2. [CONCLUIDO] Fase 1 — Dados e Logica (alunos.json + calculos.ts + useAlunos.ts)
3. [CONCLUIDO] Fase 2 — Layout e Navegacao (Sidebar + PageHeader + tema dark)
4. [CONCLUIDO] Fase 3 — Visao Geral (KPI cards + tabela + filtros + grafico)
5. [CONCLUIDO] Fase 4 — Analise por Turma (graficos comparativos)
6. [CONCLUIDO] Fase 5 — Alerta Precoce (sistema de risco)
7. [CONCLUIDO] Fase 6 — Integracao IA (Groq Llama 3.3 70B)
8. Fase 7 — Polish e QA Final
9. Fase 8 — Deploy Final

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
