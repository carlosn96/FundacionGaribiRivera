import { useState, useCallback, useEffect } from 'react';
import { userRepository } from '@/modules/asistente/usuarios/infrastructure/api/UserRepository';
import type { User } from '@/modules/auth/domain/Auth';
import { useToast } from '@/core/hooks/use-toast';
import { normalizePermissions, PERMISSIONS } from '@/modules/auth/domain/Roles';
import { useOperation } from '@/core/hooks/useOperation';

export function useUsuariosAdmin() {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPermission, setFilterPermission] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Operación: Cargar usuarios
  const { execute: loadUsers, loading: loadingUsers } = useOperation(
    () => userRepository.getAllAsistentes(),
    {
      onSuccess: (data) => {
        setUsuarios(Array.isArray(data) ? data : []);
        if (data.length > 0 && !selectedUserId) {
          setSelectedUserId(data[0].id);
        }
      },
      onError: () => toast({ title: "Error", description: "No se pudieron cargar los usuarios", variant: "destructive" })
    }
  );

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Operación: Guardar/Editar usuario
  const { execute: execSave, loading: saveLoading } = useOperation(
    async (mode: 'create' | 'edit', user: Partial<User>) => {
      if (mode === 'edit') {
        if (!user.id) return;
        return userRepository.update(user.id, user);
      }
      return userRepository.create(user as User);
    },
    {
      onSuccess: () => {
        toast({ title: "Éxito", description: `Usuario ${modalMode === 'edit' ? 'actualizado' : 'creado'} correctamente` });
        setIsEditModalOpen(false);
        loadUsers();
      },
      onError: () => toast({ title: "Error", description: `No se pudo ${modalMode === 'edit' ? 'actualizar' : 'crear'} el usuario`, variant: "destructive" })
    }
  );

  // Operación: Eliminar usuario
  const { execute: execDelete, loading: deleteLoading } = useOperation(
    (id: number) => userRepository.delete(id),
    {
      onSuccess: () => {
        toast({ title: "Éxito", description: "Usuario eliminado correctamente" });
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        if (selectedUserId === userToDelete?.id) setSelectedUserId(null);
        loadUsers();
      },
      onError: () => toast({ title: "Error", description: "No se pudo eliminar el usuario", variant: "destructive" })
    }
  );

  // Operación: Actualizar contraseña
  const { execute: execUpdatePassword, loading: passwordLoading } = useOperation(
    (id: number, pass: string) => userRepository.update(id, { contrasena: pass }),
    {
      onSuccess: () => {
        toast({ title: "Éxito", description: "Contraseña actualizada correctamente" });
        setIsPasswordModalOpen(false);
      },
      onError: () => toast({ title: "Error", description: "No se pudo actualizar la contraseña", variant: "destructive" })
    }
  );

  const filteredUsers = usuarios.filter(user => {
    const matchesSearch = 
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correoElectronico.toLowerCase().includes(searchTerm.toLowerCase());
    
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

  const handleEditClick = (user: User) => {
    setModalMode('edit');
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleChangePasswordClick = (user: User) => {
    setPasswordUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordModalOpen(true);
  };

  const handleUpdatePassword = async () => {
    if (!passwordUser || !newPassword) return;
    
    if (newPassword.length < 6) {
      toast({ title: "Seguridad", description: "La contraseña debe tener al menos 6 caracteres", variant: "destructive" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({ title: "Validación", description: "Las contraseñas no coinciden", variant: "destructive" });
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
    userToDelete,
  };
}

