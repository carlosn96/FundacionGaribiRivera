"use client";

import { useEffect, useState, useMemo } from "react";
import { Layers, Plus } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { useEtapa } from "@/modules/asistente/difusion/hooks/useEtapa";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { EtapasList } from "@/modules/asistente/difusion/components/etapas/EtapasList";
import { EtapasFilter } from "@/modules/asistente/difusion/components/etapas/EtapasFilter";
import { EtapaFormModal } from "@/modules/asistente/difusion/components/etapas/EtapaFormModal";
import { EtapaFormacion } from "@/modules/asistente/difusion/domain/models/Etapa";

export default function EtapasPage() {
  const { etapas, loading, fetchEtapas, setEtapaActual, removeEtapa, fetchCronograma, addEtapa, updateEtapa, fetchMetadataEtapas, tiposEtapa } = useEtapa();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [etapaToEdit, setEtapaToEdit] = useState<EtapaFormacion | null>(null);

  useEffect(() => {
    fetchEtapas();
    fetchMetadataEtapas();
  }, [fetchEtapas, fetchMetadataEtapas]);

  // Extract unique years for filtering
  const availableYears = useMemo(() => {
    const years = etapas.map(e => new Date(e.fechaInicio).getFullYear().toString());
    return ["all", ...Array.from(new Set(years)).sort((a, b) => b.localeCompare(a))];
  }, [etapas]);

  // Filtered list
  const filteredEtapas = useMemo(() => {
    if (selectedYear === "all") return etapas;
    return etapas.filter(e => new Date(e.fechaInicio).getFullYear().toString() === selectedYear);
  }, [etapas, selectedYear]);

  return (
    <VisionSpringContainer className="space-y-12 py-8 animate-in fade-in duration-1000">
      {/* 1. ENCABEZADO SEMÁNTICO */}
      <ModuleHeader 
        title="Gestión de"
        titleHighlight="Etapas de Formación"
        description="Ciclos formativos y etapas del programa de capacitación integral para emprendedores."
        icon={Layers}
        action={{
          text: "Nueva Etapa",
          icon: Plus,
          onClick: () => {
            setEtapaToEdit(null);
            setIsModalOpen(true);
          }
        }}
      />

      {/* 2. FILTROS MODULARES */}
      <EtapasFilter 
        availableYears={availableYears}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      {/* 3. LISTADO MODULAR */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-sm font-black uppercase tracking-widest text-zinc-500">
            {filteredEtapas.length} Etapas Encontradas
          </h2>
        </div>
        <EtapasList 
          etapas={filteredEtapas} 
          loading={loading} 
          onSetActual={setEtapaActual}
          onDelete={removeEtapa}
          onFetchCronograma={fetchCronograma}
          onEdit={(etapa) => {
            setEtapaToEdit(etapa);
            setIsModalOpen(true);
          }}
        />
      </div>

      <EtapaFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        etapaToEdit={etapaToEdit}
        tiposEtapa={tiposEtapa}
        onSave={async (data) => {
          if (etapaToEdit) {
            await updateEtapa(etapaToEdit.id, data);
          } else {
            await addEtapa(data);
          }
        }}
      />
    </VisionSpringContainer>
  );
}
