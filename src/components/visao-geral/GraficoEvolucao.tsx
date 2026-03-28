import { Area, AreaChart, CartesianGrid, ReferenceLine, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
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
        <CardTitle className="text-base font-medium">
          Evolução Bimestral
        </CardTitle>
        <CardDescription className="text-xs">
          Média geral por bimestre — todas as turmas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={dados} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="gradientMedia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.30} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.08} />
            <XAxis
              dataKey="bimestre"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <YAxis
              domain={[5.5, 7.5]}
              ticks={[5.5, 6.0, 6.5, 7.0, 7.5]}
              tickFormatter={(v: number) => v.toFixed(1)}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
              width={45}
              dx={-5}
            />
            <ReferenceLine
              y={6}
              stroke="var(--destructive)"
              strokeDasharray="8 4"
              strokeOpacity={0.5}
              strokeWidth={1.5}
              label={{ value: "Mín. aprovação (6.0)", position: "insideBottomRight", offset: 10, fill: "var(--destructive)", fontSize: 11, fontWeight: 500, opacity: 0.7 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="media"
              stroke="var(--primary)"
              strokeWidth={2.5}
              fill="url(#gradientMedia)"
              dot={{ r: 5, fill: 'var(--primary)', stroke: 'var(--background)', strokeWidth: 2.5 }}
              activeDot={{ r: 7, fill: 'var(--primary)', stroke: 'var(--background)', strokeWidth: 3 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
