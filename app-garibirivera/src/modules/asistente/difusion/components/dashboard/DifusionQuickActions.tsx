"use client";

import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp,
  UserPlus,
  ClipboardCheck,
  Presentation,
  History
} from 'lucide-react';
import { VisionGlassWindow } from '@/core/components/ui/vision-glass';

export function DifusionQuickActions() {
  const actions = [
    { id: 'nuevo', text: 'Nuevo Emprendedor', href: '/asistente/difusion/emprendedores/nuevo', icon: UserPlus },
    { id: 'asistencia', text: 'Tomar Asistencia', href: '/asistente/difusion/asistencia', icon: ClipboardCheck },
    { id: 'taller', text: 'Programar Taller', href: '/asistente/difusion/talleres', icon: Presentation },
    { id: 'historial', text: 'Historial', href: '/asistente/difusion/emprendedores/historial', icon: History },
  ];

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center gap-2 px-1">
        <TrendingUp className="w-5 h-5 text-[var(--text-secondary)]" />
        <h2 className="text-xl font-bold vision-text-primary">Accesos Rápidos</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link key={action.id} href={action.href} className="group">
            <VisionGlassWindow className="p-5 flex flex-col items-center justify-center text-center h-full hover:border-fundacion-verde-light/50 hover:bg-[var(--interact-hover)] transition-all duration-300 group-active:scale-95 border-b-2 border-transparent hover:border-b-fundacion-verde-light dark:hover:border-b-fundacion-amarillo">
              <div className="w-12 h-12 rounded-[var(--vision-radius-medium)] bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-fundacion-verde group-hover:text-white transition-all duration-300 mb-3 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold vision-text-primary line-clamp-2 transition-colors group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo">
                {action.text}
              </span>
            </VisionGlassWindow>
          </Link>
        ))}
      </div>
    </div>
  );
}
