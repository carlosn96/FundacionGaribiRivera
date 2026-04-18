import { useState, useCallback } from 'react';
import { Emprendedor, EmprendedorFortalecimiento } from '../domain/models/Emprendedor';
import { emprendedorRepository } from '../infrastructure/api/EmprendedorRepository';
import { useOperation } from '@/core/hooks/useOperation';

export const useEmprendedores = () => {
  const [emprendedores, setEmprendedores] = useState<Emprendedor[]>([]);
  const [enFortalecimiento, setEnFortalecimiento] = useState<EmprendedorFortalecimiento[]>([]);

  const { execute: fetchEmprendedores, loading: loadingAll } = useOperation(
    () => emprendedorRepository.getAll(),
    { onSuccess: data => setEmprendedores(Array.isArray(data) ? data : []) }
  );

  const { execute: fetchEnFortalecimiento, loading: loadingFort } = useOperation(
    () => emprendedorRepository.getEnFortalecimiento(),
    { onSuccess: data => setEnFortalecimiento(Array.isArray(data) ? data : []) }
  );

  const { execute: execDelete, loading: loadingDelete } = useOperation(
    (id: number) => emprendedorRepository.delete(id),
    {
      onSuccess: (_, id) => {
        setEmprendedores(prev => prev.filter(e => e.id !== id));
        setEnFortalecimiento(prev => prev.filter(e => e.id !== id));
      }
    }
  );

  const deleteEmprendedor = useCallback(async (id: number) => {
    return execDelete(id);
  }, [execDelete]);

  return {
    loading: loadingAll || loadingFort || loadingDelete,
    emprendedores,
    enFortalecimiento,
    fetchEmprendedores,
    fetchEnFortalecimiento,
    deleteEmprendedor,
  };
};
