"use client";

import { Layers, Calendar, Clock, MoreHorizontal, Trash2, CheckCircle2, ListFilter, Activity } from "lucide-react";
import { VisionGlassWindow } from "@/core/components/ui/vision-glass";
import { EtapaFormacion } from "../../domain/models/Etapa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu";

interface EtapaItemProps {
  etapa: EtapaFormacion & { idModalidad?: number };
  onSetActual?: (id: number) => void;
  onDelete?: (id: number) => void;
  onViewCronograma?: (id: number) => void;
  onEdit?: (etapa: EtapaFormacion) => void;
}

export function EtapaItem({ etapa, onSetActual, onDelete, onViewCronograma, onEdit }: EtapaItemProps) {
  const modalityLabel = etapa.modalidad === 1 || etapa.idModalidad === 1 ? "PRESENCIAL" : "VIRTUAL";
  const idValue = etapa.id;

  const isCurrent = etapa.esActual;

  return (
    <div className={`relative group isolate rounded-3xl transition-all duration-500 hover:-translate-y-1 ${isCurrent ? 'bg-gradient-to-br from-fundacion-verde/10 to-transparent' : 'bg-white dark:bg-zinc-900/40 hover:shadow-2xl hover:shadow-fundacion-verde/5'}`}>
      {/* Decorative gradient border effect */}
      <div className={`absolute inset-0 rounded-3xl -z-10 transition-opacity duration-500 ${isCurrent ? 'bg-gradient-to-r from-fundacion-verde to-fundacion-amarillo blur-md opacity-30 group-hover:opacity-60' : 'bg-zinc-200 dark:bg-zinc-800 opacity-0 group-hover:opacity-100'}`} />

      <VisionGlassWindow className={`h-full p-5 sm:p-6 lg:p-8 flex flex-col gap-5 sm:gap-6 rounded-3xl border transition-colors duration-500 relative overflow-hidden ${isCurrent ? 'border-fundacion-verde/40 shadow-xl shadow-fundacion-verde/10' : 'border-zinc-200/50 dark:border-zinc-800/50'}`}>

        {isCurrent && (
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-fundacion-verde via-fundacion-amarillo to-transparent animate-pulse" />
        )}

        {/* Header Section */}
        <div className="flex justify-between items-start gap-3 sm:gap-4">
          <div className="flex gap-3 sm:gap-4 items-center min-w-0">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-700 group-hover:rotate-6 ${isCurrent ? 'bg-gradient-to-br from-fundacion-verde to-fundacion-verde-dark animate-pulse-slow' : 'bg-zinc-800 dark:bg-zinc-700'}`}>
              <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0">
              {isCurrent && (
                <div className="flex items-center gap-1.5 mb-1">
                  <Activity className="w-3 h-3 text-fundacion-verde animate-pulse" />
                  <span className="text-[9px] font-black tracking-widest uppercase text-fundacion-verde">
                    Ciclo en Curso
                  </span>
                </div>
              )}
              <h3 className={`font-black text-lg sm:text-xl md:text-2xl truncate tracking-tight transition-colors ${isCurrent ? 'text-fundacion-verde-dark dark:text-fundacion-verde-light' : 'vision-text-primary group-hover:text-fundacion-azul'}`}>
                {etapa.nombre}
              </h3>
              <p className="vision-caption vision-text-tertiary font-bold tracking-widest text-[10px] uppercase flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-fundacion-verde' : 'bg-zinc-300 dark:bg-zinc-600'}`} />
                {etapa.tipo?.toUpperCase() || 'BÁSICA'}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-700 text-zinc-500">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-zinc-200 dark:border-zinc-800 shadow-xl">
              <DropdownMenuLabel className="text-xs font-black tracking-widest uppercase text-zinc-400 mb-1">Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />

              <DropdownMenuItem
                className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-azul/5 focus:bg-fundacion-azul/5 focus:text-fundacion-azul group/item"
                onClick={() => onViewCronograma?.(idValue)}
              >
                <div className="bg-fundacion-azul/10 p-1.5 rounded-lg text-fundacion-azul transition-transform group-hover/item:scale-110">
                  <ListFilter className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">Cronograma</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-amarillo/5 focus:bg-fundacion-amarillo/5 focus:text-fundacion-amarillo-dark dark:focus:text-fundacion-amarillo group/item"
                onClick={() => onEdit?.(etapa)}
              >
                <div className="bg-fundacion-amarillo/10 p-1.5 rounded-lg text-fundacion-amarillo-dark dark:text-fundacion-amarillo transition-transform group-hover/item:scale-110">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm text-fundacion-amarillo-dark dark:text-fundacion-amarillo">Editar Detalles</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className={`gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-verde/5 focus:bg-fundacion-verde/5 focus:text-fundacion-verde group/item ${isCurrent ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() => onSetActual?.(idValue)}
              >
                <div className="bg-fundacion-verde/10 p-1.5 rounded-lg text-fundacion-verde transition-transform group-hover/item:scale-110">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">Fijar como Actual</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800 my-1" />

              <DropdownMenuItem
                className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-red-50 focus:bg-red-50 text-red-600 focus:text-red-700 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30 group/item"
                onClick={() => onDelete?.(idValue)}
              >
                <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-lg transition-transform group-hover/item:scale-110">
                  <Trash2 className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">Eliminar Etapa</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Info Grid Section */}
        <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
          <div className="flex flex-col gap-1.5 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-2xl group-hover:bg-white dark:group-hover:bg-zinc-800/50 transition-colors">
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-fundacion-azul" /> Periodo
            </span>
            <span className="font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 tracking-tight truncate">
              {etapa.fechaInicio.substring(5)} — {etapa.fechaFin.substring(5)}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-2xl group-hover:bg-white dark:group-hover:bg-zinc-800/50 transition-colors">
            <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-fundacion-amarillo" /> Modalidad
            </span>
            <span className="font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 tracking-tight truncate">
              {modalityLabel}
            </span>
          </div>
        </div>

      </VisionGlassWindow>
    </div>
  );
}
