"use client";

import React from 'react';
import { 
  VisionGlassWindow, 
  VisionTypography,
  VisionBadge
} from '@/core/components/ui/vision-glass';
import { VisionAvatar } from '@/core/components/ui/vision-avatar';
import { cn } from '@/core/utils/utils';
import { 
  Users, 
  Edit2, 
  Trash2, 
  Phone, 
  Mail, 
  RefreshCw, 
  Lock,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import type { UsuarioAsistente } from '@/modules/asistente/administracion-general/domain/models/Asistente';

interface UserDetailProps {
  selectedUser: UsuarioAsistente | null | undefined;
  handleEditClick: (user: UsuarioAsistente) => void;
  handleDeleteClick: (user: UsuarioAsistente) => void;
  handleChangePasswordClick: (user: UsuarioAsistente) => void;
  getRoleNameById: (id: number) => string;
  getPhotoUrl: (user: UsuarioAsistente) => string;
  onBack?: () => void;
}

export function UserDetail({
  selectedUser,
  handleEditClick,
  handleDeleteClick,
  handleChangePasswordClick,
  getRoleNameById,
  getPhotoUrl,
  onBack
}: UserDetailProps) {
  return (
    <VisionGlassWindow className="flex-1 flex flex-col border-[var(--border-subtle)] shadow-2xl overflow-hidden bg-[var(--surface-base)]">
      {selectedUser ? (
        <>
          {/* Header con acciones */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-fundacion-amarillo/10 gap-3">
            {/* Botón volver: solo visible en < lg */}
            {onBack && (
              <Button 
                variant="outline" 
                size="icon" 
                className="lg:hidden rounded-full w-9 h-9 border-fundacion-amarillo/20 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--interact-hover)] shrink-0"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <VisionTypography variant="title-1" className="text-lg sm:text-xl flex-1 min-w-0 truncate">Detalles del usuario</VisionTypography>
            <div className="flex gap-2 shrink-0">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-9 h-9 border-fundacion-amarillo/20 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--interact-hover)]"
                onClick={() => handleEditClick(selectedUser)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-9 h-9 border-fundacion-amarillo/20 text-red-400 hover:text-red-500 hover:bg-red-500/10"
                onClick={() => handleDeleteClick(selectedUser)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Profile Header Card */}
            <VisionGlassWindow variant="lighter" className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-8 border-fundacion-amarillo/15 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fundacion-verde/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-fundacion-verde/10 transition-colors" />
              
              <div className="relative shrink-0">
                <div className="p-1 rounded-3xl bg-gradient-to-br from-fundacion-verde to-fundacion-amarillo/40 shadow-lg relative z-0">
                  <VisionAvatar 
                    src={getPhotoUrl(selectedUser)}
                    initials={`${selectedUser.nombre?.charAt(0)}${selectedUser.apellidos?.charAt(0)}`}
                    size="xl"
                    className="border-2 border-white/50"
                  />
                </div>
                <div className={cn(
                  "absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase border-2 border-white shadow-xl flex items-center gap-1.5 z-10",
                  selectedUser.estadoActivo ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                )}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  {selectedUser.estadoActivo ? 'Activo' : 'Inactivo'}
                </div>
              </div>

              <div className="relative z-10 text-center sm:text-left min-w-0">
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-black vision-text-primary tracking-tighter uppercase mb-2 break-words">
                  {selectedUser.nombre}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fundacion-verde to-fundacion-amarillo">
                    {selectedUser.apellidos}
                  </span>
                </h2>
              </div>
            </VisionGlassWindow>

            {/* Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-0 sm:px-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-vision-md bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase text-[var(--text-disabled)] leading-none mb-1">Teléfono</p>
                    <p className="text-sm sm:text-md font-bold vision-text-primary truncate">{selectedUser.numeroCelular || "Sin registrar"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-vision-md bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase text-[var(--text-disabled)] leading-none mb-1">Correo Electrónico</p>
                    <p className="text-sm sm:text-md font-bold vision-text-primary break-all">{selectedUser.correoElectronico}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-vision-md bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)] flex-shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase text-[var(--text-disabled)] leading-none mb-3">Permisos asignados</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(selectedUser.permisos) && selectedUser.permisos.length > 0 ? (
                        selectedUser.permisos.map((pId: number) => (
                          <VisionBadge key={pId} sentiment="success" className="text-[10px] px-3 py-1 font-bold uppercase tracking-tight">
                            {getRoleNameById(pId)}
                          </VisionBadge>
                        ))
                      ) : (
                        <VisionBadge sentiment="danger" className="text-[10px] px-3 py-1 font-bold uppercase">
                          Sin permisos asignados
                        </VisionBadge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 sm:pt-8 border-t border-fundacion-amarillo/10 flex justify-end">
              <Button 
                variant="outline" 
                className="rounded-vision-md border-[var(--border-default)] text-[var(--text-primary)] font-bold gap-2 hover:bg-[var(--interact-hover)]"
                onClick={() => handleChangePasswordClick(selectedUser)}
              >
                <Lock className="w-4 h-4" /> Cambiar contraseña
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-disabled)] p-8">
          <Users className="w-16 sm:w-24 h-16 sm:h-24 mb-4 opacity-10" />
          <p className="font-medium text-sm sm:text-base text-center">Selecciona un usuario para ver su perfil detallado</p>
        </div>
      )}
    </VisionGlassWindow>
  );
}
