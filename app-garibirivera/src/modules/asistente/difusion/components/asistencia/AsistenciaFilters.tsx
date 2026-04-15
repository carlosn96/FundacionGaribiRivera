"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, Search } from "lucide-react";
import { 
  VisionGlassWindow
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { useAsistencia } from "@/modules/asistente/difusion/hooks/useAsistencia";

interface AsistenciaFiltersProps {
  onSearch: (idTaller: number) => void;
  idEtapaActual: number; // Por ahora, le pasaremos la id_etapa para cargar talleres.
}

export function AsistenciaFilters({ onSearch, idEtapaActual }: AsistenciaFiltersProps) {
  const { talleres, fetchTalleresPorEtapa, loading } = useAsistencia();
  const [selectedTaller, setSelectedTaller] = useState<number | ''>('');

  useEffect(() => {
    if (idEtapaActual) {
      fetchTalleresPorEtapa(idEtapaActual);
    }
  }, [idEtapaActual, fetchTalleresPorEtapa]);

  const handleSearch = () => {
    if (selectedTaller) {
      onSearch(Number(selectedTaller));
    }
  };

  return (
    <VisionGlassWindow className="p-8 md:p-10 shadow-xl border-brand/5 relative overflow-hidden group">
        {/* Resplandor decorativo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 difusion-accent-surface blur-[80px] rounded-full pointer-events-none transition-colors duration-1000" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative z-10">
          <div className="space-y-4">
            <label className="vision-caption-upper vision-text-tertiary font-black text-[10px] tracking-[0.2em] ml-2 opacity-60">
                Selección de Taller
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 vision-text-tertiary" />
              <select 
                className="vision-input-base difusion-filter-input w-full pl-14 pr-6 appearance-none cursor-pointer"
                value={selectedTaller}
                onChange={(e) => setSelectedTaller(Number(e.target.value))}
                disabled={loading}
              >
                <option value="">{loading ? "Cargando..." : "Selecciona un taller..."}</option>
                {talleres.map(taller => (
                  <option key={taller.id} value={taller.id}>
                    {taller.nombre_taller} ({taller.fecha})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="vision-caption-upper vision-text-tertiary font-black text-[10px] tracking-[0.2em] ml-2 opacity-60">
                Buscar Emprendedor
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 vision-text-tertiary" />
              <input 
                type="text" 
                placeholder="Nombre o correo..."
                className="vision-input-base difusion-filter-input w-full pl-14 pr-6" 
                disabled
              />
            </div>
          </div>

          <Button 
            variant="visionSecondary" 
            size="visionLg" 
            className="h-14 rounded-2xl font-black shadow-lg active:scale-95 transition-all text-[11px] tracking-widest px-8"
            onClick={handleSearch}
            disabled={!selectedTaller || loading}
          >
            CARGAR LISTADO DE ASISTENCIA
          </Button>
        </div>
      </VisionGlassWindow>
  );
}
