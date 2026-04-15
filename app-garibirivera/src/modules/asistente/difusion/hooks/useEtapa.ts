import { useState, useCallback } from 'react';
import { EtapaFormacion } from '../domain/models/Etapa';
import { EtapaAPI } from '../infrastructure/api/EtapaAPI';

export const useEtapa = () => {
  const [loading, setLoading] = useState(false);
  const [etapas, setEtapas] = useState<EtapaFormacion[]>([]);
  const [tiposEtapa, setTiposEtapa] = useState<{id: number, descripcion: string}[]>([]);
  const [currentEtapa, setCurrentEtapa] = useState<EtapaFormacion | null>(null);

  const fetchEtapas = useCallback(async () => {
    setLoading(true);
    try {
      const data = await EtapaAPI.getAllEtapas();
      setEtapas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching etapas:', error);
      setEtapas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMetadataEtapas = useCallback(async () => {
    try {
      const resp = await EtapaAPI.getEtapaCampos();
      if (resp && resp.tiposEtapa) {
        setTiposEtapa(resp.tiposEtapa);
      }
    } catch (error) {
      console.error('Error fetching stage metadata:', error);
    }
  }, []);

  const setEtapaActual = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await EtapaAPI.setEtapaActual(id);
      await fetchEtapas();
    } catch (error) {
      console.error('Error setting actual etapa:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchEtapas]);

  const fetchEtapaActual = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await EtapaAPI.getEtapaActual();
      setCurrentEtapa(resp || null);
    } catch (error) {
      console.error('Error fetching actual etapa:', error);
      setCurrentEtapa(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeEtapa = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await EtapaAPI.deleteEtapa(id);
      await fetchEtapas();
    } catch (error) {
      console.error('Error deleting etapa:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchEtapas]);

  const addEtapa = useCallback(async (data: any) => {
    setLoading(true);
    try {
      await EtapaAPI.createEtapa(data);
      await fetchEtapas();
    } catch (error) {
      console.error('Error creating etapa:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchEtapas]);

  const updateEtapa = useCallback(async (id: number, data: any) => {
    setLoading(true);
    try {
      await EtapaAPI.updateEtapa(id, data);
      await fetchEtapas();
    } catch (error) {
      console.error('Error updating etapa:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [fetchEtapas]);

  const fetchCronograma = async (id: number) => {
    try {
      return await EtapaAPI.getEtapaCronograma(id);
    } catch (error) {
      console.error('Error fetching cronograma:', error);
      return [];
    }
  };

  return {
    loading,
    etapas,
    tiposEtapa,
    currentEtapa,
    fetchEtapas,
    fetchMetadataEtapas,
    setEtapaActual,
    fetchEtapaActual,
    removeEtapa,
    addEtapa,
    updateEtapa,
    fetchCronograma,
  };
};
