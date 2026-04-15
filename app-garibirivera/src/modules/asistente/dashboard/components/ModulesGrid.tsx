"use client";

import React from 'react';
import { 
  VisionGlassWindow 
} from '@/core/components/ui/vision-glass';
import { 
  Users, 
  Layers,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
  links: any[];
}

interface ModulesGridProps {
  visibleModules: Module[];
  onModuleSelect: (module: Module) => void;
}

export function ModulesGrid({ visibleModules, onModuleSelect }: ModulesGridProps) {
  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2">
        <Layers className="w-5 h-5 text-[var(--text-secondary)]" />
        <h2 className="text-xl font-bold vision-text-primary">Módulos del Sistema</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleModules.length > 0 ? (
          visibleModules.map((module) => (
            <VisionGlassWindow 
              key={module.id} 
              className="p-6 cursor-pointer group hover:border-[var(--border-brand)] transition-all duration-300 flex flex-col h-full"
              onClick={() => onModuleSelect(module)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-[var(--vision-radius-medium)] bg-gradient-to-br ${module.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <module.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold vision-text-primary transition-colors">
                    {module.title}
                  </h3>
                  <span className="text-xs font-semibold vision-badge-brand px-2 py-0.5 rounded-full">
                    {module.links.length} opciones
                  </span>
                </div>
              </div>
              
              <p className="vision-caption vision-text-secondary flex-1">
                {module.desc}
              </p>
              
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[var(--text-secondary)] group-hover:text-fundacion-amarillo transition-colors">
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </VisionGlassWindow>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
              <Users className="w-12 h-12 text-red-500/60" />
            </div>
            <h3 className="text-xl font-bold vision-text-primary mb-2">Sin módulos disponibles</h3>
            <p className="vision-caption vision-text-secondary max-w-md">
              No tienes permisos asignados para acceder a ningún módulo del sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
