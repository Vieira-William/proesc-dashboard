import { useState, useCallback } from 'react'
import { Sparkles, Copy, Check } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { AlunoProcessado } from '@/lib/calculos'
import { chatComIA } from '@/lib/groqClient'

interface ModalPlanoEstudosProps {
  aluno: AlunoProcessado | null
  aberto: boolean
  onFechar: () => void
}

export function ModalPlanoEstudos({ aluno, aberto, onFechar }: ModalPlanoEstudosProps) {
  const [plano, setPlano] = useState('')
  const [gerando, setGerando] = useState(false)
  const [copiado, setCopiado] = useState(false)

  const gerarPlano = useCallback(async () => {
    if (!aluno || gerando) return
    setGerando(true)
    setPlano('')

    const prompt = `Você é um coordenador pedagógico experiente. Crie um plano de intervenção pedagógica para o aluno ${aluno.nome}, turma ${aluno.turma}.

Dados: Notas B1=${aluno.nota_1}, B2=${aluno.nota_2}, B3=${aluno.nota_3}, B4=${aluno.nota_4}.
Média: ${aluno.media}. Nível de risco: ${aluno.risco}. Tendência: ${aluno.tendencia}.

Estruture o plano com:
1. Diagnóstico do padrão de notas (2 frases)
2. Áreas prioritárias de intervenção
3. Ações concretas (3-4 itens com frequência e responsável)
4. Meta para o próximo bimestre (nota-alvo)
5. Indicador de sucesso

Máximo 200 palavras. Seja prático e acionável.`

    try {
      let texto = ''
      for await (const token of chatComIA([{ role: 'user', content: prompt }], '')) {
        texto += token
        setPlano(texto)
      }
    } catch {
      setPlano('Erro ao gerar plano. Tente novamente.')
    } finally {
      setGerando(false)
    }
  }, [aluno, gerando])

  const copiar = async () => {
    await navigator.clipboard.writeText(plano)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const handleClose = () => {
    onFechar()
    setPlano('')
  }

  return (
    <Dialog open={aberto} onOpenChange={(v) => { if (!v) handleClose() }}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-base">
            Plano de Estudos — {aluno?.nome} ({aluno?.turma})
          </DialogTitle>
        </DialogHeader>

        {!plano && !gerando && (
          <div className="flex flex-col items-center py-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Gere um plano de intervenção pedagógica personalizado com IA.
            </p>
            <Button onClick={gerarPlano}>
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Gerar Plano com IA
            </Button>
          </div>
        )}

        {gerando && !plano && (
          <div className="space-y-3 py-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}

        {plano && (
          <>
            <div className="rounded-md border bg-muted/30 p-4 prose prose-sm prose-invert max-w-none [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-sm [&_li]:text-muted-foreground [&_strong]:text-foreground [&_h1]:text-sm [&_h1]:font-semibold [&_h2]:text-sm [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-medium">
              <ReactMarkdown>{plano}</ReactMarkdown>
              {gerando && <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={handleClose}>
                Fechar
              </Button>
              <Button size="sm" onClick={copiar} disabled={gerando}>
                {copiado ? (
                  <><Check className="mr-1.5 h-3.5 w-3.5" /> Copiado!</>
                ) : (
                  <><Copy className="mr-1.5 h-3.5 w-3.5" /> Copiar Plano</>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
