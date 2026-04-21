"use client";

import { useEffect } from "react";
import { History, UserPlus } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { useEmprendedores } from "@/modules/asistente/difusion/hooks/useEmprendedores";
import { ModuleHeader } from "@/core/components/ui/module-header";

import { HistorialFilters } from "@/modules/asistente/difusion/components/historial/HistorialFilters";
import { EmprendedorTable } from "@/modules/asistente/difusion/components/historial/EmprendedorTable";

/**
 * PÁGINA: Historial de Prospectos y Emprendedores
 */
export default function HistorialEmprendedoresPage() {
  const { 
    emprendedores, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    fetchEmprendedores, 
    deleteEmprendedor,
    getEmprendedorPhoto
  } = useEmprendedores();

  useEffect(() => {
    fetchEmprendedores();
  }, [fetchEmprendedores]);

  return (
    <VisionSpringContainer className="space-y-12 py-8 animate-in fade-in duration-1000">
      {/* 1. ENCABEZADO ESTRATÉGICO */}
      <ModuleHeader 
        title="Historial de"
        titleHighlight="Emprendedores"
        description="Listado de emprendedores registrados en el sistema."
        icon={History}
        action={{
          href: "/asistente/difusion/emprendedores/nuevo",
          text: "Nuevo Registro",
          icon: UserPlus
        }}
      />

      {/* 2. ÁREA DE FILTRADO Y MÉTRICAS RÁPIDAS */}
      <HistorialFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        count={emprendedores.length}
        loading={loading}
      />

      {/* 3. TABLA DE DATOS (Con Skeletons y Estados Vacíos internos) */}
      <EmprendedorTable 
        emprendedores={emprendedores} 
        loading={loading}
        onDelete={deleteEmprendedor}
        onGetPhoto={getEmprendedorPhoto}
      />

    </VisionSpringContainer>
  );
}
