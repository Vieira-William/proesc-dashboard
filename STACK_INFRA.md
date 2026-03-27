# STACK_INFRA.md — Decisoes de Stack e Infraestrutura

> Documento estavel. So e modificado quando houver mudanca comprovadamente
> necessaria na infraestrutura ou nas ferramentas do projeto.
> Toda alteracao deve incluir: DATA, O QUE MUDOU, POR QUE, PESQUISA FEITA.

---

## STACK ATIVA

### Frontend
| Tecnologia | Versao | Justificativa |
|-----------|--------|---------------|
| Vite | latest | Build tool mais rapido. Sem overhead de SSR desnecessario. Deploy simples na Vercel. |
| React | 19.x | Framework padrao. Compativel com shadcn/ui. |
| TypeScript | 5.x | Type safety. Demonstra rigor tecnico. shadcn usa TS nativamente. |
| Tailwind CSS | 4.x | Utilitario CSS do shadcn/ui. Responsivo nativo. |
| shadcn/ui | latest (New York) | Fonte UNICA de componentes. CLI + MCP + Skills. Estilo New York. |
| Recharts | latest | Lib de charts integrada ao shadcn Chart component. Responsiva. Gratuita. |
| Lucide React | latest | Icones do shadcn/ui. Sem dependencia extra. |
| @fontsource/sora | latest | Tipografia institucional da Proesc. Pacote npm, nao CDN. |

### Deploy
| Servico | Plano | Justificativa |
|---------|-------|---------------|
| Vercel | free tier | Deploy gratuito. URL profissional. HTTPS automatico. Preview deploys. |
| GitHub | free | Versionamento. Integracao direta com Vercel. |

### Ferramentas de Desenvolvimento
| Ferramenta | Uso | Justificativa |
|-----------|-----|---------------|
| shadcn CLI | Instalacao de componentes | Via `npx shadcn@latest add` |
| shadcn MCP Server | Integracao com Claude Code | Acesso direto a docs e componentes |
| shadcn Skills | Conhecimento especializado | Skills de UI/UX para o agente |
| Groq SDK | Integracao IA | API gratuita, mais rapida do mercado, Llama 3.3 70B |

### O que NAO usamos e por que
| Tecnologia | Por que NAO |
|-----------|-------------|
| Next.js | Over-engineering. Sem SSR, API routes, ou features server-side necessarias. |
| Backend/API propria | Dados estaticos em JSON. Sem necessidade de servidor. |
| Banco de dados | 100 alunos fixos. JSON embarcado resolve. |
| Material UI / Chakra / Ant | shadcn/ui e a fonte unica. Sem excecoes. |
| Google Fonts CDN | Fonte vem do @fontsource/sora (npm). Sem dependencia externa. |

## HISTORICO DE MUDANCAS
[Vazio ate que haja mudanca]
