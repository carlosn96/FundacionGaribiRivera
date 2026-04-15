"use client";

import React from 'react';
import { UserCheck, Plus } from "lucide-react";
import { Instructor } from "../../domain/models/Instructor";
import { InstructorCard } from "./InstructorCard";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";

interface InstructoresGridProps {
  instructores: Instructor[];
  loading?: boolean;
  onEdit?: (instructor: Instructor) => void;
  onDelete?: (id: number) => void;
  onCreate?: () => void;
}

export function InstructoresGrid({ instructores, loading, onEdit, onDelete, onCreate }: InstructoresGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-72 vision-glass-window animate-pulse flex flex-col p-8 gap-8 border-brand/10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-zinc-200" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-zinc-200 rounded w-3/4" />
                <div className="h-3 bg-zinc-200 rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-4 mt-4">
              <div className="h-10 bg-zinc-100 rounded-xl w-full" />
              <div className="h-10 bg-zinc-100 rounded-xl w-full" />
            </div>
            <div className="mt-auto h-10 bg-zinc-50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!instructores || instructores.length === 0) {
    return (
      <ModuleEmptyState
        icon={UserCheck}
        title="Sin instructores registrados"
        description="Aún no se han dado de alta instructores en el sistema. Agrégalos para poder asignarlos a los talleres de capacitación."
        action={{
          label: "Registrar Instructor",
          icon: Plus,
          onClick: onCreate
        }}
        gradient="from-fundacion-verde to-fundacion-verde-light"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
      {instructores.map((instructor) => (
        <InstructorCard 
          key={instructor.idInstructor} 
          instructor={instructor} 
          onEdit={() => onEdit?.(instructor)}
          onDelete={() => onDelete?.(instructor.idInstructor)}
        />
      ))}
    </div>
  );
}
