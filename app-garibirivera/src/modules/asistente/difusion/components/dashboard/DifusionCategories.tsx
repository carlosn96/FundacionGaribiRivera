"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Layers, 
  ArrowRight,
  UserCheck,
  ListTodo,
  Users
} from 'lucide-react';
import { VisionGlassWindow } from '@/core/components/ui/vision-glass';

export function DifusionCategories() {
  const categories = [
    {
      id: 'etapas',
      title: 'Gestión de Etapas',
      desc: 'Configuración y seguimiento de las fases del programa de difusión.',
      icon: Layers,
      gradient: 'from-fundacion-verde to-fundacion-verde-light',
      href: '/asistente/difusion/etapas',
      options: 3
    },
    {
      id: 'instructores',
      title: 'Instructores',
      desc: 'Directorio y asignación de instructores para los talleres activos.',
      icon: UserCheck,
      gradient: 'from-fundacion-verde to-fundacion-verde-light',
      href: '/asistente/difusion/instructores',
      options: 2
    },
    {
      id: 'seguimiento',
      title: 'Línea Base',
      desc: 'Administración de cuestionarios y evaluaciones iniciales de emprendedores.',
      icon: ListTodo,
      gradient: 'from-fundacion-verde to-fundacion-verde-light',
      href: '/asistente/difusion/linea-base',
      options: 4
    }
  ];

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center gap-2 px-1">
        <Users className="w-5 h-5 text-[var(--text-secondary)]" />
        <h2 className="text-xl font-bold vision-text-primary">Gestión de Módulo</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <VisionGlassWindow 
              className="p-6 cursor-pointer group hover:border-fundacion-verde-light/30 transition-all duration-300 flex flex-col h-full border-b-2 border-transparent hover:border-b-fundacion-verde-light dark:hover:border-b-fundacion-amarillo"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-[var(--vision-radius-medium)] bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold vision-text-primary group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-colors">
                    {category.title}
                  </h3>
                  <span className="text-xs font-semibold vision-badge-brand px-2 py-0.5 rounded-full">
                    {category.options} opciones
                  </span>
                </div>
              </div>
              
              <p className="vision-caption vision-text-secondary flex-1">
                {category.desc}
              </p>
              
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[var(--text-secondary)] group-hover:text-fundacion-verde-light dark:group-hover:text-fundacion-amarillo transition-colors">
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </VisionGlassWindow>
          </Link>
        ))}
      </div>
    </div>
  );
}
