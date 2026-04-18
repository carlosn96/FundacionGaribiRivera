"use client";

import React from 'react';
import { Eye, Edit, Trash2, Users, UserPlus } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionBadge 
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { Emprendedor } from "../../domain/models/Emprendedor";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";

interface EmprendedorTableProps {
  emprendedores: Emprendedor[];
  loading?: boolean;
  onDelete?: (id: number) => void;
}

export function EmprendedorTable({ emprendedores, loading, onDelete }: EmprendedorTableProps) {
  if (loading) {
    return (
      <VisionGlassWindow className="p-0 overflow-hidden shadow-xl border-zinc-200/50">
        <div className="h-20 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-100" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="px-8 py-8 flex items-center justify-between gap-8 animate-pulse border-b border-zinc-50">
            <div className="flex items-center gap-6">
              <div className="w-11 h-11 rounded-xl bg-zinc-200" />
              <div className="space-y-3">
                <div className="h-4 bg-zinc-200 rounded w-40" />
                <div className="h-3 bg-zinc-100 rounded w-24" />
              </div>
            </div>
            <div className="h-6 bg-zinc-100 rounded-lg w-32" />
            <div className="h-8 bg-zinc-100 rounded-lg w-48" />
          </div>
        ))}
      </VisionGlassWindow>
    );
  }

  if (!emprendedores || emprendedores.length === 0) {
    return (
      <ModuleEmptyState
        icon={Users}
        title="Sin emprendedores registrados"
        description="Aún no hay prospectos en el historial. Registre el primero para comenzar con el proceso de difusión y seguimiento."
        action={{
          label: "Registrar Nuevo Emprendedor",
          href: "/asistente/difusion/emprendedores/nuevo",
          icon: UserPlus
        }}
        gradient="from-fundacion-verde to-fundacion-verde-dark"
      />
    );
  }

  return (
    <VisionGlassWindow className="p-0 overflow-hidden shadow-xl border-brand/5 animate-in slide-in-from-bottom-5 fade-in duration-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-raised)]/30 backdrop-blur-sm">
              {["Información del Emprendedor", "Datos de Contacto", "Estatus del Programa", "Acciones Administrativas"].map((h) => (
                <th
                  key={h}
                  className="px-8 py-6 vision-caption-upper vision-text-tertiary font-black tracking-widest text-[9px] uppercase opacity-70"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-subtle)]">
            {emprendedores.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-[var(--interact-hover)] transition-all group border-l-4 border-l-transparent hover:border-l-fundacion-verde"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fundacion-verde to-fundacion-verde-dark flex items-center justify-center text-white text-xs font-black shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      {emp.nombre?.charAt(0)}{emp.apellidos?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold vision-text-primary text-sm leading-tight truncate group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-colors uppercase tracking-tight">
                        {emp.nombre} {emp.apellidos}
                      </p>
                      <p className="vision-caption vision-text-tertiary mt-1.5 font-black tracking-widest text-[8px] uppercase opacity-40">
                        EXPEDIENTE: {emp.id || "SIN ASIGNAR"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <p className="text-sm vision-text-secondary font-bold tracking-tight truncate max-w-[200px] opacity-80 group-hover:opacity-100 transition-opacity">
                      {emp.correoElectronico || "SIN CORREO"}
                    </p>
                    <p className="vision-caption vision-text-tertiary font-black text-[9px] tracking-widest uppercase flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-fundacion-verde" />
                        CEL: {emp.numeroCelular || "NO REGISTRADO"}
                    </p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <VisionBadge
                    sentiment={emp.graduado ? "success" : "brand"}
                    className="px-4 py-1.5 font-black text-[9px] tracking-[0.2em] border difusion-accent-border shadow-sm uppercase h-8 flex items-center"
                  >
                    {emp.graduado ? "GRADUADO" : "EN PROGRAMA"}
                  </VisionBadge>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all justify-end scale-90 group-hover:scale-100 origin-right">
                    <Button variant="visionGlass" size="icon" className="h-10 w-10 rounded-xl hover:bg-[var(--interact-hover)] hover:text-fundacion-verde-light dark:hover:text-fundacion-amarillo shadow-sm border border-zinc-100 dark:border-zinc-800" title="Ver perfil detallado">
                      <Eye className="w-4.5 h-4.5" />
                    </Button>
                    <Button variant="visionGlass" size="icon" className="h-10 w-10 rounded-xl hover:bg-[var(--interact-hover)] hover:text-fundacion-verde-light dark:hover:text-fundacion-amarillo shadow-sm border border-zinc-100 dark:border-zinc-800" title="Editar registro">
                      <Edit className="w-4.5 h-4.5" />
                    </Button>
                    <Button
                      variant="visionDestructive"
                      size="icon"
                      className="h-10 w-10 rounded-xl shadow-lg border border-red-500/10 hover:rotate-12 transition-all"
                      title="Eliminar registro permanentemente"
                      onClick={() => onDelete?.(emp.id)}
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
