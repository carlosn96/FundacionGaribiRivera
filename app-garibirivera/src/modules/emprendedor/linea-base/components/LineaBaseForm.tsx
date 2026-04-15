/**
 * @fileoverview LineaBase Form using StepForm
 */
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { StepForm, StepConfig } from '@/core/components/step-form';
import { useUser } from '@/modules/auth/context/UserContext';
import { guardarLineaBase, recuperarCatalogosLineaBase } from '@/modules/emprendedor/linea-base/application/services/lineaBase';
import { Alert, AlertDescription } from '@/core/components/ui/alert';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { CatalogResponseSchema, type CatalogosPorSecciones } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBase';
import { createInformacionPreliminarConfig, CatalogosSeccionPreliminar } from './configs/seccionPreliminarConfig';
import { createIdentificacionConfig, CatalogosSeccionIdentificacion } from './configs/seccionIdentificacionConfig';
import { createDomicilioConfig } from './configs/seccionDomicilioConfig';
import { createSocioeconomicoConfig, CatalogosSeccionSocioeconomico } from './configs/seccionSocioeconomicoConfig';
import { createInformacionGeneralNegocioConfig, CatalogosSeccionInformacionGeneralNegocio, } from './configs/seccionInformacionGeneralNegocioConfig';
import { createAnalisisNegocioConfig, CatalogosSeccionAnalisisNegocio } from './configs/seccionAnalisisNegocioConfig';
import { createAdministracionIngresosConfig } from './configs/seccionAdministracionIngresosConfig';

import {
  cantidadDependientesEconomicosMock,
  ocupacionesMock,
  rangosIngresoMensualMock,
  mediosConocimientoMock,
  razonRecurreFundacionMock,
  solicitaCreditoMock,
  utilizaCreditoMock,
  tiempoDedicaFormacionMock,
  estadosCivilesMock,
  escolaridadesMock,
  giroNegocioMock,
  actividadNegocioMock,
  antiguedadNegocioMock,
  estrategiasIncrementarVentasMock,
  comoEmpleaGananciasMock,
  objetivosAhorroMock,
  generoMock
} from '@/modules/emprendedor/linea-base/infrastructure/mock/lineaBaseMockSchems';
import { CatalogosSeccionAhorros, createAhorrosConfig } from './configs/seccionAhorrosConfig';

type SubmitPayload = Record<string, unknown>;

