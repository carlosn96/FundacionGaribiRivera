import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/core/hooks/use-toast";
import { ConfiguracionAPI } from "@/modules/asistente/informacion-general/infrastructure/api/ConfiguracionAPI";
import { informacionGeneralSchema, InformacionGeneralForm } from "@/modules/asistente/informacion-general/schemas/informacion-general.schema";

export const useConfiguracionForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<InformacionGeneralForm>({
    resolver: zodResolver(informacionGeneralSchema),
    defaultValues: {
      nombre_fundacion: "",
      representante_legal: "",
      domicilio: {
        calle: "",
        numero_exterior: "",
        numero_interior: "",
        colonia: "",
        codigo_postal: "",
        municipio: "",
        estado: "",
        entre_calles: "",
        referencias: "",
      },
      testigos: [],
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ConfiguracionAPI.getConfiguracion();
        form.reset({
          ...data,
          testigos: data.testigos.map(nombre => ({ nombre })),
        });
      } catch (error) {
        console.error("Error al cargar la configuración:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información de la institución.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [form, toast]);

  const onSubmit = async (data: InformacionGeneralForm) => {
    setIsSaving(true);
    try {
      const response = await ConfiguracionAPI.saveConfiguracion({
        ...data,
        testigos: data.testigos.map(t => t.nombre)
      });

      if (response.ok || response.success) {
        toast({
          title: "Éxito",
          description: response.message || "Configuración guardada correctamente.",
        });
      } else {
        throw new Error(response.message || "Error al guardar");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Ocurrió un error al guardar la configuración.";
      console.error("Error al guardar:", error);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    isLoading,
    isSaving,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
