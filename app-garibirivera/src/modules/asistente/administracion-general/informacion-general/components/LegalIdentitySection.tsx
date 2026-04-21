import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Shield } from "lucide-react";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { 
  VisionGlassWindow, 
  VisionTypography, 
  VisionText 
} from "@/core/components/ui/vision-glass";
import { InformacionGeneral } from "@/modules/asistente/administracion-general/informacion-general/schemas/informacion-general.schema";

interface Props {
  form: UseFormReturn<InformacionGeneral>;
}

export const LegalIdentitySection: React.FC<Props> = ({ form }) => {
  return (
    <VisionGlassWindow className="p-6 md:p-8 space-y-8 shadow-xl border-[var(--border-subtle)]">
      <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="w-10 h-10 rounded-xl bg-fundacion-verde/10 flex items-center justify-center text-fundacion-verde">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <VisionTypography variant="headline" className="vision-text-primary">Identidad Jurídica</VisionTypography>
          <VisionText variant="tertiary" className="text-xs">Representación legal de la fundación</VisionText>
        </div>
      </div>

      <div className="grid gap-6">
        <FormField
          control={form.control}
          name="nombreFundacion"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <VisionText variant="secondary" className="text-xs font-bold uppercase tracking-wider">Nombre Legal</VisionText>
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej. Fundación Cardenal Garibi Rivera, A.C." 
                  {...field} 
                  className="bg-[var(--surface-raised)] h-12 rounded-vision-md border-transparent focus:border-fundacion-verde/30 transition-all font-medium"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="representanteLegal"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <VisionText variant="secondary" className="text-xs font-bold uppercase tracking-wider">Representante Legal</VisionText>
                <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nombre completo del representante" 
                  {...field} 
                  className="bg-[var(--surface-raised)] h-12 rounded-vision-md border-transparent focus:border-fundacion-verde/30 transition-all font-medium"
                />
              </FormControl>
              <VisionText variant="tertiary" as="p" className="text-[11px] leading-relaxed">
                Este nombre es fundamental: se utilizará en las firmas automáticas y en el cuerpo legal de los contratos generados.
              </VisionText>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </VisionGlassWindow>
  );
};
