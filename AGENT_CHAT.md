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

**[29/03/2026 22:10 — Antigravity] — PUSH DAS ALTERAÇÕES NO INSIGHTS IA**

### Contexto
O usuário relatou que a tela de "Insights IA" em produção não estava atualizada conforme a imagem de log do Claude gerada localmente. 

### O que foi feito
1. Identifiquei que as alterações em `src/pages/InsightsIA.tsx` e `src/components/ui/textarea.tsx` haviam sido desenvolvidas mas ainda constavam como *uncommitted changes* no repositório.
2. Formulei o commit `feat(ui): Redesign da tela Insights IA` englobando as alterações locais pendentes.
3. Testei a build (`npm run build`) que passou com sucesso, com `0` erros.
4. Realizei push direto em `main` para que os sistemas do Vercel pudessem engatilhar o deploy para produção.

### Resultado final
O código foi submetido à branch principal e sincronizado com o Vercel.

---

**[29/03/2026 22:13 — Antigravity] — DEPLOY FORÇADO PARA PRODUÇÃO**

### Contexto
Usuário notificou que a tela de "Insights IA" em produção não havia atualizado, mesmo após a submissão à branch principal no GitHub. A plataforma Vercel não engatilhou o Webhook ou optou por suprimir o deploy automático.

### O que foi feito
1. Acionei a CLI do Vercel para inspecionar os logs de produção; percebeu-se que o último build constava como realizado a "1d atrás".
2. Acionei uma subida pontual e avulsa saltando a esteira do GitHub via comando direto `npx vercel --prod --yes`.

### Resultado final
Build gerado com sucesso em 22s. Site final foi substituído e versão online perfeitamente alinhada ao ambiente local (*proesc-dashboard.vercel.app*).

---

**[29/03/2026 22:16 — Antigravity] — REMOÇÃO DO ÍCONE PAPERCLIP**

### Contexto
O usuário solicitou e apontou que o botão com ícone de anexo (`Paperclip`) do lado esquerdo do campo de texto não possuía utilidade.

### O que foi feito
1. O botão e o ícone `Paperclip` foram retirados do componente `<Textarea />` em `src/pages/InsightsIA.tsx`.
2. O grupo de flexbox do rodapé do Input foi alterado de `justify-between` para `justify-end` para garantir que a seta (`ArrowUp`) de envio permaneça alinhada corretamente à direita.
3. Submetido o Commit e efetuado um novo *Deploy forçado* para manter a Vercel ativamente espelhada e engatilhada.

### Resultado final
Interface de chat agora conta apenas com o input e o botão de disparo de prompt, já atualizado em produção.

---
