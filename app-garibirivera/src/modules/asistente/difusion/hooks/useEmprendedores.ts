import { useState, useCallback, useMemo } from 'react';
import { Emprendedor, EmprendedorFortalecimiento } from '../domain/models/Emprendedor';
import { emprendedorRepository } from '../infrastructure/api/EmprendedorRepository';
import { useOperation } from '@/core/hooks/useOperation';

export const useEmprendedores = (options?: { onCreateSuccess?: (data: any) => void }) => {
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([]);
  const [emprendedor, setEmprendedor] = useState<Emprendedor | null>(null);
  const [enFortalecimiento, setEnFortalecimiento] = useState<EmprendedorFortalecimiento[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const { execute: fetchById, loading: loadingFetch } = useOperation(
    (id: number) => emprendedorRepository.getById(id),
    { 
      onSuccess: data => setEmprendedor(data),
      showToast: false 
    }
  );

  const { execute: fetchEmprendedores, loading: loadingAll } = useOperation(
    () => emprendedorRepository.getAll(),
    { onSuccess: data => setEmprendedores(Array.isArray(data) ? data : []), showToast: false }
  );

  const filteredEmprendedores = useMemo(() => {
    if (!searchTerm) return emprendedores;
    const lowerSearch = searchTerm.toLowerCase();
    return emprendedores.filter(emp => 
      `${emp.nombre} ${emp.apellidos}`.toLowerCase().includes(lowerSearch) ||
      emp.correoElectronico?.toLowerCase().includes(lowerSearch)
    );
  }, [emprendedores, searchTerm]);

  const { execute: fetchEnFortalecimiento, loading: loadingFort } = useOperation(
    () => emprendedorRepository.getEnFortalecimiento(),
    { onSuccess: data => setEnFortalecimiento(Array.isArray(data) ? data : []) }
  );

  const { execute: execDelete, loading: loadingDelete } = useOperation(
    (id: number) => emprendedorRepository.delete(id),
    {
      successMessage: "Emprendedor eliminado correctamente",
      onSuccess: (_, id) => {
        setEmprendedores(prev => prev.filter(e => e.id !== id));
        setEnFortalecimiento(prev => prev.filter(e => e.id !== id));
      }
    }
  );

  const deleteEmprendedor = useCallback(async (id: number) => {
    return execDelete(id);
  }, [execDelete]);

  const getEmprendedorPhoto = useCallback((emp: Emprendedor) => {
    return emprendedorRepository.getEmprendedorPhotoByUrl(emp);
  }, []);

  const { execute: createEmprendedor, loading: loadingCreate } = useOperation(
    (data: Record<string, unknown>) => emprendedorRepository.create(data),
    {
      successMessage: (data) => `Registro exitoso. Contraseña temporal: ${data.contrasenaPlano}`,
      errorMessage: "No se pudo registrar al emprendedor. Verifique los datos.",
      onSuccess: (data) => options?.onCreateSuccess?.(data)
    }
  );

  const { execute: execResetPassword, loading: loadingResetPassword } = useOperation(
    (id: number, password?: string) => emprendedorRepository.updatePassword(id, password),
    {
      successMessage: (data) => `Contraseña restablecida: ${data.contrasena}`,
      errorMessage: "No se pudo restablecer la contraseña",
      onSuccess: (data) => {
        setEmprendedores(prev => prev.map(e => e.id === data.emprendedor.id ? data.emprendedor : e));
      }
    }
  );

  const resetPassword = useCallback(async (id: number, password?: string): Promise<{ contrasena: string; emprendedor: Emprendedor } | undefined> => {
    return execResetPassword(id, password);
  }, [execResetPassword]);

  const downloadEmprendedorCSV = useCallback((emprendedor: any, contrasenaPlano: string) => {
    const headers = ["ID", "Nombre", "Apellidos", "Correo", "Celular", "Contrasena_Temporal"];
    const row = [
      emprendedor.id,
      `"${emprendedor.nombre}"`,
      `"${emprendedor.apellidos}"`,
      emprendedor.correoElectronico || "",
      emprendedor.numeroCelular || "",
      contrasenaPlano
    ];

    const csvContent = [headers.join(","), row.join(",")].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Registro_${emprendedor.nombre.replace(/\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return {
    loading: loadingAll || loadingFort || loadingDelete || loadingCreate || loadingResetPassword,
    emprendedores: filteredEmprendedores, 
    allEmprendedores: emprendedores,
    enFortalecimiento,
    searchTerm,
    setSearchTerm,
    fetchEmprendedores,
    fetchEnFortalecimiento,
    deleteEmprendedor,
    createEmprendedor,
    resetPassword,
    getEmprendedorPhoto,
    downloadEmprendedorCSV,
    fetchById,
    loadingFetch,
    emprendedor
  };
};
