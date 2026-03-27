# DESIGN_BIBLE.md — Biblia de Design do Proesc Dashboard

> REGRA ABSOLUTA: Todo componente, cor, fonte, espacamento, sombra,
> icone e animacao DEVE vir do shadcn/ui ou estar documentado aqui.
> NENHUM estilo ad-hoc, NENHUMA fonte externa, NENHUM componente inventado.
> Se o shadcn/ui nao tem, documente a excecao aqui com justificativa.

---

## FONTE UNICA DE COMPONENTES
- **shadcn/ui** — https://ui.shadcn.com/
- **Estilo:** New York (NAO Default) — configurado no `npx shadcn@latest init`
- CLI, MCP Server e Skills instalados ANTES de qualquer codigo
- Todos os componentes devem ser instalados via CLI (`npx shadcn@latest add`)
- PROIBIDO copiar/colar codigo de componente manualmente

## REFERENCIAS VISUAIS (PASTA DE INSPIRACOES)
- Localizacao: `docs/inspiracoes/`
- Direcao visual sera documentada aqui apos William adicionar as imagens

### Analise das Inspiracoes
(Sera preenchido apos William adicionar imagens em docs/inspiracoes/)

---

## DIRECAO VISUAL DEFINIDA

### Tema Principal
- **Dark mode como padrao** — todas as referencias sao dark
- Light mode como alternativa (toggle disponivel)
- Estilo: **shadcn New York** (nao Default)
- Tom: profissional, data-dense, sem decoracao desnecessaria

### Decisao de Layout: Sidebar
- **Desktop (lg+):** Sidebar fixa a esquerda (shadcn `Sidebar` component)
  - Sidebar com navegacao agrupada
  - Conteudo principal ocupa o restante
- **Mobile (< lg):** Sidebar colapsavel (hamburger menu) → shadcn `Sheet`
  - Conteudo ocupa 100% da largura

### Padrao de KPI Cards
```
+--------------------------------+
|  Label pequeno        ↗ +12%  |
|  $1,250.00                    |
|  Subtitulo descritivo ↗       |
+--------------------------------+
```
- Label: text-sm text-muted-foreground
- Valor: text-2xl font-bold
- Trend: icone de seta (TrendingUp/TrendingDown) + percentual colorido
- Subtitulo: text-xs text-muted-foreground
- 4 cards em grid: `grid-cols-4` desktop → `grid-cols-2` tablet → `grid-cols-1` mobile

### Padrao de Tabela
- shadcn `DataTable` (nao `Table` simples)
- Badges de tipo/categoria com cores semanticas
- Status com icone (ponto colorido) + texto
- Header com: input de busca a esquerda + botoes de filtro + acoes a direita
- Footer com: contagem + rows per page (select) + paginacao com setas
- Hover na linha com background sutil

### Padrao de Graficos
- Graficos de area com preenchimento gradiente (cor → transparente)
- Seletor de periodo acima do grafico (toggle group)
- Eixos discretos, sem grid pesado
- Tooltip ao hover
- Cores do tema shadcn (variaveis CSS chart-1, chart-2, etc.)
- shadcn `Chart` component como wrapper do Recharts

### Padrao de Filtros
- Input de busca com placeholder ("Filtrar...")
- Botoes de filtro como badges clicaveis (shadcn `Button` variant="outline")
- Disposicao: input a esquerda, filtros no meio, acoes a direita

## TIPOGRAFIA
- Fonte institucional da Proesc: **Sora** (Google Fonts — excecao aprovada)
- Importar via `@fontsource/sora` (npm, nao CDN externo)
- Fallback: system font stack do shadcn New York
- Escala:
  - Titulos de pagina: text-2xl font-bold tracking-tight (Sora)
  - Subtitulos: text-sm text-muted-foreground
  - Labels de card: text-sm font-medium
  - Valores grandes (KPI): text-2xl font-bold
  - Corpo de tabela: text-sm
  - Badges: text-xs
- PROIBIDO text-[Xpx] ad-hoc. Usar SEMPRE a escala do Tailwind.

## PALETA DE CORES

