// src/components/lineaBase/LineaBaseVista.tsx
/**
 * @fileoverview Componente para visualizar la Línea Base.
 */
'use client';

import React, { useEffect, useState } from 'react';
import { VisionGlassWindow, VisionTypography, VisionText, VisionSpringContainer } from '@/core/components/ui/vision-glass';
import { Button } from '@/core/components/ui/button';
import { CheckCircle2, ArrowLeft, FileText, User, MapPin, Wallet, Building, TrendingUp, DollarSign, PiggyBank, Loader2 } from 'lucide-react';
import { LineaBaseSchema, type LineaBaseType } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBaseSections';
import { recuperarCatalogosLineaBase } from '@/modules/emprendedor/linea-base/application/services/lineaBase';
import { CatalogosPorSecciones } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBase';

interface LineaBaseVistaProps {
  initialData: LineaBaseType; // Using any because of potential validation failures or raw API data
  onBack?: () => void;
  showBackButton?: boolean;
}

export const LineaBaseVista: React.FC<LineaBaseVistaProps> = ({ initialData, onBack, showBackButton = true }) => {
  const [data, setData] = useState<LineaBaseType | null>(null);
  const [catalogos, setCatalogos] = useState<CatalogosPorSecciones | null>(null);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);

  useEffect(() => {
    // Validar los datos iniciales
    if (initialData) {
        const parsed = LineaBaseSchema.safeParse(initialData);
        if (parsed.success) {
            setData(parsed.data);
        } else {
            console.error("Error validando datos de línea base para vista:", parsed.error);
            // Optionally set partial data or error state. 
            // For now, attempting to use it even if it fails strict validation might be risky but user friendly if minor issues
        }
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const catalogosResponse = await recuperarCatalogosLineaBase();
        if (catalogosResponse) {
          setCatalogos(catalogosResponse as any);
        }
      } catch (error) {
        console.error('Error fetching catalogos:', error);
      } finally {
        setLoadingCatalogos(false);
      }
    };

    fetchCatalogos();
  }, []);

  const getCatalogDescription = (
    value: number | undefined | string,
    catalogItems: Array<Record<string, unknown>> | undefined,
    idKey: string,
    descKey: string = 'descripcion'
  ) => {
    if (value === undefined || value === null || !catalogItems) return 'No especificado';
    const item = catalogItems.find(i => String(i[idKey]) === String(value));
    const rawValue = item?.[descKey];
    return rawValue !== undefined && rawValue !== null ? String(rawValue) : String(value);
  };

  const getYesNo = (val: number | boolean | string | undefined) => {
    if (val === undefined || val === null) return 'No especificado';
    if (val === 1 || val === '1' || val === true || val === 'si') return 'Sí';
    return 'No';
  };

  if (loadingCatalogos || !data) {
     if(!data && !loadingCatalogos) {
         return (
             <div className="text-center p-8">
                 <VisionTypography variant="title-large" className="text-destructive mb-4">Error al cargar datos</VisionTypography>
                 <VisionText variant="secondary">No se pudo cargar la información de la línea base.</VisionText>
                 {showBackButton && <Button variant="vision" onClick={onBack} className="mt-4"><ArrowLeft className="mr-2 h-4 w-4" /> Volver</Button>}
             </div>
         )
     }
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      
      <VisionSpringContainer className="mb-8">
        {showBackButton && onBack && (
          <Button
            variant="vision"
            onClick={onBack}
            className="mb-6 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        )}

        <div className="space-y-2">
          <VisionTypography variant="title-large" className="vision-text-primary">
            Tu Línea Base
          </VisionTypography>
          <VisionText variant="secondary" className="text-lg">
            Información registrada en el sistema
          </VisionText>
        </div>
      </VisionSpringContainer>

      {/* Success Message Header */}
      <VisionSpringContainer delay={100} className="mb-8">
        <VisionGlassWindow className="border-green-200/50 bg-green-50/50">
          <div className="p-6 flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
            </div>
            <div>
              <VisionTypography variant="headline" className="text-green-900">
                Información completada
              </VisionTypography>
              <VisionText variant="secondary" className="text-green-800">
                Tu línea base ha sido registrada correctamente.
              </VisionText>
            </div>
          </div>
        </VisionGlassWindow>
      </VisionSpringContainer>

      {/* Information Display */}
      <VisionSpringContainer delay={200}>
        <VisionGlassWindow className="p-8">
          <div className="mb-6">
            <VisionTypography variant="title-1" className="vision-text-primary mb-2">
              Información de Línea Base
            </VisionTypography>
            <VisionText variant="secondary">
              Detalle de los datos proporcionados
            </VisionText>
          </div>

          <div className="space-y-6">
            {/* Sección Preliminar */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <FileText className="w-5 h-5 text-fundacion-amarillo" />
                  <VisionTypography variant="headline" className="vision-text-primary">
                    Información Preliminar
                  </VisionTypography>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div><strong>Medios de conocimiento:</strong> {data.preliminar.mediosConocimiento?.map(medio => getCatalogDescription(medio.id_medio, catalogos?.medioConocimiento.data, 'id_medio')).join(', ') || 'No especificado'}</div>
                  {data.preliminar.medioConocimiento_otro && <div><strong>Otro Medio:</strong> {data.preliminar.medioConocimiento_otro}</div>}

                  <div><strong>Tiempo de capacitación:</strong> {getCatalogDescription(data.preliminar.tiempoCapacitacion?.id_tiempo, catalogos?.tiempoCapacitacion.data, 'id_tiempo')}</div>
                  
                  <div><strong>Razón de recurrir:</strong> {getCatalogDescription(data.preliminar.razonRecurre?.id_razon, catalogos?.razonRecurre.data, 'id_razon')}</div>
                  {data.preliminar.razonRecurre_otro && <div><strong>Otra Razón:</strong> {data.preliminar.razonRecurre_otro}</div>}

                  {data.preliminar.solicitaCredito && <div><strong>Solicita crédito para:</strong> {getCatalogDescription(data.preliminar.solicitaCredito.id_solicitud, catalogos?.solicitaCredito.data, 'id_solicitud')}</div>}
                  {data.preliminar.utilizaCredito && <div><strong>Utiliza crédito para:</strong> {getCatalogDescription(data.preliminar.utilizaCredito.id_utilidad, catalogos?.utilizaCredito.data, 'id_utilidad')}</div>}
                </div>
              </div>

            {/* Sección Identificación */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <User className="w-5 h-5 text-fundacion-amarillo" />
                  <VisionTypography variant="headline" className="vision-text-primary">
                    Identificación
                  </VisionTypography>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div><strong>Edad:</strong> {data.identificacion.edad}</div>
                  <div><strong>Género:</strong> {typeof data.identificacion.genero === 'string' ? data.identificacion.genero : data.identificacion.genero?.descripcion || 'No especificado'}</div>
                  <div><strong>Estado civil:</strong> {getCatalogDescription(data.identificacion.estadoCivil?.id_estado_civil, catalogos?.estadoCivil.data, 'id_estado_civil')}</div>
                  <div><strong>Escolaridad:</strong> {getCatalogDescription(data.identificacion.escolaridad?.id_escolaridad, catalogos?.escolaridad.data, 'id_escolaridad')}</div>
                  <div><strong>Discapacidad:</strong> {data.identificacion.discapacidad || 'No'}</div>
                </div>
              </div>

            {/* Sección Domicilio */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-fundacion-amarillo" />
                  <VisionTypography variant="headline" className="vision-text-primary">
                    Domicilio
                  </VisionTypography>
                </div>
                <div className="text-sm">
                  <div>{data.domicilio.calle} {data.domicilio.numeroExterior}{data.domicilio.numeroInterior && `, ${data.domicilio.numeroInterior}`}</div>
                  <div>{data.domicilio.colonia}, {data.domicilio.municipio.nombre}, {data.domicilio.estado.nombre}</div>
                  <div>Código Postal: {data.domicilio.codigoPostal.codigo_postal}</div>
                  <div>Entre {data.domicilio.calleCruce1} y {data.domicilio.calleCruce2}</div>
                  <div>Comunidad Parroquial: {data.domicilio.comunidadParroquial?.nombre || 'No especificada'}</div>
                  <div>Vicaría: {data.domicilio.vicaria?.nombre || 'No especificada'}</div>
                  <div>Decanato: {data.domicilio.decanato?.nombre || 'No especificado'}</div>
                </div>
              </div>

            {/* Sección Socioeconómico */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="w-5 h-5 text-fundacion-amarillo" />
                  <VisionTypography variant="headline" className="vision-text-primary">
                    Socioeconómico
                  </VisionTypography>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  <div><strong>Dependientes económicos:</strong> {getCatalogDescription(data.socioeconomico.cantidadDependientesEconomicos?.id_cantidad, catalogos?.cantidadDependientesEconomicos.data, 'id_cantidad')}</div>
                  <div><strong>Ocupación:</strong> {getCatalogDescription(data.socioeconomico.ocupacionActual?.id_ocupacion, catalogos?.ocupacionActual.data, 'id_ocupacion')}</div>
                  <div><strong>Rango ingreso mensual:</strong> {getCatalogDescription(data.socioeconomico.ingresoMensual?.id_rango, catalogos?.ingresoMensual.data, 'id_rango')}</div>
                </div>
              </div>

            {/* Sección Información General Negocio */}
            {data.negocio && (
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-5 h-5 text-fundacion-amarillo" />
                  <VisionTypography variant="headline" className="vision-text-primary">
                    Información General del Negocio
                  </VisionTypography>
                </div>
                <div className="text-sm">
                  <div className="grid sm:grid-cols-2 gap-2">
                    <div><strong>Nombre:</strong> {data.negocio.nombre}</div>
                    <div><strong>Teléfono:</strong> {data.negocio.telefono}</div>
                    <div><strong>Giro:</strong> {getCatalogDescription(data.negocio.giroNegocio?.id_tipo_giro, catalogos?.giroNegocio.data, 'id_tipo_giro')}</div>
                    <div><strong>Actividad:</strong> {data.negocio.actividad ? getCatalogDescription(data.negocio.actividad.id_giro, catalogos?.actividadNegocio.data, 'id_giro') : 'No especificada'}</div>
                    {data.negocio.otraActividad && <div><strong>Otra Actividad:</strong> {data.negocio.otraActividad}</div>}
                    <div><strong>Antigüedad:</strong> {data.negocio.antiguedad}</div>
                    <div><strong>Empleados:</strong> {data.negocio.cantidadEmpleados}</div>
                  </div>
                  <div className="mt-2 text-xs text-white/50">
                    <p>Dirección: {data.negocio.calle} {data.negocio.numeroExterior}{data.negocio.numeroInterior && `, ${data.negocio.numeroInterior}`}, {data.negocio.colonia}</p>
                    <p>Código Postal: {data.negocio.codigoPostal.codigo_postal}, {data.negocio.municipio.nombre}, {data.negocio.estado.nombre}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sección Análisis del Negocio */}
             {data.analisisNegocio && data.negocio && (
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-fundacion-amarillo" />
                    <VisionTypography variant="headline" className="vision-text-primary">
                      Análisis del Negocio
                    </VisionTypography>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="grid sm:grid-cols-2 gap-2">
                       <div><strong>Registra entradas y salidas:</strong> {getYesNo(data.analisisNegocio.registraEntradasSalidas)}</div>
                       <div><strong>Asigna sueldo:</strong> {getYesNo(data.analisisNegocio.asignaSueldo)}</div>
                       <div><strong>Conoce utilidades:</strong> {getYesNo(data.analisisNegocio.conoceUtilidades)}</div>
                       <div><strong>Conoce productos mayor utilidad:</strong> {getYesNo(data.analisisNegocio.conoceProductosMayorUtilidad)}</div>
                       {data.analisisNegocio.porcentajeGanancia && <div><strong>Porcentaje ganancia:</strong> {data.analisisNegocio.porcentajeGanancia}%</div>}
                       <div><strong>Identifica competencia:</strong> {getYesNo(data.analisisNegocio.identificaCompetencia)}</div>
                       {data.analisisNegocio.quienCompetencia && <div><strong>Quién competencia:</strong> {data.analisisNegocio.quienCompetencia}</div>}
                    </div>
                    
                    {data.analisisNegocio.clientesNegocio && <div><strong>Clientes:</strong> {data.analisisNegocio.clientesNegocio}</div>}
                    {data.analisisNegocio.ventajasNegocio && <div><strong>Ventajas:</strong> {data.analisisNegocio.ventajasNegocio}</div>}
                    {data.analisisNegocio.problemasNegocio && <div><strong>Problemas:</strong> {data.analisisNegocio.problemasNegocio}</div>}
                    
                    {data.analisisNegocio.estrategiasIncrementarVentas && data.analisisNegocio.estrategiasIncrementarVentas.length > 0 && (
                        <div>
                            <strong>Estrategias ventas:</strong>
                            <ul className="list-disc list-inside pl-2">
                                {data.analisisNegocio.estrategiasIncrementarVentas.map((estrategia, idx) => (
                                     <li key={idx}>{getCatalogDescription(estrategia.id_estrategia, catalogos?.estrategiasIncrementarVentas.data, 'id_estrategia')}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    
                    <div><strong>Empleo ganancias:</strong> {getCatalogDescription(data.analisisNegocio.empleoGanancias?.id_empleo, catalogos?.comoEmpleaGanancias.data, 'id_empleo')}</div>
                    <div><strong>¿Ahorra?:</strong> {getYesNo(data.analisisNegocio.ahorro)}</div>
                    {data.analisisNegocio.cuantoAhorro && <div><strong>Cuánto ahorra:</strong> ${data.analisisNegocio.cuantoAhorro}</div>}
                    {data.analisisNegocio.razonesNoAhorro && <div><strong>Razones no ahorro:</strong> {data.analisisNegocio.razonesNoAhorro}</div>}
                    <div><strong>Conoce punto equilibrio:</strong> {getYesNo(data.analisisNegocio.conocePuntoEquilibrio)}</div>
                    <div><strong>Separa gastos:</strong> {getYesNo(data.analisisNegocio.separaGastos)}</div>
                    <div><strong>Elabora presupuesto:</strong> {getYesNo(data.analisisNegocio.elaboraPresupuesto)}</div>
                  </div>
                </div>
              )}

            {/* Sección Administración de Ingresos */}
            {data.administracionIngresos && data.negocio && (
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-5 h-5 text-fundacion-amarillo" />
                     <VisionTypography variant="headline" className="vision-text-primary">
                      Administración de Ingresos
                    </VisionTypography>
                   </div>
                   <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div><strong>Ventas mensuales:</strong> ${data.administracionIngresos.montoMensualVentas}</div>
                      <div><strong>Gastos mensuales:</strong> ${data.administracionIngresos.montoMensualEgresos}</div>
                      <div><strong>Utilidades mensuales:</strong> ${data.administracionIngresos.montoMensualUtilidades}</div>
                      <div><strong>Sueldo mensual:</strong> ${data.administracionIngresos.sueldoMensual}</div>
                      <div><strong>Principal fuente personal:</strong> {getYesNo(data.administracionIngresos.esNegocioPrincipalFuentePersonal)}</div>
                      <div><strong>Principal fuente familiar:</strong> {getYesNo(data.administracionIngresos.esNegocioPrincipalFuenteFamiliar)}</div>
                   </div>
                </div>
               )}

            {/* Sección Ahorros */}
            {data.objetivosAhorro && (
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <PiggyBank className="w-5 h-5 text-fundacion-amarillo" />
                     <VisionTypography variant="headline" className="vision-text-primary">
                      Ahorros
                    </VisionTypography>
                   </div>
                   <div className="grid sm:grid-cols-2 gap-2 text-sm">
                      <div><strong>Hábito de ahorro:</strong> {getYesNo(data.objetivosAhorro.tieneHabitoAhorro)}</div>
                      <div><strong>Sistema de ahorro:</strong> {getYesNo(data.objetivosAhorro.cuentaSistemaAhorro)}</div>
                      {Number(data.objetivosAhorro.cuentaSistemaAhorro) === 1 && (
                          <>
                            <div><strong>Detalle sistema:</strong> {data.objetivosAhorro.detalleSistemaAhorro}</div>
                            <div><strong>Ahorro mensual:</strong> ${data.objetivosAhorro.montoAhorroMensual}</div>
                          </>
                      )}
                      <div><strong>Objetivo ahorro:</strong> {getCatalogDescription(data.objetivosAhorro.objetivosAhorro?.id_objetivo, catalogos?.objetivosAhorro.data, 'id_objetivo')}</div>
                   </div>
                </div>
            )}

          </div>
        </VisionGlassWindow>
      </VisionSpringContainer>
    </div>
  );
};
