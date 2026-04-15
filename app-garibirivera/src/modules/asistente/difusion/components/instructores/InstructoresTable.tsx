"use client";

import React from 'react';
import { User, Mail, Phone, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { Instructor } from "../../domain/models/Instructor";
import { InstructorAvatar } from "../shared/InstructorAvatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu";

interface InstructoresTableProps {
  instructores: Instructor[];
  onEdit?: (instructor: Instructor) => void;
  onDelete?: (id: number) => void;
}

export function InstructoresTable({ instructores, onEdit, onDelete }: InstructoresTableProps) {
  return (
    <div className="vision-glass-window overflow-hidden border-zinc-200/50">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Instructor</th>
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Correo</th>
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Teléfono</th>
              <th className="px-6 py-4 text-right text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
            {instructores.map((instructor) => (
              <tr 
                key={instructor.idInstructor} 
                className="group hover:bg-fundacion-verde/[0.02] dark:hover:bg-fundacion-verde/[0.05] transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <InstructorAvatar 
                      idInstructor={instructor.idInstructor}
                      nombre={instructor.nombre}
                      apellidoPaterno={instructor.apellidoPaterno}
                      size="md"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-sm vision-text-primary group-hover:text-fundacion-verde transition-colors">
                        {instructor.nombreCompleto || `${instructor.nombre} ${instructor.apellidoPaterno}`}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs font-bold vision-text-secondary opacity-80">
                    <Mail className="w-3.5 h-3.5 text-zinc-400" />
                    {instructor.correo || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs font-bold vision-text-secondary opacity-80">
                    <Phone className="w-3.5 h-3.5 text-zinc-400" />
                    {instructor.telefono || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                          <MoreVertical className="w-4 h-4 text-zinc-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
                        <DropdownMenuItem onClick={() => onEdit?.(instructor)} className="py-3 px-4 font-bold cursor-pointer rounded-lg mx-1 focus:bg-fundacion-verde/10 focus:text-fundacion-verde">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Editar Instructor
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete?.(instructor.idInstructor)} className="py-3 px-4 font-bold cursor-pointer rounded-lg mx-1 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Retirar Instructor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
