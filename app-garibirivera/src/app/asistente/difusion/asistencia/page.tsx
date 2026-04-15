"use client";

import { useEffect, useState } from "react";
import { ClipboardCheck, UserCheck, FileDown } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { AsistenciaFilters } from "@/modules/asistente/difusion/components/asistencia/AsistenciaFilters";
import { AsistenciaTable } from "@/modules/asistente/difusion/components/asistencia/AsistenciaTable";
import { useAsistencia } from "@/modules/asistente/difusion/hooks/useAsistencia";
import { useEtapa } from "@/modules/asistente/difusion/hooks/useEtapa";

export default function AsistenciaPage() {
  const { fetchEtapaActual, currentEtapa } = useEtapa();
  const { 
    fetchEmprendedoresPorEtapaTaller, 
    emprendedores, 
    registrarAsistencia, 
    loading: isLoadingAsistencia 
  } = useAsistencia();
  
  const [selectedTallerId, setSelectedTallerId] = useState<number | null>(null);

  useEffect(() => {
    fetchEtapaActual();
  }, [fetchEtapaActual]);

  const handleSearch = (idTaller: number) => {
    setSelectedTallerId(idTaller);
    if (currentEtapa?.id) {
      fetchEmprendedoresPorEtapaTaller(currentEtapa.id, idTaller);
    }
  };

  const handleToggleAsistencia = async (idAsistente: number, asiste: number, observacion: string) => {
    if (currentEtapa?.id && selectedTallerId) {
      await registrarAsistencia(currentEtapa.id, selectedTallerId, idAsistente, asiste, observacion);
    }
  };

  return (
    <VisionSpringContainer className="space-y-12 py-8 animate-in fade-in duration-1000">
      <ModuleHeader
        title="Control de"
        titleHighlight="Asistencia"
        description="Registro operativo y validación presencial de beneficiarios en sesiones de capacitación."
        icon={ClipboardCheck}
        action={{
          href: "/asistente/difusion/emprendedores/historial",
          text: "Reporte Mensual",
          icon: FileDown
        }}
      />

      <AsistenciaFilters 
        onSearch={handleSearch} 
        idEtapaActual={currentEtapa?.id || 0} 
      />

      <div className="pt-4 animate-in slide-in-from-bottom-5 duration-700">
        {!selectedTallerId ? (
          <ModuleEmptyState
            icon={UserCheck}
            title="Seleccionar parámetros de sesión"
            description="Utilice los filtros superiores para cargar un taller y fecha específicos. El listado de asistencia se activará automáticamente."
            gradient="from-fundacion-verde to-fundacion-verde-light"
            className="border-dashed difusion-accent-border min-h-[400px] border-2"
          />
        ) : (
          <AsistenciaTable 
            emprendedores={emprendedores}
            idEtapa={currentEtapa?.id || 0}
            idTaller={selectedTallerId}
            isLoading={isLoadingAsistencia}
            onToggleAsistencia={handleToggleAsistencia}
          />
        )}
      </div>
    </VisionSpringContainer>
  );
}