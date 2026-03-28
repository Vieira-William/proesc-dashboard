import {
  Users,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
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
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Total de Alunos</span>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metricas.total}</p>
              <p className="text-xs text-muted-foreground">
                {metricas.aprovados} aprovados, {metricas.reprovados} reprovados
              </p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Número total de alunos matriculados no 3º ano. Inclui aprovados e reprovados de todas as turmas.</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Média Geral</span>
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
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Média aritmética das notas finais de todos os 100 alunos. Calculada como (B1 + B2 + B3 + B4) ÷ 4. O indicador {tendenciaPositiva ? '+' : ''}{tendenciaPct.toFixed(1)}% compara a média do B4 ({ev.b4}) com a do B1 ({ev.b1}).</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Taxa de Aprovação</span>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{metricas.percentualAprovacao}%</p>
              <p className="text-xs text-muted-foreground">
                {metricas.aprovados} de {metricas.total} alunos
              </p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Percentual de alunos com média final ≥ 6.0 (nota mínima de aprovação). {metricas.aprovados} de {metricas.total} alunos atingiram a média.</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Alunos em Risco</span>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{riscoTotal}</p>
              <p className="text-xs text-muted-foreground">
                {metricas.distribuicaoRisco.critico} críticos · {metricas.distribuicaoRisco.alto} alto · {metricas.distribuicaoRisco.medio} médio
              </p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Alunos com risco de reprovação baseado na nota do 1º bimestre. 100% dos alunos com B1 &lt; 6 reprovaram. Composição: {metricas.distribuicaoRisco.critico} críticos (B1&lt;4) · {metricas.distribuicaoRisco.alto} alto (B1 4-4.9) · {metricas.distribuicaoRisco.medio} médio (B1 5-5.9).</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
