"use client";

import React from 'react';
import { 
  ClipboardCheck,
  Calendar
} from 'lucide-react';
import { VisionGlassWindow } from '@/core/components/ui/vision-glass';

export function DifusionAgenda() {
  const events = [
    {
      title: "Taller de Finanzas",
      time: "Mañana, 10:00 AM",
      badge: "Próximo",
      badgeClass: "vision-badge-brand",
    },
    {
      title: "Evaluación de Línea Base",
      time: "En 3 días, 2:00 PM",
      badge: "Pendiente",
      badgeClass: "vision-badge-muted",
    },
  ];

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2 px-1">
        <ClipboardCheck className="w-5 h-5 difusion-accent-text" />
        <h2 className="text-xl font-bold vision-text-primary">Agenda Próxima</h2>
      </div>

      <VisionGlassWindow className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div
              key={event.title}
              className="flex items-center justify-between p-5 rounded-2xl bg-[var(--surface-raised)]/45 border border-[var(--border-subtle)] hover:bg-[var(--surface-raised)]/75 hover:border-fundacion-verde-light/20 transition-all cursor-default group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl difusion-accent-surface flex items-center justify-center difusion-accent-text">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold vision-text-primary text-sm group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-colors">
                    {event.title}
                  </p>
                  <p className="text-xs vision-text-secondary mt-1 font-medium italic">
                    {event.time}
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${event.badgeClass}`}
              >
                {event.badge}
              </span>
            </div>
          ))}
        </div>
      </VisionGlassWindow>
    </div>
  );
}
