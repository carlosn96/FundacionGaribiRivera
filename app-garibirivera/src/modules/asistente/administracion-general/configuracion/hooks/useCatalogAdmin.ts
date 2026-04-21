"use client";

import { useState, useCallback, useEffect } from 'react';
import { catalogRepository } from '@/modules/asistente/administracion-general/configuracion/infrastructure/api/CatalogRepository';
import { CatalogMap, CatalogEntry } from '@/modules/asistente/administracion-general/configuracion/schemas/configuracion.schema';
import { useOperation } from '@/core/hooks/useOperation';

export function useCatalogAdmin() {
  const [catalogos, setCatalogos] = useState<CatalogMap | null>(null);
  const [newValue, setNewValue] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState<string>("");

  const { execute: loadCatalogos, loading: loadingCatalogos } = useOperation(
    () => catalogRepository.getAll(),
    {
      onSuccess: (data: any) => {
        setCatalogos(data);
        if (!selectedCatalog && Object.keys(data).length > 0) {
          setSelectedCatalog(Object.keys(data)[1]); // Skip the first one if it's special
        }
      },
      showToast: false
    }
  );

  useEffect(() => {
    loadCatalogos();
  }, [loadCatalogos]);

  const { execute: execAdd, loading: addingValue } = useOperation(
    (catalog: string, value: string) => catalogRepository.addValue(catalog, value),
    {
      onSuccess: () => {
        setNewValue("");
        loadCatalogos();
      }
    }
  );

  const { execute: execDelete, loading: deletingValue } = useOperation(
    (catalog: string, id: number) => catalogRepository.deleteValue(catalog, id),
    {
      onSuccess: () => {
        loadCatalogos();
      }
    }
  );

  const handleAdd = async () => {
    if (!newValue.trim()) return;
    await execAdd(selectedCatalog, newValue);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este valor? Esto podría afectar registros existentes.")) return;
    await execDelete(selectedCatalog, id);
  };

  const catalogKeys = catalogos ? Object.keys(catalogos).filter(k => 
    !['etapaFormacion', 'message', 'status', 'success', 'ok'].includes(k) && 
    typeof catalogos?.[k] === 'object' && 
    catalogos?.[k] !== null &&
    'data' in (catalogos?.[k] as CatalogEntry)
  ) : [];

  return {
    catalogos,
    loading: loadingCatalogos || addingValue || deletingValue,
    newValue,
    setNewValue,
    selectedCatalog,
    setSelectedCatalog,
    loadCatalogos,
    handleAdd,
    handleDelete,
    catalogKeys
  };
}
