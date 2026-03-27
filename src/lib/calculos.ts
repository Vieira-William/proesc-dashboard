// calculos.ts — Lógica de negócio do Proesc Dashboard
// Todas as funções operam sobre o JSON plano (nota_1..nota_4)
// Sem estado — funções puras, testáveis e reutilizáveis

// ─── Tipos base ────────────────────────────────────────────────────────────────

export interface Aluno {
  id: number
  nome: string
  turma: '3A' | '3B' | '3C'
  nota_1: number
  nota_2: number
  nota_3: number
  nota_4: number
}

export type TurmaCodigo = '3A' | '3B' | '3C'
export type StatusAluno = 'Aprovado' | 'Reprovado'
export type NivelRisco = 'Crítico' | 'Alto' | 'Médio' | 'Baixo'
export type Tendencia = '↑' | '↓' | '→'

// ─── Tipos derivados ───────────────────────────────────────────────────────────

export interface AlunoProcessado extends Aluno {
  media: number
  status: StatusAluno
  risco: NivelRisco
  tendencia: Tendencia
  variancia: number
}

export interface EvolucaoBimestral {
  b1: number
  b2: number
  b3: number
  b4: number
}

export interface DistribuicaoRisco {
  critico: number
  alto: number
  medio: number
  baixo: number
}

export interface FaixaDistribuicao {
  faixa: string
  quantidade: number
  percentual: number
}

export interface MetricasGlobais {
  total: number
  mediaGeral: number
  aprovados: number
  reprovados: number
  percentualAprovacao: number
  distribuicaoRisco: DistribuicaoRisco
  melhoraram: number
  pioraram: number
  estaveis: number
  evolucaoBimestral: EvolucaoBimestral
}

export interface MetricasTurma extends MetricasGlobais {
  turma: TurmaCodigo
}

// ─── Funções primitivas ────────────────────────────────────────────────────────

/**
 * Média aritmética das 4 notas bimestrais, arredondada a 2 casas decimais.
 */
export function mediaFinal(aluno: Aluno): number {
  const soma = aluno.nota_1 + aluno.nota_2 + aluno.nota_3 + aluno.nota_4
  return Math.round((soma / 4) * 100) / 100
}

/**
 * Status de aprovação: ≥6 = Aprovado, <6 = Reprovado.
 */
export function statusAluno(media: number): StatusAluno {
  return media >= 6 ? 'Aprovado' : 'Reprovado'
}

/**
 * Nível de risco baseado na nota do 1º bimestre (nota_1).
 * Crítico: <4 | Alto: 4–4.9 | Médio: 5–5.9 | Baixo: ≥6
 */
export function nivelRisco(nota1: number): NivelRisco {
  if (nota1 < 4) return 'Crítico'
  if (nota1 < 5) return 'Alto'
  if (nota1 < 6) return 'Médio'
  return 'Baixo'
}

/**
 * Tendência de evolução: compara nota_4 vs nota_1.
 * ↑ se avançou ≥0.5 | ↓ se regrediu ≥0.5 | → caso contrário
 */
export function tendenciaAluno(aluno: Aluno): Tendencia {
  const delta = aluno.nota_4 - aluno.nota_1
  if (delta >= 0.5) return '↑'
  if (delta <= -0.5) return '↓'
  return '→'
}

/**
 * Variância amostral das 4 notas (mede instabilidade de desempenho).
 */
export function variancia(notas: number[]): number {
  const media = notas.reduce((s, n) => s + n, 0) / notas.length
  const somaQuadrados = notas.reduce((s, n) => s + Math.pow(n - media, 2), 0)
  return Math.round((somaQuadrados / (notas.length - 1)) * 100) / 100
}

// ─── Processamento de aluno ────────────────────────────────────────────────────

/**
 * Enriquece um aluno com todos os campos calculados.
 */
export function processarAluno(aluno: Aluno): AlunoProcessado {
  const media = mediaFinal(aluno)
  return {
    ...aluno,
    media,
    status: statusAluno(media),
    risco: nivelRisco(aluno.nota_1),
    tendencia: tendenciaAluno(aluno),
    variancia: variancia([aluno.nota_1, aluno.nota_2, aluno.nota_3, aluno.nota_4]),
  }
}

// ─── Evolução bimestral ────────────────────────────────────────────────────────

/**
 * Média de cada bimestre sobre um conjunto de alunos.
 */
export function evolucaoBimestral(alunos: Aluno[]): EvolucaoBimestral {
  const n = alunos.length
  if (n === 0) return { b1: 0, b2: 0, b3: 0, b4: 0 }
  const soma = alunos.reduce(
    (acc, a) => ({
      b1: acc.b1 + a.nota_1,
      b2: acc.b2 + a.nota_2,
      b3: acc.b3 + a.nota_3,
      b4: acc.b4 + a.nota_4,
    }),
    { b1: 0, b2: 0, b3: 0, b4: 0 }
  )
  return {
    b1: Math.round((soma.b1 / n) * 100) / 100,
    b2: Math.round((soma.b2 / n) * 100) / 100,
    b3: Math.round((soma.b3 / n) * 100) / 100,
    b4: Math.round((soma.b4 / n) * 100) / 100,
  }
}

