"use client";

import React from 'react';
import { Presentation, Calendar, ArrowRight } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionBadge 
} from "@/core/components/ui/vision-glass";
import { Taller } from "../../domain/models/Taller";
import { InstructorAvatar } from "../shared/InstructorAvatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

interface TallerCardProps {
  taller: Taller;
  onClick?: (taller: Taller) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TallerCard({ taller, onClick, onEdit, onDelete }: TallerCardProps) {
  return (
    <VisionGlassWindow
      className="p-6 sm:p-8 cursor-pointer group difusion-card flex flex-col h-full"
      onClick={() => onClick?.(taller)}
    >
      {/* Header: Icon + Info + Actions */}
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fundacion-verde to-fundacion-verde-light flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 shrink-0">
            <Presentation className="w-7 h-7" />
          </div>
          
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                  <MoreVertical className="w-4 h-4 text-zinc-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
                <DropdownMenuItem onClick={onEdit} className="py-3 px-4 font-bold cursor-pointer rounded-lg mx-1 focus:bg-fundacion-verde/10 focus:text-fundacion-verde">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar Taller
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="py-3 px-4 font-bold cursor-pointer rounded-lg mx-1 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar Taller
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold vision-text-primary text-lg leading-tight group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-colors uppercase tracking-tight line-clamp-2 min-h-[3.5rem]">
            {taller.nombre}
          </h3>
          <div className="flex flex-wrap gap-2">
            <VisionBadge 
              sentiment="brand" 
              className="vision-caption-upper px-2.5 py-1 font-black text-[8px] tracking-widest bg-fundacion-verde/10 text-fundacion-verde border-none"
            >
              MÓDULO: {taller.tipoTaller?.descripcion || "N/A"}
            </VisionBadge>
            <VisionBadge
              sentiment={taller.evaluacionHabilitada ? "success" : "muted"}
              className="vision-caption-upper px-2.5 py-1 font-black text-[8px] tracking-widest"
            >
              {taller.evaluacionHabilitada ? "EVALUACIÓN ACTIVA" : "SIN EVALUACIÓN"}
            </VisionBadge>
          </div>
        </div>
      </div>

      {/* Meta info */}
      <div className="space-y-4 flex-1">
        <div className="flex items-center gap-3 vision-caption vision-text-secondary font-bold text-xs">
          <div className="w-8 h-8 rounded-lg difusion-accent-surface flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4 difusion-accent-text opacity-70" />
          </div>
          <span className="opacity-80">Secuencia #{taller.numeroTaller} — Programada</span>
        </div>
        <div className="flex items-center gap-3 vision-caption vision-text-secondary font-bold text-xs">
          <InstructorAvatar 
            idInstructor={taller.idInstructor}
            nombre={taller.instructor?.nombre}
            apellidoPaterno={taller.instructor?.apellidoPaterno}
            size="sm"
            shape="square"
          />
          <span className="opacity-80 truncate">
            {taller.instructor?.nombreCompleto || "SIN INSTRUCTOR ASIGNADO"}
          </span>
        </div>
      </div>

      {/* Footer corporativo */}
      <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between transition-colors">
        <span className="vision-caption-upper vision-text-tertiary font-black tracking-widest text-[9px] opacity-50 group-hover:opacity-100 group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-all">Ver detalles operativos</span>
        <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[var(--interact-hover)] transition-all">
          <ArrowRight className="w-5 h-5 vision-text-secondary group-hover:translate-x-1 group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-all" />
        </div>
      </div>
    </VisionGlassWindow>
  );
}
