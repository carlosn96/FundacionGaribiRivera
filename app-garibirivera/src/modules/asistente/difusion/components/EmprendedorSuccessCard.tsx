"use client";

import { CheckCircle2, Download, User, Key, Phone, Mail, ArrowRight } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionTypography, 
  VisionText 
} from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";

interface EmprendedorSuccessCardProps {
  data: {
    emprendedor: {
      id: number;
      nombre: string;
      apellidos: string;
      correoElectronico: string;
      numeroCelular: string;
    };
    contrasenaPlano: string;
  };
  onDownload: (emprendedor: any, contrasena: string) => void;
  onReset: () => void;
}

export function EmprendedorSuccessCard({ data, onDownload, onReset }: EmprendedorSuccessCardProps) {
  const { emprendedor, contrasenaPlano } = data;

  return (
    <div className="w-full">
      <VisionGlassWindow className="p-1 border-brand/20 bg-brand/5 overflow-hidden">
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-brand/10">
          
          {/* Columna de Estado */}
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center bg-brand/5 md:w-1/3">
            <div className="w-20 h-20 rounded-full bg-brand/20 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-12 h-12 text-brand" />
            </div>
            <VisionTypography variant="headline" className="text-brand font-black tracking-tight mb-2">
              ¡REGISTRO COMPLETADO!
            </VisionTypography>
            <VisionText variant="secondary" className="text-xs uppercase font-bold tracking-widest opacity-60">
              ID Sistema: #{emprendedor.id}
            </VisionText>
          </div>

          {/* Columna de Datos y Credenciales */}
          <div className="p-8 md:p-12 flex-1 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Información Personal */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 opacity-50">
                  <User className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Emprendedor</span>
                </div>
                <div>
                  <VisionTypography variant="title-1" className="text-lg leading-tight uppercase font-medium">
                    {emprendedor.nombre}
                  </VisionTypography>
                  <VisionText className="text-sm opacity-70">
                    {emprendedor.apellidos}
                  </VisionText>
                </div>
              </div>

              {/* Credenciales Temporales */}
              <div className="p-4 rounded-2xl bg-brand/10 border border-brand/20 space-y-2">
                <div className="flex items-center gap-2 text-brand">
                  <Key className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Acceso Temporal</span>
                </div>
                <code className="block text-xl font-mono font-black tracking-widest text-brand">
                  {contrasenaPlano}
                </code>
                <p className="text-[9px] font-medium opacity-50 uppercase">
                  Solicitar al emprendedor que cambie su contraseña al iniciar sesión
                </p>
              </div>
            </div>

            {/* Datos de Contacto */}
            <div className="flex flex-wrap gap-6 pt-4 border-t border-brand/10">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 opacity-40" />
                <span className="font-medium">{emprendedor.correoElectronico}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 opacity-40" />
                <span className="font-medium">{emprendedor.numeroCelular}</span>
              </div>
            </div>

            {/* Acciones de la Tarjeta */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
              <Button 
                onClick={() => onDownload(emprendedor, contrasenaPlano)}
                variant="visionPrimary" 
                className="w-full sm:w-auto h-12 px-8 rounded-xl gap-2 font-black"
              >
                <Download className="w-4 h-4" />
                DESCARGAR REGISTRO (CSV)
              </Button>
              
              <Button 
                onClick={onReset}
                variant="visionGlass" 
                className="w-full sm:w-auto h-12 px-8 rounded-xl gap-2 font-bold opacity-70 hover:opacity-100"
              >
                NUEVO REGISTRO
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>
      </VisionGlassWindow>
    </div>
  );
}
