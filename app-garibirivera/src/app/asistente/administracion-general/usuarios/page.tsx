"use client";

import { useState } from 'react';

// Modular Components
import { UserSidebar } from '@/modules/asistente/administracion-general/components/UserSidebar';
import { UserList } from '@/modules/asistente/administracion-general/components/UserList';
import { UserDetail } from '@/modules/asistente/administracion-general/components/UserDetail';
import { UserModals } from '@/modules/asistente/administracion-general/components/UserModals';

// Custom Hooks
import { useUsuariosAdmin } from '@/modules/asistente/administracion-general/hooks/useUsuariosAdmin';


function UsuariosAdminContent() {
  const [mobileView, setMobileView] = useState<'list' | 'detail'>('list');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    getPhotoUrl,
    userToDelete
  } = useUsuariosAdmin();

  // Seleccionar usuario y cambiar a vista de detalle en móvil
  const handleSelectUser = (id: number | null) => {
    setSelectedUserId(id);
    if (id !== null) setMobileView('detail');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-4 lg:gap-6 animate-in fade-in duration-700 relative overflow-hidden">

      {/* SIDEBAR: Visible solo en 2xl+ o si se activa manualmente */}
      <div className={`
        ${sidebarOpen ? 'flex w-64' : 'hidden 2xl:flex 2xl:w-64'} 
        flex-col flex-shrink-0 transition-all duration-300
      `}>
        <UserSidebar 
          filterPermission={filterPermission}
          setFilterPermission={setFilterPermission}
          handleCreateClick={handleCreateClick}
          getRoleNameById={getRoleNameById}
        />
      </div>

      {/* LISTA: Visible siempre en lg+, en móvil solo si mobileView === 'list' */}
      <div className={`
        flex-1 lg:flex-none lg:w-[340px] xl:w-[360px] flex-shrink-0 flex flex-col min-w-0 min-h-0 h-full
        ${mobileView === 'detail' ? 'hidden lg:flex' : 'flex'}
      `}>
        <UserList 
          loading={loading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredUsers={filteredUsers}
          selectedUserId={selectedUserId}
          setSelectedUserId={handleSelectUser}
          getPhotoUrl={getPhotoUrl}
          filterPermission={filterPermission}
          setFilterPermission={setFilterPermission}
          handleCreateClick={handleCreateClick}
          getRoleNameById={getRoleNameById}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
      </div>

      {/* DETALLE: Visible siempre en lg+, en móvil solo si mobileView === 'detail' */}
      <div className={`
        flex-1 flex flex-col min-w-[400px] min-h-0 h-full
        ${mobileView === 'list' ? 'hidden lg:flex' : 'flex'}
      `}>
        <UserDetail 
          selectedUser={selectedUser}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleChangePasswordClick={handleChangePasswordClick}
          getRoleNameById={getRoleNameById}
          getPhotoUrl={getPhotoUrl}
          onBack={() => setMobileView('list')}
        />
      </div>

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
        getPhotoUrl={getPhotoUrl as any}
      />
    </div>
  );
}

export default function UsuariosAdminPage() {
  return <UsuariosAdminContent />;
}
