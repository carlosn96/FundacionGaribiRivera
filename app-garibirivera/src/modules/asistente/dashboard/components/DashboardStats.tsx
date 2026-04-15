"use client";

import React from 'react';
import { 
  VisionGlassWindow 
} from '@/core/components/ui/vision-glass';
import { 
  Users, 
  Presentation, 
  UserPlus, 
  Banknote, 
  PieChart 
} from 'lucide-react';

export function DashboardStats() {
  return (
    <div className="space-y-3">
      <p className="text-[var(--text-tertiary)] text-sm flex items-center justify-center gap-2">
        <PieChart className="w-4 h-4" />
        <strong>Función en desarrollo:</strong> La información mostrada es con fines ilustrativos.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Emprendedores */}
        <VisionGlassWindow className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium vision-text-secondary">Tot. Emprendedores</p>
              <h3 className="text-3xl font-bold vision-text-primary mt-1">1,026</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fundacion-verde to-fundacion-verde-light flex items-center justify-center text-white shadow-md">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 inline-flex items-center vision-badge-success text-xs font-semibold px-2 py-1 rounded-full w-max">
            + 2.5% vs mes ant.
          </div>
        </VisionGlassWindow>

        {/* Talleres */}
        <VisionGlassWindow className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium vision-text-secondary">Talleres Activos</p>
              <h3 className="text-3xl font-bold vision-text-primary mt-1">12</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-md">
              <Presentation className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <div className="h-1.5 w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-3/4"></div>
            </div>
            <p className="text-xs vision-text-tertiary">75% de capacidad</p>
          </div>
        </VisionGlassWindow>

        {/* Registros */}
        <VisionGlassWindow className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium vision-text-secondary">Nuevos</p>
              <h3 className="text-3xl font-bold vision-text-primary mt-1">78</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-md">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-4 text-xs vision-text-tertiary font-medium">Este mes</p>
        </VisionGlassWindow>

        {/* Créditos */}
        <VisionGlassWindow className="p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium vision-text-secondary">Créditos Otorg.</p>
              <h3 className="text-3xl font-bold vision-text-primary mt-1">$85k</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fundacion-amarillo to-yellow-600 flex items-center justify-center text-white shadow-md">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 inline-flex items-center vision-badge-danger text-xs font-semibold px-2 py-1 rounded-full w-max">
            - 0.23% vs mes ant.
          </div>
        </VisionGlassWindow>
      </div>
    </div>
  );
}
