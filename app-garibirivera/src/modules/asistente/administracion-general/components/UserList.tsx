"use client";

import React from 'react';
import { 
  VisionGlassWindow 
} from '@/core/components/ui/vision-glass';
import { cn } from '@/core/utils/utils';
import { 
  Search,
  Plus,
  Filter,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { Input } from '@/core/components/ui/input';
import { Skeleton } from '@/core/components/ui/skeleton';
import { Button } from '@/core/components/ui/button';
import { VisionAvatar } from '@/core/components/ui/vision-avatar';
import { VisionBadge } from '@/core/components/ui/vision-glass';
import type { UsuarioAsistente } from '@/modules/asistente/administracion-general/domain/models/Asistente';

interface UserListProps {
  loading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredUsers: UsuarioAsistente[];
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
  getPhotoUrl: (user: UsuarioAsistente) => string;
  // Props para controles inline en móvil/tablet (cuando el sidebar está oculto)
  filterPermission: number | null;
  setFilterPermission: (id: number | null) => void;
  handleCreateClick: () => void;
  getRoleNameById: (id: number) => string;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export function UserList({
  loading,
  searchTerm,
  setSearchTerm,
  filteredUsers,
  selectedUserId,
  setSelectedUserId,
  getPhotoUrl,
  filterPermission,
  setFilterPermission,
  handleCreateClick,
  getRoleNameById,
  onToggleSidebar,
  sidebarOpen
}: UserListProps) {
  return (
    <VisionGlassWindow className="flex-1 min-h-0 h-full w-full flex flex-col border-fundacion-amarillo/15 overflow-hidden shadow-xl">
      {/* Header con búsqueda + acciones inline (visible en < xl, donde no hay sidebar) */}
      <div className="p-3 sm:p-4 border-b border-fundacion-amarillo/10 flex-shrink-0 space-y-3">
        {/* Fila: Búsqueda + Botón Crear + Toggle Sidebar */}
        <div className="flex gap-2 items-center">
          {/* Toggle Sidebar Button - Visible below 2xl or if manually closed */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-11 w-11 rounded-vision-md border border-fundacion-amarillo/10 bg-fundacion-amarillo/5 text-[var(--text-secondary)]",
              sidebarOpen ? "2xl:flex" : "flex"
            )}
            onClick={onToggleSidebar}
            title={sidebarOpen ? "Contraer filtros" : "Expandir filtros"}
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
            <Input 
              placeholder="Buscar usuario..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-fundacion-amarillo/5 border-transparent focus:border-fundacion-amarillo/30 h-11 rounded-vision-md"
            />
          </div>
          <Button 
            className="2xl:hidden h-11 rounded-vision-md bg-fundacion-verde hover:bg-fundacion-verde/90 text-white shadow-lg shadow-fundacion-verde/20 gap-1.5 px-4 font-bold shrink-0"
            onClick={handleCreateClick}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo</span>
          </Button>
        </div>

        {/* Fila: Filtros rápidos por permiso (solo < 2xl) */}
        <div className="2xl:hidden flex gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-none">
          <button
            onClick={() => setFilterPermission(null)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all",
              !filterPermission
                ? "bg-fundacion-verde text-white shadow-sm"
                : "bg-fundacion-amarillo/5 vision-text-secondary hover:bg-fundacion-amarillo/10"
            )}
          >
            Todos
          </button>
          {[1, 2, 3, 4, 5].map(permId => (
            <button
              key={permId}
              onClick={() => setFilterPermission(permId === filterPermission ? null : permId)}
              className={cn(
                "shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap",
                filterPermission === permId
                  ? "bg-fundacion-verde text-white shadow-sm"
                  : "bg-fundacion-amarillo/5 vision-text-secondary hover:bg-fundacion-amarillo/10"
              )}
            >
              {getRoleNameById(permId)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className="flex-1 overflow-y-auto divide-y divide-fundacion-amarillo/5">
        {loading ? (
          Array.from({length: 6}).map((_, i) => (
            <div key={i} className="p-4 flex gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center opacity-30 italic text-sm">No se encontraron usuarios</div>
        ) : (
          filteredUsers.map(user => (
            <button 
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={cn(
                "w-full text-left p-3 sm:p-4 flex gap-3 sm:gap-4 transition-all hover:bg-fundacion-amarillo/5 border-l-4",
                selectedUserId === user.id 
                  ? "bg-fundacion-amarillo/10 border-fundacion-verde shadow-inner" 
                  : "border-transparent"
              )}
            >
              <div className="relative shrink-0">
                <VisionAvatar 
                  src={getPhotoUrl(user)}
                  initials={`${user.nombre?.charAt(0)}${user.apellidos?.charAt(0)}`}
                  size="md"
                />
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white",
                  user.estadoActivo ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500"
                )} title={user.estadoActivo ? 'Activo' : 'Inactivo'} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold vision-text-primary text-sm truncate uppercase tracking-tight">
                  {user.nombre} {user.apellidos}
                </div>
                <div className="text-[10px] vision-text-tertiary truncate font-medium opacity-70">
                  {user.correoElectronico}
                </div>
                <div className="mt-1">
                  <VisionBadge sentiment={user.rol === 'ADMIN' ? 'success' : 'muted'} className="text-[8px] px-1.5 py-0">
                    {user.rol || 'USUARIO'}
                  </VisionBadge>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </VisionGlassWindow>
  );
}
