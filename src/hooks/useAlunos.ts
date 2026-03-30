// useAlunos.ts — Hook central de dados do Proesc Dashboard
// Processa o JSON de alunos uma única vez via useMemo
// Expõe interface DadosProcessados com todas as métricas derivadas

import { useMemo } from 'react'
import alunosRaw from '../data/alunos.json'
import { useAlunosContext } from '../contexts/AlunosContext'
import {
  type Aluno,
  type AlunoProcessado,
  type MetricasGlobais,
  type MetricasTurma,
  type FaixaDistribuicao,
  type TurmaCodigo,
  processarAluno,
  calcularMetricasGlobais,
  calcularMetricasTurma,
  rankingTop,
  rankingPiores,
  quaseAprovados as calcQuaseAprovados,
  distribuicaoFaixas,
} from '../lib/calculos'

// ─── Interface pública do hook ────────────────────────────────────────────────

export interface DadosProcessados {
  /** Todos os alunos (originais + adicionais) enriquecidos com campos calculados */
  alunos: AlunoProcessado[]
  /** Alunos filtrados pela turma selecionada (ou todos se 'todas') */
  alunosFiltrados: AlunoProcessado[]
  /** Métricas globais sobre os alunos combinados */
  metricas: MetricasGlobais
  /** Métricas individuais por turma */
  metricasPorTurma: Record<TurmaCodigo, MetricasTurma>
  /** Alunos com 5.0 ≤ média < 6.0 — intervenção prioritária */
  quaseAprovados: AlunoProcessado[]
  /** Top 10 alunos por maior média */
  rankingTop10: AlunoProcessado[]
  /** 10 alunos com menor média */
  rankingPiores10: AlunoProcessado[]
  /** Contagem por faixa de média (0–3.9, 4–4.9, ..., 8–10) */
  distribuicaoFaixas: FaixaDistribuicao[]
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Hook central do dashboard.
 *
 * @param turmaFiltro - Turma a filtrar em `alunosFiltrados`. Padrão: 'todas'.
 *   Todas as outras métricas sempre consideram os 100 alunos.
 */
export function useAlunos(turmaFiltro: TurmaCodigo | 'todas' = 'todas'): DadosProcessados {
  const { arquivosAdicionais } = useAlunosContext()
  
  const alunosCombinados = useMemo(() => {
    const originais = alunosRaw as Aluno[]
    const extras = arquivosAdicionais.flatMap(a => a.data)
    return [...originais, ...extras]
  }, [arquivosAdicionais])

  return useMemo(() => {
    // Processar todos os alunos uma vez
    const todosProcessados = alunosCombinados.map(processarAluno)

    // Filtro por turma (afeta apenas alunosFiltrados)
    const alunosFiltrados =
      turmaFiltro === 'todas'
        ? todosProcessados
        : todosProcessados.filter(a => a.turma === turmaFiltro)

    // Métricas globais (sempre sobre todos os alunos)
    const metricas = calcularMetricasGlobais(alunosCombinados)

    // Métricas por turma
    const metricasPorTurma: Record<TurmaCodigo, MetricasTurma> = {
      '3A': calcularMetricasTurma(alunosCombinados, '3A'),
      '3B': calcularMetricasTurma(alunosCombinados, '3B'),
      '3C': calcularMetricasTurma(alunosCombinados, '3C'),
    }

    return {
      alunos: todosProcessados,
      alunosFiltrados,
      metricas,
      metricasPorTurma,
      quaseAprovados: calcQuaseAprovados(alunosCombinados),
      rankingTop10: rankingTop(alunosCombinados, 10),
      rankingPiores10: rankingPiores(alunosCombinados, 10),
      distribuicaoFaixas: distribuicaoFaixas(alunosCombinados),
    }
  }, [turmaFiltro, alunosCombinados])
}

