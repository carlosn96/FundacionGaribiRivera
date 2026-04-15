"use client";

import React from 'react';
import Link from 'next/link';
import { 
  VisionGlassWindow 
} from '@/core/components/ui/vision-glass';
import { 
  TrendingUp,
  LucideIcon
} from 'lucide-react';

interface QuickAction {
  id: string;
  href: string;
  icon: LucideIcon;
  text: string;
}

interface QuickActionsGridProps {
  quickActions: QuickAction[];
}

export function QuickActionsGrid({ quickActions }: QuickActionsGridProps) {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-[var(--text-secondary)]" />
        <h2 className="text-xl font-bold vision-text-primary">Accesos Rápidos</h2>
      </div>

      {quickActions.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Link key={action.id} href={action.href} className="group">
              <VisionGlassWindow className="p-5 flex flex-col items-center justify-center text-center h-full hover:border-[var(--border-brand)] hover:bg-[var(--interact-hover)] transition-all duration-300 group-active:scale-95">
                <div className="w-12 h-12 rounded-[var(--vision-radius-medium)] bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-fundacion-verde group-hover:text-white transition-all duration-300 mb-3 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                  <action.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold vision-text-primary line-clamp-2 transition-colors">
                  {action.text}
                </span>
              </VisionGlassWindow>
            </Link>
          ))}
        </div>
      ) : (
        <VisionGlassWindow className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-red-500/60" />
          </div>
          <h3 className="text-lg font-bold vision-text-primary mb-2">Sin accesos disponibles</h3>
          <p className="vision-caption vision-text-secondary">
            No tienes permisos para acceder a acciones rápidas del sistema.
          </p>
        </VisionGlassWindow>
      )}
    </div>
  );
}
