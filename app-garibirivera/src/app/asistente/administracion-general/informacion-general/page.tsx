"use client";

import { Form } from "@/core/components/ui/form";
import { 
  VisionTypography, 
  VisionText, 
  VisionSpringContainer 
} from "@/core/components/ui/vision-glass";
import { Loader2, Building2 } from "lucide-react";
import { PERMISSIONS } from "@/modules/auth/domain/policies/Roles";
import AuthGuard from "@/modules/auth/components/AuthGuard";

// Clean Architecture Components
import { LegalIdentitySection } from "@/modules/asistente/administracion-general/informacion-general/components/LegalIdentitySection";
import { AddressSection } from "@/modules/asistente/administracion-general/informacion-general/components/AddressSection";
import { WitnessSection } from "@/modules/asistente/administracion-general/informacion-general/components/WitnessSection";
import { ActionSidebar } from "@/modules/asistente/administracion-general/informacion-general/components/ActionSidebar";

// Hooks & Logic
import { useConfiguracionForm } from "@/modules/asistente/administracion-general/informacion-general/hooks/useConfiguracionForm";

function InformacionInstitucionalContent() {
  const { form, isLoading, isSaving, onSubmit } = useConfiguracionForm();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-fundacion-verde opacity-50" />
        <VisionText variant="secondary" className="animate-pulse">Cargando configuración institucional...</VisionText>
      </div>
    );
  }

  return (
    <VisionSpringContainer className="space-y-8 max-w-6xl mx-auto p-4 md:p-8">
      {/* Header Seccion */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-6">
        <div>
          <VisionTypography as="h1" variant="title-large" className="vision-text-primary flex items-center gap-3">
            <div className="p-2 rounded-vision-md bg-fundacion-verde/5 text-fundacion-verde">
              <Building2 className="w-8 h-8" />
            </div>
            Información Institucional
          </VisionTypography>
          <VisionText variant="secondary" className="text-sm mt-2 block ml-14">
            Gestión de la identidad legal y domicilio para documentos oficiales.
          </VisionText>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario Principal */}
            <div className="lg:col-span-2 space-y-8">
              <LegalIdentitySection form={form} />
              <AddressSection form={form} />
              <WitnessSection form={form} />
            </div>

            {/* Acciones */}
            <div className="lg:col-span-1">
              <ActionSidebar isSaving={isSaving} />
            </div>
          </div>
        </form>
      </Form>
    </VisionSpringContainer>
  );
}

export default function InformacionInstitucionalPage() {
  return <InformacionInstitucionalContent />;
}