### Identidade Proesc (brand guide oficial: proesc.howwebrand.com)

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Verde Amazonia** | `#145A2D` | rgb(20, 90, 45) | Verde escuro/primario. Sidebar fundo (light mode). |
| **Verde Amapa** | `#64CD32` | rgb(100, 205, 50) | **Cor brand principal no dark mode.** Acento, icones ativos, links. Bom contraste em fundo escuro. |
| **Verde Vitoria-Regia** | `#B4F069` | rgb(180, 240, 105) | Verde claro. Hover states, destaques, graficos secundarios. |
| **Verde Jade** | `#F0FFE6` | rgb(240, 255, 230) | Verde muito claro. Background sutil em light mode. |

### Como aplicar no tema shadcn (dark mode como padrao)

```css
/* Em index.css — sobrescrever variaveis do tema shadcn */

/* Dark mode (padrao) */
.dark {
  --primary: 105 80% 50%;           /* Verde Amapa #64CD32 em HSL */
  --primary-foreground: 0 0% 100%;  /* Branco sobre verde */
  --accent: 90 75% 68%;             /* Verde Vitoria-Regia #B4F069 */
}

/* Light mode */
:root {
  --primary: 145 64% 22%;           /* Verde Amazonia #145A2D em HSL */
  --primary-foreground: 0 0% 100%;  /* Branco sobre verde */
  --accent: 95 65% 45%;             /* Verde Amapa ajustado para light */
}
```

> Os valores HSL exatos devem ser ajustados durante implementacao
> para garantir conformidade com o sistema OKLCH do shadcn v4.
> Os hex acima sao a fonte de verdade — converter para o formato que shadcn usar.

### Cores semanticas de status
- Aprovado: `text-emerald-500` / `bg-emerald-500/10`
- Reprovado: `text-red-500` / `bg-red-500/10`
- Risco Critico: `text-red-500`
- Risco Alto: `text-orange-500`
- Risco Medio: `text-yellow-500`
- Risco Baixo: `text-emerald-500`
- Tendencia ↑: `text-emerald-500`
- Tendencia ↓: `text-red-500`
- Tendencia →: `text-muted-foreground`

### Cores de grafico
- Turma 3A: `var(--chart-1)` — tom de Verde Amapa
- Turma 3B: `var(--chart-2)` — tom de Verde Vitoria-Regia
- Turma 3C: `var(--chart-3)` — tom complementar (azul-verde)
- Media geral: `var(--chart-4)` — pontilhado, cinza muted

- PROIBIDO cores hardcoded (hex/rgb) EXCETO as cores Proesc documentadas acima.
- Usar SEMPRE variaveis CSS ou classes Tailwind semanticas.

## ESPACAMENTO E LAYOUT
- Container: NAO usar max-w centralizado. Usar layout sidebar + conteudo full-width.
- Padding do conteudo principal: `p-6` (desktop) / `p-4` (mobile)
- Gap entre cards: `gap-4`
- Gap entre secoes: `gap-6`
- Cards com border sutil (como nas refs), sem shadow pesado
- Separadores entre secoes: shadcn `Separator`

## ICONES
- Biblioteca: Lucide React (ja inclusa no shadcn/ui)
- Uso nas KPI cards: TrendingUp, TrendingDown, Users, GraduationCap, AlertTriangle, CheckCircle
- Uso na sidebar: LayoutDashboard, BarChart3, ShieldAlert, Sparkles, Settings
- Uso na tabela: ArrowUpDown (ordenacao), MoreHorizontal (acoes), Search (busca)
- PROIBIDO usar outra biblioteca de icones

## SOMBRAS E BORDAS
- Cards: `border` (borda fina padrao do tema) — SEM shadow
- Sidebar: `border-r` (borda direita separando do conteudo)
- Tabela: linhas com `border-b` sutil
- Sem sombras customizadas. As referencias sao flat/minimal.

## GRAFICOS
- Biblioteca: Recharts via shadcn `Chart` component
- Estilo de area: preenchimento gradiente (cor do topo → transparente no fundo)
- Estilo de linha: stroke suave, sem pontos visiveis (mostrar apenas no hover)
- Cores: variaveis CSS `--chart-1`, `--chart-2`, etc.
- Seletor de periodo: shadcn `ToggleGroup` acima do grafico
- Tooltip: shadcn chart tooltip (integrado)
- Grid: sutil, quase invisivel (`stroke-dasharray` ou opacity baixa)
- ResponsiveContainer: SEMPRE (100% width, altura fixa por tipo)

