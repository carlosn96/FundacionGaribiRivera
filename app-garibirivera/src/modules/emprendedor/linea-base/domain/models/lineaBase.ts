/**
 * @fileoverview Centralized Zod schemas for validating linea-base related data structures.
 * This ensures that the data structure is as expected before being used in the application.
 */

import { z } from 'zod';

// Schema for the catalog data structure
export const CatalogDataSchema = z.record(z.string(), z.any()); // Flexible for different catalog structures

// Schema for catalog items
export const MedioConocimientoItemSchema = z.object({
  id_medio: z.number(),
  descripcion: z.string(),
  icon: z.string(),
});

export const TiempoCapacitacionItemSchema = z.object({
  id_tiempo: z.number(),
  descripcion: z.string(),
});

export const RazonRecurreItemSchema = z.object({
  id_razon: z.number(),
  descripcion: z.string(),
});

export const SolicitaCreditoItemSchema = z.object({
  id_solicitud: z.number(),
  descripcion: z.string(),
});

export const UtilizaCreditoItemSchema = z.object({
  id_utilidad: z.number(),
  descripcion: z.string(),
});

export const EstadoCivilItemSchema = z.object({
  id_estado_civil: z.number(),
  descripcion: z.string(),
});

export const EscolaridadItemSchema = z.object({
  id_escolaridad: z.number(),
  descripcion: z.string(),
});

export const GeneroItemSchema = z.object({
  id_genero: z.number(),
  descripcion: z.string(),
});

export const CodigoPostalItemSchema = z.object({
  id_codigo: z.number(),
  codigo_postal: z.string(),
});

export const EstadoItemSchema = z.object({
  id_estado: z.number(),
  nombre: z.string(),
  abreviatura: z.string(),
});

export const MunicipioItemSchema = z.object({
  id_municipio: z.number(),
  nombre: z.string(),
});

export const ComunidadParroquialItemSchema = z.object({
  id_comunidad: z.number(),
  nombre: z.string(),
});

export const VicariaItemSchema = z.object({
  id_vicaria: z.number(),
  nombre: z.string(),
});

export const DecanatoItemSchema = z.object({
  id_decanato: z.number(),
  nombre: z.string(),
});

export const RangosIngresoMensualItemSchema = z.object({
  id_rango: z.number(),
  descripcion: z.string(),
  medicion: z.number().optional(),
});

export const OcupacionesItemSchema = z.object({
  id_ocupacion: z.number(),
  descripcion: z.string(),
});

export const CantidadDependientesEconomicosItemSchema = z.object({
  id_cantidad: z.number(),
  descripcion: z.string(),
});


// Additional catalog item schemas based on API JSON structure
export const EstrategiasIncrementarVentasItemSchema = z.object({
  id_estrategia: z.number(),
  descripcion: z.string(),
  icon: z.string(),
});

export const ComoEmpleaGananciasItemSchema = z.object({
  id_empleo: z.number(),
  descripcion: z.string(),
  icon: z.string(),
  medicion: z.number(),
});

export const ObjetivosAhorroItemSchema = z.object({
  id_objetivo: z.number(),
  descripcion: z.string(),
  medicion: z.number(),
});

export const GiroNegocioItemSchema = z.object({
  id_tipo_giro: z.number(),
  descripcion: z.string(),
});

export const ActividadNegocioItemSchema = z.object({
  id_giro: z.number(),
  descripcion: z.string(),
});

export const AntiguedadNegocioItemSchema = z.object({
  id: z.number(),
  descripcion: z.string(),
});

// Schema for catalog structure
const CatalogStructureSchema = z.object({
  name: z.string(),
  tipo: z.string().transform((val) => {
    if (['select', 'checkbox', 'radio'].includes(val)) {
      return val as 'select' | 'checkbox' | 'radio';
    }
    return 'text' as const;
  }),
  data: z.array(z.any()), // Will be overridden per catalog
});

// Specific catalog schemas
export const MedioConocimientoSchema = CatalogStructureSchema.extend({
  data: z.array(MedioConocimientoItemSchema),
});

export const TiempoCapacitacionSchema = CatalogStructureSchema.extend({
  data: z.array(TiempoCapacitacionItemSchema),
});

export const RazonRecurreSchema = CatalogStructureSchema.extend({
  data: z.array(RazonRecurreItemSchema),
});

export const SolicitaCreditoSchema = CatalogStructureSchema.extend({
  data: z.array(SolicitaCreditoItemSchema),
});

export const UtilizaCreditoSchema = CatalogStructureSchema.extend({
  data: z.array(UtilizaCreditoItemSchema),
});

