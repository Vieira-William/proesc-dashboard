import { GraduationCap, CheckCircle, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { TurmaCodigo, MetricasTurma } from '@/lib/calculos'

interface ComparativoKpisProps {
  metricasPorTurma: Record<TurmaCodigo, MetricasTurma>
}

const turmas: TurmaCodigo[] = ['3A', '3B', '3C']
const coresTurma: Record<TurmaCodigo, string> = {
  '3A': 'text-[var(--chart-1)]',
  '3B': 'text-[var(--chart-2)]',
  '3C': 'text-[var(--chart-3)]',
}

export function ComparativoKpis({ metricasPorTurma }: ComparativoKpisProps) {
  const medias = turmas.map((t) => metricasPorTurma[t].mediaGeral)
  const melhorMedia = Math.max(...medias)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Média por Turma */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Média por Turma</span>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
        <CardContent className="space-y-2">
          {turmas.map((t) => {
            const m = metricasPorTurma[t]
            const isMelhor = m.mediaGeral === melhorMedia
            return (
              <div key={t} className="flex items-center justify-between">
                <span className={`text-sm font-medium ${coresTurma[t]}`}>{t}</span>
                <span className={`text-lg font-bold tabular-nums ${isMelhor ? 'text-emerald-500' : ''}`}>
                  {m.mediaGeral}
                </span>
              </div>
            )
          })}
        </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Média aritmética dos alunos de cada turma. Quanto maior, melhor o desempenho geral da turma.</p>
        </TooltipContent>
      </Tooltip>

      {/* Aprovação por Turma */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">
            Aprovação por Turma
          </span>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-3">
          {turmas.map((t) => {
            const m = metricasPorTurma[t]
            return (
              <div key={t} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className={`font-medium ${coresTurma[t]}`}>{t}</span>
                  <span className="tabular-nums">{m.percentualAprovacao}%</span>
                </div>
                <Progress value={m.percentualAprovacao} className="h-2" />
              </div>
            )
          })}
        </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Percentual de alunos aprovados (média ≥ 6.0) em cada turma. A barra verde mostra visualmente a proporção.</p>
        </TooltipContent>
      </Tooltip>

      {/* Risco por Turma */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Risco por Turma</span>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
        <CardContent className="space-y-2">
          {turmas.map((t) => {
            const r = metricasPorTurma[t].distribuicaoRisco
            const total = r.critico + r.alto
            return (
              <div key={t} className="flex items-center justify-between">
                <span className={`text-sm font-medium ${coresTurma[t]}`}>{t}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold tabular-nums ${total > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                    {total}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({r.critico}C + {r.alto}A)
                  </span>
                </div>
              </div>
            )
          })}
        </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Quantidade de alunos em risco por turma. C = Crítico (B1&lt;4), A = Alto (B1 4-4.9). Turmas sem risco não precisam de intervenção imediata.</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
