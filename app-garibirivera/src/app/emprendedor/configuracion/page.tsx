"use client";

import { VisionGlassWindow, VisionTypography, VisionText, VisionSpringContainer } from "@/core/components/ui/vision-glass";
import { Settings, Construction } from "lucide-react";

export default function ConfiguracionPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center spatial-bg p-6">
      <VisionSpringContainer>
        <VisionGlassWindow className="p-12 text-center max-w-lg mx-auto flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-fundacion-amarillo/20 blur-xl rounded-full" />
            <div className="relative p-6 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
              <Settings className="w-16 h-16 text-fundacion-amarillo animate-spin-slow" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-fundacion-verde text-white p-2 rounded-full border-2 border-white/20">
              <Construction className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-4">
            <VisionTypography variant="headline" className="font-bold text-3xl vision-text-primary">
              Próximamente
            </VisionTypography>
            
            <VisionText variant="secondary" className="text-lg">
              Estamos trabajando en la sección de configuración para mejorar tu experiencia.
            </VisionText>
            
            <VisionText variant="tertiary" className="text-sm">
              Pronto podrás personalizar tu cuenta y preferencias desde aquí.
            </VisionText>
          </div>
        </VisionGlassWindow>
      </VisionSpringContainer>
    </div>
  );
}
