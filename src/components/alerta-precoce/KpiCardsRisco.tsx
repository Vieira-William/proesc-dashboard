import { AlertTriangle, AlertOctagon, Target, TrendingUp } from 'lucide-react'
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
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Risco Crítico</span>
              <AlertOctagon className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-500">{criticos}</p>
              <p className="text-xs text-muted-foreground">Nota B1 abaixo de 4.0</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Alunos com nota do 1º bimestre abaixo de 4.0. Casos mais graves — necessitam intervenção imediata, reunião com pais e plano de recuperação individual.</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Risco Alto</span>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-orange-500">{altos}</p>
              <p className="text-xs text-muted-foreground">Nota B1 entre 4.0 e 4.9</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Alunos com nota do 1º bimestre entre 4.0 e 4.9. Precisam de reforço escolar obrigatório e acompanhamento semanal.</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Quase Aprovados</span>
              <Target className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-500">{quaseAprovados}</p>
              <p className="text-xs text-muted-foreground">Média entre 5.0 e 5.9</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Alunos com média final entre 5.0 e 5.9. Faltaram entre 0.5 e 1.0 pontos para aprovação. São os mais recuperáveis com menor esforço de intervenção.</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="cursor-help">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-muted-foreground">Em Melhoria</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-500">{emMelhoria}</p>
              <p className="text-xs text-muted-foreground">Tendência ↑ entre alunos em risco</p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[280px] text-xs">
          <p>Alunos em risco que mostraram tendência de melhoria (nota B4 &gt; nota B1). Apesar da melhora, não foi suficiente para aprovação.</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
