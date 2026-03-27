import { Target } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import type { AlunoProcessado } from '@/lib/calculos'

interface PainelQuaseAprovadosProps {
  quaseAprovados: AlunoProcessado[]
}

export function PainelQuaseAprovados({ quaseAprovados }: PainelQuaseAprovadosProps) {
  if (quaseAprovados.length === 0) return null

  return (
    <Alert className="border-yellow-500/30 bg-yellow-500/5">
      <Target className="h-4 w-4 text-yellow-500" />
      <AlertTitle className="text-yellow-500 font-semibold">
        Intervenção Prioritária — {quaseAprovados.length} Quase Aprovados
      </AlertTitle>
      <AlertDescription className="mt-3">
        <p className="text-sm text-muted-foreground mb-3">
          Alunos com média entre 5.0 e 5.9 — uma pequena melhoria pode aprová-los.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {quaseAprovados
            .sort((a, b) => b.media - a.media)
            .map((a) => {
              const falta = Math.ceil((6.0 - a.media) * 100) / 100
              return (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-md border border-border/50 bg-card px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{a.nome}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                        {a.turma}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Média: {a.media.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="ml-2 shrink-0 bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs"
                  >
                    falta {falta.toFixed(1)}
                  </Badge>
                </div>
              )
            })}
        </div>
      </AlertDescription>
    </Alert>
  )
}
