import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useOperation } from "@/core/hooks/useOperation";
import { lineaBaseAdminRepository } from "../infrastructure/api/LineaBaseAdminRepository";
import { LineaBaseAdminResponse } from "../domain/models/LineaBaseAdministracion";
import { Emprendedor } from "../domain/models/Emprendedor";

/**
 * Hook para la administración de Línea Base.
 * Sincronizado con los esquemas de dominio reales y optimización de tráfico.
 */
export const useLineaBaseAdmin = () => {
  const [data, setData] = useState<LineaBaseAdminResponse | null>(null);
  const [stageEmprendedores, setStageEmprendedores] = useState<Emprendedor[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // -1 representa "Histórico (Todas las Etapas)" y es manejado por la API
  const [selectedEtapaId, setSelectedEtapaId] = useState<number>(-1);
  
  const loadedEtapaIdRef = useRef<number | null>(null);

  // 1. Obtención de datos iniciales
  const { execute: fetchInitial, loading: loadingInitial } = useOperation(
    () => lineaBaseAdminRepository.getEmprendedoresEtapaActual(),
    {
      onSuccess: (res) => {
        setData(res);
        // Normalizamos el ID de etapa: si no viene uno válido del servidor, asumimos Histórico (-1)
        const etapaId = (res.etapa && !isNaN(Number(res.etapa))) ? Number(res.etapa) : -1;
        loadedEtapaIdRef.current = etapaId;
        
        // Sincronizamos el selector con la etapa resuelta por el servidor
        if (etapaId !== -1) {
          setSelectedEtapaId(etapaId);
        }
      },
      showToast: true,
      errorMessage: "Error al sincronizar con el servidor"
    }
  );

  // 2. Obtención por etapa específica (Acepta ID de etapa o -1 para histórico)
  const { execute: fetchByStage, loading: loadingStage } = useOperation(
    (id: number) => lineaBaseAdminRepository.getEmprendedoresConLineaBasePorEtapa(id),
    {
      onSuccess: (res) => {
        setStageEmprendedores(Array.isArray(res) ? res : []);
      },
      showToast: true,
    }
  );

  useEffect(() => {
    fetchInitial();
  }, [fetchInitial]);

  // Efecto de control de filtrado: dispara la petición si el ID es distinto al cargado inicialmente
  useEffect(() => {
    // IMPORTANTE: No disparamos filtrado hasta que la carga inicial nos diga qué etapa estamos viendo.
    // Esto evita que al montar el componente se dispare un fetchByStage(-1) paralelo al fetchInitial().
    if (loadedEtapaIdRef.current === null) return;

    // Si el ID seleccionado coincide con la etapa que el servidor ya nos cargó, usamos data local
    if (selectedEtapaId === loadedEtapaIdRef.current) {
      setStageEmprendedores(null);
      return;
    }

    // Para cualquier otro valor (incluyendo el -1 de histórico), invocamos a la API
    fetchByStage(selectedEtapaId);
  }, [selectedEtapaId, fetchByStage]);

  // Selección de fuente de datos
  const rawWithLB = stageEmprendedores ?? data?.emprendedores ?? [];
  const rawWithoutLB = data?.emprendedoresNoLineaBase ?? [];

  const currentWithLB = Array.isArray(rawWithLB) ? rawWithLB : [];
  const currentWithoutLB = Array.isArray(rawWithoutLB) ? rawWithoutLB : [];
  
  // Filtrado de datos (Memoizado para rendimiento y estabilidad)
  const filteredConLineaBase = useMemo(() => {
    if (!searchTerm) return currentWithLB;
    const searchLow = searchTerm.toLowerCase();
    
    return currentWithLB.filter((emp) => {
      const fullName = `${emp.nombre} ${emp.apellidos}`.toLowerCase();
      const email = (emp.correoElectronico || "").toLowerCase();
      const ref = emp.referencia?.toString() || "";
      
      return fullName.includes(searchLow) || 
             email.includes(searchLow) || 
             ref.includes(searchLow);
    });
  }, [currentWithLB, searchTerm]);

  const filteredSinLineaBase = useMemo(() => {
    if (!searchTerm) return currentWithoutLB;
    const searchLow = searchTerm.toLowerCase();
    
    return currentWithoutLB.filter((emp) => {
      const fullName = `${emp.nombre} ${emp.apellidos}`.toLowerCase();
      const email = (emp.correoElectronico || "").toLowerCase();
      const ref = emp.referencia?.toString() || "";
      
      return fullName.includes(searchLow) || 
             email.includes(searchLow) || 
             ref.includes(searchLow);
    });
  }, [currentWithoutLB, searchTerm]);

  const refresh = useCallback(() => {
    if (selectedEtapaId !== loadedEtapaIdRef.current) {
      fetchByStage(selectedEtapaId);
    } else {
      fetchInitial();
    }
  }, [selectedEtapaId, fetchByStage, fetchInitial]);

  const { execute: execDelete, loading: loadingDelete } = useOperation(
    (id: number | undefined) => lineaBaseAdminRepository.delete(id),
    {
      successMessage: "Registro eliminado",
      onSuccess: refresh,
    }
  );

  return {
    loading: loadingInitial || loadingStage || loadingDelete,
    emprendedores: filteredConLineaBase,
    emprendedoresSinLineaBase: filteredSinLineaBase,
    etapasCatalog: (data?.listaEtapas || []).map(e => ({ idEtapa: e.id, nombre: e.nombre })),
    searchTerm,
    setSearchTerm,
    selectedEtapaId,
    setSelectedEtapaId,
    refresh,
    deleteLineaBase: execDelete,
  };
};
