import { useState } from 'react'
import type { TurmaCodigo, AlunoProcessado } from '@/lib/calculos'
import { useAlunos } from '@/hooks/useAlunos'
import { FiltroTurma } from '@/components/visao-geral/FiltroTurma'
import { KpiCards } from '@/components/visao-geral/KpiCards'
import { GraficoEvolucao } from '@/components/visao-geral/GraficoEvolucao'
import { TabelaAlunos } from '@/components/visao-geral/TabelaAlunos'
import { AlunoSheet } from '@/components/visao-geral/AlunoSheet'

export function VisaoGeral() {
  const [turmaFiltro, setTurmaFiltro] = useState<TurmaCodigo | 'todas'>('todas')
  const [alunoSelecionado, setAlunoSelecionado] = useState<AlunoProcessado | null>(null)
  const dados = useAlunos(turmaFiltro)

  const metricasVisiveis =
    turmaFiltro === 'todas'
      ? dados.metricas
      : dados.metricasPorTurma[turmaFiltro]

  return (
    <div className="flex flex-col gap-6">
      <FiltroTurma turmaAtiva={turmaFiltro} onMudar={setTurmaFiltro} />
      <KpiCards metricas={metricasVisiveis} />
      <GraficoEvolucao evolucao={metricasVisiveis.evolucaoBimestral} />
      <TabelaAlunos
        alunos={dados.alunosFiltrados}
        onAlunoClick={setAlunoSelecionado}
      />
      <AlunoSheet
        aluno={alunoSelecionado}
        aberto={alunoSelecionado !== null}
        onFechar={() => setAlunoSelecionado(null)}
      />
    </div>
  )
}
