'use client';

import { ReactNode, useMemo } from 'react';
import AuthGuard from '@/modules/auth/components/AuthGuard';
import { PERMISSIONS, normalizePermissions, ROLES } from '@/modules/auth/domain/policies/Roles';
import Sidebar, { MenuItem } from '@/core/components/layout/Sidebar';
import DashboardNavbar from '@/core/components/layout/DashboardNavbar';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useUser } from '@/modules/auth/context/UserContext';
import { buildAssistantNavigation } from '@/modules/asistente/dashboard/config/navigation';
import { LayoutDashboard } from 'lucide-react';

// Lista de roles administrativos que comparten este dashboard
const ADMIN_ROLES = [
  PERMISSIONS.ADMINISTRACION_GENERAL,
  PERMISSIONS.TRABAJO_SOCIAL,
  PERMISSIONS.DIFUSION,
  PERMISSIONS.EMPRENDIMIENTO,
  PERMISSIONS.CREDITO_COBRANZA
];

// Mapeo de rutas a permisos específicos para seguridad granular centralizada
const ROUTE_PERMISSIONS: Record<string, number> = {
  '/asistente/administracion-general': PERMISSIONS.ADMINISTRACION_GENERAL,
  '/asistente/trabajo-social': PERMISSIONS.TRABAJO_SOCIAL,
  '/asistente/difusion': PERMISSIONS.DIFUSION,
  '/asistente/emprendimiento': PERMISSIONS.EMPRENDIMIENTO,
  '/asistente/credito-cobranza': PERMISSIONS.CREDITO_COBRANZA,
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  // Determinar si la ruta actual requiere un permiso específico (seguridad granular)
  const requiredPermission = useMemo(() => {
    const matchedRoute = Object.keys(ROUTE_PERMISSIONS).find(route => pathname.startsWith(route));
    return matchedRoute ? ROUTE_PERMISSIONS[matchedRoute] : null;
  }, [pathname]);

  // Procesar permisos del usuario
  const userPerms: number[] = useMemo(() => {
    return normalizePermissions(user?.permisos);
  }, [user?.permisos]);

  // Generar menuItems dinámicamente usando el helper del módulo
  const menuItems: MenuItem[] = useMemo(() => {
    const dynamicItems = buildAssistantNavigation(userPerms);
    
    // El item de Inicio siempre va primero
    const baseItems: MenuItem[] = [
      { 
        icon: LayoutDashboard, 
        label: 'Inicio', 
        href: '/asistente/dashboard', 
        active: pathname === '/asistente/dashboard' 
      }
    ];

    // Función recursiva para marcar activos
    const markActive = (items: MenuItem[]): MenuItem[] => {
      return items.map(item => {
        const children = item.children ? markActive(item.children) : undefined;
        const isActive = item.href === pathname || children?.some(c => c.active);
        return {
          ...item,
          active: isActive,
          children
        };
      });
    };

    return markActive([...baseItems, ...dynamicItems]);
  }, [userPerms, pathname]);

  return (
    <AuthGuard allowedRoles={[ROLES.ASISTENTE]}>
      <div className="h-screen overflow-hidden spatial-bg flex flex-col">
        {/* Navbar común para personal administrativo */}
        <DashboardNavbar 
          onMenuClick={() => setSidebarOpen(true)} 
          welcomeMessage="Panel Institucional de Gestión"
          isSidebarCollapsed={sidebarCollapsed}
          onToggleSidebarCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Lateral */}
          <Sidebar 
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            menuItems={menuItems}
            title="Administración"
            subtitle="Fundación Garibi Rivera"
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          <main className={`flex-1 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64 xl:ml-72'} overflow-y-auto transition-all duration-300`}>
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
              {/* Guardia Granular Dinámico: Solo protege el contenido de la página si la ruta lo requiere */}
              {requiredPermission ? (
                <AuthGuard allowedPermissions={[requiredPermission]}>
                  {children}
                </AuthGuard>
              ) : (
                children
              )}
              
              {/* Footer simple o decorativo dentro del scroll */}
              <footer className="py-12 text-center opacity-30 text-xs">
                Administración Fundación Garibi Rivera © {new Date().getFullYear()}
              </footer>
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
