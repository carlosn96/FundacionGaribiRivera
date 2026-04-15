"use client";

import React from 'react';
import { Mail, Phone, ArrowRight } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionBadge 
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { Instructor } from "../../domain/models/Instructor";
import { InstructorAvatar } from "../shared/InstructorAvatar";

interface InstructorCardProps {
  instructor: Instructor;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function InstructorCard({ instructor, onEdit, onDelete }: InstructorCardProps) {
  return (
    <VisionGlassWindow
      className="p-8 cursor-pointer group difusion-card flex flex-col h-full"
    >
      {/* Avatar + Info */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-start justify-between">
          <InstructorAvatar 
            idInstructor={instructor.idInstructor}
            nombre={instructor.nombre}
            apellidoPaterno={instructor.apellidoPaterno}
            size="lg"
            className="shadow-xl"
          />
          
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
             <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 group-hover:text-fundacion-verde transition-all" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold vision-text-primary text-lg leading-tight group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-colors uppercase tracking-tight line-clamp-1">
            {instructor.nombre} {instructor.apellidoPaterno}
          </h3>
          <VisionBadge
            sentiment="brand"
            className="vision-caption-upper px-3 py-1 font-black text-[9px] tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-none"
          >
          </VisionBadge>
        </div>
      </div>

      {/* Contacto con mejor diseño semántico */}
      <div className="space-y-4 flex-1">
        <div className="group/item flex items-center gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-transparent hover:border-fundacion-verde-light dark:hover:border-fundacion-amarillo transition-colors">
          <div className="w-8 h-8 rounded-lg difusion-accent-surface flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4 difusion-accent-text opacity-70 group-hover/item:opacity-100 transition-opacity" />
          </div>
          <span className="truncate text-xs font-bold vision-text-secondary opacity-70 group-hover/item:opacity-100 transition-opacity tracking-tight">
            {instructor.correo?.toLowerCase() ?? 'SIN RECURSO'}
          </span>
        </div>
        <div className="group/item flex items-center gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-transparent hover:border-fundacion-verde-light dark:hover:border-fundacion-amarillo transition-colors">
          <div className="w-8 h-8 rounded-lg difusion-accent-surface flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4 difusion-accent-text opacity-70 group-hover/item:opacity-100 transition-opacity" />
          </div>
          <span className="text-xs font-bold vision-text-secondary opacity-70 group-hover/item:opacity-100 transition-opacity tracking-widest">
            {instructor.telefono ?? 'NO DISPONIBLE'}
          </span>
        </div>
      </div>

      {/* Footer Acciones Estilizadas */}
      <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex gap-2">
          <Button 
            variant="visionGlass" 
            size="visionSm" 
            onClick={onEdit}
            className="font-black text-[9px] tracking-widest px-4 border shadow-sm h-8 rounded-lg hover:bg-[var(--interact-hover)] hover:text-fundacion-verde-light dark:hover:text-fundacion-amarillo"
          >
            EDITAR
          </Button>
          <Button 
            variant="visionDestructive" 
            size="visionSm" 
            onClick={onDelete}
            className="font-black text-[9px] tracking-widest px-4 border shadow-sm h-8 rounded-lg"
          >
            RETIRAR
          </Button>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--interact-hover)] transition-colors">
          <ArrowRight className="w-5 h-5 vision-text-secondary group-hover:translate-x-1 group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-all opacity-40 group-hover:opacity-100" />
        </div>
      </div>
    </VisionGlassWindow>
  );
}