export const EstadoCivilSchema = CatalogStructureSchema.extend({
  data: z.array(EstadoCivilItemSchema),
});

export const EscolaridadSchema = CatalogStructureSchema.extend({
  data: z.array(EscolaridadItemSchema),
});

export const GeneroSchema = CatalogStructureSchema.extend({
  data: z.array(GeneroItemSchema),
});

export const RangosIngresoMensualSchema = CatalogStructureSchema.extend({
  data: z.array(RangosIngresoMensualItemSchema),
});

export const OcupacionesSchema = CatalogStructureSchema.extend({
  data: z.array(OcupacionesItemSchema),
});

export const CantidadDependientesEconomicosSchema = CatalogStructureSchema.extend({
  data: z.array(CantidadDependientesEconomicosItemSchema),
});

// Additional catalog schemas based on API JSON structure
export const EstrategiasIncrementarVentasSchema = CatalogStructureSchema.extend({
  data: z.array(EstrategiasIncrementarVentasItemSchema),
});

export const ComoEmpleaGananciasSchema = CatalogStructureSchema.extend({
  data: z.array(ComoEmpleaGananciasItemSchema),
});

export const ObjetivosAhorroSchema = CatalogStructureSchema.extend({
  data: z.array(ObjetivosAhorroItemSchema),
});

export const GiroNegocioSchema = CatalogStructureSchema.extend({
  data: z.array(GiroNegocioItemSchema),
});

export const ActividadNegocioSchema = CatalogStructureSchema.extend({
  data: z.array(ActividadNegocioItemSchema),
});

export const AntiguedadNegocioSchema = CatalogStructureSchema.extend({
  data: z.array(AntiguedadNegocioItemSchema),
});

// Types for catalog data arrays
export type MedioConocimientoData = z.infer<typeof MedioConocimientoSchema>;
export type TiempoCapacitacionData = z.infer<typeof TiempoCapacitacionSchema>;
export type RazonRecurreData = z.infer<typeof RazonRecurreSchema>;
export type SolicitaCreditoData = z.infer<typeof SolicitaCreditoSchema>;
export type UtilizaCreditoData = z.infer<typeof UtilizaCreditoSchema>;
export type EstadoCivilData = z.infer<typeof EstadoCivilSchema>;
export type EscolaridadData = z.infer<typeof EscolaridadSchema>;
export type GeneroData = z.infer<typeof GeneroSchema>;
export type IngresoMensualData = z.infer<typeof RangosIngresoMensualSchema>;
export type OcupacionActualData = z.infer<typeof OcupacionesSchema>;
export type CantidadDependientesEconomicosData = z.infer<typeof CantidadDependientesEconomicosSchema>;

// Additional catalog data types based on API JSON structure
export type EstrategiasIncrementarVentasData = z.infer<typeof EstrategiasIncrementarVentasSchema>;
export type ComoEmpleaGananciasData = z.infer<typeof ComoEmpleaGananciasSchema>;
export type ObjetivosAhorroData = z.infer<typeof ObjetivosAhorroSchema>;
export type GiroNegocioData = z.infer<typeof GiroNegocioSchema>;
export type ActividadNegocioData = z.infer<typeof ActividadNegocioSchema>;

export type AntiguedadNegocioData = z.infer<typeof AntiguedadNegocioSchema>;

// Schema for the full catalog response
export const CatalogResponseSchema = z.object({
  medioConocimiento: MedioConocimientoSchema,
  estrategiasIncrementarVentas: EstrategiasIncrementarVentasSchema,
  comoEmpleaGanancias: ComoEmpleaGananciasSchema,
  tiempoCapacitacion: TiempoCapacitacionSchema,
  razonRecurre: RazonRecurreSchema,
  solicitaCredito: SolicitaCreditoSchema,
  utilizaCredito: UtilizaCreditoSchema,
  cantidadDependientesEconomicos: CantidadDependientesEconomicosSchema,
  ocupacionActual: OcupacionesSchema,
  ingresoMensual: RangosIngresoMensualSchema,
  objetivosAhorro: ObjetivosAhorroSchema,
  estadoCivil: EstadoCivilSchema,
  escolaridad: EscolaridadSchema,
  genero: GeneroSchema,
  giroNegocio: GiroNegocioSchema,
  actividadNegocio: ActividadNegocioSchema,
  antiguedadNegocio: AntiguedadNegocioSchema,
});

export type CatalogosPorSecciones = z.infer<typeof CatalogResponseSchema>;
