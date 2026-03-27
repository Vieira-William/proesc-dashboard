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
import type { TurmaCodigo, MetricasTurma } from '@/lib/calculos'

interface GraficoAprovacaoTurmaProps {
  metricasPorTurma: Record<TurmaCodigo, MetricasTurma>
}

const chartConfig: ChartConfig = {
  aprovados: { label: 'Aprovados', color: 'oklch(0.72 0.14 163)' },
  reprovados: { label: 'Reprovados', color: 'oklch(0.60 0.18 25)' },
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
        <CardTitle className="text-base font-semibold">
          Aprovados vs Reprovados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
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
