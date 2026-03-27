# Diario de Engenharia — Proesc Dashboard

> **Regras de Uso:**
> 1. LEIA este arquivo ao iniciar uma sessao.
> 2. REGISTRE todo processo complexo, erro superado, ou descoberta importante.
> 3. Nunca diga apenas "Deu certo". Explique O QUE, COMO, POR QUE.
> 4. ASSINE com data, hora e identidade do agente.
> 5. Seja direto, analitico e completo. Sem floreios.

---

## Registro

**[27/03/2026 15:40 — Claude Code] — SETUP INICIAL DO PROJETO**

### Contexto
Primeiro prompt do projeto. William pediu execucao do Checklist Pre-Codigo (secao 12 do Workflow). Pasta do projeto estava vazia.

### O que foi feito
1. Criado projeto Vite + React + TypeScript
2. Criados 5 arquivos de governanca (CLAUDE.md, STACK_INFRA.md, DESIGN_BIBLE.md, AGENT_CHAT.md, AGENT_BOARD.md)
3. Criada pasta docs/inspiracoes/ com README.md
4. Inicializado shadcn/ui com estilo New York
5. Instalados todos os componentes shadcn do PRD
6. Instaladas dependencias: recharts, lucide-react, @fontsource/sora
7. Criada pasta public/logos/
8. Inicializado Git + repositorio GitHub publico
9. Commit de setup + push para main

### Problemas encontrados
- Vite cancela criacao se a pasta destino ja existe (mesmo vazia). Resolvido criando em /tmp e copiando.

### Solucao aplicada
Criar projeto Vite em pasta temporaria e mover conteudo para a pasta do projeto.

### Resultado final
(Sera atualizado ao final do setup)

### Alerta para proximos agentes
- A pasta `docs/inspiracoes/` esta vazia — BLOQUEIO de codigo visual ate William adicionar imagens.
- O projeto usa shadcn estilo New York, NAO Default.
- Dark mode e o padrao.

---
