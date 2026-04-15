"use client";

import React from 'react';
import { Eye, Edit, Trash2 } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionBadge 
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";

interface LineaBaseTableProps {
  ejemplos: Array<{ id: number; nombre: string; fecha: string; folio: string }>;
}

export function LineaBaseTable({ ejemplos }: LineaBaseTableProps) {
  return (
    <VisionGlassWindow className="p-0 overflow-hidden shadow-2xl border-brand/5 animate-in slide-in-from-bottom-5 duration-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-raised)]/40 backdrop-blur-md">
              {["Información del Diagnóstico", "Folio de Control", "Fecha de Aplicación", "Acciones"].map((h) => (
                <th
                  key={h}
                  className="px-10 py-7 vision-caption-upper vision-text-tertiary font-black tracking-widest text-[10px] uppercase opacity-70"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {ejemplos.map((ej) => (
              <tr
                key={ej.id}
                className="hover:bg-[var(--interact-hover)] transition-all group border-l-4 border-l-transparent hover:border-l-fundacion-verde"
              >
                <td className="px-10 py-7">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fundacion-verde to-fundacion-verde-light flex items-center justify-center text-white text-xs font-black shadow-xl shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      {ej.nombre?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold vision-text-primary text-[15px] leading-tight truncate group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-colors uppercase tracking-tight">
                        {ej.nombre}
                      </p>
                      <p className="vision-caption vision-text-tertiary mt-2 font-black tracking-widest text-[9px] uppercase opacity-40">
                        DIAGNÓSTICO SOCIAL INTEGRAL
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-7">
                  <VisionBadge
                    sentiment="brand"
                    className="px-4 py-1.5 font-black text-[10px] tracking-[0.2em] shadow-sm uppercase h-8 difusion-accent-surface difusion-accent-text"
                  >
                    {ej.folio}
                  </VisionBadge>
                </td>
                <td className="px-10 py-7">
                  <div className="flex flex-col">
                    <span className="text-sm vision-text-secondary font-bold tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                        {ej.fecha}
                    </span>
                    <span className="text-[10px] font-black tracking-[0.1em] vision-text-tertiary uppercase mt-1 opacity-60">
                        CICLO FORMACIÓN 2026
                    </span>
                  </div>
                </td>
                <td className="px-10 py-7 text-right">
                  <div className="flex flex-col sm:flex-row items-center gap-3 opacity-0 group-hover:opacity-100 transition-all justify-end translate-x-4 group-hover:translate-x-0">
                    <Button variant="visionGlass" size="icon" className="h-10 w-10 rounded-xl hover:bg-[var(--interact-hover)] difusion-accent-text shadow-sm border border-zinc-100 dark:border-zinc-800" title="Ver resultados del diagnóstico">
                      <Eye className="w-4.5 h-4.5" />
                    </Button>
                    <Button variant="visionGlass" size="icon" className="h-10 w-10 rounded-xl hover:bg-[var(--interact-hover)] difusion-accent-text shadow-sm border border-zinc-100 dark:border-zinc-800" title="Editar aplicación">
                      <Edit className="w-4.5 h-4.5" />
                    </Button>
                    <Button
                      variant="visionDestructive"
                      size="icon"
                      className="h-10 w-10 rounded-xl shadow-lg border border-red-500/10 hover:-translate-y-1 transition-all"
                      title="Eliminar registro permanentemente"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </VisionGlassWindow>
  );
}
