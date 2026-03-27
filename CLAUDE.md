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
- **Link de producao:** (sera preenchido apos deploy na Vercel)

## LINKS CRITICOS
- **Vercel (producao):** (a definir)
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

## BACKLOG / PROXIMOS PASSOS
1. [CONCLUIDO] Setup inicial (95% — push pendente)
2. [CONCLUIDO] Fase 1 — Dados e Logica (alunos.json + calculos.ts + useAlunos.ts)
3. Fase 2 — Layout e Navegacao (Sidebar + PageHeader + tema dark)
4. Fase 3 — Visao Geral (KPI cards + tabela + filtros)
5. Fase 4 — Analise por Turma (graficos comparativos)
6. Fase 5 — Alerta Precoce (sistema de risco)
7. Fase 6 — Integracao IA (Groq)
8. Fase 7 — Polish e QA Final
9. Fase 8 — Deploy Final
