"use client";

import React from 'react';
import { 
  Users, 
  Presentation, 
  UserPlus, 
  ListTodo,
  PieChart 
} from 'lucide-react';
import { VisionGlassWindow } from '@/core/components/ui/vision-glass';

export function DifusionStats() {
  const stats = [
    {
      label: "Emprendedores",
      value: "–",
      icon: Users,
      gradient: "from-fundacion-verde to-fundacion-verde-light",
    },
    {
      label: "Talleres Activos",
      value: "–",
      icon: Presentation,
      gradient: "from-fundacion-verde to-fundacion-verde-light",
    },
    {
      label: "Nuevos este mes",
      value: "–",
      icon: UserPlus,
      gradient: "from-fundacion-verde to-fundacion-verde-light",
    },
    {
      label: "Líneas de Base",
      value: "–",
      icon: ListTodo,
      gradient: "from-fundacion-verde to-fundacion-verde-light",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-[var(--text-tertiary)] text-sm flex items-center justify-center gap-2 opacity-70 italic font-medium">
        <PieChart className="w-4 h-4" />
        <strong>Dato informativo:</strong> Las estadísticas se actualizan en tiempo real.
      </p>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <VisionGlassWindow
            key={stat.label}
            className="p-6 flex flex-col justify-between hover:border-[var(--border-brand)] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold vision-text-secondary uppercase tracking-widest opacity-60">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold vision-text-primary mt-1">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="mt-4 text-[10px] font-medium vision-text-tertiary uppercase tracking-tighter">
              Dato preliminar
            </p>
          </VisionGlassWindow>
        ))}
      </div>
    </div>
  );
}
