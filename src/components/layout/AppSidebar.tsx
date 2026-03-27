// AppSidebar.tsx — Navegação principal do Proesc Dashboard
// Segue padrão shadcn/ui Sidebar (New York)
// Desktop: sidebar fixa | Mobile: Sheet via SidebarProvider

import { BarChart3, GraduationCap, LayoutDashboard, ShieldAlert, Sparkles } from 'lucide-react'
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
} from '@/components/ui/sidebar'

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
  return (
    <Sidebar collapsible="icon">
      {/* Logo */}
      <SidebarHeader className="p-4 pb-2">
        {/* Logo expandida (dark mode — negativa) */}
        <div className="group-data-[collapsible=icon]:hidden">
          <img
            src="/logos/Proesc_Marca-Preferencial-RGB-Horizontal-Negativa1.png"
            alt="Proesc"
            className="h-7 w-auto object-contain dark:block hidden"
          />
          <img
            src="/logos/Proesc_Marca-Preferencial-RGB-Horizontal-Positiva1.png"
            alt="Proesc"
            className="h-7 w-auto object-contain dark:hidden block"
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
                    onClick={() => onNavegar(pagina)}
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

      {/* Rodapé — turma / contexto */}
      <SidebarFooter className="p-4 pt-2">
        <div className="group-data-[collapsible=icon]:hidden flex items-center gap-2 text-xs text-sidebar-foreground/50">
          <GraduationCap className="size-3.5 shrink-0" />
          <span className="truncate">3º Ano — 2025</span>
        </div>
      </SidebarFooter>

      {/* Rail para redimensionamento */}
      <SidebarRail />
    </Sidebar>
  )
}
