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
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border/50 bg-background/95 backdrop-blur-sm px-4 lg:px-6">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="!h-5 !self-center" />

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h1 className="text-sm font-semibold leading-none tracking-tight truncate">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate hidden sm:block">{subtitulo}</p>
        )}
      </div>

      {/* Ações opcionais (botões, selects, etc.) */}
      {acoes && <div className="flex items-center gap-2 shrink-0">{acoes}</div>}
    </header>
  )
}
