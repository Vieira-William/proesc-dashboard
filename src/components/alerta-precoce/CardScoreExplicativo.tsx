import { useState } from 'react'
import { Info, ChevronDown, ChevronUp } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'

export function CardScoreExplicativo() {
  const [aberto, setAberto] = useState(false)

  return (
    <Collapsible open={aberto} onOpenChange={setAberto}>
      <div className="rounded-lg border bg-card p-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between h-auto p-0 hover:bg-transparent">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Como funciona o Score de Engajamento</span>
            </div>
            {aberto ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-3 space-y-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            O score combina 4 dimensões derivadas dos dados:
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 ml-4">
            <li><strong className="text-foreground">Desempenho (40%)</strong> — Média final do aluno</li>
            <li><strong className="text-foreground">Consistência (20%)</strong> — Estabilidade das notas ao longo do ano</li>
            <li><strong className="text-foreground">Evolução (25%)</strong> — Melhoria de B1 para B4</li>
            <li><strong className="text-foreground">Patamar Mínimo (15%)</strong> — Nunca ter nota muito baixa</li>
          </ul>
          <div className="flex flex-wrap gap-3 text-xs mt-2">
            <span><span className="text-red-500 font-bold">0-30</span> Crítico</span>
            <span><span className="text-orange-500 font-bold">31-50</span> Atenção</span>
            <span><span className="text-yellow-500 font-bold">51-70</span> Monitorar</span>
            <span><span className="text-emerald-500 font-bold">71-100</span> Saudável</span>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-2">
            Na v2, o score incluirá: frequência, entregas de tarefas e histórico de
            pagamentos (inadimplência gera estresse familiar, impactando desempenho).
          </p>
        </CollapsibleContent>
      </div>
    </Collapsible>
  )
}
