import { useState, useCallback, useEffect } from "react";
import { useOperation } from "@/core/hooks/useOperation";
import { lineaBaseAdminRepository } from "../infrastructure/api/LineaBaseAdminRepository";
import { EmprendedorLineaBase, LineaBaseAdminResponse } from "../domain/models/LineaBaseAdministracion";

export const useLineaBaseAdmin = () => {
  const [data, setData] = useState<LineaBaseAdminResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { execute: fetchAdminData, loading } = useOperation(
    () => lineaBaseAdminRepository.getAdminData(),
    {
      onSuccess: (res) => setData(res),
      showToast: false,
    }
  );

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  const filteredConLineaBase = (data?.emprendedores || []).filter((emp) =>
    `${emp.nombre} ${emp.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.correo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSinLineaBase = (data?.emprendedoresNoLineaBase || []).filter((emp) =>
    `${emp.nombre} ${emp.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.correo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { execute: execDelete, loading: loadingDelete } = useOperation(
    (id: number) => lineaBaseAdminRepository.delete(id),
    {
      successMessage: "Línea base eliminada correctamente",
      onSuccess: () => fetchAdminData(),
    }
  );

  const { execute: execUpdateStage, loading: loadingUpdate } = useOperation(
    ({ idLB, idEtapa }: { idLB: number; idEtapa: number }) => 
      lineaBaseAdminRepository.updateStage(idLB, idEtapa),
    {
      successMessage: "Etapa actualizada correctamente",
      onSuccess: () => fetchAdminData(),
    }
  );

  const { execute: execAdvance, loading: loadingAdvance } = useOperation(
    ({ idUser, idEtapa }: { idUser: number; idEtapa: number }) => 
      lineaBaseAdminRepository.advanceFortalecimiento(idUser, idEtapa),
    {
      successMessage: "Avance a fortalecimiento registrado",
      onSuccess: () => fetchAdminData(),
    }
  );

  return {
    loading: loading || loadingDelete || loadingUpdate || loadingAdvance,
    emprendedores: filteredConLineaBase,
    emprendedoresSinLineaBase: filteredSinLineaBase,
    etapas: data?.etapas || [],
    searchTerm,
    setSearchTerm,
    refresh: fetchAdminData,
    deleteLineaBase: execDelete,
    updateStage: execUpdateStage,
    advanceFortalecimiento: execAdvance,
  };
};
