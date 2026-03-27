import { useCallback } from 'react'
import { Sparkles, RefreshCw, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { useAlunos } from '@/hooks/useAlunos'
import { useInsightsIA } from '@/hooks/useInsightsIA'
import { montarPrompt } from '@/lib/promptInsights'

export function InsightsIA() {
  const dados = useAlunos('todas')
  const { texto, status, erro, gerar, limpar } = useInsightsIA()

  const handleGerar = useCallback(() => {
    const prompt = montarPrompt(dados)
    gerar(prompt)
  }, [dados, gerar])

  return (
    <div className="flex flex-col gap-6">
      {/* Header com botão */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Llama 3.3 70B
          </Badge>
          <Badge variant="outline" className="text-xs text-muted-foreground">
            via Groq
          </Badge>
        </div>
        <div className="flex gap-2">
          {status === 'done' && (
            <Button variant="outline" size="sm" onClick={limpar}>
              Limpar
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleGerar}
            disabled={status === 'streaming'}
          >
            {status === 'streaming' ? (
              <>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Gerando...
              </>
            ) : (
              <>
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                {status === 'done' ? 'Gerar Novamente' : 'Gerar Análise'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Erro */}
      {status === 'error' && erro && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{erro}</AlertDescription>
        </Alert>
      )}

      {/* Estado idle */}
      {status === 'idle' && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Sparkles className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-foreground">
              Análise de IA sob demanda
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-md">
              Clique em "Gerar Análise" para obter um diagnóstico completo com
              padrões identificados e recomendações acionáveis baseadas nos dados
              de 100 alunos.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Streaming / Done */}
      {(status === 'streaming' || status === 'done') && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              Análise Gerada
              {status === 'streaming' && (
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm prose-invert max-w-none [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-6 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1 [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_li]:text-sm [&_li]:text-muted-foreground [&_strong]:text-foreground [&_ul]:my-2 [&_ol]:my-2">
              {texto.split('\n').map((linha, i) => {
                if (linha.startsWith('## ')) {
                  return <h2 key={i}>{linha.replace('## ', '')}</h2>
                }
                if (linha.startsWith('### ')) {
                  return <h3 key={i}>{linha.replace('### ', '')}</h3>
                }
                if (linha.startsWith('- ')) {
                  return (
                    <div key={i} className="flex gap-2 ml-2">
                      <span className="text-muted-foreground shrink-0">•</span>
                      <span
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: linha
                            .replace('- ', '')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                        }}
                      />
                    </div>
                  )
                }
                if (linha.trim() === '') return <div key={i} className="h-2" />
                return (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{
                      __html: linha.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                    }}
                  />
                )
              })}
              {status === 'streaming' && (
                <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5" />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skeleton loading (apenas no início antes do primeiro token) */}
      {status === 'streaming' && texto === '' && (
        <Card>
          <CardContent className="space-y-3 py-6">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
