"use client";

import { useEffect, useState, useMemo } from "react";
import { ClipboardCheck, UserCheck, FileDown, Search, Calendar } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { AsistenciaFilters } from "@/modules/asistente/difusion/components/asistencia/AsistenciaFilters";
import { AsistenciaTable } from "@/modules/asistente/difusion/components/asistencia/AsistenciaTable";
import { useAsistencia } from "@/modules/asistente/difusion/hooks/useAsistencia";
import { useEtapa } from "@/modules/asistente/difusion/hooks/useEtapa";

export default function AsistenciaPage() {
  const { fetchEtapaActual, fetchEtapas, etapas, currentEtapa } = useEtapa();
  const { 
    fetchTalleresPorEtapa,
    fetchEmprendedoresPorEtapaTaller, 
    fetchTalleresEtapaActual,
    emprendedores, 
    registrarAsistencia, 
    loading: isLoadingAsistencia 
  } = useAsistencia();
  
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedEtapaId, setSelectedEtapaId] = useState<number | null>(null);
  const [selectedTallerId, setSelectedTallerId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEtapaActual();
    fetchEtapas();
  }, [fetchEtapaActual, fetchEtapas]);

  useEffect(() => {
    if (currentEtapa?.id) {
       setSelectedEtapaId(currentEtapa.id);
       setSelectedYear(new Date(currentEtapa.fechaInicio).getFullYear().toString());
       fetchTalleresEtapaActual();
    }
  }, [currentEtapa, fetchTalleresEtapaActual]);

  // Extract available years
  const availableYears = useMemo(() => {
    const years = etapas.map(e => new Date(e.fechaInicio).getFullYear().toString());
    return ["all", ...Array.from(new Set(years)).sort((a, b) => b.localeCompare(a))];
  }, [etapas]);

  // Filter stages by year
  const filteredEtapas = useMemo(() => {
    if (selectedYear === "all") return etapas;
    return etapas.filter(e => new Date(e.fechaInicio).getFullYear().toString() === selectedYear);
  }, [etapas, selectedYear]);

  // Filter entrepreneurs by search term
  const filteredEmprendedores = useMemo(() => {
    if (!searchTerm) return emprendedores;
    const term = searchTerm.toLowerCase();
    return emprendedores.filter(emp => 
      emp.emprendedor.nombre?.toLowerCase().includes(term) || 
      emp.emprendedor.apellidos?.toLowerCase().includes(term) ||
      emp.emprendedor.correoElectronico?.toLowerCase().includes(term)
    );
  }, [emprendedores, searchTerm]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setSelectedEtapaId(null);
    setSelectedTallerId(null);
  };

  const handleStageChange = (id: number) => {
    setSelectedEtapaId(id);
    setSelectedTallerId(null);
    fetchTalleresPorEtapa(id);
  };

  const handleSearch = (idTaller: number) => {
    setSelectedTallerId(idTaller);
    if (selectedEtapaId) {
      fetchEmprendedoresPorEtapaTaller(selectedEtapaId, idTaller);
    }
  };

  const handleToggleAsistencia = async (idAsistente: number, asiste: boolean, observacion: string) => {
    if (selectedEtapaId && selectedTallerId) {
      await registrarAsistencia(selectedEtapaId, selectedTallerId, idAsistente, asiste, observacion);
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
        etapas={filteredEtapas}
        selectedYear={selectedYear}
        availableYears={availableYears}
        onYearChange={handleYearChange}
        selectedEtapaId={selectedEtapaId || 0}
        onStageChange={handleStageChange}
      />

      <div className="pt-4 animate-in slide-in-from-bottom-5 duration-700">
        {!selectedTallerId ? (
          <ModuleEmptyState
            icon={UserCheck}
            title="Seleccionar parámetros de taller"
            description="Utilice los filtros superiores para cargar un taller y fecha específicos. El listado de asistencia se activará automáticamente."
            gradient="from-fundacion-verde to-fundacion-verde-light"
            className="border-dashed difusion-accent-border min-h-[400px] border-2"
          />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="space-y-1">
                <h3 className="text-lg font-black tracking-tight text-zinc-800 dark:text-zinc-100 uppercase">
                  Listado de Asistencia
                </h3>
                <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest opacity-60">
                  {filteredEmprendedores.length} Emprendedores Registrados
                </p>
              </div>

              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text"
                  placeholder="Filtrar por nombre o correo..."
                  className="w-full h-11 pl-11 pr-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold focus:ring-[3px] focus:ring-fundacion-verde/10 focus:border-fundacion-verde/30 transition-all outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <AsistenciaTable 
              emprendedores={filteredEmprendedores}
              idEtapa={selectedEtapaId || 0}
              idTaller={selectedTallerId}
              isLoading={isLoadingAsistencia}
              onToggleAsistencia={handleToggleAsistencia}
            />
          </div>
        )}
      </div>
    </VisionSpringContainer>
  );
}