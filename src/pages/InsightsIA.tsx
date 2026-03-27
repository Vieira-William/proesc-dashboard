import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Sparkles, Send, RefreshCw, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAlunos } from '@/hooks/useAlunos'
import { gerarInsights, chatComIA, type MensagemChat } from '@/lib/groqClient'
import { montarPrompt, montarContextoChat } from '@/lib/promptInsights'

// ─── Tipos ──────────────────────────────────────────────────────────────────

interface MensagemUI {
  role: 'user' | 'assistant'
  content: string
}

// ─── Sugestões ──────────────────────────────────────────────────────────────

const sugestoes = [
  { texto: 'Gerar diagnóstico completo', destaque: true },
  { texto: 'Por que a 3B tem desempenho tão baixo?', destaque: false },
  { texto: 'Quais alunos poderiam ser salvos com intervenção?', destaque: false },
  { texto: 'Qual turma precisa de mais atenção?', destaque: false },
  { texto: 'Quem são os alunos destaque?', destaque: false },
  { texto: 'Compare a evolução das turmas no B3 vs B4', destaque: false },
]

// ─── Componente ─────────────────────────────────────────────────────────────

export function InsightsIA() {
  const dados = useAlunos('todas')
  const contextoDados = useMemo(() => montarContextoChat(dados), [dados])
  const promptCompleto = useMemo(() => montarPrompt(dados), [dados])

  const [mensagens, setMensagens] = useState<MensagemUI[]>([])
  const [inputTexto, setInputTexto] = useState('')
  const [gerando, setGerando] = useState(false)
  const [mostrarChips, setMostrarChips] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll quando novas mensagens aparecem
  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (el) el.scrollTop = el.scrollHeight
    }
  }, [mensagens])

  const enviarMensagem = useCallback(
    async (texto: string, isDiagnostico = false) => {
      if (gerando) return
      setMostrarChips(false)
      setGerando(true)

      const novaMsgUser: MensagemUI = { role: 'user', content: texto }
      const historicoAtual = [...mensagens, novaMsgUser]
      setMensagens([...historicoAtual, { role: 'assistant', content: '' }])

      try {
        let resposta = ''

        if (isDiagnostico) {
          // Usar gerarInsights para analise completa
          for await (const token of gerarInsights(promptCompleto)) {
            resposta += token
            setMensagens([...historicoAtual, { role: 'assistant', content: resposta }])
          }
        } else {
          // Usar chatComIA para perguntas
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
          { role: 'assistant', content: 'Erro ao processar sua solicitação. Verifique a conexão e tente novamente.' },
        ])
      } finally {
        setGerando(false)
      }
    },
    [mensagens, gerando, contextoDados, promptCompleto],
  )

  const handleChipClick = (texto: string) => {
    if (texto === 'Gerar diagnóstico completo') {
      enviarMensagem('Gere um diagnóstico completo dos dados', true)
    } else {
      enviarMensagem(texto)
    }
  }

  const handleEnviar = () => {
    if (!inputTexto.trim()) return
    enviarMensagem(inputTexto.trim())
    setInputTexto('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEnviar()
    }
  }

  const limpar = () => {
    setMensagens([])
    setMostrarChips(true)
    setGerando(false)
  }

  const temMensagens = mensagens.length > 0

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-4 shrink-0">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">Llama 3.3 70B</Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">via Groq</Badge>
        </div>
        {temMensagens && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={limpar} disabled={gerando}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Limpar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { limpar(); setTimeout(() => enviarMensagem('Gere um diagnóstico completo dos dados', true), 50) }}
              disabled={gerando}
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Gerar Novamente
            </Button>
          </div>
        )}
      </div>

      {/* Área de mensagens */}
      <ScrollArea className="flex-1 rounded-lg border" ref={scrollRef}>
        <div className="flex flex-col gap-4 p-4 min-h-full">
          {/* Estado vazio */}
          {!temMensagens && (
            <div className="flex flex-col items-center justify-center py-12 text-center flex-1">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-semibold">Proesc IA</p>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                Analista de dados educacionais pronto para ajudar.
                Clique numa sugestão ou faça uma pergunta sobre os dados.
              </p>
            </div>
          )}

          {/* Mensagens */}
          {mensagens.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">Proesc IA</span>
                </div>
              )}
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-lg px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {msg.content === '' && gerando ? (
                  <div className="flex gap-1 py-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                ) : msg.role === 'user' ? (
                  <p className="text-sm">{msg.content}</p>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none [&_h1]:text-base [&_h1]:font-semibold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:mt-4 [&_h2]:mb-1 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:mt-3 [&_h3]:mb-1 [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:my-1.5 [&_li]:text-sm [&_li]:text-muted-foreground [&_strong]:text-foreground [&_ul]:my-1.5 [&_ol]:my-1.5">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                    {gerando && i === mensagens.length - 1 && (
                      <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Chips de sugestão */}
          {mostrarChips && (
            <div className="flex flex-wrap gap-2 mt-2">
              {sugestoes.map((s) => (
                <Badge
                  key={s.texto}
                  variant={s.destaque ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors text-xs py-1.5 px-3 ${
                    s.destaque
                      ? 'hover:bg-primary/90'
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => handleChipClick(s.texto)}
                >
                  {s.destaque && <Sparkles className="mr-1 h-3 w-3" />}
                  {s.texto}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input fixo */}
      <div className="flex gap-2 pt-4 shrink-0">
        <Input
          placeholder="Faça uma pergunta sobre os dados..."
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={gerando}
          className="flex-1"
        />
        <Button
          size="icon"
          disabled={gerando || !inputTexto.trim()}
          onClick={handleEnviar}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
