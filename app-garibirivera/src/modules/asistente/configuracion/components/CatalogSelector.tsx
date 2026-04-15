"use client";

import React from 'react';
import { VisionGlassWindow } from '@/core/components/ui/vision-glass';
import { ChevronRight } from 'lucide-react';
import { CatalogMap, CatalogEntry } from '@/modules/asistente/configuracion/schemas/configuracion.schema';

interface CatalogSelectorProps {
  catalogKeys: string[];
  selectedCatalog: string;
  setSelectedCatalog: (key: string) => void;
  catalogos: CatalogMap | null;
}

export function CatalogSelector({
  catalogKeys,
  selectedCatalog,
  setSelectedCatalog,
  catalogos
}: CatalogSelectorProps) {
  return (
    <VisionGlassWindow className="lg:col-span-4 p-4 space-y-2 border-fundacion-amarillo/20 overflow-y-auto max-h-[70vh] bg-[var(--surface-base)]">
      <div className="px-2 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-disabled)]">
        Listado de Diccionarios
      </div>
      {catalogKeys.map((key, idx) => (
        <button
          key={`${key}-${idx}`}
          onClick={() => setSelectedCatalog(key)}
          className={`w-full flex items-center justify-between p-3 rounded-vision-md transition-all text-sm font-medium ${
            selectedCatalog === key 
            ? 'bg-fundacion-verde text-white shadow-lg' 
            : 'hover:bg-fundacion-amarillo/10 vision-text-primary'
          }`}
        >
          <span className="capitalize">{key.replace(/_/g, ' ')}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] opacity-60 bg-black/10 px-1.5 rounded-full">
              {(catalogos?.[key] as CatalogEntry)?.data?.length || 0}
            </span>
            <ChevronRight className="w-4 h-4 opacity-50" />
          </div>
        </button>
      ))}
    </VisionGlassWindow>
  );
}
