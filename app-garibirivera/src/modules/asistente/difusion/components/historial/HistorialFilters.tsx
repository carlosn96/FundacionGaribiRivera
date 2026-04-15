"use client";

import React from 'react';
import { Search } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionBadge 
} from "@/core/components/ui/vision-glass";

interface HistorialFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  count: number;
  loading: boolean;
}

export function HistorialFilters({ searchTerm, setSearchTerm, count, loading }: HistorialFiltersProps) {
  return (
    <VisionGlassWindow className="p-4 flex items-center gap-4 flex-wrap shadow-lg border-brand/5 backdrop-blur-md">
      <div className="relative flex-1 min-w-[300px] group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 vision-text-tertiary transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre, correo electrónico o folio..."
          className="vision-input-base difusion-filter-input w-full pl-12 pr-6"
        />
      </div>
      
      <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block mx-2" />
      
      <VisionBadge 
        sentiment="muted" 
        className="difusion-filter-chip shrink-0 px-6 flex items-center"
      >
        {loading ? (
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-zinc-400 border-t-transparent animate-spin rounded-full" />
                <span>Sincronizando...</span>
            </div>
        ) : (
            `${count} EXPEDIENTES ENCONTRADOS`
        )}
      </VisionBadge>
    </VisionGlassWindow>
  );
}
