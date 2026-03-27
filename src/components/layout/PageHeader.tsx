// PageHeader.tsx — Cabeçalho padrão de página
// Título + subtítulo + slot de ações opcionais
// Segue escala tipográfica da DESIGN_BIBLE

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'

interface PageHeaderProps {
  titulo: string
  subtitulo?: string
  acoes?: React.ReactNode
}

export function PageHeader({ titulo, subtitulo, acoes }: PageHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 lg:px-6">
      {/* Trigger do sidebar (visível em todos os tamanhos) */}
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4" />

      {/* Título e subtítulo */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h1 className="text-base font-semibold leading-none tracking-tight truncate">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitulo}</p>
        )}
      </div>

      {/* Ações opcionais (botões, selects, etc.) */}
      {acoes && <div className="flex items-center gap-2 shrink-0">{acoes}</div>}
    </header>
  )
}
