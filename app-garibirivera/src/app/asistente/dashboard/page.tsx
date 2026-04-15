"use client";

import { VisionSpringContainer } from '@/core/components/ui/vision-glass';

// Modular Components
import { DashboardHeader } from '@/modules/asistente/dashboard/components/DashboardHeader';
import { DashboardStats } from '@/modules/asistente/dashboard/components/DashboardStats';
import { QuickActionsGrid } from '@/modules/asistente/dashboard/components/QuickActionsGrid';
import { ModulesGrid } from '@/modules/asistente/dashboard/components/ModulesGrid';
import { ModuleDetailModal } from '@/modules/asistente/dashboard/components/ModuleDetailModal';

// Hooks
import { useDashboardModules } from '@/modules/asistente/dashboard/hooks/useDashboardModules';

function AdminDashboardContent() {
  const {
    user,
    visibleModules,
    quickActions,
    mainAction,
    selectedModule,
    setSelectedModule
  } = useDashboardModules();

  if (!user) return null;

  return (
    <VisionSpringContainer className="space-y-8 py-4">
      {/* 1. ENCABEZADO DE BIENVENIDA */}
      <DashboardHeader 
        userName={user.nombre}
        mainAction={mainAction}
      />

      {/* 2. ESTADÍSTICAS (Placeholder Legacy) */}
      <DashboardStats />

      {/* 3. ACCESOS RÁPIDOS */}
      <QuickActionsGrid 
        quickActions={quickActions} 
      />

      {/* 4. MÓDULOS DEL SISTEMA */}
      <ModulesGrid 
        visibleModules={visibleModules as any}
        onModuleSelect={(module) => setSelectedModule(module as any)}
      />

      {/* MODAL DINÁMICO DE OPCIONES POR MÓDULO */}
      <ModuleDetailModal 
        selectedModule={selectedModule as any}
        onClose={() => setSelectedModule(null)}
      />
    </VisionSpringContainer>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminDashboardContent />
  );
}
