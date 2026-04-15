import { useState, useCallback, useEffect } from 'react';
import { UserAPI } from '@/modules/asistente/usuarios/infrastructure/api/UserAPI';
import type { User } from '@/modules/auth/domain/Auth';
import { useToast } from '@/core/hooks/use-toast';
import { normalizePermissions, PERMISSIONS } from '@/modules/auth/domain/Roles';

export function useUsuariosAdmin() {
  const { toast } = useToast();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPermission, setFilterPermission] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordUser, setPasswordUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await UserAPI.getAllAsistentes();
      setUsuarios(data);
      if (data.length > 0 && !selectedUserId) {
        setSelectedUserId(data[0].id);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = usuarios.filter(user => {
    const matchesSearch = 
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.correo_electronico.toLowerCase().includes(searchTerm.toLowerCase());
    
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
      correo_electronico: '',
      numero_celular: '',
      permisos: [],
      estado_activo: 1,
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

    try {
      setPasswordLoading(true);
      await UserAPI.update(passwordUser.id, { contrasena: newPassword });
      toast({ title: "Éxito", description: "Contraseña actualizada correctamente" });
      setIsPasswordModalOpen(false);
    } catch (error) {
      toast({ title: "Error", description: "No se pudo actualizar la contraseña", variant: "destructive" });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      setDeleteLoading(true);
      await UserAPI.delete(userToDelete.id);
      toast({ title: "Éxito", description: "Usuario eliminado correctamente" });
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
      if (selectedUserId === userToDelete.id) {
        setSelectedUserId(null);
      }
      loadUsers();
    } catch (error) {
      toast({ title: "Error", description: "No se pudo eliminar el usuario", variant: "destructive" });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    try {
      setSaveLoading(true);
      if (modalMode === 'edit') {
        if (!editingUser.id) return;
        await UserAPI.update(editingUser.id, editingUser);
        toast({ title: "Éxito", description: "Usuario actualizado correctamente" });
      } else {
        await UserAPI.create(editingUser as User);
        toast({ title: "Éxito", description: "Usuario creado correctamente" });
      }
      setIsEditModalOpen(false);
      loadUsers();
    } catch (error) {
      toast({ title: "Error", description: `No se pudo ${modalMode === 'edit' ? 'actualizar' : 'crear'} el usuario`, variant: "destructive" });
    } finally {
      setSaveLoading(false);
    }
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
        setEditingUser({
          ...editingUser!,
          fotografia_base64: base64String.split(',')[1]
        });
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
    userToDelete,
  };
}

