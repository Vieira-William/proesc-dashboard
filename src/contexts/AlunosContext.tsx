import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Aluno } from '../lib/calculos'

export interface ArquivoAdicional {
  id: string
  name: string
  data: Aluno[]
}

interface AlunosContextData {
  arquivosAdicionais: ArquivoAdicional[]
  adicionarArquivo: (name: string, data: Aluno[]) => void
  removerArquivo: (id: string) => void
}

const AlunosContext = createContext<AlunosContextData | undefined>(undefined)

export function AlunosProvider({ children }: { children: ReactNode }) {
  const [arquivosAdicionais, setArquivosAdicionais] = useState<ArquivoAdicional[]>([])

  const adicionarArquivo = (name: string, data: Aluno[]) => {
    setArquivosAdicionais((prev) => {
      // Bloqueio rígido de no máximo 3 arquivos (como solicitado no PDR/Desafio)
      if (prev.length >= 3) return prev
      return [...prev, { id: crypto.randomUUID(), name, data }]
    })
  }

  const removerArquivo = (id: string) => {
    setArquivosAdicionais((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <AlunosContext.Provider value={{ arquivosAdicionais, adicionarArquivo, removerArquivo }}>
      {children}
    </AlunosContext.Provider>
  )
}

export function useAlunosContext() {
  const context = useContext(AlunosContext)
  if (!context) {
    throw new Error('useAlunosContext deve ser usado dentro de um AlunosProvider')
  }
  return context
}
