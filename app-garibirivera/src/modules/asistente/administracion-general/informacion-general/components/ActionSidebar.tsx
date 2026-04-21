import React from "react";
import { Button } from "@/core/components/ui/button";
import { Loader2, RefreshCw, Shield, Save } from "lucide-react";
import { 
  VisionGlassWindow, 
  VisionText 
} from "@/core/components/ui/vision-glass";

interface Props {
  isSaving: boolean;
}

export const ActionSidebar: React.FC<Props> = ({ isSaving }) => {
  return (
    <div className="sticky top-10 space-y-6">
      <VisionGlassWindow className="p-6 border-[var(--border-brand)]/20 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-fundacion-amarillo/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-fundacion-amarillo/20" />
        
        <div className="relative space-y-6">
          <div className="flex items-center gap-3 text-fundacion-amarillo font-bold text-sm uppercase tracking-widest">
            <RefreshCw className="w-4 h-4 animate-pulse" />
            Guardar Cambios
          </div>
          
          <VisionText variant="secondary" className="text-sm leading-relaxed block">
            Al confirmar, todos los contratos generados a partir de ahora utilizarán esta información institucional. Asegúrate de que los nombres y domicilio sean correctos.
          </VisionText>

          <Button
            type="submit"
            className="w-full bg-fundacion-verde hover:bg-fundacion-verde-light text-white font-bold h-14 rounded-vision-md shadow-2xl shadow-fundacion-verde/30 transition-all active:scale-[0.98]"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                Actualizar Sistema
              </>
            )}
          </Button>
        </div>
      </VisionGlassWindow>

      {/* Ayuda/Shortcut */}
      <div className="px-4">
          <VisionText variant="tertiary" className="text-[10px] uppercase font-bold tracking-tighter opacity-70 block mb-3">Soporte técnico</VisionText>
          <div className="flex items-center gap-3 p-3 rounded-vision-md bg-white/5 border border-white/10">
            <div className="w-6 h-6 rounded bg-fundacion-amarillo/20 text-fundacion-amarillo flex items-center justify-center">
              <Shield className="w-3 h-3" />
            </div>
            <VisionText variant="secondary" className="text-[11px]">Cualquier duda contacta al administrador general del sistema.</VisionText>
          </div>
      </div>
    </div>
  );
};
