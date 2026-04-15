"use client";

import React from 'react';
import { Button } from '@/core/components/ui/button';
import { 
  VisionGlassWindow, 
  VisionText 
} from '@/core/components/ui/vision-glass';
import { 
  Users, 
  Plus, 
  Shield, 
  Heart, 
  RefreshCw, 
  Briefcase, 
  CreditCard,
  LucideIcon
} from 'lucide-react';
import { PERMISSIONS } from '@/modules/auth/domain/Roles';

const PERMISSION_ICONS: Record<number, LucideIcon> = {
  [PERMISSIONS.ADMINISTRACION_GENERAL]: Shield,
  [PERMISSIONS.TRABAJO_SOCIAL]: Heart,
  [PERMISSIONS.DIFUSION]: RefreshCw,
  [PERMISSIONS.EMPRENDIMIENTO]: Briefcase,
  [PERMISSIONS.CREDITO_COBRANZA]: CreditCard,
};

interface UserSidebarProps {
  filterPermission: number | null;
  setFilterPermission: (id: number | null) => void;
  handleCreateClick: () => void;
  getRoleNameById: (id: number) => string;
}

export function UserSidebar({ 
  filterPermission, 
  setFilterPermission, 
  handleCreateClick,
  getRoleNameById 
}: UserSidebarProps) {
  return (
    <div className="w-64 flex-shrink-0 flex flex-col gap-6">
      <Button 
        className="w-full h-12 rounded-vision-lg bg-fundacion-verde hover:bg-fundacion-verde/90 text-white shadow-lg shadow-fundacion-verde/20 gap-2 text-md font-bold"
        onClick={handleCreateClick}
      >
        <Plus className="w-5 h-5" /> Nuevo usuario
      </Button>

      <VisionGlassWindow className="flex-1 p-2 space-y-1 border-fundacion-amarillo/10">
        <button 
          onClick={() => setFilterPermission(null)}
          className={`w-full flex items-center gap-3 p-3 rounded-vision-md transition-all ${!filterPermission ? 'bg-fundacion-verde text-white' : 'hover:bg-fundacion-amarillo/10 vision-text-primary'}`}
        >
          <div className={`w-10 h-10 rounded-vision-sm flex items-center justify-center ${!filterPermission ? 'bg-white/20' : 'bg-[var(--interact-hover)] text-[var(--text-primary)]'}`}>
            <Users className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">Todos los usuarios</span>
        </button>

        <div className="pt-4 pb-2 px-3">
          <VisionText variant="secondary" className="text-[10px] font-bold uppercase tracking-widest opacity-60">Permisos de Usuario</VisionText>
        </div>

        {[PERMISSIONS.ADMINISTRACION_GENERAL, PERMISSIONS.TRABAJO_SOCIAL, PERMISSIONS.DIFUSION, PERMISSIONS.EMPRENDIMIENTO, PERMISSIONS.CREDITO_COBRANZA].map(roleId => {
          const Icon = PERMISSION_ICONS[roleId] || Shield;
          const isActive = filterPermission === roleId;
          return (
            <button 
              key={roleId}
              onClick={() => setFilterPermission(roleId)}
              className={`w-full flex items-center gap-3 p-3 rounded-vision-md transition-all ${isActive ? 'bg-fundacion-verde text-white shadow-md' : 'hover:bg-fundacion-amarillo/10 vision-text-primary'}`}
            >
              <div className={`w-10 h-10 rounded-vision-sm flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-fundacion-amarillo/5'}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--text-primary)]'}`} />
              </div>
              <span className="font-bold text-xs text-left leading-tight">{getRoleNameById(roleId)}</span>
            </button>
          );
        })}
      </VisionGlassWindow>
    </div>
  );
}

