"use client";

import { UserPlus, Save } from "lucide-react";
import {
  VisionGlassWindow,
  VisionSpringContainer,
  VisionTypography,
  VisionText,
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { PhoneInput } from "@/core/components/ui/phone-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useEmprendedores } from "@/modules/asistente/difusion/hooks/useEmprendedores";
import { EmprendedorRegistroSchema, EmprendedorRegistro } from "@/modules/asistente/difusion/domain/models/Emprendedor";
import { ModuleHeader } from "@/core/components/ui/module-header";
import { EmprendedorSuccessCard } from "@/modules/asistente/difusion/components/EmprendedorSuccessCard";

export default function NuevoEmprendedorPage() {
  const [createdData, setCreatedData] = useState<any>(null);
  const { createEmprendedor, downloadEmprendedorCSV, loading } = useEmprendedores({
    onCreateSuccess: (data) => setCreatedData(data)
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmprendedorRegistro>({
    resolver: zodResolver(EmprendedorRegistroSchema),
    defaultValues: {
      nombre: "",
      apellidos: "",
      correo: "",
      celular: ""
    }
  });

  const onSubmit = async (data: EmprendedorRegistro) => {
    await createEmprendedor(data);
  };

  const handleReset = () => {
    setCreatedData(null);
    reset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <VisionSpringContainer 
      key="nuevo-emprendedor-page"
      className="space-y-12 py-8 w-full max-w-5xl mx-auto"
    >
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

      {!createdData ? (
        <VisionGlassWindow className="p-8 md:p-12 shadow-2xl border-brand/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 difusion-accent-surface blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
          <form 
            className="space-y-12 relative z-10" 
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  <Input
                    {...register("nombre")}
                    type="text"
                    className="px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  />
                  {errors.nombre && (
                    <span className="text-red-400 text-[10px] uppercase font-bold ml-2">
                      {errors.nombre.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label className="vision-caption-upper vision-text-secondary font-black text-[10px] tracking-[0.2em] ml-2">
                    APELLIDOS PATERNO Y MATERNO
                  </label>
                  <Input
                    {...register("apellidos")}
                    type="text"
                    className="px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  />
                  {errors.apellidos && (
                    <span className="text-red-400 text-[10px] uppercase font-bold ml-2">
                      {errors.apellidos.message}
                    </span>
                  )}
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
                  <Input
                    {...register("correo")}
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  />
                  {errors.correo && (
                    <span className="text-red-400 text-[10px] uppercase font-bold ml-2">
                      {errors.correo.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <label className="vision-caption-upper vision-text-secondary font-black text-[10px] tracking-[0.2em] ml-2">
                    NÚMERO CELULAR / WHATSAPP
                  </label>
                  <PhoneInput
                    {...register("celular")}
                    className="px-6 py-4 text-sm rounded-2xl h-14 font-medium"
                  />
                  {errors.celular && (
                    <span className="text-red-400 text-[10px] uppercase font-bold ml-2">
                      {errors.celular.message}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-10 border-t border-[var(--border-subtle)]">
              <Button
                type="submit"
                variant="visionPrimary"
                size="visionLg"
                disabled={loading}
                className="w-full sm:w-auto gap-3 font-black shadow-2xl px-12 order-1 sm:order-2 h-14 rounded-2xl tracking-widest text-[11px]"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {loading ? "PROCESANDO..." : "FINALIZAR REGISTRO"}
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
      ) : (
        <EmprendedorSuccessCard 
          data={createdData} 
          onDownload={downloadEmprendedorCSV}
          onReset={handleReset} 
        />
      )}
    </VisionSpringContainer>
  );
}
