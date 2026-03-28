import { DollarSign, TrendingDown, ShieldCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import type { MetricasGlobais } from '@/lib/calculos'

const TICKET_MEDIO_MENSAL = 1500

interface BannerFinanceiroProps {
  metricas: MetricasGlobais
  quaseAprovados: number
}

export function BannerFinanceiro({ metricas, quaseAprovados }: BannerFinanceiroProps) {
  const receitaMensal = metricas.reprovados * TICKET_MEDIO_MENSAL
  const receitaAnual = receitaMensal * 12
  const potencialRecuperacao = quaseAprovados * TICKET_MEDIO_MENSAL

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Impacto Financeiro Estimado
        </CardTitle>
        <CardDescription className="text-xs">
          Projeção baseada em ticket médio e taxa de evasão pós-reprovação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Receita Mensal em Risco</span>
            </div>
            <p className="text-2xl font-bold">
              R$ {receitaMensal.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground">
              {metricas.reprovados} reprovados × R$ {TICKET_MEDIO_MENSAL.toLocaleString('pt-BR')}/mês
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Receita Anual em Risco</span>
            </div>
            <p className="text-2xl font-bold">
              R$ {receitaAnual.toLocaleString('pt-BR')}
            </p>
            <p className="text-xs text-muted-foreground">
              Projeção anual de churn
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Potencial de Recuperação</span>
            </div>
            <p className="text-2xl font-bold">
              R$ {potencialRecuperacao.toLocaleString('pt-BR')}/mês
            </p>
            <p className="text-xs text-muted-foreground">
              {quaseAprovados} quase aprovados recuperáveis
            </p>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground/50 mt-4">
          Estimativa baseada em ticket médio de R$ {TICKET_MEDIO_MENSAL.toLocaleString('pt-BR')}/mês
          e taxa histórica de evasão pós-reprovação de 30%.
        </p>
      </CardContent>
    </Card>
  )
}
