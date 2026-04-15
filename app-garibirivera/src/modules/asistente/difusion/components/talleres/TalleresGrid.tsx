"use client";

import React from 'react';
import { Presentation, Plus } from "lucide-react";
import { Taller } from "../../domain/models/Taller";
import { TallerCard } from "./TallerCard";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";

interface TalleresGridProps {
  talleres: Taller[];
  loading?: boolean;
  onCreate: () => void;
  onEdit: (taller: Taller) => void;
  onDelete: (id: number) => void;
}

export function TalleresGrid({ talleres, loading, onCreate, onEdit, onDelete }: TalleresGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-64 vision-glass-window animate-pulse flex flex-col p-8 gap-6 border-zinc-200/40">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-zinc-200 rounded w-3/4" />
                <div className="h-3 bg-zinc-200 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="h-3 bg-zinc-200 rounded w-full" />
              <div className="h-3 bg-zinc-200 rounded w-full" />
            </div>
            <div className="mt-auto h-8 bg-zinc-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!talleres || talleres.length === 0) {
    return (
      <ModuleEmptyState
        icon={Presentation}
        title="Sin talleres registrados"
        description="Aún no se han configurado talleres de capacitación. Crea el primero para comenzar a organizar las sesiones."
        action={{
          label: "Crear Primer Taller",
          icon: Plus,
          onClick: onCreate
        }}
        gradient="from-fundacion-verde to-fundacion-verde-light"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {talleres.map((taller) => (
        <TallerCard 
          key={taller.id} 
          taller={taller} 
          onClick={() => onEdit(taller)}
          onEdit={() => onEdit(taller)}
          onDelete={() => onDelete(taller.id)}
        />
      ))}
    </div>
  );
}
