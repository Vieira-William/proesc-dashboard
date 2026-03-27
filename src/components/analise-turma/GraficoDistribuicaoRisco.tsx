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

interface GraficoDistribuicaoRiscoProps {
  metricasPorTurma: Record<TurmaCodigo, MetricasTurma>
}

const chartConfig: ChartConfig = {
  critico: { label: 'Crítico', color: 'rgba(239, 68, 68, 0.85)' },
  alto: { label: 'Alto', color: 'rgba(249, 115, 22, 0.80)' },
  medio: { label: 'Médio', color: 'rgba(234, 179, 8, 0.70)' },
  baixo: { label: 'Baixo', color: 'rgba(52, 211, 153, 0.50)' },
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
        <CardTitle className="text-base font-semibold">
          Distribuição de Risco
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
