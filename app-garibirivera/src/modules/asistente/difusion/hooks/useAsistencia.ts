import { useState, useCallback, useMemo } from 'react';
import { asistenciaRepository } from '../infrastructure/api/AsistenciaRepository';
import { emprendedorRepository } from '../infrastructure/api/EmprendedorRepository';
import { AsistenciaEmprendedor, AsistenciaTallerResumen } from '../domain/models/Asistencia';
import { EtapaFormacion } from '../domain/models/Etapa';
import { useOperation } from '@/core/hooks/useOperation';

export function useAsistencia() {
  const [talleres, setTalleres] = useState<AsistenciaTallerResumen[]>([]);
  const [emprendedores, setEmprendedores] = useState<AsistenciaEmprendedor[]>([]);
  
  // Selection states
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedEtapaId, setSelectedEtapaId] = useState<number | null>(null);
  const [selectedTallerId, setSelectedTallerId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { 
    execute: fetchTalleresEtapaActual, 
    loading: loadingTalleres, 
    error: errorTalleres 
  } = useOperation(() => asistenciaRepository.getTalleresEtapaActual(), {
    onSuccess: (data) => {
      setTalleres(data);
      if (data.length > 0) {
        // Logica adicional si se requiere al cargar actuales
      }
    },
    showToast: false
  });

  const { 
    execute: fetchTalleresPorEtapa, 
    loading: loadingEtapa, 
    error: errorEtapa 
  } = useOperation((idEtapa: number) => asistenciaRepository.getTalleresPorEtapa(idEtapa), {
    onSuccess: setTalleres,
    showToast: false
  });

  const { 
    execute: fetchEmprendedoresPorEtapaTaller, 
    loading: loadingEmprendedores, 
    error: errorEmprendedores 
  } = useOperation((idEtapa: number, idTaller: number) => asistenciaRepository.getEmprendedoresPorEtapaTaller(idEtapa, idTaller), {
    onSuccess: setEmprendedores,
    showToast: false
  });

  const { 
    execute: execRegistrarAsistencia, 
    loading: registering, 
    error: errorRegistro 
  } = useOperation((idEtapa: number, idTaller: number, data: any) => asistenciaRepository.registrarAsistencia(idEtapa, idTaller, data));

  const registrarAsistencia = useCallback(async (idAsistente: number, asiste: boolean, observacion: string) => {
    if (!selectedEtapaId || !selectedTallerId) return false;

    const success = await execRegistrarAsistencia(selectedEtapaId, selectedTallerId, {
      idAsistente,
      asiste: asiste,
      observacion
    });
    
    if (success) {
      setEmprendedores(prev => prev.map(emp => 
        emp.emprendedor.idEmprendedor === idAsistente ? { ...emp, asiste, observacion } : emp
      ));
    }
    return success;
  }, [execRegistrarAsistencia, selectedEtapaId, selectedTallerId]);

  const getEmprendedorPhoto = useCallback((emp: any) => {
    return emprendedorRepository.getEmprendedorPhotoByUrl(emp);
  }, []);

  // Handlers
  const handleYearChange = useCallback((year: string) => {
    setSelectedYear(year);
    setSelectedEtapaId(null);
    setSelectedTallerId(null);
    setTalleres([]);
    setEmprendedores([]);
  }, []);

  const handleStageChange = useCallback(async (id: number) => {
    setSelectedEtapaId(id);
    setSelectedTallerId(null);
    setEmprendedores([]);
    await fetchTalleresPorEtapa(id);
  }, [fetchTalleresPorEtapa]);

  const handleSearchTaller = useCallback(async (idTaller: number) => {
    setSelectedTallerId(idTaller);
    if (selectedEtapaId) {
      await fetchEmprendedoresPorEtapaTaller(selectedEtapaId, idTaller);
    }
  }, [selectedEtapaId, fetchEmprendedoresPorEtapaTaller]);

  // Derived data
  const filteredEmprendedores = useMemo(() => {
    if (!searchTerm) return emprendedores;
    const term = searchTerm.toLowerCase();
    return emprendedores.filter(emp => 
      emp.emprendedor.nombre?.toLowerCase().includes(term) || 
      emp.emprendedor.apellidos?.toLowerCase().includes(term) ||
      emp.emprendedor.correoElectronico?.toLowerCase().includes(term)
    );
  }, [emprendedores, searchTerm]);

  return {
    talleres,
    emprendedores: filteredEmprendedores,
    allEmprendedores: emprendedores,
    loading: loadingTalleres || loadingEtapa || loadingEmprendedores,
    isRegistering: registering,
    error: errorTalleres || errorEtapa || errorEmprendedores || errorRegistro,
    
    // State
    selectedYear,
    selectedEtapaId,
    selectedTallerId,
    searchTerm,
    setSearchTerm,
    setSelectedYear,
    setSelectedEtapaId,
    
    // Actions
    fetchTalleresEtapaActual,
    handleYearChange,
    handleStageChange,
    handleSearchTaller,
    registrarAsistencia,
    getEmprendedorPhoto,
  };
}
