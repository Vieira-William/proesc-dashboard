import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
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

interface GraficoEvolucaoComparativoProps {
  metricasPorTurma: Record<TurmaCodigo, MetricasTurma>
}

const chartConfig: ChartConfig = {
  '3A': { label: 'Turma 3A', color: 'var(--chart-1)' },
  '3B': { label: 'Turma 3B', color: 'var(--chart-2)' },
  '3C': { label: 'Turma 3C', color: 'var(--chart-3)' },
}

export function GraficoEvolucaoComparativo({ metricasPorTurma }: GraficoEvolucaoComparativoProps) {
  const ev3A = metricasPorTurma['3A'].evolucaoBimestral
  const ev3B = metricasPorTurma['3B'].evolucaoBimestral
  const ev3C = metricasPorTurma['3C'].evolucaoBimestral

  const dados = [
    { bimestre: '1º Bim', '3A': ev3A.b1, '3B': ev3B.b1, '3C': ev3C.b1 },
    { bimestre: '2º Bim', '3A': ev3A.b2, '3B': ev3B.b2, '3C': ev3C.b2 },
    { bimestre: '3º Bim', '3A': ev3A.b3, '3B': ev3B.b3, '3C': ev3C.b3 },
    { bimestre: '4º Bim', '3A': ev3A.b4, '3B': ev3B.b4, '3C': ev3C.b4 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Evolução Bimestral por Turma
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="bimestre" tickLine={false} axisLine={false} fontSize={12} />
            <YAxis
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="3A"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="3B"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="3C"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
