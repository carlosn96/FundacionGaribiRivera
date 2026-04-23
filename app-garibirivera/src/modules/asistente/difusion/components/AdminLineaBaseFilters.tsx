"use client";

import React from "react";
import { Search, RefreshCcw, Layers } from "lucide-react";
import { VisionGlassWindow } from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { CorporateSelect, CorporateSelectOption } from "@/core/components/ui/CorporateSelect";
import { cn } from "@/core/utils/utils";

interface AdminLineaBaseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  loading?: boolean;
  /** Si se proveen, se muestra el filtro de etapa */
  etapas?: { idEtapa: number; nombre: string }[];
  selectedEtapaId?: number;
  onEtapaChange?: (id: number) => void;
  className?: string;
}

export const AdminLineaBaseFilters: React.FC<AdminLineaBaseFiltersProps> = ({
  searchTerm,
  onSearchChange,
  onRefresh,
  loading,
  etapas,
  selectedEtapaId,
  onEtapaChange,
  className
}) => {
  // Solo se muestra el filtro de etapa si se proporcionan los datos y la función de cambio
  const showStageFilter = etapas !== undefined && onEtapaChange !== undefined && selectedEtapaId !== undefined;

  const etapaOptions: CorporateSelectOption[] = etapas ? [
    { value: -1, label: "Histórico (Todas las Etapas)" },
    ...etapas.map(e => ({
      value: e.idEtapa.toString(),
      label: e.nombre
    }))
  ] : [];

  return (
    <VisionGlassWindow className={cn("p-4 flex items-center gap-4 flex-wrap shadow-xl border-brand/5", className)}>
      <div className="relative flex-1 min-w-[280px] group">
        <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 vision-text-tertiary transition-colors group-focus-within:text-fundacion-verde" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar emprendedor por nombre o correo..."
          className="vision-input-base w-full pl-14 pr-6 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-950/30 border-subtle focus:border-fundacion-verde transition-all"
        />
      </div>

      <div className="flex items-center gap-3">
        {showStageFilter && (
          <div className="w-72">
            <CorporateSelect
              placeholder="Filtrar por Ciclo/Etapa"
              value={selectedEtapaId.toString()}
              onValueChange={(val) => onEtapaChange(Number(val))}
              options={etapaOptions}
              icon={<Layers className="w-4 h-4 text-fundacion-verde" />}
              loading={loading}
            />
          </div>
        )}

        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 rounded-2xl vision-button-outline border-subtle hover:bg-fundacion-verde/10 hover:text-fundacion-verde transition-all" 
          onClick={onRefresh}
        >
          <RefreshCcw className={cn("w-5 h-5", loading && "animate-spin")} />
        </Button>
      </div>
    </VisionGlassWindow>
  );
};
