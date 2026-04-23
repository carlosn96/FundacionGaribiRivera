"use client";

import { Layers, Calendar, Clock, ListFilter, Activity, CheckCircle2, Trash2 } from "lucide-react";
import { EtapaFormacion } from "../../domain/models/Etapa";
import { CorporateGridItem } from "@/core/components/ui/CorporateGridItem";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/core/components/ui/dropdown-menu";
import { useConfirm } from "@/core/context/ConfirmContext";

interface EtapaItemProps {
  etapa: EtapaFormacion & { idModalidad?: number };
  onSetActual?: (id: number) => void;
  onDelete?: (id: number) => void;
  onViewCronograma?: (id: number) => void;
  onEdit?: (etapa: EtapaFormacion) => void;
}

export function EtapaItem({ etapa, onSetActual, onDelete, onViewCronograma, onEdit }: EtapaItemProps) {
  const { confirmDelete } = useConfirm();
  const modalityLabel = etapa.modalidad === 1 || etapa.idModalidad === 1 ? "PRESENCIAL" : "VIRTUAL";
  const isCurrent = etapa.esActual;

  return (
    <CorporateGridItem
      visual={
        <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-700 group-hover:rotate-6 ${isCurrent ? 'bg-gradient-to-br from-fundacion-verde to-fundacion-verde-dark animate-pulse-slow' : 'bg-zinc-800 dark:bg-zinc-700'}`}>
          <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      }
      featured={isCurrent}
      title={etapa.nombre}
      subtitle={etapa.tipo?.toUpperCase() || 'BÁSICA'}
      caption={isCurrent ? (
        <div className="flex items-center gap-1.5 mb-1 text-fundacion-verde">
          <Activity className="w-3 h-3 animate-pulse" />
          <span className="text-[9px] font-black tracking-widest uppercase">Ciclo en Curso</span>
        </div>
      ) : null}
      metadata={[
        {
          icon: Calendar,
          label: "Periodo",
          value: (etapa.fechaInicio && etapa.fechaFin) 
            ? `${etapa.fechaInicio.substring(5)} — ${etapa.fechaFin.substring(5)}` 
            : "No definido",
        },
        {
          icon: Clock,
          label: "Modalidad",
          value: modalityLabel,
        }
      ]}
      actions={
        <>
          <DropdownMenuItem onClick={() => onViewCronograma?.(etapa.id)} className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-azul/5 focus:bg-fundacion-azul/5 focus:text-fundacion-azul group/item">
            <div className="bg-fundacion-azul/10 p-1.5 rounded-lg text-fundacion-azul transition-transform group-hover/item:scale-110">
              <ListFilter className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-xs">Cronograma Operativo</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => onEdit?.(etapa)} className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-amarillo/5 focus:bg-fundacion-amarillo/5 focus:text-fundacion-amarillo-dark dark:focus:text-fundacion-amarillo group/item">
            <div className="bg-fundacion-amarillo/10 p-1.5 rounded-lg text-fundacion-amarillo-dark dark:text-fundacion-amarillo transition-transform group-hover/item:scale-110">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-xs">Editar Detalles</span>
          </DropdownMenuItem>

          {!isCurrent && (
            <DropdownMenuItem onClick={() => onSetActual?.(etapa.id)} className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-verde/5 focus:bg-fundacion-verde/5 focus:text-fundacion-verde group/item">
              <div className="bg-fundacion-verde/10 p-1.5 rounded-lg text-fundacion-verde transition-transform group-hover/item:scale-110">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-xs">Fijar como Actual</span>
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator className="bg-subtle my-1" />

          <DropdownMenuItem 
            onClick={async () => {
              const isConfirmed = await confirmDelete(etapa.nombre);
              if (isConfirmed) onDelete?.(etapa.id);
            }} 
            className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-red-50 focus:bg-red-50 text-red-600 focus:text-red-700 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30 group/item"
          >
            <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg transition-transform group-hover/item:scale-110">
              <Trash2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-xs">Eliminar Etapa</span>
          </DropdownMenuItem>
        </>
      }
      onClick={() => onEdit?.(etapa)}
    />
  );
}
