import { useState, useCallback } from 'react';
import { Taller } from '../domain/models/Taller';
import { Instructor } from '../domain/models/Instructor';
import { tallerRepository } from '../infrastructure/api/TallerRepository';
import { instructorRepository } from '../infrastructure/api/InstructorRepository';
import { etapaRepository } from '../infrastructure/api/EtapaRepository';
import { useOperation } from '@/core/hooks/useOperation';

export const useTalleres = () => {
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [instructores, setInstructores] = useState<Instructor[]>([]);
  const [tiposTaller, setTiposTaller] = useState<{id: number, descripcion: string}[]>([]);

  const { execute: fetchTalleres, loading: loadingTalleres } = useOperation(
    () => tallerRepository.getAll(),
    { onSuccess: data => setTalleres(Array.isArray(data) ? data : []), showToast: false }
  );

  const { execute: fetchInstructores, loading: loadingInstructores } = useOperation(
    () => instructorRepository.getAll(),
    { onSuccess: data => setInstructores(Array.isArray(data) ? data : []), showToast: false }
  );

  const fetchTiposTaller = useCallback(async () => {
    try {
      const data = await etapaRepository.getEtapaCampos();
      if (data && Array.isArray(data.tiposEtapa)) {
        setTiposTaller(data.tiposEtapa);
      }
    } catch (error) {
      console.error('Error fetching tipos de taller:', error);
    }
  }, []);

  const { execute: execSaveTaller, loading: loadingSaveTaller } = useOperation(
    (data: Partial<Taller>) => {
      if (data.id) return tallerRepository.update(data.id, data as Record<string, unknown>);
      return tallerRepository.create(data as Record<string, unknown>);
    },
    { onSuccess: () => fetchTalleres() }
  );

  const { execute: deleteTaller, loading: loadingDeleteTaller } = useOperation(
    (id: number) => tallerRepository.delete(id),
    { onSuccess: () => fetchTalleres() }
  );

  const { execute: execSaveInstructor, loading: loadingSaveInstructor } = useOperation(
    (data: Partial<Instructor>) => {
      if (data.idInstructor) return instructorRepository.update(data.idInstructor, data as Record<string, unknown>);
      return instructorRepository.create(data as Record<string, unknown>);
    },
    { onSuccess: () => fetchInstructores() }
  );

  const { execute: deleteInstructor, loading: loadingDeleteInstructor } = useOperation(
    (id: number) => instructorRepository.delete(id),
    { onSuccess: () => fetchInstructores() }
  );

  const getInstructorPhotoUrl = (id: number) => {
    return instructorRepository.getPhotoUrl(id);
  };

  return {
    loading: loadingTalleres || loadingInstructores || loadingSaveTaller || loadingDeleteTaller || loadingSaveInstructor || loadingDeleteInstructor,
    talleres,
    instructores,
    tiposTaller,
    fetchTalleres,
    fetchInstructores,
    fetchTiposTaller,
    saveTaller: execSaveTaller,
    deleteTaller,
    saveInstructor: execSaveInstructor,
    deleteInstructor,
    getInstructorPhotoUrl,
  };
};
