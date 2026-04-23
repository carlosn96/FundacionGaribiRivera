"use client";

import { CheckCircle2, Download, Key, Phone, Mail, RotateCcw, ShieldCheck, FileText } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionTypography, 
  VisionText,
  VisionSpringContainer,
  VisionBadge,
  VisionSurface
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { VisionAvatar } from "@/core/components/ui/vision-avatar";
import { emprendedorRepository } from "../infrastructure/api/EmprendedorRepository";
import { Emprendedor } from "../domain/models/Emprendedor";

interface EmprendedorSuccessCardProps {
  data: {
    emprendedor: Emprendedor;
    contrasenaPlano: string;
  };
  onDownload: (emprendedor: Emprendedor, contrasena: string) => void;
  onReset: () => void;
}

export function EmprendedorSuccessCard({ data, onDownload, onReset }: EmprendedorSuccessCardProps) {
  const { emprendedor, contrasenaPlano } = data;
  
  const fullFotoUrl = emprendedor.fotoUrl ? emprendedorRepository.getEmprendedorPhotoByUrl(emprendedor) : "";

  return (
    <VisionSpringContainer className="w-full max-w-4xl mx-auto">
      <VisionGlassWindow className="overflow-hidden border-brand/20">
        
        {/* Cabecera Informativa */}
        <div className="px-6 py-4 bg-fundacion-amarillo/5 border-b border-subtle flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-fundacion-amarillo flex items-center justify-center shadow-lg shadow-fundacion-amarillo/10">
              <ShieldCheck className="w-5 h-5 text-fundacion-verde" />
            </div>
            <VisionTypography variant="headline" className="text-secondary text-sm">
              Confirmación de Registro
            </VisionTypography>
          </div>
          <div className="flex items-center gap-2">
            <VisionText variant="tertiary" className="text-[10px] font-black uppercase tracking-widest opacity-40">
              ID del Emprendedor:
            </VisionText>
            <VisionBadge sentiment="brand" className="px-3 py-1 font-black text-[10px] tracking-widest">
              #{emprendedor.idEmprendedor}
            </VisionBadge>
          </div>
        </div>

        {/* Resumen del Perfil Generado */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Columna de Datos de Identidad */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <VisionAvatar 
                  src={fullFotoUrl}
                  alt={emprendedor.nombre}
                  initials={`${emprendedor.nombre.charAt(0)}${emprendedor.apellidos.charAt(0)}`}
                  className="w-16 h-16 ring-2 ring-brand/10"
                />
                <div className="min-w-0">
                  <VisionTypography variant="title-1" className="text-2xl leading-none mb-1 truncate text-primary uppercase font-bold tracking-tight">
                    {emprendedor.nombre} {emprendedor.apellidos}
                  </VisionTypography>
                  <div className="flex items-center gap-2">
                    <VisionBadge sentiment="muted" className="text-[9px] px-2 py-0.5 uppercase tracking-wider font-extrabold">
                      {emprendedor.rol}
                    </VisionBadge>
                    <VisionBadge 
                      sentiment={emprendedor.graduado ? "success" : "brand"} 
                      className="text-[9px] px-2 py-0.5 uppercase tracking-wider font-extrabold"
                    >
                      {emprendedor.graduado ? "Graduado" : "No Graduado"}
                    </VisionBadge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-black text-tertiary uppercase tracking-widest opacity-50">
                    <Mail className="w-3 h-3" /> Correo Electrónico
                  </div>
                  <VisionText className="text-sm font-semibold truncate block">{emprendedor.correoElectronico}</VisionText>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-black text-tertiary uppercase tracking-widest opacity-50">
                    <Phone className="w-3 h-3" /> Teléfono de Contacto
                  </div>
                  <VisionText className="text-sm font-semibold block">{emprendedor.numeroCelular}</VisionText>
                </div>
              </div>
            </div>

            {/* Banner de ID de Sistema sutil */}
            <div className="mt-8 pt-4 border-t border-subtle flex items-center justify-between opacity-50">
               <div className="flex items-center gap-2 text-[9px] font-bold text-tertiary uppercase tracking-[0.2em]">
                 <FileText className="w-3 h-3" /> ID interno de sistema: {emprendedor.id}
               </div>
               <VisionText className="text-[9px] font-medium italic">Alta registrada en el historial corporativo</VisionText>
            </div>
          </div>

          {/* Columna de Seguridad y Acceso */}
          <div className="md:col-span-5">
            <VisionSurface level="overlay" className="p-6 rounded-2xl border-2 border-dashed border-brand/30 bg-brand/5 flex flex-col justify-center h-full space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand">
                  <Key className="w-4 h-4" />
                  <VisionTypography variant="caption-upper" className="text-secondary opacity-80">Credencial Temporal</VisionTypography>
                </div>
                <VisionText variant="secondary" className="text-[11px] leading-snug block">
                  Esta contraseña es de uso único para el primer acceso a la plataforma.
                </VisionText>
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-brand opacity-0 group-hover:opacity-10 blur-md rounded-xl transition-opacity" />
                <div className="relative bg-surface-base border border-brand/10 p-5 rounded-xl text-center shadow-inner overflow-hidden">
                  <code className="text-2xl md:text-3xl font-mono font-black tracking-[0.15em] text-secondary break-all">
                    {contrasenaPlano}
                  </code>
                </div>
              </div>
              
              <div className="flex items-start gap-2 pt-1">
                <CheckCircle2 className="w-3 h-3 text-brand mt-0.5 shrink-0" />
                <p className="text-[10px] text-tertiary font-medium leading-tight">
                  Recuerde pedir al emprendedor que cambie su contraseña al iniciar sesión.
                </p>
              </div>
            </VisionSurface>
          </div>

        </div>

        {/* Acciones */}
        <div className="px-6 py-4 bg-secondary/5 border-t border-subtle flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button 
            onClick={onReset}
            variant="visionGlass" 
            size="visionMd"
            className="w-full sm:w-auto rounded-xl gap-2 font-bold group order-2 sm:order-1"
          >
            <RotateCcw className="w-4 h-4 opacity-40 group-hover:rotate-180 transition-transform duration-slow" />
            NUEVO REGISTRO
          </Button>

          <Button 
            onClick={() => onDownload(emprendedor, contrasenaPlano)}
            variant="visionPrimary" 
            size="visionMd"
            className="w-full sm:w-auto rounded-xl gap-2 font-black shadow-lg shadow-fundacion-amarillo/10 order-1 sm:order-2"
          >
            <Download className="w-4 h-4" />
            DESCARGAR CSV
          </Button>
        </div>

      </VisionGlassWindow>
    </VisionSpringContainer>
  );
}
