import { AlertTriangle, AlertOctagon, Target, TrendingUp, Info } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface KpiCardsRiscoProps {
  criticos: number
  altos: number
  quaseAprovados: number
  emMelhoria: number
}

export function KpiCardsRisco({ criticos, altos, quaseAprovados, emMelhoria }: KpiCardsRiscoProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Risco Crítico <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>Alunos com nota do 1º bimestre abaixo de 4.0. Necessitam intervenção imediata e reunião com pais.</p>
            </TooltipContent>
          </Tooltip>
          <AlertOctagon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60 shrink-0" />
            {criticos}
          </p>
          <p className="text-xs text-muted-foreground">Nota B1 abaixo de 4.0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Risco Alto <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>Alunos com nota do 1º bimestre entre 4.0 e 4.9. Precisam de reforço escolar e acompanhamento semanal.</p>
            </TooltipContent>
          </Tooltip>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-orange-500/60 shrink-0" />
            {altos}
          </p>
          <p className="text-xs text-muted-foreground">Nota B1 entre 4.0 e 4.9</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Quase Aprovados <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>Alunos com média entre 5.0 e 5.9. Faltaram 0.5 a 1.0 pontos para aprovação — mais recuperáveis com menor esforço.</p>
            </TooltipContent>
          </Tooltip>
          <Target className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60 shrink-0" />
            {quaseAprovados}
          </p>
          <p className="text-xs text-muted-foreground">Média entre 5.0 e 5.9</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 cursor-help">
                Em Melhoria <Info className="h-3 w-3 text-muted-foreground/50" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[280px] text-xs">
              <p>Alunos em risco com tendência de melhoria (B4 &gt; B1). Apesar da melhora, não foi suficiente para aprovação.</p>
            </TooltipContent>
          </Tooltip>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60 shrink-0" />
            {emMelhoria}
          </p>
          <p className="text-xs text-muted-foreground">Tendência ↑ entre alunos em risco</p>
        </CardContent>
      </Card>
    </div>
  )
}
