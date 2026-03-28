import { useState, useMemo, useEffect } from 'react'
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import type { AlunoProcessado, StatusAluno, NivelRisco, Tendencia } from '@/lib/calculos'

// ─── Helpers de estilo ──────────────────────────────────────────────────────

const coresStatus: Record<StatusAluno, string> = {
  Aprovado: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Reprovado: 'bg-red-500/10 text-red-400 border-red-500/20',
}

const coresRisco: Record<NivelRisco, string> = {
  'Crítico': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Alto': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Médio': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Baixo': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

const coresTendencia: Record<Tendencia, string> = {
  '↑': 'text-emerald-400/70',
  '↓': 'text-red-400/70',
  '→': 'text-muted-foreground/50',
}

type FiltroStatus = 'todos' | 'Aprovado' | 'Reprovado'

// ─── Componente ─────────────────────────────────────────────────────────────

interface TabelaAlunosProps {
  alunos: AlunoProcessado[]
  onAlunoClick?: (aluno: AlunoProcessado) => void
}

const ITENS_POR_PAGINA = 10

export function TabelaAlunos({ alunos, onAlunoClick }: TabelaAlunosProps) {
  const [busca, setBusca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('todos')
  const [ordenacao, setOrdenacao] = useState<'asc' | 'desc'>('desc')
  const [paginaAtual, setPaginaAtual] = useState(0)

  // Contagens para os filtros
  const contagens = useMemo(() => ({
    todos: alunos.length,
    aprovados: alunos.filter((a) => a.status === 'Aprovado').length,
    reprovados: alunos.filter((a) => a.status === 'Reprovado').length,
  }), [alunos])

  // Reset pagina quando filtros mudam
  useEffect(() => {
    setPaginaAtual(0)
  }, [alunos, busca, filtroStatus])

  const alunosProcessados = useMemo(() => {
    let resultado = alunos

    // Filtro por status
    if (filtroStatus !== 'todos') {
      resultado = resultado.filter((a) => a.status === filtroStatus)
    }

    // Filtro por busca
    if (busca) {
      const termo = busca.toLowerCase()
      resultado = resultado.filter((a) => a.nome.toLowerCase().includes(termo))
    }

    // Ordenacao: nome A-Z para "todos", media desc para aprovados, media asc para reprovados
    resultado = [...resultado].sort((a, b) => {
      if (filtroStatus === 'todos' && ordenacao === 'desc') {
        return a.nome.localeCompare(b.nome, 'pt-BR')
      }
      return ordenacao === 'desc' ? b.media - a.media : a.media - b.media
    })

    return resultado
  }, [alunos, busca, filtroStatus, ordenacao])

  const totalPaginas = Math.ceil(alunosProcessados.length / ITENS_POR_PAGINA)
  const inicio = paginaAtual * ITENS_POR_PAGINA
  const alunosPagina = alunosProcessados.slice(inicio, inicio + ITENS_POR_PAGINA)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base font-semibold">Alunos</CardTitle>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <ToggleGroup
            type="single"
            variant="outline"
            size="sm"
            value={filtroStatus}
            onValueChange={(v) => {
              if (v) setFiltroStatus(v as FiltroStatus)
            }}
          >
            <ToggleGroupItem value="todos">
              Todos ({contagens.todos})
            </ToggleGroupItem>
            <ToggleGroupItem value="Aprovado">
              Aprovados ({contagens.aprovados})
            </ToggleGroupItem>
            <ToggleGroupItem value="Reprovado">
              Reprovados ({contagens.reprovados})
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs uppercase tracking-wider">Nome</TableHead>
                <TableHead className="w-16 text-center text-xs uppercase tracking-wider">Turma</TableHead>
                <TableHead className="w-24 text-xs uppercase tracking-wider">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 text-xs uppercase tracking-wider font-medium"
                    onClick={() =>
                      setOrdenacao((o) => (o === 'desc' ? 'asc' : 'desc'))
                    }
                  >
                    Média
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead className="w-24 text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="w-24 text-xs uppercase tracking-wider">Risco</TableHead>
                <TableHead className="w-20 text-center text-xs uppercase tracking-wider">Tend.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunosPagina.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhum aluno encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                alunosPagina.map((a) => (
                  <TableRow
                    key={a.id}
                    className={`hover:bg-muted/30 transition-colors ${onAlunoClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onAlunoClick?.(a)}
                  >
                    <TableCell className="font-medium">{a.nome}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{a.turma}</Badge>
                    </TableCell>
                    <TableCell className="font-mono tabular-nums">
                      {a.media.toFixed(1)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={coresStatus[a.status]}>
                        {a.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={coresRisco[a.risco]}>
                        {a.risco}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm font-medium ${coresTendencia[a.tendencia]}`}>
                        {a.tendencia}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer — paginação */}
        <div className="flex items-center justify-between px-6 pt-4">
          <p className="text-xs text-muted-foreground">
            Mostrando {alunosProcessados.length === 0 ? 0 : inicio + 1}–
            {Math.min(inicio + ITENS_POR_PAGINA, alunosProcessados.length)} de{' '}
            {alunosProcessados.length} alunos
          </p>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={paginaAtual === 0}
              onClick={() => setPaginaAtual((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={paginaAtual >= totalPaginas - 1}
              onClick={() => setPaginaAtual((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
