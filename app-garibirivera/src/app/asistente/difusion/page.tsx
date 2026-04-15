"use client";

import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { DifusionStats } from "@/modules/asistente/difusion/components/dashboard/DifusionStats";
import { DifusionQuickActions } from "@/modules/asistente/difusion/components/dashboard/DifusionQuickActions";
import { DifusionCategories } from "@/modules/asistente/difusion/components/dashboard/DifusionCategories";
import { DifusionAgenda } from "@/modules/asistente/difusion/components/dashboard/DifusionAgenda";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { Megaphone, UserPlus } from "lucide-react";

export default function DifusionDashboardPage() {
  return (
    <VisionSpringContainer className="space-y-12 py-8">
      {/* 1. ENCABEZADO DEL MÓDULO (COMPONENTE COMPARTIDO) */}
      <ModuleHeader 
        title="Módulo de"
        titleHighlight="Difusión"
        description="Promoviendo el crecimiento y fortalecimiento de nuevos emprendedores desde el primer contacto."
        icon={Megaphone}
        action={{
          href: "/asistente/difusion/emprendedores/nuevo",
          text: "Nuevo Emprendedor",
          icon: UserPlus
        }}
      />

      {/* 2. ESTADÍSTICAS DEL MÓDULO */}
      <DifusionStats />

      {/* 3. ACCESOS RÁPIDOS */}
      <DifusionQuickActions />

      {/* 4. CATEGORÍAS DE GESTIÓN */}
      <DifusionCategories />

      {/* 5. AGENDA (Específico de Difusión) */}
      <DifusionAgenda />

    </VisionSpringContainer>
  );
}
