import { useState, useRef } from 'react'
import { Database, UploadCloud, FileJson, X, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useAlunosContext } from '../../contexts/AlunosContext'
import { type Aluno } from '../../lib/calculos'

export function UploadJSON() {
  const { arquivosAdicionais, adicionarArquivo, removerArquivo } = useAlunosContext()
  const [erro, setErro] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErro(null)
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
      setErro('Apenas arquivos .json são suportados.')
      return
    }

    if (arquivosAdicionais.some(a => a.name === file.name)) {
      setErro('Este arquivo já foi adicionado.')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (!Array.isArray(json)) {
          throw new Error('O JSON deve ser um array de alunos.')
        }
        
        // Verifica minimamente a estrutura base
        const isValid = json.every(
          (item) => 'id' in item && 'nome' in item && 'nota_1' in item
        )

        if (!isValid) {
          throw new Error('Estrutura inválida. Faltam chaves como id, nome ou notas.')
        }

        adicionarArquivo(file.name, json as Aluno[])
      } catch (err: any) {
        setErro(err.message || 'Erro ao ler o arquivo JSON.')
      }
    }
    
    reader.onerror = () => setErro('Erro durante a leitura do arquivo.')
    reader.readAsText(file)
    
    // Reset o input para permitir selecionar o mesmo arquivo novamente se excluído
    if (inputRef.current) inputRef.current.value = ''
  }

  const limiteAtingido = arquivosAdicionais.length >= 3

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          title="Bases de Dados Suplementares"
        >
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border/50 bg-background group-hover:bg-accent group-hover:text-accent-foreground">
            <Database className="size-3.5" />
          </div>
          <span className="truncate flex-1 text-left font-medium">Bases de Dados</span>
          {arquivosAdicionais.length > 0 && (
            <span className="flex h-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-bold text-primary">
              +{arquivosAdicionais.length}
            </span>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="size-4" />
            Fontes de Dados
          </DialogTitle>
          <DialogDescription>
            Importe até 3 arquivos JSON adicionais para consolidar com a base matriz (alunos.json).
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              Base Matriz (Imutável)
            </p>
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-3">
              <div className="flex items-center gap-3">
                <FileJson className="size-8 text-muted-foreground/50" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">alunos.json</span>
                  <span className="text-xs text-muted-foreground">Fonte principal do sistema</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                Bases Adicionais
              </p>
              <span className="text-xs text-muted-foreground font-medium">
                {arquivosAdicionais.length} de 3
              </span>
            </div>

            {arquivosAdicionais.map((arquivo) => (
              <div
                key={arquivo.id}
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileJson className="size-8 text-primary/70" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium truncate">{arquivo.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {arquivo.data.length} registros (alunos)
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removerArquivo(arquivo.id)}
                  className="text-muted-foreground hover:text-destructive shrink-0 h-8 w-8"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}

            {arquivosAdicionais.length === 0 && (
              <div className="rounded-lg border border-dashed border-border p-6 flex flex-col items-center justify-center text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhum arquivo suplementar importado.
                </p>
              </div>
            )}
          </div>

          {erro && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive flex items-center gap-2">
              <X className="shrink-0 size-4" />
              {erro}
            </div>
          )}

          <div className="mt-2">
            <input
              type="file"
              accept=".json"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              onClick={() => inputRef.current?.click()}
              disabled={limiteAtingido}
              className="w-full flex items-center gap-2"
              variant={limiteAtingido ? 'secondary' : 'default'}
            >
              <UploadCloud className="size-4" />
              {limiteAtingido ? 'Limite Máximo Atingido' : 'Importar JSON'}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Estrutura esperada: Array de objetos com chaves {`{ id, nome, turma, nota_1... }`}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
