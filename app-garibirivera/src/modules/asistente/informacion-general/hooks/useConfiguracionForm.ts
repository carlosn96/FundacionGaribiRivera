import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/core/hooks/use-toast";
import { configuracionRepository } from "@/modules/asistente/informacion-general/infrastructure/api/ConfiguracionRepository";
import { informacionGeneralSchema, InformacionGeneralForm } from "@/modules/asistente/informacion-general/schemas/informacion-general.schema";
import { useOperation } from "@/core/hooks/useOperation";

export const useConfiguracionForm = () => {
  const { toast } = useToast();
  
  const form = useForm<InformacionGeneralForm>({
    resolver: zodResolver(informacionGeneralSchema),
    defaultValues: {
      nombreFundacion: "",
      representanteLegal: "",
      domicilio: {
        calle: "",
        numeroExterior: "",
        numeroInterior: "",
        colonia: "",
        codigoPostal: "",
        municipio: "",
        estado: "",
        entreCalles: "",
        referencias: "",
      },
      testigos: [],
    },
  });

  const { execute: loadData, loading: isLoading } = useOperation(
    configuracionRepository.getConfiguracion.bind(configuracionRepository),
    {
      onSuccess: (data) => {
        form.reset({
          ...data,
          testigos: data.testigos.map((nombre: string) => ({ nombre })),
        });
      },
      onError: () => toast({
        title: "Error",
        description: "No se pudo cargar la información de la institución.",
        variant: "destructive",
      })
    }
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const { execute: execSave, loading: isSaving } = useOperation(
    async (data: InformacionGeneralForm) => {
      return configuracionRepository.saveConfiguracion({
        ...data,
        testigos: data.testigos.map(t => t.nombre)
      });
    },
    {
      onSuccess: () => {
        toast({
          title: "Éxito",
          description: "Configuración guardada correctamente.",
        });
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message || "Ocurrió un error al guardar.",
          variant: "destructive",
        });
      }
    }
  );

  return {
    form,
    isLoading,
    isSaving,
    onSubmit: form.handleSubmit(data => execSave(data)),
  };
};
