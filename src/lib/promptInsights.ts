import type { DadosProcessados } from '@/hooks/useAlunos'
import type { TurmaCodigo } from '@/lib/calculos'

const turmas: TurmaCodigo[] = ['3A', '3B', '3C']

export function montarPrompt(dados: DadosProcessados): string {
  const m = dados.metricas
  const ev = m.evolucaoBimestral

  const turmasInfo = turmas
    .map((t) => {
      const mt = dados.metricasPorTurma[t]
      const r = mt.distribuicaoRisco
      return `  - ${t}: média ${mt.mediaGeral}, aprovação ${mt.percentualAprovacao}%, risco (C:${r.critico} A:${r.alto} M:${r.medio}), evolução B1=${mt.evolucaoBimestral.b1}→B4=${mt.evolucaoBimestral.b4}`
    })
    .join('\n')

  const top5 = dados.rankingTop10
    .slice(0, 5)
    .map((a) => `  - ${a.nome} (${a.turma}): média ${a.media}`)
    .join('\n')

  const piores5 = dados.rankingPiores10
    .slice(0, 5)
    .map((a) => `  - ${a.nome} (${a.turma}): média ${a.media}, risco ${a.risco}, tendência ${a.tendencia}`)
    .join('\n')

  const quase5 = dados.quaseAprovados
    .slice(0, 5)
    .map((a) => `  - ${a.nome} (${a.turma}): média ${a.media}, falta ${(6.0 - a.media).toFixed(1)} para aprovação`)
    .join('\n')

  return `Analise os dados de desempenho escolar do 3º ano (100 alunos, 3 turmas, 4 bimestres):

## Métricas Globais
- Total: ${m.total} alunos
- Média geral: ${m.mediaGeral}
- Aprovados: ${m.aprovados} (${m.percentualAprovacao}%) | Reprovados: ${m.reprovados}
- Evolução bimestral: B1=${ev.b1} → B2=${ev.b2} → B3=${ev.b3} → B4=${ev.b4}
- Tendências: ${m.melhoraram} melhoraram, ${m.pioraram} pioraram, ${m.estaveis} estáveis

## Distribuição de Risco
- Crítico: ${m.distribuicaoRisco.critico} | Alto: ${m.distribuicaoRisco.alto} | Médio: ${m.distribuicaoRisco.medio} | Baixo: ${m.distribuicaoRisco.baixo}

## Por Turma
${turmasInfo}

## Top 5 Melhores Alunos
${top5}

## 5 Alunos com Menor Desempenho
${piores5}

## 5 Quase Aprovados (intervenção prioritária)
${quase5}
- Total de quase aprovados: ${dados.quaseAprovados.length}

Gere uma análise completa com diagnóstico, padrões, recomendações e prioridades de intervenção.`
}

export function montarContextoChat(dados: DadosProcessados): string {
  const m = dados.metricas
  const ev = m.evolucaoBimestral
  const r = m.distribuicaoRisco

  const turmasResumo = turmas
    .map((t) => {
      const mt = dados.metricasPorTurma[t]
      return `${t}: ${mt.total} alunos, média ${mt.mediaGeral}, aprovação ${mt.percentualAprovacao}%`
    })
    .join(' | ')

  return `100 alunos do 3º ano, 3 turmas. Média geral: ${m.mediaGeral}. Aprovados: ${m.aprovados} (${m.percentualAprovacao}%). Reprovados: ${m.reprovados}. Evolução: B1=${ev.b1}→B2=${ev.b2}→B3=${ev.b3}→B4=${ev.b4}. Risco: ${r.critico}C ${r.alto}A ${r.medio}M ${r.baixo}B. Turmas: ${turmasResumo}. Quase aprovados: ${dados.quaseAprovados.length}. 100% dos alunos com nota B1<6 reprovaram.`
}
