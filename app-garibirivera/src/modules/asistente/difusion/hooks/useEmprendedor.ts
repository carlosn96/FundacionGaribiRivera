"use client";

import { useState, useCallback } from 'react';
import { Emprendedor } from '../domain/models/Emprendedor';
import { emprendedorRepository } from '../infrastructure/api/EmprendedorRepository';
import { useOperation } from '@/core/hooks/useOperation';

/**
 * Hook para manejar las operaciones de un UNICO emprendedor (Detalle, Edición).
 */
export const useEmprendedor = () => {
  const [emprendedor, setEmprendedor] = useState<Emprendedor | null>(null);

  const { execute: fetchById, loading: loadingFetch } = useOperation(
    (id: number) => emprendedorRepository.getById(id),
    { 
      onSuccess: data => setEmprendedor(data),
      showToast: false 
    }
  );

  const getEmprendedorPhoto = useCallback(() => {
    if (!emprendedor) return "";
    return emprendedorRepository.getEmprendedorPhotoByUrl(emprendedor);
  }, [emprendedor]);

  return {
    emprendedor,
    loading: loadingFetch,
    fetchById,
    getEmprendedorPhoto
  };
};
