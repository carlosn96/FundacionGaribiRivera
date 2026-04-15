"use client";

import React from 'react';
import { PERMISSIONS } from '@/modules/auth/domain/Roles';
import AuthGuard from '@/modules/auth/components/AuthGuard';

// Modular Components
import { UserSidebar } from '@/modules/asistente/usuarios/components/UserSidebar';
import { UserList } from '@/modules/asistente/usuarios/components/UserList';
import { UserDetail } from '@/modules/asistente/usuarios/components/UserDetail';
import { UserModals } from '@/modules/asistente/usuarios/components/UserModals';

// Custom Hooks
import { useUsuariosAdmin } from '@/modules/asistente/usuarios/hooks/useUsuariosAdmin';

function UsuariosAdminContent() {
  const {
    loading,
    searchTerm, setSearchTerm,
    filterPermission, setFilterPermission,
    selectedUserId, setSelectedUserId,
    isEditModalOpen, setIsEditModalOpen,
    modalMode,
    editingUser, setEditingUser,
    saveLoading,
    isDeleteModalOpen, setIsDeleteModalOpen,
    deleteLoading,
    isPasswordModalOpen, setIsPasswordModalOpen,
    passwordUser,
    newPassword, setNewPassword,
    confirmPassword, setConfirmPassword,
    passwordLoading,
    filteredUsers,
    selectedUser,
    handleCreateClick,
    handleEditClick,
    handleDeleteClick,
    handleChangePasswordClick,
    handleUpdatePassword,
    handleConfirmDelete,
    handleSaveUser,
    togglePermission,
    handleImageChange,
    getRoleNameById,
    userToDelete
  } = useUsuariosAdmin();

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-in fade-in duration-700">
      {/* 1. SIDEBAR IZQUIERDO: Filtros y Permisos */}
      <UserSidebar 
        filterPermission={filterPermission}
        setFilterPermission={setFilterPermission}
        handleCreateClick={handleCreateClick}
        getRoleNameById={getRoleNameById}
      />

      {/* 2. LISTA CENTRAL: Usuarios */}
      <UserList 
        loading={loading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredUsers={filteredUsers}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />

      {/* 3. PANEL DERECHO: Detalle del Usuario */}
      <UserDetail 
        selectedUser={selectedUser}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleChangePasswordClick={handleChangePasswordClick}
        getRoleNameById={getRoleNameById}
      />

      {/* MODALES DEL MÓDULO */}
      <UserModals 
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        modalMode={modalMode}
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        saveLoading={saveLoading}
        handleSaveUser={handleSaveUser}
        togglePermission={togglePermission}
        handleImageChange={handleImageChange}
        getRoleNameById={getRoleNameById}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        userToDelete={userToDelete}
        deleteLoading={deleteLoading}
        handleConfirmDelete={handleConfirmDelete}
        isPasswordModalOpen={isPasswordModalOpen}
        setIsPasswordModalOpen={setIsPasswordModalOpen}
        passwordUser={passwordUser}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        passwordLoading={passwordLoading}
        handleUpdatePassword={handleUpdatePassword}
      />
    </div>
  );
}

export default function UsuariosAdminPage() {
  return (
    <AuthGuard allowedPermissions={[PERMISSIONS.ADMINISTRACION_GENERAL]}>
      <UsuariosAdminContent />
    </AuthGuard>
  );
}

