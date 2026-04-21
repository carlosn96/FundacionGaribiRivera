"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/core/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/core/components/ui/alert-dialog";
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Checkbox } from "@/core/components/ui/checkbox";
import { PhoneInput } from '@/core/components/ui/phone-input';
import { 
  Users, 
  User as UserIcon,
  Plus, 
  Edit2, 
  Trash2, 
  Mail, 
  Phone, 
  Shield, 
  RefreshCw,
  UserPlus,
  Lock,
  X,
  Camera,
  Save,
  Check
} from 'lucide-react';
import { PERMISSIONS } from '@/modules/auth/domain/policies/Roles';
import type { UsuarioAsistente } from '@/modules/asistente/administracion-general/domain/models/Asistente';

interface UserModalsProps {
  // Edit/Create Modal
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  modalMode: 'create' | 'edit';
  editingUser: Partial<UsuarioAsistente> | null;
  setEditingUser: React.Dispatch<React.SetStateAction<Partial<UsuarioAsistente> | null>>;
  saveLoading: boolean;
  handleSaveUser: () => void;
  togglePermission: (id: number) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getRoleNameById: (id: number) => string;
  getPhotoUrl: (user: Partial<UsuarioAsistente>) => string;

  // Delete Modal
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  userToDelete: UsuarioAsistente | null;
  deleteLoading: boolean;
  handleConfirmDelete: () => void;

  // Password Modal
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (open: boolean) => void;
  passwordUser: UsuarioAsistente | null;
  newPassword: string;
  setNewPassword: (p: string) => void;
  confirmPassword: string;
  setConfirmPassword: (p: string) => void;
  passwordLoading: boolean;
  handleUpdatePassword: () => void;
}

