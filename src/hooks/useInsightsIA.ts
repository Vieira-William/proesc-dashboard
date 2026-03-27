import { useState, useCallback, useRef } from 'react'
import { gerarInsights } from '@/lib/groqClient'

type StatusIA = 'idle' | 'streaming' | 'done' | 'error'

interface UseInsightsIAReturn {
  texto: string
  status: StatusIA
  erro: string | null
  gerar: (prompt: string) => Promise<void>
  limpar: () => void
}

export function useInsightsIA(): UseInsightsIAReturn {
  const [texto, setTexto] = useState('')
  const [status, setStatus] = useState<StatusIA>('idle')
  const [erro, setErro] = useState<string | null>(null)
  const abortRef = useRef(false)

  const limpar = useCallback(() => {
    abortRef.current = true
    setTexto('')
    setStatus('idle')
    setErro(null)
  }, [])

  const gerar = useCallback(async (prompt: string) => {
    abortRef.current = false
    setTexto('')
    setErro(null)
    setStatus('streaming')

    try {
      let acumulado = ''
      for await (const token of gerarInsights(prompt)) {
        if (abortRef.current) break
        acumulado += token
        setTexto(acumulado)
      }
      if (!abortRef.current) setStatus('done')
    } catch (e) {
      const mensagem = e instanceof Error ? e.message : 'Erro desconhecido ao gerar insights'
      setErro(mensagem)
      setStatus('error')
    }
  }, [])

  return { texto, status, erro, gerar, limpar }
}
