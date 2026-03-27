import { useState } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { PageHeader } from './components/layout/PageHeader'
import { type PaginaAtiva } from './components/layout/AppSidebar'
import { VisaoGeral } from './pages/VisaoGeral'

// ─── Metadados de cada página ─────────────────────────────────────────────────

const titulos: Record<PaginaAtiva, { titulo: string; subtitulo: string }> = {
  'visao-geral': {
    titulo: 'Visão Geral',
    subtitulo: '100 alunos · 3 turmas · 4 bimestres',
  },
  'analise-turma': {
    titulo: 'Análise por Turma',
    subtitulo: 'Comparativo de desempenho entre 3A, 3B e 3C',
  },
  'alerta-precoce': {
    titulo: 'Alerta Precoce',
    subtitulo: 'Alunos em risco identificados por IA preditiva',
  },
  'insights-ia': {
    titulo: 'Insights IA',
    subtitulo: 'Análise gerada automaticamente · Groq Llama 3.3 70B',
  },
}

// ─── App ──────────────────────────────────────────────────────────────────────

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState<PaginaAtiva>('visao-geral')

  const { titulo, subtitulo } = titulos[paginaAtiva]

  return (
    <AppLayout paginaAtiva={paginaAtiva} onNavegar={setPaginaAtiva}>
      <PageHeader titulo={titulo} subtitulo={subtitulo} />
      <main className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
        {paginaAtiva === 'visao-geral' && <VisaoGeral />}
        {paginaAtiva !== 'visao-geral' && (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{titulo}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Em implementação
              </p>
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  )
}

export default App
