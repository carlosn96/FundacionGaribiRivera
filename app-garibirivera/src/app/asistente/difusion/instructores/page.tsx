"use client";

import { useState, useEffect } from "react";
import { UserCheck, Plus } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { useTalleres } from "@/modules/asistente/difusion/hooks/useTalleres";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { InstructoresGrid } from "@/modules/asistente/difusion/components/instructores/InstructoresGrid";
import { InstructoresTable } from "@/modules/asistente/difusion/components/instructores/InstructoresTable";
import { Instructor } from "@/modules/asistente/difusion/domain/models/Instructor";
import { ViewSwitcher } from "@/modules/asistente/difusion/components/shared/ViewSwitcher";

/**
 * PÁGINA: Catálogo de Instructores de Difusión
 * -------------------------------------------
 * Arquitectura Limpia: Lógica en hook modular, vista en componentes.
 */
export default function InstructoresPage() {
  const { instructores, loading, fetchInstructores, deleteInstructor } = useTalleres();
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchInstructores();
  }, [fetchInstructores]);

  const handleCreate = () => {
    console.log("Crear instructor");
  };

  const handleEdit = (instructor: Instructor) => {
    console.log("Editar instructor", instructor);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Está seguro de que desea retirar a este instructor? Esta acción no se puede deshacer.")) {
      try {
        await deleteInstructor(id);
      } catch (error) {
        alert("Error al intentar eliminar el instructor.");
      }
    }
  };

  return (
    <VisionSpringContainer className="space-y-12 py-8 animate-in fade-in duration-1000">
      {/* 1. CABECERA SEMÁNTICA */}
      <ModuleHeader 
        title="Catálogo de"
        titleHighlight="Instructores"
        description="Especialistas encargados de impartir conocimiento técnico y metodológico a los emprendedores."
        icon={UserCheck}
        action={{
          href: "/asistente/difusion/talleres",
          text: "Ver Talleres",
          icon: Plus
        }}
      />

      <ViewSwitcher 
        currentView={view} 
        onViewChange={setView} 
        totalCount={instructores.length}
        label="INSTRUCTORES ACTIVOS"
      />

      {view === "grid" ? (
        <InstructoresGrid 
          instructores={instructores} 
          loading={loading} 
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <InstructoresTable
          instructores={instructores}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

    </VisionSpringContainer>
  );
}
