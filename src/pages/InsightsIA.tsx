import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Bot, User, ArrowUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAlunos } from '@/hooks/useAlunos'
import { gerarInsights, chatComIA, type MensagemChat } from '@/lib/groqClient'
import { montarPrompt, montarContextoChat } from '@/lib/promptInsights'

// ─── Tipos ──────────────────────────────────────────────────────────────────

interface MensagemUI {
  role: 'user' | 'assistant'
  content: string
}

// ─── Mensagem inicial (briefing executivo) ──────────────────────────────────

const mensagemInicial: MensagemUI = {
  role: 'assistant',
  content: `## Diagnóstico Geral — Escola 3º Ano 2026

A escola tem média geral de **6.82** com **67% de aprovação**. A tendência é positiva (6.55 no B1 → 7.09 no B4).

### Pontos de Atenção
- **33 alunos reprovaram** (33%) — taxa alta para escola particular
- **Turma 3B** concentra o problema: 48.5% de reprovação (quase 3x a 3A)
- **16 "quase aprovados"** ficaram a menos de 1 ponto da aprovação

### Insight Chave
100% dos alunos com nota B1 < 6 reprovaram. Precisão de 100% como preditor.

### Impacto Financeiro
R$49.500/mês em receita vulnerável (estimativa: 33 reprovados × 30% churn × R$1.500 mensalidade).

*Faça uma pergunta para explorar os dados em mais profundidade.*`,
}

// ─── Sugestões ──────────────────────────────────────────────────────────────

const sugestoes = [
  'Por que a turma 3B tem desempenho tão baixo?',
  'Qual o impacto financeiro da reprovação?',
  'Quais alunos poderiam ser salvos com intervenção?',
  'Quem são os alunos destaque?',
  'Compare o desempenho entre as turmas',
]

// ─── Componente ─────────────────────────────────────────────────────────────

export function InsightsIA() {
  const dados = useAlunos('todas')
  const contextoDados = useMemo(() => montarContextoChat(dados), [dados])
  const promptCompleto = useMemo(() => montarPrompt(dados), [dados])

  const [mensagens, setMensagens] = useState<MensagemUI[]>([mensagemInicial])
  const [inputTexto, setInputTexto] = useState('')
  const [gerando, setGerando] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  // ─── Enviar mensagem ────────────────────────────────────────────────────

  const enviarMensagem = useCallback(
    async (texto: string, isDiagnostico = false) => {
      if (gerando) return
      setGerando(true)

      const novaMsgUser: MensagemUI = { role: 'user', content: texto }
      const historicoAtual = [...mensagens, novaMsgUser]
      setMensagens([...historicoAtual, { role: 'assistant', content: '' }])

      try {
        let resposta = ''
        if (isDiagnostico) {
          for await (const token of gerarInsights(promptCompleto)) {
            resposta += token
            setMensagens([...historicoAtual, { role: 'assistant', content: resposta }])
          }
        } else {
          const msgParaAPI: MensagemChat[] = historicoAtual.map((m) => ({
            role: m.role,
            content: m.content,
          }))
          for await (const token of chatComIA(msgParaAPI, contextoDados)) {
            resposta += token
            setMensagens([...historicoAtual, { role: 'assistant', content: resposta }])
          }
        }
      } catch {
        setMensagens([
          ...historicoAtual,
          { role: 'assistant', content: 'Desculpe, não consegui processar sua pergunta. Tente novamente.' },
        ])
      } finally {
        setGerando(false)
      }
    },
    [mensagens, gerando, contextoDados, promptCompleto],
  )

  const handleEnviar = () => {
    if (!inputTexto.trim() || gerando) return
    enviarMensagem(inputTexto.trim())
    setInputTexto('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  const handleChipClick = (texto: string) => {
    enviarMensagem(texto)
  }

  const mostrarChips = mensagens.length <= 1

  // ─── JSX ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] relative">
      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto">
        {mensagens.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Assistente de Dados Educacionais
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Pergunte sobre desempenho dos alunos, análise de risco, comparação
              entre turmas e recomendações de intervenção.
            </p>
          </div>
        ) : (
          /* Lista de mensagens */
          <div className="max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
            {mensagens.map((msg, i) => (
              <div key={i} className="flex gap-3">
                {/* Avatar */}
                {msg.role === 'assistant' ? (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted mt-0.5">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    {msg.role === 'assistant' ? 'Assistente IA' : 'Você'}
                  </p>

                  {msg.content === '' && gerando ? (
                    /* Loading dots */
                    <div className="flex items-center gap-1.5 h-5">
                      <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:0ms]" />
                      <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:150ms]" />
                      <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:300ms]" />
                    </div>
                  ) : msg.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none
                                    prose-p:text-sm prose-p:text-foreground/90 prose-p:leading-relaxed
                                    prose-headings:text-foreground prose-headings:font-semibold
                                    prose-strong:text-foreground prose-strong:font-semibold
                                    prose-li:text-foreground/90 prose-li:text-sm
                                    prose-ul:my-2 prose-ol:my-2">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                      {gerando && i === mensagens.length - 1 && (
                        <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input fixo no bottom */}
      <div className="sticky bottom-0 bg-background pb-4 pt-2">
        <div className="max-w-2xl mx-auto w-full px-4">
          <div className="relative rounded-2xl border border-border bg-card shadow-sm">
            <Textarea
              value={inputTexto}
              onChange={(e) => setInputTexto(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre os dados dos alunos..."
              className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent
                         px-4 pt-3.5 pb-10 text-sm focus-visible:ring-0
                         focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
              rows={1}
              disabled={gerando}
            />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-end">
              <Button
                onClick={handleEnviar}
                disabled={!inputTexto.trim() || gerando}
                size="icon"
                className="h-8 w-8 rounded-lg"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Suggestion chips */}
        {mostrarChips && (
          <div className="max-w-2xl mx-auto w-full px-4 mt-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {sugestoes.map((texto) => (
                <button
                  key={texto}
                  onClick={() => handleChipClick(texto)}
                  className="rounded-full border border-border px-3.5 py-1.5
                             text-xs text-muted-foreground
                             hover:bg-muted/50 hover:text-foreground
                             transition-colors cursor-pointer"
                >
                  {texto}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