// ─── Métricas agregadas ────────────────────────────────────────────────────────

/**
 * Calcula todas as métricas globais a partir de um conjunto de alunos.
 */
export function calcularMetricasGlobais(alunos: Aluno[]): MetricasGlobais {
  const n = alunos.length
  if (n === 0) {
    return {
      total: 0,
      mediaGeral: 0,
      aprovados: 0,
      reprovados: 0,
      percentualAprovacao: 0,
      distribuicaoRisco: { critico: 0, alto: 0, medio: 0, baixo: 0 },
      melhoraram: 0,
      pioraram: 0,
      estaveis: 0,
      evolucaoBimestral: { b1: 0, b2: 0, b3: 0, b4: 0 },
    }
  }

  const processados = alunos.map(processarAluno)

  const somaMedias = processados.reduce((s, a) => s + a.media, 0)
  const mediaGeral = Math.round((somaMedias / n) * 100) / 100

  const aprovados = processados.filter(a => a.status === 'Aprovado').length
  const reprovados = n - aprovados

  const distribuicaoRisco: DistribuicaoRisco = {
    critico: processados.filter(a => a.risco === 'Crítico').length,
    alto: processados.filter(a => a.risco === 'Alto').length,
    medio: processados.filter(a => a.risco === 'Médio').length,
    baixo: processados.filter(a => a.risco === 'Baixo').length,
  }

  const melhoraram = processados.filter(a => a.tendencia === '↑').length
  const pioraram = processados.filter(a => a.tendencia === '↓').length
  const estaveis = n - melhoraram - pioraram

  return {
    total: n,
    mediaGeral,
    aprovados,
    reprovados,
    percentualAprovacao: Math.round((aprovados / n) * 1000) / 10,
    distribuicaoRisco,
    melhoraram,
    pioraram,
    estaveis,
    evolucaoBimestral: evolucaoBimestral(alunos),
  }
}

/**
 * Métricas específicas de uma turma.
 */
export function calcularMetricasTurma(alunos: Aluno[], turma: TurmaCodigo): MetricasTurma {
  const filtrados = alunos.filter(a => a.turma === turma)
  return {
    turma,
    ...calcularMetricasGlobais(filtrados),
  }
}

// ─── Rankings ─────────────────────────────────────────────────────────────────

/**
 * Top N alunos por maior média.
 */
export function rankingTop(alunos: Aluno[], n: number): AlunoProcessado[] {
  return alunos
    .map(processarAluno)
    .sort((a, b) => b.media - a.media)
    .slice(0, n)
}

/**
 * Piores N alunos por menor média.
 */
export function rankingPiores(alunos: Aluno[], n: number): AlunoProcessado[] {
  return alunos
    .map(processarAluno)
    .sort((a, b) => a.media - b.media)
    .slice(0, n)
}

// ─── Quase aprovados ──────────────────────────────────────────────────────────

/**
 * Alunos com média entre 5.0 e 5.9 — candidatos a intervenção prioritária.
 */
export function quaseAprovados(alunos: Aluno[]): AlunoProcessado[] {
  return alunos
    .map(processarAluno)
    .filter(a => a.media >= 5 && a.media < 6)
    .sort((a, b) => b.media - a.media)
}

// ─── Distribuição por faixa ────────────────────────────────────────────────────

/**
 * Contagem de alunos por faixa de média.
 * Faixas: 0–3.9 | 4.0–4.9 | 5.0–5.9 | 6.0–6.9 | 7.0–7.9 | 8.0–10
 */
export function distribuicaoFaixas(alunos: Aluno[]): FaixaDistribuicao[] {
  const processados = alunos.map(processarAluno)
  const n = processados.length

  const faixas = [
    { faixa: '0–3.9', min: 0, max: 4 },
    { faixa: '4.0–4.9', min: 4, max: 5 },
    { faixa: '5.0–5.9', min: 5, max: 6 },
    { faixa: '6.0–6.9', min: 6, max: 7 },
    { faixa: '7.0–7.9', min: 7, max: 8 },
    { faixa: '8.0–10', min: 8, max: 10.01 },
  ]

  return faixas.map(({ faixa, min, max }) => {
    const quantidade = processados.filter(a => a.media >= min && a.media < max).length
    return {
      faixa,
      quantidade,
      percentual: n > 0 ? Math.round((quantidade / n) * 1000) / 10 : 0,
    }
  })
}