## ANIMACOES
- Transicoes sutis e funcionais APENAS
- Sidebar collapse: transicao suave (200-300ms)
- Hover em linhas da tabela: background sutil
- Tooltip de grafico: fade-in rapido
- Troca de tema (dark/light): transition em colors
- PROIBIDO animacoes decorativas, bounces, slides chamativos
- PROIBIDO animacoes que prejudiquem performance mobile

## RESPONSIVIDADE
- **Abordagem:** Desktop-first (as referencias sao desktop), com adaptacao mobile
- **Breakpoints:**
  - `lg+` (1024px+): Sidebar visivel + conteudo (layout das referencias)
  - `md` (768-1023px): Sidebar colapsada + conteudo full
  - `sm` (< 768px): Sem sidebar (hamburger + sheet) + conteudo full
- **KPI Cards:** 4 cols → 2 cols → 1 col
- **Tabela:** Scroll horizontal no mobile (como shadcn DataTable padrao)
- **Graficos:** ResponsiveContainer se adapta automaticamente
- **Sidebar mobile:** shadcn `Sheet` (slide da esquerda)

## PROIBICOES EXPLICITAS
- PROIBIDO componentes de UI libraries externas (Material UI, Chakra, Ant, etc.)
- PROIBIDO cores hardcoded EXCETO as 4 cores Proesc documentadas neste arquivo
- PROIBIDO text-[Xpx] ad-hoc sem documentar excecao aqui
- PROIBIDO icones de outras bibliotecas que nao Lucide
- PROIBIDO sombras customizadas (as referencias sao flat)
- PROIBIDO animacoes decorativas
- PROIBIDO layout centralizado com max-w (usar sidebar + conteudo full)
- PROIBIDO estilo Default do shadcn (usar New York)
- PROIBIDO fontes alem de Sora (brand Proesc) e system font stack (fallback shadcn)

## LOGOS DA PROESC
- Fonte: brand guide oficial (proesc.howwebrand.com)
- Arquivos disponiveis em `public/logos/`:

| Arquivo | Uso | Contexto |
|---------|-----|----------|
| `Proesc_Marca-Preferencial-RGB-Horizontal-Negativa1.png` | Logo horizontal | Dark mode (texto branco + simbolo verde) |
| `Proesc_Marca-Preferencial-RGB-Horizontal-Positiva1.png` | Logo horizontal | Light mode (texto verde escuro) |
| `Proesc_Simbolo-RGB-VerdeAmapa.png` | Simbolo only | Sidebar colapsada, favicon |
| `Proesc_Simbolo-RGB-Branco.png` | Simbolo only | Dark mode, favicon |

- **Sidebar expandida:** Logo horizontal (Negativa no dark, Positiva no light)
- **Sidebar colapsada:** Simbolo only (Verde Amapa no dark)
- **Favicon:** Simbolo Verde Amapa
- **PROIBIDO** alterar, distorcer ou recolorir os logos

## COMPONENTES SHADCN NECESSARIOS

### Layout e Navegacao
- sidebar (navegacao principal)
- sheet (sidebar mobile + detalhe do aluno)
- separator
- dropdown-menu

### Cards e Dados
- card
- table (DataTable pattern)
- badge
- tooltip

### Inputs e Filtros
- input (busca)
- select (rows per page, filtro turma)
- toggle-group (seletor de periodo nos graficos)
- button

### Graficos
- chart (wrapper Recharts)

### Feedback
- skeleton (loading IA)
- alert (insights)
- sonner (notificacoes)
- progress

### Extras
- scroll-area
- avatar (opcional, para o user na sidebar)

## EXCECOES APROVADAS

### 1. Fonte Sora (27/03/2026)
- **O que:** Importar fonte Sora via `@fontsource/sora` (npm package)
- **Por que:** Tipografia institucional oficial da Proesc (brand guide)
- **Como:** `npm install @fontsource/sora`, importar em `main.tsx`
- **Nao e CDN externo** — e pacote npm bundled no build

### 2. Logos Proesc (27/03/2026)
- **O que:** PNGs oficiais da marca em `public/logos/`
- **Fonte:** Brand guide oficial (proesc.howwebrand.com)
- **Regra:** Usar EXATAMENTE os arquivos oficiais, sem modificacao
