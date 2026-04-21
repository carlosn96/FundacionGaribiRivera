import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { configuracionRepository } from "@/modules/asistente/administracion-general/informacion-general/infrastructure/api/ConfiguracionRepository";
import { informacionGeneralSchema, InformacionGeneral } from "@/modules/asistente/administracion-general/informacion-general/schemas/informacion-general.schema";
import { useOperation } from "@/core/hooks/useOperation";

export const useConfiguracionForm = () => {

  const form = useForm<InformacionGeneral>({
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
        form.reset(data);
      },
      showToast: false
    }
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const { execute: execSave, loading: isSaving } = useOperation(
    async (data: InformacionGeneral) => {
      return configuracionRepository.saveConfiguracion(data);
    }
  );

  return {
    form,
    isLoading,
    isSaving,
    onSubmit: form.handleSubmit(data => execSave(data)),
  };
};
