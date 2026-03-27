import { DollarSign, TrendingDown, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
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
    <Card className="border-amber-500/20 bg-amber-500/5">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-4 w-4 text-amber-500" />
          <span className="text-sm font-semibold text-amber-500">
            Impacto Financeiro Estimado
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Receita Mensal em Risco */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs text-muted-foreground">Receita Mensal em Risco</span>
            </div>
            <p className="text-xl font-bold text-red-500">
              R$ {receitaMensal.toLocaleString('pt-BR')}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {metricas.reprovados} reprovados × R$ {TICKET_MEDIO_MENSAL.toLocaleString('pt-BR')}/mês
            </p>
          </div>

          {/* Receita Anual em Risco */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs text-muted-foreground">Receita Anual em Risco</span>
            </div>
            <p className="text-xl font-bold text-red-500">
              R$ {receitaAnual.toLocaleString('pt-BR')}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Projeção anual de churn
            </p>
          </div>

          {/* Potencial de Recuperação */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-xs text-muted-foreground">Potencial de Recuperação</span>
            </div>
            <p className="text-xl font-bold text-emerald-500">
              R$ {potencialRecuperacao.toLocaleString('pt-BR')}/mês
            </p>
            <p className="text-[11px] text-muted-foreground">
              {quaseAprovados} quase aprovados recuperáveis
            </p>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground/60 mt-4">
          Estimativa baseada em ticket médio de R$ {TICKET_MEDIO_MENSAL.toLocaleString('pt-BR')}/mês
          e taxa histórica de evasão pós-reprovação de 30%.
        </p>
      </CardContent>
    </Card>
  )
}
