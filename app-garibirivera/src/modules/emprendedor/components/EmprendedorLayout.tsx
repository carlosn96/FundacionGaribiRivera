/**
 * Reusable layout for Emprendedor pages: Navbar + Sidebar + Content
 */
'use client';

import React, { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import DashboardNavbar from '@/core/components/layout/DashboardNavbar';
import Sidebar, { MenuItem } from '@/core/components/layout/Sidebar';
import { LayoutDashboard, ClipboardList, UserCircle, LineChart } from 'lucide-react';
import { useUser } from '@/modules/auth/context/UserContext';
import { VisionGlassWindow, VisionText } from '@/core/components/ui/vision-glass';
import { EMPRENDEDOR_NAVIGATION_CONFIG } from '@/modules/emprendedor/config/navigation';

export default function EmprendedorLayout({
  children,
  title = 'Emprendedor',
  subtitle = 'Panel de Control',
  activeHref,
  menuItems: externalMenuItems,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  activeHref?: string;
  menuItems?: MenuItem[];
}) {
  const { isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();



  const menuItems: MenuItem[] = useMemo(() => {
    const source = externalMenuItems && externalMenuItems.length > 0 ? externalMenuItems : EMPRENDEDOR_NAVIGATION_CONFIG;
    return source.map((item) => ({
      ...item,
      active: activeHref ? item.href === activeHref : pathname === item.href,
    }));
  }, [externalMenuItems, activeHref, pathname]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="h-screen overflow-hidden bg-slate-50 flex flex-col">
        <DashboardNavbar 
          welcomeMessage={`Sección de ${title}`}
          onMenuClick={() => {}}
          onNotificationClick={() => {}}
          customUserRole={title}
          isSidebarCollapsed={false}
          onToggleSidebarCollapse={() => {}}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar 
            isOpen={false}
            onClose={() => {}}
            menuItems={menuItems}
            title={title}
            subtitle={subtitle}
            isCollapsed={false}
            onToggleCollapse={() => {}}
          />
          <main className="flex-1 lg:ml-64 xl:ml-72 overflow-y-auto transition-all duration-300">
            <div className="p-4 lg:p-6 xl:p-8 h-full flex items-center justify-center">
              <VisionGlassWindow className="p-8 flex flex-col items-center gap-4">
                <div className="animate-spin h-10 w-10 border-4 border-fundacion-amarillo border-t-transparent rounded-full"></div>
                <VisionText variant="secondary" className="font-medium">Verificando sesión...</VisionText>
              </VisionGlassWindow>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50 flex flex-col">
      <DashboardNavbar 
        welcomeMessage={`Sección de ${title}`}
        onMenuClick={() => setSidebarOpen(true)}
        onNotificationClick={() => { /* placeholder */ }}
        customUserRole={title}
        isSidebarCollapsed={sidebarCollapsed}
        onToggleSidebarCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          menuItems={menuItems}
          title={title}
          subtitle={subtitle}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className={`flex-1 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64 xl:ml-72'} overflow-y-auto transition-all duration-300`}>
          <div className="p-4 lg:p-6 xl:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

