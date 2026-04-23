"use client";

import React, { useState } from 'react';
import { Layers, Plus } from "lucide-react";
import { EtapaFormacion } from "../../domain/models/Etapa";
import { EtapaItem } from "./EtapaItem";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";
import { CronogramaModal } from './CronogramaModal';
import { CorporateGrid } from '@/core/components/ui/CorporateGrid';

interface EtapasListProps {
  etapas: EtapaFormacion[];
  loading?: boolean;
  onSetActual?: (id: number) => void;
  onDelete?: (id: number) => void;
  onFetchCronograma?: (id: number) => Promise<any[]>;
  onEdit?: (etapa: EtapaFormacion) => void;
}

export function EtapasList({ etapas, loading, onSetActual, onDelete, onFetchCronograma, onEdit }: EtapasListProps) {
  const [cronogramaModal, setCronogramaModal] = useState<{ isOpen: boolean; id: number | null; data: any[]; loading: boolean }>({
    isOpen: false,
    id: null,
    data: [],
    loading: false
  });

  const handleViewCronograma = async (id: number) => {
    setCronogramaModal({ isOpen: true, id, data: [], loading: true });
    if (onFetchCronograma) {
      const data = await onFetchCronograma(id);
      setCronogramaModal(prev => ({ ...prev, data, loading: false }));
    } else {
      setCronogramaModal(prev => ({ ...prev, loading: false }));
    }
  };

  const closeCronograma = () => {
    setCronogramaModal({ isOpen: false, id: null, data: [], loading: false });
  };

  if (loading) {
    return (
      <CorporateGrid columns={{ default: 1, md: 2, lg: 3 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-64 rounded-3xl bg-surface-base animate-pulse border border-subtle p-6 flex flex-col justify-between">
            <div className="flex gap-4">
              <div className="w-14 h-14 bg-zinc-200 dark:bg-zinc-800 rounded-2xl shrink-0" />
              <div className="space-y-3 w-full pt-1">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-100 dark:bg-zinc-800/50 rounded w-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-subtle mt-auto">
              <div className="h-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl" />
              <div className="h-10 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl" />
            </div>
          </div>
        ))}
      </CorporateGrid>
    );
  }

  if (!etapas || etapas.length === 0) {
    return (
      <ModuleEmptyState
        icon={Layers}
        title="Sin etapas configuradas"
        description="Aún no se han definido etapas de formación institucional. Cree la primera para organizar el progreso de sus emprendedores."
        action={{
          label: "Crear Nueva Etapa",
          icon: Plus,
          onClick: () => console.log("Crear etapa")
        }}
        gradient="from-fundacion-verde to-fundacion-verde-dark"
      />
    );
  }

  return (
    <>
      <CorporateGrid columns={{ default: 1, md: 2, lg: 3 }} className="animate-in slide-in-from-bottom-5 fade-in duration-700">
        {etapas.map((etapa) => (
          <EtapaItem 
            key={etapa.id} 
            etapa={etapa} 
            onSetActual={onSetActual}
            onDelete={onDelete}
            onViewCronograma={handleViewCronograma}
            onEdit={onEdit}
          />
        ))}
      </CorporateGrid>

      <CronogramaModal 
        idEtapa={cronogramaModal.id}
        isOpen={cronogramaModal.isOpen}
        onClose={closeCronograma}
        cronograma={cronogramaModal.data}
        loading={cronogramaModal.loading}
      />
    </>
  );
}
