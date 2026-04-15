"use client";

import { useState, useCallback, useEffect } from 'react';
import { CatalogAPI } from '@/modules/asistente/configuracion/infrastructure/api/CatalogAPI';
import { useToast } from '@/core/hooks/use-toast';
import { CatalogMap, CatalogEntry } from '@/modules/asistente/configuracion/schemas/configuracion.schema';

export function useCatalogAdmin() {
  const { toast } = useToast();
  const [catalogos, setCatalogos] = useState<CatalogMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [newValue, setNewValue] = useState("");
  const [selectedCatalog, setSelectedCatalog] = useState<string>("");

  const loadCatalogos = useCallback(async () => {
    try {
      setLoading(true);
      const data = (await CatalogAPI.getAll()) as unknown as CatalogMap;
      setCatalogos(data);
      if (!selectedCatalog && Object.keys(data).length > 0) {
        setSelectedCatalog(Object.keys(data)[1]); // Skip the first one if it's special
      }
    } catch {
      toast({
        title: "Error",
        description: "No se pudieron cargar los parámetros",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [selectedCatalog, toast]);

  useEffect(() => {
    loadCatalogos();
  }, [loadCatalogos]);

  const handleAdd = async () => {
    if (!newValue.trim()) return;
    try {
      await CatalogAPI.addValue(selectedCatalog, newValue);
      setNewValue("");
      loadCatalogos();
      toast({
        title: "Éxito",
        description: "Valor agregado correctamente"
      });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo agregar el valor",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Está seguro de eliminar este valor? Esto podría afectar registros existentes.")) return;
    try {
      await CatalogAPI.deleteValue(selectedCatalog, id);
      loadCatalogos();
      toast({
        title: "Eliminado",
        description: "El valor ha sido removido del catálogo"
      });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo eliminar el valor",
        variant: "destructive"
      });
    }
  };

  const catalogKeys = catalogos ? Object.keys(catalogos).filter(k => 
    !['etapaFormacion', 'message', 'status', 'success', 'ok', 'message', 'ok'].includes(k) && 
    typeof catalogos?.[k] === 'object' && 
    catalogos?.[k] !== null &&
    'data' in (catalogos?.[k] as CatalogEntry)
  ) : [];

  return {
    catalogos,
    loading,
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
