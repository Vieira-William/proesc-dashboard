import { Target, Zap, AlertCircle, Clock, UserRound } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import type { AlunoProcessado } from '@/lib/calculos'

// ─── Tipos ──────────────────────────────────────────────────────────────────

interface PainelQuaseAprovadosProps {
  quaseAprovados: AlunoProcessado[]
}

interface AlunoComFalta extends AlunoProcessado {
  falta: number
}

// ─── Componente card do aluno ───────────────────────────────────────────────

function AlunoCard({ aluno }: { aluno: AlunoComFalta }) {
  const progresso = Math.round((aluno.media / 6) * 100)

  return (
    <div className="rounded-lg border border-border p-3 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
            <UserRound className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground truncate">{aluno.nome}</span>
        </div>
        <Badge variant="outline" className="bg-muted text-muted-foreground border-0 text-[10px] shrink-0">
          {aluno.turma}
        </Badge>
      </div>

      <div className="space-y-1">
        <div className="h-2 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary/60 transition-all duration-500"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Média: <span className="font-medium text-foreground">{aluno.media.toFixed(1)}</span>
          </span>
          <span className="text-xs font-medium text-primary">
            falta {aluno.falta.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal ───────────────────────────────────────────────────

export function PainelQuaseAprovados({ quaseAprovados }: PainelQuaseAprovadosProps) {
  if (quaseAprovados.length === 0) return null

  // Calcular falta e ordenar por media desc
  const alunosComFalta: AlunoComFalta[] = quaseAprovados
    .map((a) => ({ ...a, falta: Math.ceil((6.0 - a.media) * 100) / 100 }))
    .sort((a, b) => b.media - a.media)

  // Agrupar por urgência
  const grupos = [
    { label: 'Falta 0.5 — mais fáceis de resgatar', alunos: alunosComFalta.filter((a) => a.falta <= 0.5) },
    { label: 'Falta 0.8 — resgate moderado', alunos: alunosComFalta.filter((a) => a.falta > 0.5 && a.falta <= 0.8) },
    { label: 'Falta 1.0 — maior esforço necessário', alunos: alunosComFalta.filter((a) => a.falta > 0.8) },
  ].filter((g) => g.alunos.length > 0)

  const summaryGroups = [
    { icon: Zap, label: 'Falta 0.5', count: alunosComFalta.filter((a) => a.falta <= 0.5).length, desc: 'Mais fáceis' },
    { icon: AlertCircle, label: 'Falta 0.8', count: alunosComFalta.filter((a) => a.falta > 0.5 && a.falta <= 0.8).length, desc: 'Moderado' },
    { icon: Clock, label: 'Falta 1.0', count: alunosComFalta.filter((a) => a.falta > 0.8).length, desc: 'Maior esforço' },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Target className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Intervenção Prioritária</h3>
            <p className="text-xs text-muted-foreground">
              {quaseAprovados.length} alunos entre 5.0 e 5.9 — uma pequena melhoria pode aprová-los
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Summary bar */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {summaryGroups.map((g) => {
            const Icon = g.icon
            return (
              <div key={g.label} className="flex items-center gap-2 rounded-lg border border-border p-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-foreground">{g.count}</span>
                    <span className="text-[10px] text-muted-foreground">{g.label}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground/50">{g.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Grupos de alunos */}
        <div className="space-y-4">
          {grupos.map((grupo, i) => (
            <div key={grupo.label}>
              {i > 0 && <Separator className="mb-4" />}
              <p className="text-xs font-medium text-muted-foreground mb-2">{grupo.label}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {grupo.alunos.map((aluno) => (
                  <AlunoCard key={aluno.id} aluno={aluno} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
