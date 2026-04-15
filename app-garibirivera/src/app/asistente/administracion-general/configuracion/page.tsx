"use client";

import React from 'react';
import { VisionTypography, VisionText, VisionSpringContainer } from '@/core/components/ui/vision-glass';
import { ListRestart } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { Skeleton } from '@/core/components/ui/skeleton';

// Modular Components
import { CatalogSelector } from '@/modules/asistente/configuracion/components/CatalogSelector';
import { CatalogEditor } from '@/modules/asistente/configuracion/components/CatalogEditor';

// Hooks
import { useCatalogAdmin } from '@/modules/asistente/configuracion/hooks/useCatalogAdmin';

function ConfiguracionAdminContent() {
  const {
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
  } = useCatalogAdmin();

  if (loading && !catalogos) {
    return (
      <VisionSpringContainer className="space-y-6 py-8">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full rounded-vision-lg" />
      </VisionSpringContainer>
    );
  }

  return (
    <VisionSpringContainer className="space-y-8 py-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <VisionTypography variant="title-1" className="vision-text-primary text-2xl md:text-3xl">Configuración de Parámetros</VisionTypography>
          <VisionText variant="secondary" className="text-sm mt-1">Administra los valores de los catálogos y diccionarios del sistema</VisionText>
        </div>
        <Button variant="vision" size="sm" onClick={loadCatalogos} className="rounded-vision-md bg-fundacion-verde/10 text-fundacion-verde hover:bg-fundacion-verde/20 border-transparent">
          <ListRestart className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Recargar Catálogos
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. SELECTOR DE CATÁLOGO */}
        <CatalogSelector 
          catalogKeys={catalogKeys}
          selectedCatalog={selectedCatalog}
          setSelectedCatalog={setSelectedCatalog}
          catalogos={catalogos}
        />

        {/* 2. EDITOR DE VALORES */}
        <CatalogEditor 
          selectedCatalog={selectedCatalog}
          catalogos={catalogos}
          newValue={newValue}
          setNewValue={setNewValue}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />
      </div>
    </VisionSpringContainer>
  );
}

export default function ConfiguracionAdminPage() {
  return (
    <ConfiguracionAdminContent />
  );
}
