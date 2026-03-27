import { useState, useMemo } from 'react'
import type { TurmaCodigo } from '@/lib/calculos'
import { useAlunos } from '@/hooks/useAlunos'
import { FiltroTurma } from '@/components/visao-geral/FiltroTurma'
import { KpiCardsRisco } from '@/components/alerta-precoce/KpiCardsRisco'
import { TabelaRisco } from '@/components/alerta-precoce/TabelaRisco'
import { PainelQuaseAprovados } from '@/components/alerta-precoce/PainelQuaseAprovados'

export function AlertaPrecoce() {
  const [turmaFiltro, setTurmaFiltro] = useState<TurmaCodigo | 'todas'>('todas')
  const dados = useAlunos(turmaFiltro)

  const alunosEmRisco = useMemo(
    () => dados.alunosFiltrados.filter((a) => a.risco !== 'Baixo'),
    [dados.alunosFiltrados],
  )

  const emMelhoria = useMemo(
    () => alunosEmRisco.filter((a) => a.tendencia === '↑').length,
    [alunosEmRisco],
  )

  const metricasRisco =
    turmaFiltro === 'todas'
      ? dados.metricas.distribuicaoRisco
      : dados.metricasPorTurma[turmaFiltro].distribuicaoRisco

  const quaseAprovadosFiltrados = useMemo(
    () =>
      turmaFiltro === 'todas'
        ? dados.quaseAprovados
        : dados.quaseAprovados.filter((a) => a.turma === turmaFiltro),
    [dados.quaseAprovados, turmaFiltro],
  )

  return (
    <div className="flex flex-col gap-6">
      <FiltroTurma turmaAtiva={turmaFiltro} onMudar={setTurmaFiltro} />
      <KpiCardsRisco
        criticos={metricasRisco.critico}
        altos={metricasRisco.alto}
        quaseAprovados={quaseAprovadosFiltrados.length}
        emMelhoria={emMelhoria}
      />
      <TabelaRisco alunos={alunosEmRisco} />
      <PainelQuaseAprovados quaseAprovados={quaseAprovadosFiltrados} />
    </div>
  )
}
