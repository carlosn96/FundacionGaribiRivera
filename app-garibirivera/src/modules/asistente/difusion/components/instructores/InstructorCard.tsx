"use client";

import React from 'react';
import { Mail, Phone, Edit2, Trash2 } from "lucide-react";
import { Instructor } from "../../domain/models/Instructor";
import { InstructorAvatar } from "../shared/InstructorAvatar";
import { CorporateGridItem } from "@/core/components/ui/CorporateGridItem";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/core/components/ui/dropdown-menu";
import { VisionBadge } from "@/core/components/ui/vision-glass";

interface InstructorCardProps {
  instructor: Instructor;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function InstructorCard({ instructor, onEdit, onDelete }: InstructorCardProps) {
  const fullName = instructor.nombreCompleto ||
    `${instructor.nombre} ${instructor.apellidoPaterno}${instructor.apellidoMaterno ? ' ' + instructor.apellidoMaterno : ''}`;

  return (
    <CorporateGridItem
      visual={
        <InstructorAvatar
          idInstructor={instructor.idInstructor}
          nombre={instructor.nombre}
          apellidoPaterno={instructor.apellidoPaterno}
          size="lg"
          className="w-16 h-16 shadow-md border-2 border-[var(--border-subtle)]"
        />
      }
      title={fullName}
      subtitle={`ID de Red: #${instructor.idInstructor}`}
      caption={
        <VisionBadge sentiment="brand" className="text-[9px] font-black tracking-widest">
          INSTRUCTOR
        </VisionBadge>
      }
      metadata={[
        {
          icon: Mail,
          label: "Correo",
          value: instructor.correo?.toLowerCase() || "Sin registrar",
          variant: instructor.correo ? 'default' : 'muted',
        },
        {
          icon: Phone,
          label: "Teléfono",
          value: instructor.telefono || "Sin registrar",
          variant: instructor.telefono ? 'default' : 'muted',
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
              <span className="font-semibold text-sm vision-text-primary">Editar Expediente</span>
              <span className="text-[10px] vision-text-tertiary uppercase tracking-widest">Actualizar datos</span>
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
              <span className="font-semibold text-sm text-red-600">Dar de Baja</span>
              <span className="text-[10px] text-red-400 uppercase tracking-widest">Retirar del catálogo</span>
            </div>
          </DropdownMenuItem>
        </>
      }
      onClick={onEdit}
    />
  );
}
