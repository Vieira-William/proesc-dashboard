import { useState, useMemo, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight, Mail, ClipboardList, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import type { AlunoProcessado, NivelRisco, Tendencia } from '@/lib/calculos'
import { calcularScoreEngajamento } from '@/lib/calculos'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ModalNotificar } from './ModalNotificar'
import { ModalPlanoEstudos } from './ModalPlanoEstudos'

// ─── Helpers de estilo ──────────────────────────────────────────────────────

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

const ordemRisco: Record<NivelRisco, number> = {
  'Crítico': 0,
  'Alto': 1,
  'Médio': 2,
  'Baixo': 3,
}

// ─── Componente ─────────────────────────────────────────────────────────────

interface TabelaRiscoProps {
  alunos: AlunoProcessado[]
}

const ITENS_POR_PAGINA = 10

export function TabelaRisco({ alunos }: TabelaRiscoProps) {
  const [busca, setBusca] = useState('')
  const [filtroRisco, setFiltroRisco] = useState<string>('todos')
  const [paginaAtual, setPaginaAtual] = useState(0)
  const [alunoNotificar, setAlunoNotificar] = useState<AlunoProcessado | null>(null)
  const [alunoPlano, setAlunoPlano] = useState<AlunoProcessado | null>(null)

  useEffect(() => {
    setPaginaAtual(0)
  }, [alunos, busca, filtroRisco])

  const alunosProcessados = useMemo(() => {
    let resultado = alunos

    if (filtroRisco !== 'todos') {
      resultado = resultado.filter((a) => a.risco === filtroRisco)
    }

    if (busca) {
      const termo = busca.toLowerCase()
      resultado = resultado.filter((a) => a.nome.toLowerCase().includes(termo))
    }

    // Ordenar: risco mais grave primeiro, depois media asc
    resultado = [...resultado].sort((a, b) => {
      const diffRisco = ordemRisco[a.risco] - ordemRisco[b.risco]
      if (diffRisco !== 0) return diffRisco
      return a.media - b.media
    })

    return resultado
  }, [alunos, busca, filtroRisco])

  const totalPaginas = Math.ceil(alunosProcessados.length / ITENS_POR_PAGINA)
  const inicio = paginaAtual * ITENS_POR_PAGINA
  const alunosPagina = alunosProcessados.slice(inicio, inicio + ITENS_POR_PAGINA)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base font-semibold">Alunos em Risco</CardTitle>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Select value={filtroRisco} onValueChange={setFiltroRisco}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos em risco</SelectItem>
                <SelectItem value="Crítico">Crítico</SelectItem>
                <SelectItem value="Alto">Alto</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full sm:w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-16 text-center">Turma</TableHead>
                <TableHead className="w-20">Média</TableHead>
                <TableHead className="w-24">Risco</TableHead>
                <TableHead className="w-16 text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-help flex items-center justify-center gap-1">Score <Info className="h-3 w-3 text-muted-foreground/50" /></span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-[280px] text-xs">
                      <p>Score de Engajamento (0-100): Desempenho (40%) · Consistência (20%) · Evolução (25%) · Patamar mínimo (15%). Quanto menor, mais urgente a intervenção.</p>
                    </TooltipContent>
                  </Tooltip>
                </TableHead>
                <TableHead className="w-20 text-center">Tend.</TableHead>
                <TableHead className="w-24">Variância</TableHead>
                <TableHead className="w-32">Notas (B1→B4)</TableHead>
                <TableHead className="w-24 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunosPagina.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    Nenhum aluno encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                alunosPagina.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.nome}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{a.turma}</Badge>
                    </TableCell>
                    <TableCell
                      className={`font-mono tabular-nums ${
                        a.media < 5 ? 'text-red-500' : a.media < 6 ? 'text-yellow-500' : ''
                      }`}
                    >
                      {a.media.toFixed(1)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={coresRisco[a.risco]}>
                        {a.risco}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {(() => {
                        const score = calcularScoreEngajamento(a)
                        const cor = score <= 30 ? 'text-red-500' : score <= 50 ? 'text-orange-500' : score <= 70 ? 'text-yellow-500' : 'text-emerald-500'
                        return <span className={`text-xs font-bold tabular-nums ${cor}`}>{score}</span>
                      })()}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm font-medium ${coresTendencia[a.tendencia]}`}>
                        {a.tendencia}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono tabular-nums text-xs">
                      {a.variancia.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs font-mono tabular-nums">
                        <span className={a.nota_1 < 5 ? 'text-red-500' : ''}>{a.nota_1}</span>
                        <span className="text-muted-foreground">→</span>
                        <span>{a.nota_2}</span>
                        <span className="text-muted-foreground">→</span>
                        <span>{a.nota_3}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className={a.nota_4 >= 6 ? 'text-emerald-500' : a.nota_4 < 5 ? 'text-red-500' : ''}>
                          {a.nota_4}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setAlunoNotificar(a)}>
                              <Mail className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Notificar Responsável</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setAlunoPlano(a)}>
                              <ClipboardList className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Plano de Estudos</TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <ModalNotificar aluno={alunoNotificar} aberto={alunoNotificar !== null} onFechar={() => setAlunoNotificar(null)} />
        <ModalPlanoEstudos aluno={alunoPlano} aberto={alunoPlano !== null} onFechar={() => setAlunoPlano(null)} />

        <div className="flex items-center justify-between px-6 pt-4">
          <p className="text-sm text-muted-foreground">
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
