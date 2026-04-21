"use client";

import React, { useState, useMemo } from "react";
import { ClipboardList, PlusCircle, UserCheck, UserMinus } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs";
import { useLineaBaseAdmin } from "@/modules/asistente/difusion/hooks/useLineaBaseAdmin";
import { AdminLineaBaseFilters } from "@/modules/asistente/difusion/components/AdminLineaBaseFilters";
import { AdminLineaBaseTable } from "@/modules/asistente/difusion/components/AdminLineaBaseTable";
import { LoadingState } from "@/core/components/ui/loading-state";

/**
 * PÁGINA: Administración de Línea Base
 * -----------------------------------
 * Replica la funcionalidad del legacy public/difusion/modules/lineaBaseAdministracion
 */
export default function LineaBaseAdminPage() {
  const { 
    loading, 
    emprendedores, 
    emprendedoresSinLineaBase, 
    etapas, 
    searchTerm, 
    setSearchTerm, 
    refresh,
    deleteLineaBase,
    updateStage,
    advanceFortalecimiento 
  } = useLineaBaseAdmin();

  const [selectedEtapas, setSelectedEtapas] = useState<number[]>([]);

  const toggleEtapa = (id: number) => {
    setSelectedEtapas(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const filteredWithLB = useMemo(() => {
    if (selectedEtapas.length === 0) return emprendedores;
    return emprendedores.filter(e => e.idEtapa && selectedEtapas.includes(e.idEtapa));
  }, [emprendedores, selectedEtapas]);

  return (
    <VisionSpringContainer className="space-y-10 py-8 animate-in fade-in duration-700">
      {/* 1. ENCABEZADO DE MÓDULO */}
      <ModuleHeader 
        title="Administración de"
        titleHighlight="Línea Base"
        description="Gestión integral de diagnósticos sociales y seguimiento de emprendedores en el programa de formación."
        icon={ClipboardList}
        action={{
          href: "/asistente/difusion/emprendedores/historial",
          text: "Nuevo Diagnóstico",
          icon: PlusCircle
        }}
      />

      {/* 2. FILTROS Y ACTUALIZACIÓN */}
      <AdminLineaBaseFilters 
        count={filteredWithLB.length + emprendedoresSinLineaBase.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onRefresh={refresh}
        etapas={etapas}
        selectedEtapas={selectedEtapas}
        onEtapaToggle={toggleEtapa}
      />

      {/* 3. CONTENIDO PRINCIPAL CON TABS */}
      <Tabs defaultValue="with-baseline" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-vision-surface-raised/50 border border-subtle h-12 p-1">
            <TabsTrigger 
              value="with-baseline" 
              className="h-10 px-6 data-[state=active]:bg-vision-brand data-[state=active]:text-white rounded-lg transition-all"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Con Línea Base ({filteredWithLB.length})
            </TabsTrigger>
            <TabsTrigger 
              value="without-baseline" 
              className="h-10 px-6 data-[state=active]:bg-vision-brand data-[state=active]:text-white rounded-lg transition-all"
            >
              <UserMinus className="w-4 h-4 mr-2" />
              Sin Línea Base ({emprendedoresSinLineaBase.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <LoadingState />
            <p className="vision-caption-upper mt-4 animate-pulse">Sincronizando información...</p>
          </div>
        ) : (
          <>
            <TabsContent value="with-baseline" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <AdminLineaBaseTable 
                data={filteredWithLB} 
                isLoading={loading} 
                type="with-baseline"
                onView={(item) => window.open(`/asistente/difusion/seguimiento/linea-base/ver?id=${item.idUsuario}`, "_blank")}
                onEdit={(item) => window.open(`/asistente/difusion/seguimiento/linea-base/editar?id=${item.idUsuario}`, "_blank")}
                onDelete={(item) => {
                  if (confirm(`¿Está seguro de eliminar la línea base de ${item.nombre}?`)) {
                    deleteLineaBase(item.idUsuario);
                  }
                }}
              />
            </TabsContent>

            <TabsContent value="without-baseline" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <AdminLineaBaseTable 
                data={emprendedoresSinLineaBase} 
                isLoading={loading} 
                type="without-baseline"
                onEdit={(item) => window.open(`/asistente/difusion/seguimiento/linea-base/crear?id=${item.idUsuario}`, "_blank")}
              />
            </TabsContent>
          </>
        )}
      </Tabs>
    </VisionSpringContainer>
  );
}


