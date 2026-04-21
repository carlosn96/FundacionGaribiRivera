import { useState, useCallback, useEffect } from 'react';
import { asistenteRepository } from '@/modules/asistente/administracion-general/infrastructure/api/AsistenteRepository';
import type { UsuarioAsistente } from '../domain/models/Asistente';
import { toast } from 'sonner';
import { normalizePermissions, PERMISSIONS } from '@/modules/auth/domain/policies/Roles';
import { useOperation } from '@/core/hooks/useOperation';

export function useUsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<UsuarioAsistente[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPermission, setFilterPermission] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<Partial<UsuarioAsistente> | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UsuarioAsistente | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordUser, setPasswordUser] = useState<UsuarioAsistente | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Operación: Cargar usuarios
  const { execute: loadUsers, loading: loadingUsers } = useOperation(
    () => asistenteRepository.getAllAsistentes(),
    {
      onSuccess: (data) => {
        setUsuarios(Array.isArray(data) ? data : []);
        if (data.length > 0 && !selectedUserId) {
          setSelectedUserId(data[0].id);
        }
      },
      showToast: false // Loading users internally doesn't show toast normally
    }
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Operación: Guardar/Editar usuario
  const { execute: execSave, loading: saveLoading } = useOperation(
    async (mode: 'create' | 'edit', user: Partial<UsuarioAsistente>) => {
      if (mode === 'edit') {
        if (!user.id) return;
        return asistenteRepository.update(user.id, user);
      }

      return asistenteRepository.create(user);
    },
    {
      onSuccess: () => {
        setIsEditModalOpen(false);
        loadUsers();
      }
    }
  );

  // Operación: Eliminar usuario
  const { execute: execDelete, loading: deleteLoading } = useOperation(
    (id: number) => asistenteRepository.delete(id),
    {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        if (selectedUserId === userToDelete?.id) setSelectedUserId(null);
        loadUsers();
      }
    }
  );

  const { execute: execUpdatePassword, loading: passwordLoading } = useOperation(
    (id: number, pass: string) => asistenteRepository.updatePassword(id, pass),
    {
      onSuccess: (res) => {
        setIsPasswordModalOpen(false);
      }
    }
  );

  const filteredUsers = usuarios.filter(user => {
    const nombre = user.nombre || '';
    const apellidos = user.apellidos || '';
    const correo = user.correoElectronico || '';
    
    const matchesSearch = 
      nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      correo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const userPermsList = normalizePermissions(user.permisos);
    const matchesPermission = filterPermission ? userPermsList.map(Number).includes(Number(filterPermission)) : true;
    
    return matchesSearch && matchesPermission;
  });

  const selectedUser = usuarios.find(u => u.id === selectedUserId);

  const handleCreateClick = () => {
    setModalMode('create');
    setEditingUser({
      nombre: '',
      apellidos: '',
      correoElectronico: '',
      numeroCelular: '',
      permisos: [],
      estadoActivo: true,
      rol: ''
    });
    setIsEditModalOpen(true);
  };

  const handleEditClick = (user: UsuarioAsistente) => {
    setModalMode('edit');
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: UsuarioAsistente) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleChangePasswordClick = (user: UsuarioAsistente) => {
    setPasswordUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordModalOpen(true);
  };

  const handleUpdatePassword = async () => {
    if (!passwordUser || !newPassword) return;
    
    if (newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    await execUpdatePassword(passwordUser.id, newPassword);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    await execDelete(userToDelete.id);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    await execSave(modalMode, editingUser);
  };

  const togglePermission = (permissionId: number) => {
    if (!editingUser) return;
    const currentPerms = Array.isArray(editingUser.permisos) ? [...editingUser.permisos] : [];
    const index = currentPerms.indexOf(permissionId);
    
    if (index > -1) {
      currentPerms.splice(index, 1);
    } else {
      currentPerms.push(permissionId);
    }
    
    setEditingUser({ ...editingUser, permisos: currentPerms });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditingUser(prev => prev ? ({
          ...prev,
          fotografiaBase64: base64String.split(',')[1]
        }) : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRoleNameById = (id: number) => {
    switch(id) {
      case PERMISSIONS.ADMINISTRACION_GENERAL: return "Administración General";
      case PERMISSIONS.TRABAJO_SOCIAL: return "Trabajo Social";
      case PERMISSIONS.DIFUSION: return "Difusión";
      case PERMISSIONS.EMPRENDIMIENTO: return "Emprendimiento";
      case PERMISSIONS.CREDITO_COBRANZA: return "Crédito y Cobranza";
      case 0: return "Sin permisos";
      default: return "Permiso desconocido";
    }
  };

  const getPhotoUrl = (user: UsuarioAsistente) => {
    return asistenteRepository.getAsistentePhotoByUrl(user);
  };

  return {
    usuarios,
    loading: loadingUsers,
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
    userToDelete,
  };
}

