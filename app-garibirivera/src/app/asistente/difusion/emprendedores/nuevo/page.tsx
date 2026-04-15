"use client";

import { UserPlus, Save } from "lucide-react";
import {
  VisionGlassWindow,
  VisionSpringContainer,
  VisionTypography,
  VisionText,
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { ModuleHeader } from "@/core/components/ui/module-header";

export default function NuevoEmprendedorPage() {
  return (
    <VisionSpringContainer className="space-y-12 py-8 w-full max-w-5xl mx-auto animate-in fade-in duration-1000">
      <ModuleHeader 
        title="Registrar"
        titleHighlight="Emprendedor"
        description="Captura de información inicial para el proceso de formación y diagnóstico social."
        icon={UserPlus}
        action={{
          href: "/asistente/difusion/emprendedores/historial",
          text: "Ver Historial",
        }}
      />

      <VisionGlassWindow className="p-8 md:p-12 shadow-2xl border-brand/5 relative overflow-hidden">
        {/* Decoración sutil de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 difusion-accent-surface blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        
        <form className="space-y-12 relative z-10">
          {/* Sección: Datos personales */}
          <section className="space-y-8">
            <div className="pb-4 border-b border-[var(--border-subtle)] flex items-center justify-between gap-4">
              <div>
                <VisionTypography variant="headline" as="h2" className="vision-text-primary text-xl font-bold tracking-tight uppercase text-[13px] opacity-80">
                  Datos de Identificación Personal
                </VisionTypography>
                <VisionText variant="secondary" className="mt-1 block vision-caption font-medium italic opacity-60">
                  Información básica legal del prospecto
                </VisionText>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="vision-caption-upper vision-text-secondary font-black text-[10px] tracking-[0.2em] ml-2">
                  NOMBRE(S) COMPLETOS
                </label>
                <input
                  type="text"
                  placeholder="Ej. Juan Carlos"
                  className="vision-input-base px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="vision-caption-upper vision-text-secondary font-black text-[10px] tracking-[0.2em] ml-2">
                  APELLIDOS PATERNO Y MATERNO
                </label>
                <input
                  type="text"
                  placeholder="Ej. González Pérez"
                  className="vision-input-base px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  required
                />
              </div>
            </div>
          </section>

          {/* Sección: Información de contacto */}
          <section className="space-y-8">
            <div className="pb-4 border-b border-[var(--border-subtle)]">
              <VisionTypography variant="headline" as="h2" className="vision-text-primary text-xl font-bold tracking-tight uppercase text-[13px] opacity-80">
                Canales de Comunicación
              </VisionTypography>
              <VisionText variant="secondary" className="mt-1 block vision-caption font-medium italic opacity-60">
                Datos para seguimiento y notificaciones del programa
              </VisionText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="vision-caption-upper vision-text-secondary font-black text-[10px] tracking-[0.2em] ml-2">
                  CORREO ELECTRÓNICO
                </label>
                <input
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  className="vision-input-base px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="vision-caption-upper vision-text-secondary font-black text-[10px] tracking-[0.2em] ml-2">
                  NÚMERO CELULAR / WHATSAPP
                </label>
                <input
                  type="tel"
                  placeholder="33 1234 5678"
                  className="vision-input-base px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  required
                />
              </div>
            </div>
          </section>

          {/* ── Acciones ──────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-10 border-t border-[var(--border-subtle)]">
            <Button
              type="submit"
              variant="visionPrimary"
              size="visionLg"
              className="w-full sm:w-auto gap-3 font-black shadow-2xl px-12 order-1 sm:order-2 h-14 rounded-2xl tracking-widest text-[11px]"
            >
              <Save className="w-5 h-5" />
              FINALIZAR REGISTRO
            </Button>
            
            <Button 
                variant="visionGlass" 
                size="visionLg" 
                className="w-full sm:w-auto font-bold px-10 order-2 sm:order-1 h-14 rounded-2xl opacity-70 hover:opacity-100"
                asChild
            >
              <a href="/asistente/difusion/emprendedores/historial">
                CANCELAR
              </a>
            </Button>
          </div>
        </form>
      </VisionGlassWindow>
    </VisionSpringContainer>
  );
}
