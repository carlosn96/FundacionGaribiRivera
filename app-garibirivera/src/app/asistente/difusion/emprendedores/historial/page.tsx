"use client";

import { useEffect, useState } from "react";
import { History, UserPlus } from "lucide-react";
import { VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { useEmprendedores } from "@/modules/asistente/difusion/hooks/useEmprendedores";
import { ModuleHeader } from "@/core/components/ui/module-header";

import { HistorialFilters } from "@/modules/asistente/difusion/components/historial/HistorialFilters";
import { EmprendedorTable } from "@/modules/asistente/difusion/components/historial/EmprendedorTable";

/**
 * PÁGINA: Historial de Prospectos y Emprendedores
 * -----------------------------------------------
 * Refactorización Completa: Arquitectura Limpia y SOLID.
 */
export default function HistorialEmprendedoresPage() {
  const { emprendedores, loading, fetchEmprendedores, deleteEmprendedor } = useEmprendedores();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmprendedores();
  }, [fetchEmprendedores]);

  // Lógica de filtrado en vista (Idealmente debería estar en el hook)
  const filteredUsers = emprendedores.filter(emp => 
    `${emp.nombre} ${emp.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.correo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <VisionSpringContainer className="space-y-12 py-8 animate-in fade-in duration-1000">
      {/* 1. ENCABEZADO ESTRATÉGICO */}
      <ModuleHeader 
        title="Historial de"
        titleHighlight="Emprendedores"
        description="Base de datos centralizada de prospectos y beneficiarios del programa institucional de difusión y seguimiento social."
        icon={History}
        action={{
          href: "/asistente/difusion/emprendedores/nuevo",
          text: "Nuevo Registro",
          icon: UserPlus
        }}
      />

      {/* 2. ÁREA DE FILTRADO Y MÉTRICAS RÁPIDAS */}
      <HistorialFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        count={filteredUsers.length}
        loading={loading}
      />

      {/* 3. TABLA DE DATOS (Con Skeletons y Estados Vacíos internos) */}
      <EmprendedorTable 
        emprendedores={filteredUsers} 
        loading={loading}
        onDelete={deleteEmprendedor}
      />

    </VisionSpringContainer>
  );
}
