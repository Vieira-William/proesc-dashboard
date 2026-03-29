import { Info, BarChart3, TrendingUp, RefreshCw, Ruler } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// ─── Helpers SVG ────────────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  if (startAngle === endAngle) return ''
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

// ─── Dados estáticos ────────────────────────────────────────────────────────

const segments = [
  { start: 0, end: 54, color: 'rgba(239, 68, 68, 0.3)' },
  { start: 54, end: 90, color: 'rgba(251, 146, 60, 0.3)' },
  { start: 90, end: 126, color: 'rgba(250, 204, 21, 0.3)' },
  { start: 126, end: 180, color: 'rgba(16, 185, 129, 0.3)' },
]

const dimensions = [
  { icon: BarChart3, label: 'Desempenho', desc: 'Média final do aluno', weight: 40 },
  { icon: TrendingUp, label: 'Evolução', desc: 'Melhoria de B1 para B4', weight: 25 },
  { icon: RefreshCw, label: 'Consistência', desc: 'Estabilidade das notas ao longo do ano', weight: 20 },
  { icon: Ruler, label: 'Patamar Mínimo', desc: 'Nunca ter nota muito baixa', weight: 15 },
]

// ─── Componente ─────────────────────────────────────────────────────────────

interface CardScoreExplicativoProps {
  scoreMedio: number
}

export function CardScoreExplicativo({ scoreMedio }: CardScoreExplicativoProps) {
  const percentage = Math.min(Math.max(scoreMedio, 0), 100) / 100
  const angle = percentage * 180

  const faixaLabel = scoreMedio >= 71 ? 'Saudável'
    : scoreMedio >= 51 ? 'Monitorar'
    : scoreMedio >= 31 ? 'Atenção'
    : 'Crítico'

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">Score de Engajamento</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-help shrink-0" />
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[250px] text-xs">
              <p>Score multidimensional que combina 4 indicadores para medir o nível de engajamento e risco de cada aluno.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent>
        {/* ─── SEÇÃO 1: Gauge semicircular ─── */}
        <div className="relative flex flex-col items-center py-4">
          <svg viewBox="0 0 200 115" className="w-52 h-auto">
            {/* Arcos de fundo — faixas sutis */}
            {segments.map((seg, i) => (
              <path
                key={i}
                d={describeArc(100, 100, 80, 180 + seg.start, 180 + seg.end)}
                fill="none"
                stroke={seg.color}
                strokeWidth={14}
                strokeLinecap="butt"
              />
            ))}

            {/* Arco de progresso — valor atual */}
            {angle > 0 && (
              <path
                d={describeArc(100, 100, 80, 180, 180 + angle)}
                fill="none"
                stroke="var(--primary)"
                strokeWidth={14}
                strokeLinecap="round"
              />
            )}

            {/* Dot no final do arco */}
            {angle > 0 && (() => {
              const pos = polarToCartesian(100, 100, 80, 180 + angle)
              return (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={4}
                  fill="var(--primary)"
                  stroke="var(--background)"
                  strokeWidth={2}
                />
              )
            })()}
          </svg>

          {/* Valor central */}
          <div className="absolute bottom-4 flex flex-col items-center">
            <span className="text-4xl font-bold text-foreground">{scoreMedio}</span>
            <span className="text-xs text-muted-foreground mt-0.5">{faixaLabel}</span>
          </div>
        </div>

        {/* ─── SEÇÃO 2: Dimensões com barras ─── */}
        <div className="space-y-4 mt-2">
          {dimensions.map((dim) => {
            const Icon = dim.icon
            return (
              <div key={dim.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{dim.label}</span>
                  </div>
                  <span className="text-sm font-bold text-primary">{dim.weight}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted ml-9">
                  <div
                    className="h-2 rounded-full bg-primary/60 transition-all duration-500"
                    style={{ width: `${dim.weight}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground ml-9">{dim.desc}</p>
              </div>
            )
          })}
        </div>

        {/* ─── SEÇÃO 3: Escala de faixas ─── */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
            <div className="flex-[30] rounded-l-full" style={{ background: 'rgba(239, 68, 68, 0.5)' }} />
            <div className="flex-[20]" style={{ background: 'rgba(251, 146, 60, 0.5)' }} />
            <div className="flex-[20]" style={{ background: 'rgba(250, 204, 21, 0.5)' }} />
            <div className="flex-[30] rounded-r-full" style={{ background: 'var(--primary)', opacity: 0.7 }} />
          </div>

          <div className="flex justify-between mt-2 px-0.5">
            <div className="text-center">
              <p className="text-[10px] font-medium" style={{ color: 'rgba(239, 68, 68, 0.8)' }}>Crítico</p>
              <p className="text-[9px] text-muted-foreground">0-30</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-medium" style={{ color: 'rgba(251, 146, 60, 0.8)' }}>Atenção</p>
              <p className="text-[9px] text-muted-foreground">31-50</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-medium" style={{ color: 'rgba(250, 204, 21, 0.8)' }}>Monitorar</p>
              <p className="text-[9px] text-muted-foreground">51-70</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-medium text-primary">Saudável</p>
              <p className="text-[9px] text-muted-foreground">71-100</p>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground/50 mt-4">
            Na v2, o score incluirá: frequência, entregas de tarefas e histórico de pagamentos
            (inadimplência gera estresse familiar, impactando desempenho).
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
