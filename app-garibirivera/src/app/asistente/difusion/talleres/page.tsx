"use client";

import { useState, useEffect } from "react";
import { Presentation, Plus } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { useTalleres } from "@/modules/asistente/difusion/hooks/useTalleres";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { TalleresGrid } from "@/modules/asistente/difusion/components/talleres/TalleresGrid";
import { TalleresTable } from "@/modules/asistente/difusion/components/talleres/TalleresTable";
import { TallerFormModal } from "@/modules/asistente/difusion/components/talleres/TallerFormModal";
import { Taller } from "@/modules/asistente/difusion/domain/models/Taller";
import { ViewSwitcher } from "@/modules/asistente/difusion/components/shared/ViewSwitcher";
import { useConfirm } from "@/core/context/ConfirmContext";


export default function TalleresPage() {
  const { talleres, instructores, tiposTaller, loading, fetchTalleres, fetchInstructores, fetchTiposTaller, saveTaller, deleteTaller } = useTalleres();
  const { confirmDelete } = useConfirm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [tallerToEdit, setTallerToEdit] = useState<Taller | undefined>(undefined);

  useEffect(() => {
    fetchTalleres();
    fetchInstructores();
    fetchTiposTaller();
  }, [fetchTalleres, fetchInstructores, fetchTiposTaller]);

  const handleCreate = () => {
    setTallerToEdit(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (taller: Taller) => {
    setTallerToEdit(taller);
    setIsModalOpen(true);
  };

  const handleSave = async (data: Partial<Taller>) => {
    await saveTaller(data);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    const taller = talleres.find(t => t.id === id);
    const isConfirmed = await confirmDelete(taller?.nombre || "este taller");
    if (isConfirmed) {
      await deleteTaller(id);
    }
  };

  return (
    <VisionSpringContainer className="space-y-12 py-8 animate-in fade-in duration-1000">

      <ModuleHeader 
        title="Gestión de"
        titleHighlight="Talleres"
        description="Planificación operativa de cursos y sesiones presenciales del programa de formación institucional."
        icon={Presentation}
        action={{
          text: "Nuevo Taller",
          icon: Plus,
          onClick: handleCreate
        }}
      />

      <ViewSwitcher 
        currentView={view} 
        onViewChange={setView} 
        totalCount={talleres.length}
        label="TALLERES TOTALES"
      />

      {view === "grid" ? (
        <TalleresGrid 
          talleres={talleres} 
          loading={loading} 
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <TalleresTable
          talleres={talleres}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <TallerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        tallerToEdit={tallerToEdit}
        instructores={instructores}
        tiposTaller={tiposTaller}
      />

    </VisionSpringContainer>
  );
}
