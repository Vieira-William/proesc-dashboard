// AppSidebar.tsx — Navegação principal do Proesc Dashboard
// Segue padrão shadcn/ui Sidebar (New York)
// Desktop: sidebar fixa | Mobile: Sheet via SidebarProvider

import { BarChart3, LayoutDashboard, ShieldAlert, Sparkles } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'

import { UploadJSON } from './UploadJSON'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type PaginaAtiva =
  | 'visao-geral'
  | 'analise-turma'
  | 'alerta-precoce'
  | 'insights-ia'

interface AppSidebarProps {
  paginaAtiva: PaginaAtiva
  onNavegar: (pagina: PaginaAtiva) => void
}

// ─── Itens de navegação ───────────────────────────────────────────────────────

const itensNavegacao: {
  pagina: PaginaAtiva
  label: string
  icone: React.ComponentType<{ className?: string }>
}[] = [
  { pagina: 'visao-geral', label: 'Visão Geral', icone: LayoutDashboard },
  { pagina: 'analise-turma', label: 'Análise por Turma', icone: BarChart3 },
  { pagina: 'alerta-precoce', label: 'Alerta Precoce', icone: ShieldAlert },
  { pagina: 'insights-ia', label: 'Insights IA', icone: Sparkles },
]

// ─── Componente ───────────────────────────────────────────────────────────────

export function AppSidebar({ paginaAtiva, onNavegar }: AppSidebarProps) {
  const { setOpenMobile, isMobile } = useSidebar()

  const handleNavegar = (pagina: PaginaAtiva) => {
    onNavegar(pagina)
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar collapsible="icon">
      {/* Logo */}
      <SidebarHeader className="p-4 pb-2">
        {/* Logo expandida — sempre negativa (sidebar é escura em ambos os modos) */}
        <div className="group-data-[collapsible=icon]:hidden">
          <img
            src="/logos/Proesc_Marca-Preferencial-RGB-Horizontal-Negativa1.png"
            alt="Proesc"
            className="h-7 w-auto object-contain"
          />
        </div>
        {/* Símbolo colapsado */}
        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
          <img
            src="/logos/Proesc_Simbolo-RGB-VerdeAmapa.png"
            alt="Proesc"
            className="h-6 w-6 object-contain"
          />
        </div>
      </SidebarHeader>

      {/* Navegação */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itensNavegacao.map(({ pagina, label, icone: Icone }) => (
                <SidebarMenuItem key={pagina}>
                  <SidebarMenuButton
                    isActive={paginaAtiva === pagina}
                    onClick={() => handleNavegar(pagina)}
                    tooltip={label}
                  >
                    <Icone className="size-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Rodapé — Upload JSON (exclusivo desktop por expandir o Menu, colapsado apenas ícone de config visível na tooltip) */}
      <SidebarFooter className="p-2">
        <UploadJSON />
      </SidebarFooter>

      {/* Rail para redimensionamento */}
      <SidebarRail />
    </Sidebar>
  )
}

