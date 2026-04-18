"use client";

import React from 'react';
import { 
  VisionGlassWindow, 
  VisionTypography 
} from '@/core/components/ui/vision-glass';
import { 
  Users, 
  Edit2, 
  Trash2, 
  Phone, 
  Mail, 
  RefreshCw, 
  UserCheck,
  Lock
} from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import type { User } from '@/modules/auth/domain/Auth';

interface UserDetailProps {
  selectedUser: User | null | undefined;
  handleEditClick: (user: User) => void;
  handleDeleteClick: (user: User) => void;
  handleChangePasswordClick: (user: User) => void;
  getRoleNameById: (id: number) => string;
}

export function UserDetail({
  selectedUser,
  handleEditClick,
  handleDeleteClick,
  handleChangePasswordClick,
  getRoleNameById
}: UserDetailProps) {
  return (
    <VisionGlassWindow className="flex-1 flex flex-col border-[var(--border-subtle)] shadow-2xl overflow-hidden bg-[var(--surface-base)]">
      {selectedUser ? (
        <>
          <div className="p-6 flex items-center justify-between border-b border-fundacion-amarillo/10">
            <VisionTypography variant="title-1" className="text-xl">Detalles del usuario</VisionTypography>
            <div className="flex gap-2">
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

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Profile Header Card */}
            <VisionGlassWindow variant="lighter" className="p-8 flex items-center gap-6 border-fundacion-amarillo/15 shadow-lg">
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl border-2 border-[var(--border-brand)] overflow-hidden bg-[var(--interact-hover)] p-1">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    {selectedUser.fotografiaBase64 ? (
                      <img src={`data:image/jpeg;base64,${selectedUser.fotografiaBase64}`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-full h-full p-4 opacity-20" />
                    )}
                  </div>
                </div>
                <div className={`absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border-2 border-white shadow-sm ${selectedUser.estadoActivo ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                  {selectedUser.estadoActivo ? 'Activo' : 'Inactivo'}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-extrabold vision-text-primary tracking-tight">{selectedUser.nombre} {selectedUser.apellidos}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <UserCheck className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(selectedUser.permisos) && selectedUser.permisos.length > 0 ? (
                      selectedUser.permisos.map((pId: number) => (
                        <Badge key={pId} variant="outline" className="bg-fundacion-amarillo/5 border-fundacion-amarillo/20 vision-text-primary rounded-lg py-0.5 px-2 text-xs">
                          {getRoleNameById(pId)}
                        </Badge>
                      ))
                    ) : (
                      <Badge variant="outline" className="bg-red-500/5 border-red-500/20 text-red-600 rounded-lg py-0.5 px-2 text-xs">
                        Sin permisos
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </VisionGlassWindow>

            {/* Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-vision-md bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[var(--text-disabled)] leading-none mb-1">Teléfono</p>
                    <p className="text-md font-bold vision-text-primary">{selectedUser.numeroCelular || "Sin registrar"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-vision-md bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-[var(--text-disabled)] leading-none mb-1">Correo Electrónico</p>
                    <p className="text-md font-bold vision-text-primary break-all">{selectedUser.correoElectronico}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-vision-md bg-[var(--interact-hover)] flex items-center justify-center text-[var(--text-secondary)] flex-shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase text-[var(--text-disabled)] leading-none mb-3">Permisos asignados</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(selectedUser.permisos) && selectedUser.permisos.length > 0 ? (
                        selectedUser.permisos.map((pId: number) => (
                          <Badge key={pId} variant="outline" className="bg-fundacion-amarillo/5 border-fundacion-amarillo/20 vision-text-primary rounded-lg py-1 px-3">
                            {getRoleNameById(pId)}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline" className="bg-red-500/5 border-red-500/20 text-red-600 rounded-lg py-1 px-3">
                          Sin permisos asignados
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 border-t border-fundacion-amarillo/10 flex justify-end">
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
        <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-disabled)]">
          <Users className="w-24 h-24 mb-4 opacity-10" />
          <p className="font-medium">Selecciona un usuario para ver su perfil detallado</p>
        </div>
      )}
    </VisionGlassWindow>
  );
}

