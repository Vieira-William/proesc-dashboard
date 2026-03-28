import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import type { EvolucaoBimestral } from '@/lib/calculos'

interface GraficoEvolucaoProps {
  evolucao: EvolucaoBimestral
}

const chartConfig: ChartConfig = {
  media: { label: 'Média', color: 'var(--chart-1)' },
}

export function GraficoEvolucao({ evolucao }: GraficoEvolucaoProps) {
  const dados = [
    { bimestre: '1º Bim', media: evolucao.b1 },
    { bimestre: '2º Bim', media: evolucao.b2 },
    { bimestre: '3º Bim', media: evolucao.b3 },
    { bimestre: '4º Bim', media: evolucao.b4 },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Evolução Bimestral
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.08} />
            <XAxis
              dataKey="bimestre"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              type="number"
              domain={[5.5, 7.5]}
              tickFormatter={(v: number) => v.toFixed(1)}
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={40}
            />
            <ReferenceLine
              y={6}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="6 4"
              strokeOpacity={0.4}
              label={{ value: "Mín. aprovação", position: "insideTopRight", fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="media"
              stroke="var(--chart-1)"
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
