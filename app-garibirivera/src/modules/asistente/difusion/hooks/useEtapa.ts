import { useState, useCallback } from 'react';
import { EtapaFormacion } from '../domain/models/Etapa';
import { etapaRepository } from '../infrastructure/api/EtapaRepository';
import { useOperation } from '@/core/hooks/useOperation';

export const useEtapa = () => {
  const [etapas, setEtapas] = useState<EtapaFormacion[]>([]);
  const [tiposEtapa, setTiposEtapa] = useState<{id: number, descripcion: string}[]>([]);
  const [currentEtapa, setCurrentEtapa] = useState<EtapaFormacion | null>(null);

  const { execute: getAllEtapas, loading: loadingAll } = useOperation(
    () => etapaRepository.getAllEtapas(),
    { onSuccess: data => setEtapas(Array.isArray(data) ? data : []) }
  );

  const fetchMetadataEtapas = useCallback(async () => {
    try {
      const resp = await etapaRepository.getEtapaCampos();
      if (resp && resp.tiposEtapa) {
        setTiposEtapa(resp.tiposEtapa);
      }
    } catch (error) {
      console.error('Error fetching stage metadata:', error);
    }
  }, []);

  const { execute: execSetActual, loading: loadingSetActual } = useOperation(
    (id: number) => etapaRepository.setEtapaActual(id),
    { onSuccess: () => getAllEtapas() }
  );

  const { execute: fetchEtapaActual, loading: loadingActual } = useOperation(
    () => etapaRepository.getEtapaActual(),
    { onSuccess: setCurrentEtapa }
  );

  const { execute: removeEtapa, loading: loadingDelete } = useOperation(
    (id: number) => etapaRepository.deleteEtapa(id),
    { onSuccess: () => getAllEtapas() }
  );

  const { execute: addEtapa, loading: loadingAdd } = useOperation(
    (data: Record<string, any>) => etapaRepository.createEtapa(data),
    { onSuccess: () => getAllEtapas() }
  );

  const { execute: updateEtapa, loading: loadingUpdate } = useOperation(
    (id: number, data: Record<string, any>) => etapaRepository.updateEtapa(id, data),
    { onSuccess: () => getAllEtapas() }
  );

  const fetchCronograma = async (id: number) => {
    try {
      return await etapaRepository.getEtapaCronograma(id);
    } catch (error) {
      console.error('Error fetching cronograma:', error);
      return [];
    }
  };

  return {
    loading: loadingAll || loadingSetActual || loadingActual || loadingDelete || loadingAdd || loadingUpdate,
    etapas,
    tiposEtapa,
    currentEtapa,
    fetchEtapas: getAllEtapas,
    fetchMetadataEtapas,
    setEtapaActual: execSetActual,
    fetchEtapaActual,
    removeEtapa,
    addEtapa,
    updateEtapa,
    fetchCronograma,
  };
};
