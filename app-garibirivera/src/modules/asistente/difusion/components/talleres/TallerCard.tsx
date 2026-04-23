"use client";

import React from 'react';
import { Presentation, Calendar, Edit2, Trash2, ArrowRight, User } from "lucide-react";
import { Taller } from "../../domain/models/Taller";
import { InstructorAvatar } from "../shared/InstructorAvatar";
import { CorporateGridItem } from "@/core/components/ui/CorporateGridItem";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/core/components/ui/dropdown-menu";
import { VisionBadge } from "@/core/components/ui/vision-glass";

interface TallerCardProps {
  taller: Taller;
  onClick?: (taller: Taller) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TallerCard({ taller, onClick, onEdit, onDelete }: TallerCardProps) {
  const instructorName = taller.instructor?.nombreCompleto ||
    (taller.instructor
      ? `${taller.instructor.nombre} ${taller.instructor.apellidoPaterno}`
      : null);

  return (
    <CorporateGridItem
      visual={
        <div className="w-14 h-14 rounded-2xl bg-fundacion-verde flex items-center justify-center text-white shadow-md shrink-0">
          <Presentation className="w-7 h-7" />
        </div>
      }
      title={taller.nombre}
      subtitle={taller.tipoTaller?.descripcion ?? undefined}
      caption={
        <VisionBadge
          sentiment={taller.evaluacionHabilitada ? "success" : "muted"}
          className="text-[9px] font-bold tracking-widest"
        >
          {taller.evaluacionHabilitada ? "Con evaluación" : "Sin evaluación"}
        </VisionBadge>
      }
      metadata={[
        {
          icon: Calendar,
          label: "Secuencia",
          value: `#${taller.numeroTaller}`,
          variant: 'accent',
        },
        {
          icon: User,
          label: "Instructor",
          value: instructorName ? (
            <div className="flex items-center gap-1.5 min-w-0">
              <InstructorAvatar
                idInstructor={taller.idInstructor}
                nombre={taller.instructor?.nombre}
                apellidoPaterno={taller.instructor?.apellidoPaterno}
                size="sm"
                className="w-5 h-5 shrink-0"
              />
              <span className="truncate">{instructorName}</span>
            </div>
          ) : "Sin asignar",
          variant: instructorName ? 'default' : 'muted',
        },
      ]}
      actions={
        <>
          <DropdownMenuItem
            onClick={onEdit}
            className="gap-3 py-3 cursor-pointer rounded-xl focus:bg-[var(--interact-hover)] group/item"
          >
            <div className="p-2 rounded-lg bg-[var(--interact-hover)] text-[var(--text-secondary)] transition-transform group-hover/item:scale-110">
              <Edit2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm vision-text-primary">Editar Taller</span>
              <span className="text-[10px] vision-text-tertiary uppercase tracking-widest">Ajustar datos y evaluación</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="border-[var(--border-subtle)] my-1" />

          <DropdownMenuItem
            onClick={onDelete}
            className="gap-3 py-3 cursor-pointer rounded-xl focus:bg-red-50 dark:focus:bg-red-950/30 group/item"
          >
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 transition-transform group-hover/item:scale-110">
              <Trash2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-sm text-red-600">Eliminar Sesión</span>
              <span className="text-[10px] text-red-400 uppercase tracking-widest">Retirar definitivamente</span>
            </div>
          </DropdownMenuItem>
        </>
      }
      footer={
        <div className="flex items-center justify-between w-full vision-caption-upper vision-text-tertiary">
          <span>Ver logística</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      }
      onClick={() => onClick?.(taller)}
    />
  );
}
