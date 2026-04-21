"use client";

import React from "react";
import { Search, Filter, RefreshCcw } from "lucide-react";
import { VisionGlassWindow, VisionBadge } from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";

interface AdminLineaBaseFiltersProps {
  count: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onRefresh: () => void;
  etapas: Array<{ idEtapa: number; nombre: string }>;
  selectedEtapas: number[];
  onEtapaToggle: (id: number) => void;
}

export const AdminLineaBaseFilters: React.FC<AdminLineaBaseFiltersProps> = ({
  count,
  searchTerm,
  onSearchChange,
  onRefresh,
  etapas,
  selectedEtapas,
  onEtapaToggle,
}) => {
  return (
    <VisionGlassWindow className="p-4 flex items-center gap-4 flex-wrap shadow-lg border-brand/5 backdrop-blur-md">
      <div className="relative flex-1 min-w-[280px] group">
        <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 vision-text-tertiary transition-colors group-focus-within:text-vision-brand" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre o correo..."
          className="vision-input-base w-full pl-14 pr-6 h-12"
        />
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="vision-button-outline h-12 px-6">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar por Etapa
              {selectedEtapas.length > 0 && (
                <span className="ml-2 bg-vision-brand text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center">
                  {selectedEtapas.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 vision-dropdown">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest opacity-50">Etapas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {etapas.map((etapa) => (
              <DropdownMenuCheckboxItem
                key={etapa.idEtapa}
                checked={selectedEtapas.includes(etapa.idEtapa)}
                onCheckedChange={() => onEtapaToggle(etapa.idEtapa)}
              >
                {etapa.nombre}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="outline" 
          size="icon" 
          className="h-12 w-12 vision-button-outline" 
          onClick={onRefresh}
          title="Actualizar datos"
        >
          <RefreshCcw className="w-4 h-4" />
        </Button>

        <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block mx-2" />

        <div className="flex flex-col items-end">
          <p className="vision-caption-upper vision-text-tertiary font-black text-[9px] tracking-[0.2em] uppercase opacity-50">
            Total Resultados
          </p>
          <p className="font-bold vision-text-primary text-sm">
            {count} EMPRENDEDORES
          </p>
        </div>
      </div>
    </VisionGlassWindow>
  );
};