export function LineaBaseForm({ onSuccess }: { onSuccess?: (data: unknown) => void }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [catalogos, setCatalogos] = useState<CatalogosPorSecciones | null>(null);
  const [catalogosLoading, setCatalogosLoading] = useState(true);
  const [catalogosError, setCatalogosError] = useState<string | null>(null);

  const { user } = useUser();

  useEffect(() => {
    const loadCatalogos = async () => {
      try {
        setCatalogosLoading(true);
        const catalogosData = await recuperarCatalogosLineaBase();
        //console.log('Catalogos data fetched:', catalogosData);
        const validatedCatalogos = CatalogResponseSchema.parse(catalogosData);
        setCatalogos(validatedCatalogos);
      } catch (error) {
        console.error('Error loading catalogos:', error);
        setCatalogosError('Error al cargar los catálogos. Inténtalo de nuevo.');
      } finally {
        setCatalogosLoading(false);
      }
    };

    loadCatalogos();
  }, []);

  const preliminarCatalogs: CatalogosSeccionPreliminar = useMemo(() => {
    return catalogos ? {
      medioConocimiento: catalogos.medioConocimiento,
      razonRecurre: catalogos.razonRecurre,
      solicitaCredito: catalogos.solicitaCredito,
      utilizaCredito: catalogos.utilizaCredito,
      tiempoCapacitacion: catalogos.tiempoCapacitacion,
    } : {
      medioConocimiento: mediosConocimientoMock,
      razonRecurre: razonRecurreFundacionMock,
      solicitaCredito: solicitaCreditoMock,
      utilizaCredito: utilizaCreditoMock,
      tiempoCapacitacion: tiempoDedicaFormacionMock,
    };
  }, [catalogos]);

  const identificacionCatalogs: CatalogosSeccionIdentificacion = useMemo(() => {
    return catalogos ? {
      estadoCivil: catalogos.estadoCivil,
      escolaridad: catalogos.escolaridad,
      genero: catalogos.genero,
    } : {
      estadoCivil: estadosCivilesMock,
      escolaridad: escolaridadesMock,
      genero: generoMock,
    };
  }, [catalogos]);

  const socioeconomicoCatalogs: CatalogosSeccionSocioeconomico = useMemo(() => {
    return catalogos ? {
      cantidadDependientesEconomicos: catalogos.cantidadDependientesEconomicos,
      ocupacionActual: catalogos.ocupacionActual,
      ingresoMensual: catalogos.ingresoMensual,
    } : {
      cantidadDependientesEconomicos: cantidadDependientesEconomicosMock,
      ocupacionActual: ocupacionesMock,
      ingresoMensual: rangosIngresoMensualMock,
    };
  }, [catalogos]);

  const informacionGeneralNegocioCatalogs: CatalogosSeccionInformacionGeneralNegocio = useMemo(() => {
    return catalogos ? {
      giroNegocio: catalogos.giroNegocio,
      actividadNegocio: catalogos.actividadNegocio,
      antiguedadNegocio: catalogos.antiguedadNegocio,
    } : {
      giroNegocio: giroNegocioMock,
      actividadNegocio: actividadNegocioMock,
      antiguedadNegocio: antiguedadNegocioMock,
    };
  }, [catalogos]);

  const analisisNegocioCatalogs: CatalogosSeccionAnalisisNegocio = useMemo(() => {
    return catalogos ? {
      estrategiasIncrementarVentas: catalogos.estrategiasIncrementarVentas,
      comoEmpleaGanancias: catalogos.comoEmpleaGanancias,
    } : {
      estrategiasIncrementarVentas: estrategiasIncrementarVentasMock,
      comoEmpleaGanancias: comoEmpleaGananciasMock,
    };
  }, [catalogos]);

  const administracionIngresosCatalogs: CatalogosSeccionAhorros = useMemo(() => {
    return catalogos ? {
      objetivosAhorro: catalogos.objetivosAhorro,
    } : {
      objetivosAhorro: objetivosAhorroMock,
    };
  }, [catalogos]);

  const steps: StepConfig[] = useMemo(() => [
    createInformacionPreliminarConfig(preliminarCatalogs),
    createIdentificacionConfig(identificacionCatalogs),
    createDomicilioConfig(),
    createSocioeconomicoConfig(socioeconomicoCatalogs),
    createInformacionGeneralNegocioConfig(informacionGeneralNegocioCatalogs),
    createAnalisisNegocioConfig(analisisNegocioCatalogs),
    createAdministracionIngresosConfig(),
    createAhorrosConfig(administracionIngresosCatalogs)
  ], [preliminarCatalogs,
    identificacionCatalogs,
    socioeconomicoCatalogs,
    informacionGeneralNegocioCatalogs,
    analisisNegocioCatalogs,
    administracionIngresosCatalogs]);

  const handleSubmit = useCallback(async (data: SubmitPayload) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const formData = { ...data };
      const result = await guardarLineaBase(formData);

      if (onSuccess && result && result.data) {
        onSuccess(result.data);
      } else {
        setSubmitSuccess(true);
      }
      //setSubmitSuccess(true);
      // Redirigir o mostrar éxito
      //router.push('/emprendedor/dashboard');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error al guardar la línea base. Inténtalo de nuevo.';
      setSubmitError(message);
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSuccess]);

  return (
    <div className="space-y-8">
      {submitError && (
        <Alert variant="destructive" className="border-destructive/50 bg-destructive/5">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="text-base">{submitError}</AlertDescription>
        </Alert>
      )}

      <StepForm
        steps={steps}
        onSubmit={handleSubmit}
      />

      {submitSuccess && (
        <Alert className="border-primary/50 bg-primary/5">
          <CheckCircle2 className="h-5 w-5" />
          <AlertDescription className="text-base">
            ¡Línea base guardada exitosamente! Redirigiendo al dashboard...
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
