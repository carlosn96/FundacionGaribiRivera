import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Users, Plus, Trash2 } from "lucide-react";
import { 
  FormField, 
  FormItem, 
  FormControl 
} from "@/core/components/ui/form";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";
import { 
  VisionGlassWindow, 
  VisionTypography, 
  VisionText 
} from "@/core/components/ui/vision-glass";
import { InformacionGeneralForm, MAX_TESTIGOS } from "@/modules/asistente/informacion-general/schemas/informacion-general.schema";

interface Props {
  form: UseFormReturn<InformacionGeneralForm>;
}

export const WitnessSection: React.FC<Props> = ({ form }) => {
  const { fields, append, remove } = useFieldArray({
    name: "testigos",
    control: form.control,
  });

  return (
    <VisionGlassWindow className="p-6 md:p-8 space-y-6 shadow-xl border-[var(--border-subtle)]">
      <div className="flex flex-row items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-fundacion-verde/10 flex items-center justify-center text-fundacion-verde">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <VisionTypography variant="headline" className="vision-text-primary">Testigos del Contrato</VisionTypography>
            <VisionText variant="tertiary" className="text-xs">Opcional: máximo {MAX_TESTIGOS}</VisionText>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-vision-md border-fundacion-verde/30 text-fundacion-verde hover:bg-fundacion-verde/5 font-bold"
          onClick={() => append({ nombre: "" })}
          disabled={fields.length >= MAX_TESTIGOS}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Nuevo testigo
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="p-12 text-center rounded-vision-lg border-2 border-dashed border-[var(--border-subtle)] opacity-40">
          <VisionText variant="tertiary" className="italic text-sm">No se han definido testigos para el contrato</VisionText>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {fields.map((field, index) => (
            <VisionGlassWindow key={field.id} variant="lighter" className="p-5 relative group animate-in zoom-in-95 duration-300">
              <div className="absolute -top-3 -left-2 px-2 py-0.5 rounded bg-fundacion-verde text-white text-[10px] font-bold uppercase tracking-widest shadow-lg">
                Testigo #0{index + 1}
              </div>
              <FormField
                control={form.control}
                name={`testigos.${index}.nombre`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <Input 
                        placeholder="Nombre completo..." 
                        {...field} 
                        className="bg-transparent border-none p-0 focus-visible:ring-0 text-md font-bold vision-text-primary" 
                      />
                    </FormControl>
                    <div className="h-px w-full bg-gradient-to-r from-fundacion-verde/40 to-transparent" />
                  </FormItem>
                )}
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </VisionGlassWindow>
          ))}
        </div>
      )}
    </VisionGlassWindow>
  );
};
