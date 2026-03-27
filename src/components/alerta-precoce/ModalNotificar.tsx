import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { AlunoProcessado } from '@/lib/calculos'

interface ModalNotificarProps {
  aluno: AlunoProcessado | null
  aberto: boolean
  onFechar: () => void
}

export function ModalNotificar({ aluno, aberto, onFechar }: ModalNotificarProps) {
  const [copiado, setCopiado] = useState(false)

  if (!aluno) return null

  const texto = `Prezados responsáveis,

Identificamos que ${aluno.nome}, aluno(a) do 3º Ano - Turma ${aluno.turma}, apresenta média de ${aluno.media.toFixed(1)}, classificada como risco ${aluno.risco.toUpperCase()}.

Notas bimestrais: B1=${aluno.nota_1}, B2=${aluno.nota_2}, B3=${aluno.nota_3}, B4=${aluno.nota_4}.

Solicitamos agendamento de reunião para definirmos um plano de intervenção pedagógica conjunta.

Atenciosamente,
Coordenação Pedagógica`

  const copiar = async () => {
    await navigator.clipboard.writeText(texto)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <Dialog open={aberto} onOpenChange={(v) => { if (!v) onFechar() }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">
            Notificar Responsável — {aluno.nome} ({aluno.turma})
          </DialogTitle>
        </DialogHeader>
        <div className="rounded-md border bg-muted/30 p-4 text-sm whitespace-pre-line text-muted-foreground leading-relaxed">
          {texto}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={onFechar}>
            Fechar
          </Button>
          <Button size="sm" onClick={copiar}>
            {copiado ? (
              <><Check className="mr-1.5 h-3.5 w-3.5" /> Copiado!</>
            ) : (
              <><Copy className="mr-1.5 h-3.5 w-3.5" /> Copiar Texto</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
