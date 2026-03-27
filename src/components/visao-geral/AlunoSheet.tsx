import { useState, useCallback } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ReferenceLine, XAxis, YAxis } from 'recharts'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import type { AlunoProcessado, StatusAluno, NivelRisco, Tendencia } from '@/lib/calculos'
import { chatComIA } from '@/lib/groqClient'

// ─── Helpers ────────────────────────────────────────────────────────────────

const coresStatus: Record<StatusAluno, string> = {
  Aprovado: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Reprovado: 'bg-red-500/10 text-red-500 border-red-500/20',
}

const coresRisco: Record<NivelRisco, string> = {
  'Crítico': 'bg-red-500/10 text-red-500 border-red-500/20',
  'Alto': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'Médio': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  'Baixo': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
}

const coresTendencia: Record<Tendencia, string> = {
  '↑': 'text-emerald-500',
  '↓': 'text-red-500',
  '→': 'text-muted-foreground',
}

const labelTendencia: Record<Tendencia, string> = {
  '↑': 'Melhorou',
  '↓': 'Piorou',
  '→': 'Estável',
}

const chartConfig: ChartConfig = {
  nota: { label: 'Nota', color: 'var(--chart-1)' },
}

// ─── Componente ─────────────────────────────────────────────────────────────

interface AlunoSheetProps {
  aluno: AlunoProcessado | null
  aberto: boolean
  onFechar: () => void
}

export function AlunoSheet({ aluno, aberto, onFechar }: AlunoSheetProps) {
  const [analiseIA, setAnaliseIA] = useState('')
  const [gerando, setGerando] = useState(false)

  const gerarAnalise = useCallback(async () => {
    if (!aluno || gerando) return
    setGerando(true)
    setAnaliseIA('')

    const prompt = `Analise o desempenho do aluno ${aluno.nome} da turma ${aluno.turma}.
Notas: B1=${aluno.nota_1}, B2=${aluno.nota_2}, B3=${aluno.nota_3}, B4=${aluno.nota_4}.
Média final: ${aluno.media}. Status: ${aluno.status}. Tendência: ${aluno.tendencia}. Variância: ${aluno.variancia.toFixed(2)}.

Forneça: diagnóstico do padrão de notas, pontos fortes, pontos de atenção e recomendação de ação. Máximo 150 palavras, em PT-BR.`

    try {
      let texto = ''
      for await (const token of chatComIA(
        [{ role: 'user', content: prompt }],
        '',
      )) {
        texto += token
        setAnaliseIA(texto)
      }
    } catch {
      setAnaliseIA('Erro ao gerar análise. Tente novamente.')
    } finally {
      setGerando(false)
    }
  }, [aluno, gerando])

  if (!aluno) return null

  const notas = [
    { bimestre: 'B1', nota: aluno.nota_1 },
    { bimestre: 'B2', nota: aluno.nota_2 },
    { bimestre: 'B3', nota: aluno.nota_3 },
    { bimestre: 'B4', nota: aluno.nota_4 },
  ]

  const notaMax = Math.max(aluno.nota_1, aluno.nota_2, aluno.nota_3, aluno.nota_4)

  return (
    <Sheet open={aberto} onOpenChange={(v) => { if (!v) { onFechar(); setAnaliseIA(''); } }}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">{aluno.nome}</SheetTitle>
          <SheetDescription className="flex items-center gap-2">
            <Badge variant="outline">{aluno.turma}</Badge>
            <Badge variant="outline" className={coresStatus[aluno.status]}>
              {aluno.status}
            </Badge>
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-5 mt-6">
          {/* Mini gráfico */}
          <ChartContainer config={chartConfig} className="h-[140px] w-full">
            <LineChart data={notas} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="bimestre" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis domain={[0, 10]} tickLine={false} axisLine={false} fontSize={11} width={30} />
              <ReferenceLine y={6} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 3" strokeOpacity={0.4} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="nota" stroke="var(--chart-1)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ChartContainer>

          {/* Métricas */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Média Final</p>
              <p className="text-2xl font-bold tabular-nums">{aluno.media.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tendência</p>
              <p className={`text-lg font-bold ${coresTendencia[aluno.tendencia]}`}>
                {aluno.tendencia} {labelTendencia[aluno.tendencia]}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Variância</p>
              <p className="text-sm font-medium tabular-nums">
                {aluno.variancia.toFixed(2)}
                <span className="text-xs text-muted-foreground ml-1">
                  ({aluno.variancia < 1.5 ? 'estável' : aluno.variancia < 3 ? 'moderada' : 'instável'})
                </span>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Nível de Risco</p>
              <Badge variant="outline" className={coresRisco[aluno.risco]}>{aluno.risco}</Badge>
            </div>
          </div>

          {/* Notas individuais */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Notas por Bimestre</p>
            {notas.map((n) => (
              <div key={n.bimestre} className="flex items-center gap-3">
                <span className="text-xs w-6 text-muted-foreground">{n.bimestre}</span>
                <Progress value={(n.nota / (notaMax || 10)) * 100} className="h-2 flex-1" />
                <span className={`text-xs font-mono tabular-nums w-6 text-right ${n.nota < 6 ? 'text-red-500' : ''}`}>
                  {n.nota}
                </span>
              </div>
            ))}
          </div>

          {/* Botão IA */}
          <Button
            variant="outline"
            className="w-full"
            onClick={gerarAnalise}
            disabled={gerando}
          >
            {gerando ? (
              <>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Gerar Análise IA
              </>
            )}
          </Button>

          {/* Resposta IA */}
          {gerando && analiseIA === '' && (
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          )}
          {analiseIA && (
            <div className="rounded-md border bg-muted/30 p-3">
              {analiseIA.split('\n').map((linha, i) => {
                if (linha.trim() === '') return <div key={i} className="h-1" />
                return (
                  <p
                    key={i}
                    className="text-xs text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: linha.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>'),
                    }}
                  />
                )
              })}
              {gerando && <span className="inline-block w-1.5 h-3 bg-primary animate-pulse ml-0.5" />}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
