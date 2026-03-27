import { useAlunos } from '@/hooks/useAlunos'
import { ComparativoKpis } from '@/components/analise-turma/ComparativoKpis'
import { GraficoEvolucaoComparativo } from '@/components/analise-turma/GraficoEvolucaoComparativo'
import { GraficoAprovacaoTurma } from '@/components/analise-turma/GraficoAprovacaoTurma'
import { GraficoDistribuicaoRisco } from '@/components/analise-turma/GraficoDistribuicaoRisco'

export function AnaliseTurma() {
  const dados = useAlunos('todas')

  return (
    <div className="flex flex-col gap-6">
      <ComparativoKpis metricasPorTurma={dados.metricasPorTurma} />
      <GraficoEvolucaoComparativo metricasPorTurma={dados.metricasPorTurma} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GraficoAprovacaoTurma metricasPorTurma={dados.metricasPorTurma} />
        <GraficoDistribuicaoRisco metricasPorTurma={dados.metricasPorTurma} />
      </div>
    </div>
  )
}
