import React from "react";
import { UseFormReturn } from "react-hook-form";
import { MapPin } from "lucide-react";
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
import { InformacionGeneralForm } from "@/modules/asistente/informacion-general/schemas/informacion-general.schema";

interface Props {
  form: UseFormReturn<InformacionGeneralForm>;
}

export const AddressSection: React.FC<Props> = ({ form }) => {
  return (
    <VisionGlassWindow className="p-6 md:p-8 space-y-8 shadow-xl border-[var(--border-subtle)]">
      <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div className="w-10 h-10 rounded-xl bg-fundacion-amarillo/10 flex items-center justify-center text-fundacion-amarillo">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <VisionTypography variant="headline" className="vision-text-primary">Domicilio Comercial</VisionTypography>
          <VisionText variant="tertiary" className="text-xs">Ubicación física para notificaciones y contrato</VisionText>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8">
            <FormField
              control={form.control}
              name="domicilio.calle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><VisionText variant="secondary" className="text-[10px] font-bold uppercase">Calle</VisionText> <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[var(--surface-raised)] border-transparent rounded-vision-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="domicilio.numero_exterior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><VisionText variant="secondary" className="text-[10px] font-bold uppercase">Ext.</VisionText> <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[var(--surface-raised)] border-transparent rounded-vision-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="domicilio.numero_interior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><VisionText variant="secondary" className="text-[10px] font-bold uppercase">Int.</VisionText></FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[var(--surface-raised)] border-transparent rounded-vision-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <FormField
              control={form.control}
              name="domicilio.colonia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><VisionText variant="secondary" className="text-[10px] font-bold uppercase">Colonia</VisionText> <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[var(--surface-raised)] border-transparent rounded-vision-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-3">
            <FormField
              control={form.control}
              name="domicilio.codigo_postal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><VisionText variant="secondary" className="text-[10px] font-bold uppercase">C.P.</VisionText> <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[var(--surface-raised)] border-transparent rounded-vision-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="md:col-span-5">
            <FormField
              control={form.control}
              name="domicilio.municipio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel><VisionText variant="secondary" className="text-[10px] font-bold uppercase">Municipio</VisionText> <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-[var(--surface-raised)] border-transparent rounded-vision-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="domicilio.estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel><VisionText variant="secondary" className="text-[10px] font-bold uppercase">Estado</VisionText> <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input {...field} className="bg-[var(--surface-raised)] border-transparent rounded-vision-sm" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </VisionGlassWindow>
  );
};
