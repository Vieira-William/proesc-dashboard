import { useState, useCallback, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { chatComIA, type MensagemChat } from '@/lib/groqClient'

interface ChatIAProps {
  contextoDados: string
}

const sugestoes = [
  'Por que a 3B tem desempenho tão baixo?',
  'Quais alunos poderiam ser salvos com intervenção?',
  'Qual turma precisa de mais atenção?',
  'Quem são os alunos destaque?',
]

export function ChatIA({ contextoDados }: ChatIAProps) {
  const [mensagens, setMensagens] = useState<MensagemChat[]>([])
  const [inputTexto, setInputTexto] = useState('')
  const [gerando, setGerando] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [mensagens])

  const enviar = useCallback(
    async (texto: string) => {
      if (!texto.trim() || gerando) return

      const novaMensagem: MensagemChat = { role: 'user', content: texto.trim() }
      const historicoAtual = [...mensagens, novaMensagem]
      setMensagens(historicoAtual)
      setInputTexto('')
      setGerando(true)

      try {
        let resposta = ''
        const msgComResposta = [...historicoAtual, { role: 'assistant' as const, content: '' }]
        setMensagens(msgComResposta)

        for await (const token of chatComIA(historicoAtual, contextoDados)) {
          resposta += token
          setMensagens([
            ...historicoAtual,
            { role: 'assistant', content: resposta },
          ])
        }
      } catch {
        setMensagens([
          ...historicoAtual,
          { role: 'assistant', content: 'Erro ao gerar resposta. Tente novamente.' },
        ])
      } finally {
        setGerando(false)
      }
    },
    [mensagens, gerando, contextoDados],
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviar(inputTexto)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Separator />

      <div>
        <h3 className="text-sm font-semibold">Pergunte sobre os dados</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Faça perguntas específicas e receba respostas baseadas nos dados dos 100 alunos.
        </p>
      </div>

      {/* Chips de sugestão */}
      <div className="flex flex-wrap gap-2">
        {sugestoes.map((s) => (
          <Badge
            key={s}
            variant="outline"
            className="cursor-pointer hover:bg-accent transition-colors text-xs py-1 px-2.5"
            onClick={() => enviar(s)}
          >
            {s}
          </Badge>
        ))}
      </div>

      {/* Área de conversa */}
      {mensagens.length > 0 && (
        <ScrollArea className="h-[350px] rounded-md border p-4" ref={scrollRef}>
          <div className="flex flex-col gap-4">
            {mensagens.map((m, i) => (
              <div key={i} className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {m.role === 'user' ? 'Você' : 'IA'}
                </span>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {m.content === '' && gerando ? (
                    <div className="space-y-2 py-1">
                      <Skeleton className="h-3 w-48" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  ) : (
                    m.content.split('\n').map((linha, j) => {
                      if (linha.trim() === '') return <div key={j} className="h-1.5" />
                      return (
                        <p
                          key={j}
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: linha.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                          }}
                        />
                      )
                    })
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Input */}
      <div className="flex gap-2">
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
          onClick={() => enviar(inputTexto)}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
