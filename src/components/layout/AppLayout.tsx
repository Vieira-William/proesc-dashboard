// AppLayout.tsx — Wrapper de layout completo do Proesc Dashboard
// TooltipProvider > SidebarProvider > AppSidebar + área de conteúdo principal
// TooltipProvider é obrigatório: SidebarMenuButton usa Tooltip internamente (Radix UI)
// Responsivo: sidebar colapsável em mobile via Sheet (gerenciado pelo shadcn SidebarProvider)

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppSidebar, type PaginaAtiva } from './AppSidebar'

interface AppLayoutProps {
  paginaAtiva: PaginaAtiva
  onNavegar: (pagina: PaginaAtiva) => void
  children: React.ReactNode
}

export function AppLayout({ paginaAtiva, onNavegar, children }: AppLayoutProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <SidebarProvider>
        <AppSidebar paginaAtiva={paginaAtiva} onNavegar={onNavegar} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
