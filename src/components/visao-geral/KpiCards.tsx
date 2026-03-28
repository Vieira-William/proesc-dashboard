import {
  Users,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { MetricasGlobais } from '@/lib/calculos'

interface KpiCardsProps {
  metricas: MetricasGlobais
}

export function KpiCards({ metricas }: KpiCardsProps) {
  const { evolucaoBimestral: ev } = metricas
  const tendenciaPct = ev.b1 > 0 ? ((ev.b4 - ev.b1) / ev.b1) * 100 : 0
  const tendenciaPositiva = tendenciaPct >= 0

  const riscoTotal = metricas.distribuicaoRisco.critico + metricas.distribuicaoRisco.alto + metricas.distribuicaoRisco.medio

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Total de Alunos <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>Número total de alunos matriculados no 3º ano. Inclui aprovados e reprovados de todas as turmas.</p>
            </TooltipContent>
          </Tooltip>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{metricas.total}</p>
          <p className="text-xs text-muted-foreground">
            {metricas.aprovados} aprovados, {metricas.reprovados} reprovados
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Média Geral <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>Média aritmética das notas finais de todos os 100 alunos. O indicador {tendenciaPositiva ? '+' : ''}{tendenciaPct.toFixed(1)}% compara a média do B4 ({ev.b4}) com a do B1 ({ev.b1}).</p>
            </TooltipContent>
          </Tooltip>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{metricas.mediaGeral}</p>
            <span
              className={`flex items-center text-xs font-normal ${
                tendenciaPositiva ? 'text-emerald-400/70' : 'text-red-400/70'
              }`}
            >
              {tendenciaPositiva ? (
                <TrendingUp className="mr-0.5 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-0.5 h-3 w-3" />
              )}
              {tendenciaPositiva ? '+' : ''}
              {tendenciaPct.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            B4 ({ev.b4}) vs B1 ({ev.b1})
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Taxa de Aprovação <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>Percentual de alunos com média final ≥ 6.0. {metricas.aprovados} de {metricas.total} alunos atingiram a média.</p>
            </TooltipContent>
          </Tooltip>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{metricas.percentualAprovacao}%</p>
          <p className="text-xs text-muted-foreground">
            {metricas.aprovados} de {metricas.total} alunos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Alunos em Risco <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>100% dos alunos com B1 &lt; 6 reprovaram. {metricas.distribuicaoRisco.critico} críticos · {metricas.distribuicaoRisco.alto} alto · {metricas.distribuicaoRisco.medio} médio.</p>
            </TooltipContent>
          </Tooltip>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{riscoTotal}</p>
          <p className="text-xs text-muted-foreground">
            {metricas.distribuicaoRisco.critico} críticos · {metricas.distribuicaoRisco.alto} alto · {metricas.distribuicaoRisco.medio} médio
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
