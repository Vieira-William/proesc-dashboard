import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { TurmaCodigo } from '@/lib/calculos'

interface FiltroTurmaProps {
  turmaAtiva: TurmaCodigo | 'todas'
  onMudar: (turma: TurmaCodigo | 'todas') => void
}

const opcoes: { valor: TurmaCodigo | 'todas'; rotulo: string }[] = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: '3A', rotulo: '3A' },
  { valor: '3B', rotulo: '3B' },
  { valor: '3C', rotulo: '3C' },
]

export function FiltroTurma({ turmaAtiva, onMudar }: FiltroTurmaProps) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={turmaAtiva}
      onValueChange={(v) => {
        if (v) onMudar(v as TurmaCodigo | 'todas')
      }}
    >
      {opcoes.map((o) => (
        <ToggleGroupItem key={o.valor} value={o.valor}>
          {o.rotulo}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
