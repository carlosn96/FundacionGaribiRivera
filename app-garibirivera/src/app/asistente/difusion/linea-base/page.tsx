"use client";

import React, { useState, useCallback } from "react";
import { ClipboardList, PlusCircle, UserCheck, UserMinus, ShieldCheck, ArrowRight, HeartPulse } from "lucide-react";
import { VisionSpringContainer, VisionGlassWindow } from "@/core/components/ui/vision-glass";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs";
import { useLineaBaseAdmin } from "@/modules/asistente/difusion/hooks/useLineaBaseAdmin";
import { AdminLineaBaseFilters } from "@/modules/asistente/difusion/components/AdminLineaBaseFilters";
import { AdminLineaBaseTable } from "@/modules/asistente/difusion/components/AdminLineaBaseTable";
import { LoadingState } from "@/core/components/ui/loading-state";
import { useConfirm } from "@/core/context/ConfirmContext";
import { cn } from "@/core/utils/utils";
import { Emprendedor } from "@/modules/asistente/difusion/domain/models/Emprendedor";

/**
 * PÁGINA: Administración de Línea Base
 * -----------------------------------------------
 * Gestión de diagnósticos iniciales. Separa emprendedores con y sin línea base,
 * utilizando la etapa resuelta por el servidor para optimizar la carga.
 */
export default function LineaBaseAdminPage() {
  const [activeTab, setActiveTab] = useState("with-baseline");
  
  const { 
    loading, 
    emprendedores, 
    emprendedoresSinLineaBase, 
    etapasCatalog,
    searchTerm, 
    setSearchTerm, 
    selectedEtapaId,
    setSelectedEtapaId,
    refresh,
    deleteLineaBase
  } = useLineaBaseAdmin();

  const { confirmDelete } = useConfirm();

  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  const handleDelete = useCallback(async (item: Emprendedor) => {
    const isConfirmed = await confirmDelete(`Línea Base de ${item.nombre}`);
    if (isConfirmed) {
      deleteLineaBase(item.lineaBase?.idLineaBase);
    }
  }, [confirmDelete, deleteLineaBase]);

  return (
    <VisionSpringContainer className="space-y-10 py-8">
      {/* ─── Cabecera de Módulo Premium ─── */}
      <ModuleHeader 
        title="Gestión de"
        titleHighlight="Línea Base"
        description="Diagnóstico social y técnico. Monitoreo de entrada para el seguimiento de impacto del programa."
        icon={ClipboardList}
        action={{
          href: "/asistente/difusion/emprendedores/nuevo",
          text: "Nuevo Registro",
          icon: PlusCircle
        }}
      />

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full space-y-8"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <TabsList className="bg-zinc-100/50 dark:bg-zinc-900/50 border border-subtle h-[52px] p-1.5 rounded-2xl backdrop-blur-xl">
            <TabsTrigger 
              value="with-baseline" 
              className={cn(
                "h-10 px-6 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest gap-2",
                "data-[state=active]:bg-fundacion-verde data-[state=active]:text-white data-[state=active]:shadow-lg"
              )}
            >
              <UserCheck className="w-4 h-4" />
              Con Línea Base 
              <span className="ml-1 opacity-60 font-black">[{emprendedores.length}]</span>
            </TabsTrigger>
            <TabsTrigger 
              value="without-baseline" 
              className={cn(
                "h-10 px-6 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest gap-2",
                "data-[state=active]:bg-fundacion-amarillo data-[state=active]:text-fundacion-verde data-[state=active]:shadow-lg"
              )}
            >
              <UserMinus className="w-4 h-4" />
              Sin Línea Base
              <span className="ml-1 opacity-60 font-black">[{emprendedoresSinLineaBase.length}]</span>
            </TabsTrigger>
          </TabsList>

          {/* Indicador de Estado Global */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-fundacion-verde/5 border border-fundacion-verde/10 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-fundacion-verde animate-pulse" />
            <span className="text-[10px] font-black vision-text-primary uppercase tracking-[0.15em]">
              Sincronización Activa
            </span>
          </div>
        </div>

        {/* ─── Sección: Emprendedores con Línea Base (Filtrado por Etapa) ─── */}
        <TabsContent value="with-baseline" className="space-y-6 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-fundacion-verde" />
              <h2 className="text-sm font-black uppercase tracking-widest vision-text-primary">Repositorio Histórico de Diagnósticos</h2>
            </div>
            
            <AdminLineaBaseFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRefresh={handleRefresh}
              loading={loading}
              etapas={etapasCatalog}
              selectedEtapaId={selectedEtapaId}
              onEtapaChange={setSelectedEtapaId}
            />
          </div>

          <VisionGlassWindow className="overflow-hidden border-subtle shadow-2xl">
            <AdminLineaBaseTable 
              data={emprendedores} 
              isLoading={loading} 
              type="with-baseline"
              onView={(item) => window.open(`/asistente/difusion/linea-base/ver?id=${item.id}`, "_blank")}
              onEdit={(item) => window.open(`/asistente/difusion/linea-base/editar?id=${item.id}`, "_blank")}
              onDelete={handleDelete}
            />
          </VisionGlassWindow>
          
          <div className="flex items-center gap-2 vision-text-tertiary text-[10px] uppercase font-bold tracking-widest opacity-60">
            <ArrowRight className="w-3 h-3" />
            <span>Los emprendedores en este grupo ya forman parte de una etapa activa o pasada.</span>
          </div>
        </TabsContent>

        {/* ─── Sección: Emprendedores PENDIENTES (Sin filtro de Etapa) ─── */}
        <TabsContent value="without-baseline" className="space-y-6 outline-none animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <HeartPulse className="w-4 h-4 text-fundacion-amarillo" />
              <h2 className="text-sm font-black uppercase tracking-widest vision-text-primary">Acceso rápido a nuevos registros</h2>
            </div>

            <AdminLineaBaseFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onRefresh={handleRefresh}
              loading={loading}
            />
          </div>

          <VisionGlassWindow className="overflow-hidden border-subtle shadow-2xl">
            <AdminLineaBaseTable 
              data={emprendedoresSinLineaBase} 
              isLoading={loading} 
              type="without-baseline"
              onEdit={(item) => window.open(`/asistente/difusion/linea-base/crear?id=${item.id}`, "_blank")}
            />
          </VisionGlassWindow>

          <div className="flex items-center gap-2 vision-text-tertiary text-[10px] uppercase font-bold tracking-widest opacity-60">
            <ArrowRight className="w-3 h-3" />
            <span>Emprendedores sin diagnóstico asignado. Necesitan completar línea base para pertenecer a una etapa.</span>
          </div>
        </TabsContent>
      </Tabs>

      {/* Loading overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/20 dark:bg-black/20 backdrop-blur-sm pointer-events-none">
          <div className="p-8 rounded-[40px] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col items-center gap-4">
            <LoadingState />
            <p className="vision-caption-upper text-fundacion-verde animate-pulse">Sincronizando Plataforma...</p>
          </div>
        </div>
      )}
    </VisionSpringContainer>
  );
}
