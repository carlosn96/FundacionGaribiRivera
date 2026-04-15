"use client";

import React from 'react';
import Link from 'next/link';
import { 
  VisionTypography, 
  VisionText
} from '@/core/components/ui/vision-glass';
import { 
  Plus, 
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/core/components/ui/button';

interface DashboardHeaderProps {
  userName: string;
  mainAction: {
    href: string;
    text: string;
    icon: LucideIcon;
  } | null;
}

export function DashboardHeader({ userName, mainAction }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 vision-glass-window p-6 rounded-[var(--vision-radius-large)] border-l-4 border-l-fundacion-amarillo">
      <div>
        <VisionTypography variant="title-1" className="vision-text-primary text-2xl md:text-3xl">
          ¡Bienvenido <span className="text-fundacion-amarillo">{userName}</span>!
        </VisionTypography>
        <VisionText variant="secondary" className="mt-1">
          Gestiona emprendedores, talleres y actividades en un solo lugar
        </VisionText>
      </div>
      
      {mainAction && (
        <Link href={mainAction.href} className="md:w-auto w-full">
          <Button 
            variant="visionPrimary" 
            size="visionLg" 
            className="w-full gap-2 shadow-lg hover:shadow-xl transition-all font-bold group"
          >
            {mainAction.text === 'Nuevo Emprendedor' ? <Plus className="w-5 h-5" /> : <mainAction.icon className="w-5 h-5" />}
            {mainAction.text}
            <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Button>
        </Link>
      )}
    </div>
  );
}
