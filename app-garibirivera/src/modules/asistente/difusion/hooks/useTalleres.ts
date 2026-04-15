import { useState, useCallback } from 'react';
import { Taller } from '../domain/models/Taller';
import { Instructor } from '../domain/models/Instructor';
import { TallerAPI } from '../infrastructure/api/TallerAPI';
import { EtapaAPI } from '../infrastructure/api/EtapaAPI';

export const useTalleres = () => {
  const [loading, setLoading] = useState(false);
  const [talleres, setTalleres] = useState<Taller[]>([]);
  const [instructores, setInstructores] = useState<Instructor[]>([]);
  const [tiposTaller, setTiposTaller] = useState<{id: number, descripcion: string}[]>([]);

  const fetchTalleres = useCallback(async () => {
    setLoading(true);
    try {
      const data = await TallerAPI.getAllTalleres();
      setTalleres(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching talleres:', error);
      setTalleres([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInstructores = useCallback(async () => {
    setLoading(true);
    try {
      const data = await TallerAPI.getAllInstructores();
      setInstructores(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching instructores:', error);
      setInstructores([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTiposTaller = useCallback(async () => {
    try {
      const data = await EtapaAPI.getEtapaCampos();
      if (data && Array.isArray(data.tiposEtapa)) {
        setTiposTaller(data.tiposEtapa);
      }
    } catch (error) {
      console.error('Error fetching tipos de taller:', error);
    }
  }, []);

  const saveTaller = useCallback(async (data: Partial<Taller>) => {
    setLoading(true);
    try {
      if (data.id) {
        await TallerAPI.updateTaller(data.id, data as Record<string, unknown>);
      } else {
        await TallerAPI.createTaller(data as Record<string, unknown>);
      }
      await fetchTalleres();
    } catch (error) {
      console.error('Error saving taller:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchTalleres]);

  const deleteTaller = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await TallerAPI.deleteTaller(id);
      await fetchTalleres();
    } catch (error) {
      console.error('Error deleting taller:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchTalleres]);

  const saveInstructor = useCallback(async (data: Partial<Instructor>) => {
    setLoading(true);
    try {
      if (data.idInstructor) {
        await TallerAPI.updateInstructor(data.idInstructor, data as Record<string, unknown>);
      } else {
        await TallerAPI.createInstructor(data as Record<string, unknown>);
      }
      await fetchInstructores();
    } catch (error) {
      console.error('Error saving instructor:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchInstructores]);

  const deleteInstructor = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await TallerAPI.deleteInstructor(id);
      await fetchInstructores();
    } catch (error) {
      console.error('Error deleting instructor:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchInstructores]);

  const getInstructorPhotoUrl = (id: number) => {
    return TallerAPI.getInstructorPhotoUrl(id);
  };

  return {
    loading,
    talleres,
    instructores,
    tiposTaller,
    fetchTalleres,
    fetchInstructores,
    fetchTiposTaller,
    saveTaller,
    deleteTaller,
    saveInstructor,
    deleteInstructor,
    getInstructorPhotoUrl,
  };
};