export function UserModals({
  isEditModalOpen, setIsEditModalOpen, modalMode, editingUser, setEditingUser, saveLoading, handleSaveUser, togglePermission, handleImageChange, getRoleNameById,
  isDeleteModalOpen, setIsDeleteModalOpen, userToDelete, deleteLoading, handleConfirmDelete,
  isPasswordModalOpen, setIsPasswordModalOpen, passwordUser, newPassword, setNewPassword, confirmPassword, setConfirmPassword, passwordLoading, handleUpdatePassword,
  getPhotoUrl
}: UserModalsProps) {
  return (
    <>
      {/* MODAL DE EDICIÓN / CREACIÓN */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent hideClose className="max-w-2xl p-0 overflow-hidden rounded-3xl border-fundacion-amarillo/30 shadow-2xl vision-glass-window bg-[var(--surface-base)]">
          <div className="bg-fundacion-verde/90 p-5 flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-vision-md bg-white/20 flex items-center justify-center backdrop-blur-md">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle asChild>
                <h2 className="text-xl font-bold">{modalMode === 'create' ? 'Nuevo Usuario' : 'Editar Usuario'}</h2>
              </DialogTitle>
              <DialogDescription className="text-white opacity-70 text-xs">
                {modalMode === 'create' ? 'Agregue un nuevo usuario al sistema' : 'Modifique la información del usuario'}
              </DialogDescription>
            </div>
            <button onClick={() => setIsEditModalOpen(false)} className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
            {editingUser && (
              <>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                    <UserIcon className="w-4 h-4" /> Información Personal
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold vision-text-secondary">Nombre(s) <span className="text-red-500">*</span></label>
                      <Input 
                        value={editingUser.nombre || ''} 
                        onChange={e => setEditingUser({...editingUser, nombre: e.target.value})}
                        className="bg-[var(--surface-raised)] border-transparent focus:border-[var(--border-brand)]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold vision-text-secondary">Apellido(s) <span className="text-red-500">*</span></label>
                      <Input 
                        value={editingUser.apellidos || ''} 
                        onChange={e => setEditingUser({...editingUser, apellidos: e.target.value})}
                        className="bg-[var(--surface-raised)] border-transparent focus:border-[var(--border-brand)]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                    <Mail className="w-4 h-4" /> Información de Contacto
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold vision-text-secondary">Correo Electrónico <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                        <Input
                          type="email"
                          value={editingUser.correoElectronico || ''} 
                          onChange={e => setEditingUser({...editingUser, correoElectronico: e.target.value})}
                          className="pl-10 bg-[var(--surface-raised)] border-transparent focus:border-[var(--border-brand)]"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold vision-text-secondary">Teléfono</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
                        <PhoneInput 
                          value={editingUser.numeroCelular || ''} 
                          onValueChange={values => setEditingUser({...editingUser, numeroCelular: values.value})}
                          className="pl-10 bg-[var(--surface-raised)] border-transparent focus:border-[var(--border-brand)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                    <Shield className="w-4 h-4" /> Permisos
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold vision-text-secondary">Asignar Permisos <span className="text-red-500">*</span></label>
                    <div className="p-4 rounded-vision-lg bg-[var(--surface-raised)] grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {[PERMISSIONS.ADMINISTRACION_GENERAL, PERMISSIONS.TRABAJO_SOCIAL, PERMISSIONS.DIFUSION, PERMISSIONS.EMPRENDIMIENTO, PERMISSIONS.CREDITO_COBRANZA].map(permissionId => (
                        <div key={permissionId} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`permission-${permissionId}`} 
                            checked={Array.isArray(editingUser.permisos) && editingUser.permisos.includes(permissionId)}
                            onCheckedChange={() => togglePermission(permissionId)}
                            className="w-5 h-5"
                          />
                          <label htmlFor={`permission-${permissionId}`} className="text-xs font-medium cursor-pointer leading-none">
                            {getRoleNameById(permissionId)}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm">
                    <Camera className="w-4 h-4" /> Fotografía de Perfil
                  </div>
                  <div className="p-8 rounded-vision-lg border-2 border-dashed border-[var(--border-brand)] bg-[var(--interact-hover)] flex flex-col items-center gap-6">
                    <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden relative group">
                      {editingUser.fotografiaBase64 ? (
                        <img src={`data:image/jpeg;base64,${editingUser.fotografiaBase64}`} className="w-full h-full object-cover" />
                      ) : editingUser.fotoUrl ? (
                        <img src={getPhotoUrl(editingUser)} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[var(--interact-hover)] flex items-center justify-center"><Users className="w-12 h-12 opacity-10" /></div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera className="text-white w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-vision-md border-[var(--border-default)] h-10 px-6 gap-2 bg-[var(--surface-base)] hover:bg-[var(--interact-hover)]"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <RefreshCw className="w-4 h-4" /> Seleccionar imagen
                      </Button>
                      <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <DialogFooter className="p-6 bg-[var(--interact-hover)] border-t border-[var(--border-subtle)] flex gap-3">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="rounded-vision-md h-12 px-8 font-bold border-[var(--border-default)] flex-1 sm:flex-none">
              Cancelar
            </Button>
            <Button onClick={handleSaveUser} disabled={saveLoading} className="rounded-vision-md h-12 px-8 font-bold bg-fundacion-verde text-white shadow-xl flex-1 sm:flex-none">
              {saveLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              {modalMode === 'create' ? 'Crear Usuario' : 'Actualizar Usuario'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL DE ELIMINAR */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent className="bg-[var(--surface-base)] border-[var(--border-subtle)] rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-500">
              <Trash2 className="w-5 h-5" /> ¿Está seguro de eliminar este usuario?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Esta acción no se puede deshacer. Se eliminará permanentemente a <strong>{userToDelete?.nombre} {userToDelete?.apellidos}</strong> del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading} className="rounded-vision-md border-[var(--border-default)]">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => { e.preventDefault(); handleConfirmDelete(); }}
              disabled={deleteLoading}
              className="bg-red-500 text-white hover:bg-red-600 rounded-vision-md"
            >
              {deleteLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Trash2 className="w-4 h-4 mr-2" />}
              Sí, eliminar usuario
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* MODAL DE CAMBIO DE CONTRASEÑA */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent hideClose className="max-w-md p-0 overflow-hidden rounded-3xl border-fundacion-amarillo/30 shadow-2xl vision-glass-window bg-[var(--surface-base)]">
          <div className="bg-fundacion-verde/90 p-5 flex items-center gap-4 text-white">
            <div className="w-12 h-12 rounded-vision-md bg-white/20 flex items-center justify-center backdrop-blur-md">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle asChild><h2 className="text-xl font-bold">Cambiar Contraseña</h2></DialogTitle>
              <DialogDescription className="text-white opacity-70 text-xs">
                {passwordUser ? `Actualiza el acceso para ${passwordUser.nombre}` : 'Actualiza el acceso'}
              </DialogDescription>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold vision-text-secondary">Nueva Contraseña</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]`} />
                    <Input 
                      type="password"
                      placeholder="Mínimo 6 caracteres..."
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 h-12 bg-[var(--surface-raised)] border-transparent focus:border-[var(--border-brand)]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold vision-text-secondary">Confirmar Contraseña</label>
                  <div className="relative">
                    <Check className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]`} />
                    <Input 
                      type="password"
                      placeholder="Repite la contraseña..."
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 h-12 bg-[var(--surface-raised)] border-transparent focus:border-[var(--border-brand)]`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)} className="flex-1 h-12 rounded-vision-lg border-[var(--border-subtle)] font-bold">
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdatePassword}
                disabled={passwordLoading || !newPassword || newPassword !== confirmPassword || newPassword.length < 6}
                className="flex-[2] h-12 rounded-vision-lg bg-fundacion-verde text-white font-bold"
              >
                {passwordLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Actualizar Acceso
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

