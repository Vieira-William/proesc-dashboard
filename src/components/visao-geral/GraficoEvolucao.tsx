import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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
          <AreaChart data={dados} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="gradientMedia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis
              dataKey="bimestre"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="media"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#gradientMedia)"
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
