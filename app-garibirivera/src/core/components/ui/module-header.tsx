"use client";

import React from 'react';
import Link from 'next/link';
import { 
  VisionTypography, 
  VisionText
} from '@/core/components/ui/vision-glass';
import { 
  ArrowRight,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/core/components/ui/button';

interface ModuleHeaderProps {
  title: string;
  titleHighlight?: string;
  description?: string;
  icon: LucideIcon;
  iconGradient?: string;
  borderLeftColor?: string;
  action?: {
    href?: string;
    text: string;
    icon?: LucideIcon;
    onClick?: () => void;
  };
}

export function ModuleHeader({ 
  title, 
  titleHighlight, 
  description, 
  icon: Icon,
  iconGradient = "from-fundacion-verde to-fundacion-verde-light",
  borderLeftColor = "border-l-fundacion-verde",
  action
}: ModuleHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 vision-glass-window p-8 rounded-[var(--vision-radius-large)] border-l-4 ${borderLeftColor}`}>
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-[var(--vision-radius-medium)] bg-gradient-to-br ${iconGradient} flex items-center justify-center text-white shadow-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          <VisionTypography variant="title-1" className="vision-text-primary text-2xl md:text-3xl">
            {title} {titleHighlight && <span className="difusion-accent-text">{titleHighlight}</span>}
          </VisionTypography>
        </div>
        {description && (
          <VisionText variant="secondary" className="max-w-2xl leading-relaxed ml-15">
            {description}
          </VisionText>
        )}
      </div>
      
      {action && (
        action.href ? (
          <Link href={action.href} className="md:w-auto w-full">
            <Button 
              variant="visionPrimary" 
              size="visionLg" 
              className="w-full gap-2 shadow-xl hover:shadow-2xl transition-all font-bold group px-8"
            >
              {action.icon && <action.icon className="w-5 h-5" />}
              {action.text}
              <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Button>
          </Link>
        ) : (
          <Button 
            variant="visionPrimary" 
            size="visionLg" 
            onClick={action.onClick}
            className="md:w-auto w-full gap-2 shadow-xl hover:shadow-2xl transition-all font-bold group px-8"
          >
            {action.icon && <action.icon className="w-5 h-5" />}
            {action.text}
            <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </Button>
        )
      )}
    </div>
  );
}
