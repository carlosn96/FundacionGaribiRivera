"use client";

import React from 'react';
import { Presentation, Calendar, MoreVertical, Edit2, Trash2, ShieldCheck, ShieldAlert } from "lucide-react";
import { Taller } from "../../domain/models/Taller";
import { InstructorAvatar } from "../shared/InstructorAvatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu";

interface TalleresTableProps {
  talleres: Taller[];
  onEdit: (taller: Taller) => void;
  onDelete: (id: number) => void;
}

export function TalleresTable({ talleres, onEdit, onDelete }: TalleresTableProps) {
  return (
    <div className="vision-glass-window overflow-hidden border-zinc-200/50">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-900/50 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Secuencia</th>
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Nombre del Taller</th>
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Módulo</th>
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Instructor</th>
              <th className="px-6 py-4 text-left text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Evaluación</th>
              <th className="px-6 py-4 text-right text-[10px] font-black vision-text-tertiary uppercase tracking-widest">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
            {talleres.map((taller) => (
              <tr 
                key={taller.id} 
                className="group hover:bg-fundacion-verde/[0.02] dark:hover:bg-fundacion-verde/[0.05] transition-colors cursor-pointer"
                onClick={() => onEdit(taller)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-500">
                      #{taller.numeroTaller}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-fundacion-verde/10 flex items-center justify-center text-fundacion-verde shrink-0">
                      <Presentation className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm vision-text-primary group-hover:text-fundacion-verde transition-colors">
                      {taller.nombre}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50">
                    {taller.tipoTaller?.descripcion || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-xs font-bold vision-text-secondary">
                    <InstructorAvatar 
                      idInstructor={taller.idInstructor}
                      nombre={taller.instructor?.nombre}
                      apellidoPaterno={taller.instructor?.apellidoPaterno}
                      size="sm"
                      className="border-2 border-white dark:border-zinc-900 shadow-sm"
                    />
                    <span className="truncate max-w-[150px]">
                      {taller.instructor?.nombreCompleto || `ID: ${taller.idInstructor}`}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {taller.evaluacionHabilitada ? (
                      <div className="flex items-center gap-1.5 text-fundacion-verde">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-tight">Activa</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-tight">Inactiva</span>
                      </div>
                    )}
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
                        <DropdownMenuItem onClick={() => onEdit(taller)} className="py-3 px-4 font-bold cursor-pointer rounded-lg mx-1 focus:bg-fundacion-verde/10 focus:text-fundacion-verde">
                          <Edit2 className="w-4 h-4 mr-2" />
                          Editar Taller
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(taller.id)} className="py-3 px-4 font-bold cursor-pointer rounded-lg mx-1 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Eliminar Taller
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
