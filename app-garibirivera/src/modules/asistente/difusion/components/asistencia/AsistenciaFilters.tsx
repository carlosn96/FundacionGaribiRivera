"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, Layers, BookOpen, ChevronRight } from "lucide-react";
import { useAsistencia } from "@/modules/asistente/difusion/hooks/useAsistencia";
import { CorporateSelect } from "@/core/components/ui/CorporateSelect";
import { EtapaFormacion } from "../../domain/models/Etapa";
import { cn } from "@/core/utils/utils";

interface AsistenciaFiltersProps {
  onSearch: (idTaller: number) => void;
  etapas: EtapaFormacion[];
  selectedYear: string;
  availableYears: string[];
  onYearChange: (year: string) => void;
  selectedEtapaId: number;
  onStageChange: (id: number) => void;
}

export function AsistenciaFilters({ 
  onSearch, 
  etapas, 
  selectedYear,
  availableYears,
  onYearChange,
  selectedEtapaId, 
  onStageChange 
}: AsistenciaFiltersProps) {
  const { talleres, fetchTalleresPorEtapa, loading } = useAsistencia();
  const [selectedTaller, setSelectedTaller] = useState<number | "">("");

  useEffect(() => {
    if (selectedEtapaId) {
      fetchTalleresPorEtapa(selectedEtapaId);
      setSelectedTaller("");
    }
  }, [selectedEtapaId, fetchTalleresPorEtapa]);

  const yearOptions = availableYears.map(y => ({
    value: y,
    label: y === "all" ? "Todos los años" : y,
  }));

  const etapaOptions = etapas.map(e => ({
    value: e.id,
    label: e.nombre,
  }));

  const tallerOptions = talleres.map(t => ({
    value: t.id,
    label: `${t.nombreTaller} — ${t.fecha}`,
  }));

  const hasEtapa = !!selectedEtapaId;
  const isReady = !!selectedTaller;

  const handleTallerChange = (val: string | number) => {
    const id = Number(val);
    setSelectedTaller(id);
    onSearch(id); // disparo inmediato al seleccionar
  };

  return (
    <div className="rounded-2xl border border-subtle bg-surface-raised/60 backdrop-blur-vision-subtle px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">

        {/* Label de sección — anclaje visual discreto */}
        <span className="vision-caption-upper vision-text-disabled text-[9px] flex-none hidden sm:block">
          Filtros
        </span>

        {/* Separador vertical */}
        <div className="hidden sm:block w-px h-5 border-subtle self-center" />

        {/* ── Año ── */}
        <div className="w-28 flex-none">
          <CorporateSelect
            placeholder="Año"
            value={selectedYear}
            onValueChange={onYearChange}
            options={yearOptions}
            icon={<Calendar className="w-3.5 h-3.5" />}
            variant="compact"
          />
        </div>

        {/* Chevron decorativo */}
        <ChevronRight className="w-3.5 h-3.5 vision-text-disabled flex-none" aria-hidden />

        {/* ── Etapa ── */}
        <div className="w-52 flex-none">
          <CorporateSelect
            placeholder="Etapa de formación"
            value={selectedEtapaId || ""}
            onValueChange={(val) => onStageChange(Number(val))}
            options={etapaOptions}
            icon={<Layers className="w-3.5 h-3.5" />}
            loading={loading && etapas.length === 0}
            variant="compact"
          />
        </div>

        {/* Chevron decorativo — sólo si hay etapa */}
        {hasEtapa && (
          <ChevronRight className="w-3.5 h-3.5 vision-text-disabled flex-none animate-in fade-in duration-300" aria-hidden />
        )}

        {/* ── Taller — aparece cuando hay etapa seleccionada ── */}
        {hasEtapa && (
          <div className="flex-1 min-w-[180px] sm:max-w-md animate-in slide-in-from-left-2 fade-in duration-300">
            <CorporateSelect
              placeholder="Selecciona taller..."
              value={selectedTaller}
              onValueChange={handleTallerChange}
              options={tallerOptions}
              icon={<BookOpen className="w-3.5 h-3.5" />}
              loading={loading}
              variant="compact"
            />
          </div>
        )}

        {/* Indicador de estado — extremo derecho */}
        <div className="ml-auto flex-none flex items-center gap-2">
          {loading ? (
            <div className="flex items-center gap-2 animate-in fade-in duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-fundacion-amarillo animate-pulse" />
              <span className="vision-caption-upper vision-badge-brand text-[9px] px-2 py-0.5 rounded-full">
                Cargando...
              </span>
            </div>
          ) : isReady && (
            <div className="flex items-center gap-2 animate-in zoom-in duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-vision-green" />
              <span className="vision-caption-upper vision-badge-success text-[9px] px-2 py-0.5 rounded-full">
                Listado Listo
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
