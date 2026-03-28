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

interface GraficoAprovacaoTurmaProps {
  metricasPorTurma: Record<TurmaCodigo, MetricasTurma>
}

const chartConfig: ChartConfig = {
  aprovados: { label: 'Aprovados', color: 'var(--chart-1)' },
  reprovados: { label: 'Reprovados', color: 'var(--chart-5)' },
}

const turmas: TurmaCodigo[] = ['3A', '3B', '3C']

export function GraficoAprovacaoTurma({ metricasPorTurma }: GraficoAprovacaoTurmaProps) {
  const dados = turmas.map((t) => ({
    turma: t,
    aprovados: metricasPorTurma[t].aprovados,
    reprovados: metricasPorTurma[t].reprovados,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <CardTitle className="text-base font-medium flex items-center gap-1.5 cursor-help">
              Aprovados vs Reprovados
              <Info className="h-3.5 w-3.5 text-muted-foreground/50" />
            </CardTitle>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-[300px] text-xs">
            <p>Comparativo visual de aprovados e reprovados por turma. A turma 3B tem a maior proporção de reprovados (quase 50%).</p>
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
            <Bar
              dataKey="aprovados"
              fill="var(--color-aprovados)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="reprovados"
              fill="var(--color-reprovados)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
