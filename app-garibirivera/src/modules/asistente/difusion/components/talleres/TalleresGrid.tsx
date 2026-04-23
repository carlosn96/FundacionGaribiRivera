"use client";

import React from 'react';
import { Presentation, Plus } from "lucide-react";
import { Taller } from "../../domain/models/Taller";
import { TallerCard } from "./TallerCard";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";
import { CorporateGrid } from "@/core/components/ui/CorporateGrid";

interface TalleresGridProps {
  talleres: Taller[];
  loading?: boolean;
  onCreate?: () => void;
  onEdit?: (taller: Taller) => void;
  onDelete?: (id: number) => void;
}

export function TalleresGrid({ talleres, loading, onCreate, onEdit, onDelete }: TalleresGridProps) {
  if (loading) {
    return (
      <CorporateGrid columns={{ default: 1, md: 2, lg: 3 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 vision-glass-window animate-pulse flex flex-col p-8 gap-8 border-subtle">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl w-full" />
              <div className="h-12 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl w-full" />
            </div>
          </div>
        ))}
      </CorporateGrid>
    );
  }

  if (!talleres || talleres.length === 0) {
    return (
      <ModuleEmptyState
        icon={Presentation}
        title="Sin talleres planificados"
        description="Aún no se han programado talleres para este ciclo. Comienza definiendo los temas y sus respectivos instructores."
        action={{
          label: "Planificar Taller",
          icon: Plus,
          onClick: onCreate
        }}
        gradient="from-fundacion-azul to-fundacion-azul-light"
      />
    );
  }

  return (
    <CorporateGrid columns={{ default: 1, md: 2, lg: 3 }} className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      {talleres.map((taller) => (
        <TallerCard 
          key={taller.id} 
          taller={taller} 
          onEdit={() => onEdit?.(taller)}
          onDelete={() => onDelete?.(taller.id)}
        />
      ))}
    </CorporateGrid>
  );
}
