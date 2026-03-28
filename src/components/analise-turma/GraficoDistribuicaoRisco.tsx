import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import type { TurmaCodigo, MetricasTurma } from '@/lib/calculos'

interface GraficoDistribuicaoRiscoProps {
  metricasPorTurma: Record<TurmaCodigo, MetricasTurma>
}

const chartConfig: ChartConfig = {
  critico: { label: 'Crítico', color: 'var(--chart-5)' },
  alto: { label: 'Alto', color: 'var(--chart-4)' },
  medio: { label: 'Médio', color: 'var(--chart-2)' },
  baixo: { label: 'Baixo', color: 'var(--chart-1)' },
}

const turmas: TurmaCodigo[] = ['3A', '3B', '3C']

export function GraficoDistribuicaoRisco({ metricasPorTurma }: GraficoDistribuicaoRiscoProps) {
  const dados = turmas.map((t) => {
    const r = metricasPorTurma[t].distribuicaoRisco
    return {
      turma: t,
      critico: r.critico,
      alto: r.alto,
      medio: r.medio,
      baixo: r.baixo,
    }
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="text-base font-medium flex items-center gap-1.5 cursor-help">
              Distribuição de Risco
              <Info className="h-3.5 w-3.5 text-muted-foreground/50" />
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-[300px] text-xs">
            <p>Distribuição dos níveis de risco por turma. Quanto mais vermelho/laranja, mais alunos precisam de atenção. A turma 3C concentra todos os alunos de risco crítico.</p>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.08} />
            <XAxis dataKey="turma" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="critico" stackId="risco" fill="var(--color-critico)" />
            <Bar dataKey="alto" stackId="risco" fill="var(--color-alto)" />
            <Bar dataKey="medio" stackId="risco" fill="var(--color-medio)" />
            <Bar
              dataKey="baixo"
              stackId="risco"
              fill="var(--color-baixo)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
