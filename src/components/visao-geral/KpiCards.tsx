import {
  Users,
  GraduationCap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import type { MetricasGlobais } from '@/lib/calculos'

interface KpiCardsProps {
  metricas: MetricasGlobais
}

export function KpiCards({ metricas }: KpiCardsProps) {
  const { evolucaoBimestral: ev } = metricas
  const tendenciaPct = ev.b1 > 0 ? ((ev.b4 - ev.b1) / ev.b1) * 100 : 0
  const tendenciaPositiva = tendenciaPct >= 0

  const riscoAlto = metricas.distribuicaoRisco.critico + metricas.distribuicaoRisco.alto

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total de Alunos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Total de Alunos
          </span>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{metricas.total}</p>
          <p className="text-xs text-muted-foreground">
            {metricas.aprovados} aprovados, {metricas.reprovados} reprovados
          </p>
        </CardContent>
      </Card>

      {/* Média Geral */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Média Geral
          </span>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{metricas.mediaGeral}</p>
            <span
              className={`flex items-center text-xs font-medium ${
                tendenciaPositiva ? 'text-emerald-500' : 'text-red-500'
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

      {/* Taxa de Aprovação */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Taxa de Aprovação
          </span>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p
            className={`text-2xl font-bold ${
              metricas.percentualAprovacao >= 70
                ? 'text-emerald-500'
                : metricas.percentualAprovacao >= 50
                  ? 'text-yellow-500'
                  : 'text-red-500'
            }`}
          >
            {metricas.percentualAprovacao}%
          </p>
          <p className="text-xs text-muted-foreground">
            {metricas.aprovados} de {metricas.total} alunos
          </p>
        </CardContent>
      </Card>

      {/* Alunos em Risco */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Alunos em Risco
          </span>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">{riscoAlto}</p>
          <p className="text-xs text-muted-foreground">
            {metricas.distribuicaoRisco.critico} críticos, {metricas.distribuicaoRisco.alto} alto risco
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
