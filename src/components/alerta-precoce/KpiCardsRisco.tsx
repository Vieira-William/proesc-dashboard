import { AlertTriangle, AlertOctagon, Target, TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

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
          <span className="text-sm font-medium text-muted-foreground">Risco Crítico</span>
          <AlertOctagon className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-500">{criticos}</p>
          <p className="text-xs text-muted-foreground">Nota B1 abaixo de 4.0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">Risco Alto</span>
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-orange-500">{altos}</p>
          <p className="text-xs text-muted-foreground">Nota B1 entre 4.0 e 4.9</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">Quase Aprovados</span>
          <Target className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-yellow-500">{quaseAprovados}</p>
          <p className="text-xs text-muted-foreground">Média entre 5.0 e 5.9</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <span className="text-sm font-medium text-muted-foreground">Em Melhoria</span>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-500">{emMelhoria}</p>
          <p className="text-xs text-muted-foreground">Tendência ↑ entre alunos em risco</p>
        </CardContent>
      </Card>
    </div>
  )
}
