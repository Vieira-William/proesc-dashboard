# Inspiracoes Visuais — Proesc Dashboard

> Referencias visuais escolhidas pelo William para guiar a direcao estetica do projeto.
> O agente DEVE consultar estas imagens antes de implementar qualquer componente visual.

## Indice de Referencias

| Arquivo | Descricao | Contexto de uso |
|---------|-----------|-----------------|
| `screencapture-ui-shadcn-view-new-york-v4-dashboard-01-2026-03-05-21_38_36.png` | Dashboard v4 New York (dark) — REFERENCIA PRINCIPAL | KPI cards em linha, grafico de area com seletor de periodo, tabs de filtro, data table com badges de status, sidebar com navegacao agrupada, paginacao |
| `screencapture-ui-shadcn-2026-03-05-21_39_49.png` | Homepage shadcn (dark) — Showcase de componentes | Vocabulario visual: badges, toggles, inputs, selects, sliders. Cantos arredondados medios. Botoes com variantes (primary, outline, ghost) |
| `screencapture-ui-shadcn-blocks-2026-03-05-21_36_13.png` | Blocks page (dark) — Layouts completos | Dashboard com sidebar e block oficial. Confirma dark mode como padrao. Mostra layout sidebar + conteudo principal |
| `screencapture-ui-shadcn-examples-dashboard-2026-03-05-21_40_09.png` | Examples Dashboard (dark/light sidebar) | KPI cards identicos a ref 1. Grafico de area com preenchimento gradiente (azul → transparente). Tabs com contagem numerica. Sidebar com background diferente do conteudo |
| `screencapture-ui-shadcn-examples-tasks-2026-03-05-21_40_29.png` | Examples Tasks (dark) — Data table densa | Padrao de tabela: checkbox + ID + badge tipo + titulo + status + prioridade + acoes (...). Filtros acima: input busca + botoes filtro. Header com saudacao. Paginacao identica ao dashboard |

## Analise Visual Consolidada (27/03/2026)

### Confirmacoes extraidas das 5 referencias:
1. **Dark mode e padrao** — 5/5 imagens sao dark
2. **Layout sidebar + conteudo** — usado em 3/5 refs (dashboard, blocks, examples)
3. **KPI cards em linha** — 4 cards com label, valor grande, icone de tendencia, subtitulo
4. **Grafico de area com gradiente** — preenchimento cor → transparente
5. **Data table com badges** — status colorido, acoes no final, paginacao, filtros acima
6. **Seletor de periodo** — toggle group com opcoes de range acima do grafico
7. **Bordas sutis sem sombra** — cards separados por border, nao shadow
8. **Cantos arredondados medios** — radius padrao New York/Nova

### Direcao visual documentada na DESIGN_BIBLE.md:
- Todos os padroes acima estao refletidos na DESIGN_BIBLE.md
- Nenhum conflito entre inspiracoes e regras documentadas

## Como usar
- Antes de codar qualquer componente visual, abra esta pasta
- Compare o que vai implementar com as referencias aqui
- Se houver conflito entre uma inspiracao e a DESIGN_BIBLE, pergunte ao William
