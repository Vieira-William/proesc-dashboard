import {
  Info,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  PieChart as PieChartIcon,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
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
  const riscoTotal = metricas.distribuicaoRisco.critico + metricas.distribuicaoRisco.alto + metricas.distribuicaoRisco.medio
  const percentualRecuperavel = riscoTotal > 0 ? Math.round((quaseAprovados / riscoTotal) * 100) : 0

  // Projeção simulada 12 meses (receita em risco diminui com intervenções)
  const projecaoMensal = Array.from({ length: 12 }, (_, i) => ({
    mes: i,
    valor: Math.round(receitaMensal * (1 - i * 0.06)),
  }))

  const composicaoRisco = [
    { name: 'Crítico', value: metricas.distribuicaoRisco.critico, color: 'rgba(239, 68, 68, 0.8)' },
    { name: 'Alto', value: metricas.distribuicaoRisco.alto, color: 'rgba(249, 115, 22, 0.8)' },
    { name: 'Médio', value: metricas.distribuicaoRisco.medio, color: 'rgba(234, 179, 8, 0.8)' },
    { name: 'Baixo', value: metricas.distribuicaoRisco.baixo, color: 'rgba(52, 211, 153, 0.35)' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Card 1: Receita em Risco */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-sm font-medium text-muted-foreground">Receita em Risco</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-help shrink-0" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[280px] text-xs leading-relaxed">
                  <p>Receita mensal em risco se alunos reprovados evadirem. Baseado em ticket médio de R$ 1.500/mês e taxa de evasão de 30%.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="h-8 w-8 rounded-md bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="h-4 w-4 text-red-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight">R$ {receitaMensal.toLocaleString('pt-BR')}</span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <p className="text-xs text-red-400/80 mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              {metricas.reprovados} alunos em risco de evasão
            </p>
          </div>

          <div className="h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projecaoMensal}>
                <defs>
                  <linearGradient id="gradientRisco" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-5)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--chart-5)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="valor" stroke="var(--chart-5)" fill="url(#gradientRisco)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border/30">
            <span className="text-xs text-muted-foreground">Projeção anual</span>
            <span className="text-sm font-semibold">R$ {receitaAnual.toLocaleString('pt-BR')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Composição do Risco */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-sm font-medium text-muted-foreground">Composição do Risco</CardTitle>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-help shrink-0" />
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-[280px] text-xs leading-relaxed">
                  <p>Distribuição dos {metricas.total} alunos por nível de risco. {riscoTotal} estão em algum nível de risco de reprovação.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="h-8 w-8 rounded-md bg-orange-500/10 flex items-center justify-center">
              <PieChartIcon className="h-4 w-4 text-orange-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="relative h-[140px] w-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={composicaoRisco}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {composicaoRisco.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{riscoTotal}</span>
                <span className="text-[10px] text-muted-foreground">em risco</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="text-xs text-muted-foreground">{metricas.distribuicaoRisco.critico} Críticos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-orange-500/80" />
              <span className="text-xs text-muted-foreground">{metricas.distribuicaoRisco.alto} Alto</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="text-xs text-muted-foreground">{metricas.distribuicaoRisco.medio} Médio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-muted-foreground">{metricas.distribuicaoRisco.baixo} Baixo</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Potencial de Recuperação (full width) */}
      <div className="md:col-span-2">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <CardTitle className="text-sm font-medium text-muted-foreground">Potencial de Recuperação</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-help shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-[280px] text-xs leading-relaxed">
                    <p>Receita que pode ser protegida com intervenção pedagógica nos {quaseAprovados} alunos quase aprovados.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="h-8 w-8 rounded-md bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border/30 p-3 space-y-1">
                <div className="h-7 w-7 rounded-md bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <p className="text-lg font-bold mt-2">R$ {Math.round(potencialRecuperacao / 1000)}k</p>
                <p className="text-[11px] text-muted-foreground leading-tight">/mês em receita salvável</p>
              </div>

              <div className="rounded-lg border border-border/30 p-3 space-y-1">
                <div className="h-7 w-7 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <Target className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <p className="text-lg font-bold mt-2">{quaseAprovados}</p>
                <p className="text-[11px] text-muted-foreground leading-tight">alunos resgatáveis</p>
              </div>

              <div className="rounded-lg border border-border/30 p-3 space-y-1">
                <div className="h-7 w-7 rounded-md bg-purple-500/10 flex items-center justify-center">
                  <BarChart3 className="h-3.5 w-3.5 text-purple-400" />
                </div>
                <p className="text-lg font-bold mt-2">48.5%</p>
                <p className="text-[11px] text-muted-foreground leading-tight">do risco na turma 3B</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Risco recuperável com intervenção</span>
                <span className="font-medium text-emerald-400">{percentualRecuperavel}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/80"
                  style={{ width: `${percentualRecuperavel}%` }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                {quaseAprovados} de {riscoTotal} alunos em risco podem ser recuperados — faltam 0.5 a 1.0 pontos para aprovação
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
