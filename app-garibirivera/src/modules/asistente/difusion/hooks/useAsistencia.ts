import { useState, useCallback } from 'react';
import { AsistenciaAPI } from '../infrastructure/api/AsistenciaAPI';
import { AsistenciaEmprendedor, AsistenciaTallerResumen } from '../domain/models/Asistencia';

export function useAsistencia() {
  const [etapas, setEtapas] = useState<any[]>([]);
  const [talleres, setTalleres] = useState<AsistenciaTallerResumen[]>([]);
  const [emprendedores, setEmprendedores] = useState<AsistenciaEmprendedor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEtapas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AsistenciaAPI.getEtapas();
      setEtapas(response);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al obtener etapas');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTalleresPorEtapa = useCallback(async (idEtapa: number) => {
    setLoading(true);
    try {
      const response = await AsistenciaAPI.getTalleresPorEtapa(idEtapa);
      setTalleres(response);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al obtener talleres');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEmprendedoresPorEtapaTaller = useCallback(async (idEtapa: number, idTaller: number) => {
    setLoading(true);
    try {
      const response = await AsistenciaAPI.getEmprendedoresPorEtapaTaller(idEtapa, idTaller);
      setEmprendedores(response);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al obtener asistentes');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const registrarAsistencia = useCallback(async (idEtapa: number, idTaller: number, idAsistente: number, asiste: number, observacion: string) => {
    try {
      const response = await AsistenciaAPI.registrarAsistencia(idEtapa, idTaller, {
        id_asistente: idAsistente,
        asiste,
        observacion
      });
      
      // Update local state optimistic
      setEmprendedores(prev => prev.map(emp => 
        emp.id === idAsistente ? { ...emp, asiste, observacion } : emp
      ));
      
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Error al registrar asistencia');
      throw err;
    }
  }, []);

  return {
    etapas,
    talleres,
    emprendedores,
    loading,
    error,
    fetchEtapas,
    fetchTalleresPorEtapa,
    fetchEmprendedoresPorEtapaTaller,
    registrarAsistencia,
    setEmprendedores
  };
}
