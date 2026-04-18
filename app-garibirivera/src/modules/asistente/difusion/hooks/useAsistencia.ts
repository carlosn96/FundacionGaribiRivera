import { useState, useCallback } from 'react';
import { asistenciaRepository } from '../infrastructure/api/AsistenciaRepository';
import { AsistenciaEmprendedor, AsistenciaTallerResumen } from '../domain/models/Asistencia';
import { EtapaFormacion } from '../domain/models/Etapa';
import { useOperation } from '@/core/hooks/useOperation';

export function useAsistencia() {
  const [etapas, setEtapas] = useState<EtapaFormacion[]>([]);
  const [talleres, setTalleres] = useState<AsistenciaTallerResumen[]>([]);
  const [emprendedores, setEmprendedores] = useState<AsistenciaEmprendedor[]>([]);

  // Usamos useOperation para centralizar el estado de la operación principal de carga
  const { 
    execute: fetchTalleresEtapaActual, 
    loading: loadingTalleres, 
    error: errorTalleres 
  } = useOperation(() => asistenciaRepository.getTalleresEtapaActual(), {
    onSuccess: setTalleres
  });

  const { 
    execute: fetchTalleresPorEtapa, 
    loading: loadingEtapa, 
    error: errorEtapa 
  } = useOperation((idEtapa: number) => asistenciaRepository.getTalleresPorEtapa(idEtapa), {
    onSuccess: setTalleres
  });

  const { 
    execute: fetchEmprendedoresPorEtapaTaller, 
    loading: loadingEmprendedores, 
    error: errorEmprendedores 
  } = useOperation((idEtapa: number, idTaller: number) => asistenciaRepository.getEmprendedoresPorEtapaTaller(idEtapa, idTaller), {
    onSuccess: setEmprendedores
  });

  // Para el registro, podemos usar un estado local o el de useOperation
  const { 
    execute: execRegistrarAsistencia, 
    loading: registering, 
    error: errorRegistro 
  } = useOperation((idEtapa: number, idTaller: number, data: any) => asistenciaRepository.registrarAsistencia(idEtapa, idTaller, data));

  const registrarAsistencia = useCallback(async (idEtapa: number, idTaller: number, idAsistente: number, asiste: boolean, observacion: string) => {
    const success = await execRegistrarAsistencia(idEtapa, idTaller, {
      idAsistente,
      asiste: asiste ? 1 : 0,
      observacion
    });
    
    if (success) {
      // Update local state optimistic/confirmado
      setEmprendedores(prev => prev.map(emp => 
        emp.emprendedor.id === idAsistente ? { ...emp, asiste, observacion } : emp
      ));
    }
    return success;
  }, [execRegistrarAsistencia]);

  return {
    etapas,
    talleres,
    emprendedores,
    loading: loadingTalleres || loadingEtapa || loadingEmprendedores || registering,
    error: errorTalleres || errorEtapa || errorEmprendedores || errorRegistro,
    fetchTalleresEtapaActual,
    fetchTalleresPorEtapa,
    fetchEmprendedoresPorEtapaTaller,
    registrarAsistencia,
    setEmprendedores,
    setEtapas // Agregado por si se necesita
  };
}
