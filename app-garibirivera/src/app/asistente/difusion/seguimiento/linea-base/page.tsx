"use client";

import { ClipboardList, PlusCircle } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { LineaBaseFilters } from "@/modules/asistente/difusion/components/seguimiento/LineaBaseFilters";
import { LineaBaseTable } from "@/modules/asistente/difusion/components/seguimiento/LineaBaseTable";

const ejemplos = [
  { id: 1, nombre: "Juan Carlos González Pérez", fecha: "12 ABR 2026", folio: "LB-2026-001" },
  { id: 2, nombre: "María Elena Ruiz Torres", fecha: "10 ABR 2026", folio: "LB-2026-002" },
  { id: 3, nombre: "Roberto Sanchez", fecha: "08 ABR 2026", folio: "LB-2026-003" },
];

/**
 * PÁGINA: Seguimiento de Línea Base (Diagnóstico Social)
 * -----------------------------------------------------
 * Arquitectura de Componentes Modulares: Vista Limpia y Profesional.
 */
export default function LineaBasePage() {
  const loading = false;

  return (
    <VisionSpringContainer className="space-y-12 py-8 animate-in fade-in duration-1000">
      {/* 1. ENCABEZADO DE MÓDULO */}
      <ModuleHeader 
        title="Estadísticas de"
        titleHighlight="Línea Base"
        description="Gestión de diagnósticos iniciales y evaluación de impacto social de los emprendedores."
        icon={ClipboardList}
        action={{
          href: "/asistente/difusion/emprendedores/historial",
          text: "Nuevo Diagnóstico",
          icon: PlusCircle
        }}
      />

      {/* 2. AREA DE FILTRADO Y MÉTRICAS */}
      <LineaBaseFilters count={ejemplos.length} />

      {/* 3. TABLA MODULAR DE RESULTADOS */}
      <div className="pt-4">
        {ejemplos.length === 0 ? (
          <ModuleEmptyState
            icon={ClipboardList}
            title="Sin diagnósticos aplicados"
            description="Aún no se han registrado entrevistas de línea base en el sistema. Inicie un nuevo diagnóstico para comenzar."
            gradient="from-fundacion-verde to-fundacion-verde-light"
            className="border-dashed difusion-accent-border min-h-[400px] border-2"
          />
        ) : (
          <LineaBaseTable ejemplos={ejemplos} />
        )}
      </div>

    </VisionSpringContainer>
  );
}
