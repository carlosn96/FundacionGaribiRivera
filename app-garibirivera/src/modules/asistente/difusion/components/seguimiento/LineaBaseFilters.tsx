"use client";

import React from 'react';
import { Search } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionBadge 
} from "@/core/components/ui/vision-glass";

interface LineaBaseFiltersProps {
  count: number;
}

export function LineaBaseFilters({ count }: LineaBaseFiltersProps) {
  return (
    <VisionGlassWindow className="p-4 flex items-center gap-4 flex-wrap shadow-lg border-brand/5 backdrop-blur-md">
      <div className="relative flex-1 min-w-[280px] group">
        <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 vision-text-tertiary transition-colors" />
        <input
          type="text"
          placeholder="Buscar diagnósticos por nombre o folio..."
          className="vision-input-base difusion-filter-input w-full pl-14 pr-6"
        />
      </div>
      
      <div className="flex items-center gap-3 pr-2">
        <VisionBadge sentiment="muted" className="difusion-filter-chip shrink-0 px-6 flex items-center cursor-pointer hover:opacity-90 transition-opacity">
          FILTRAR POR ETAPA
        </VisionBadge>
        
        <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block mx-1" />
        
        <p className="vision-caption-upper vision-text-tertiary font-black text-[9px] tracking-[0.2em] px-2 opacity-50 uppercase">
          {count} EXPEDIENTES
        </p>
      </div>
    </VisionGlassWindow>
  );
}
