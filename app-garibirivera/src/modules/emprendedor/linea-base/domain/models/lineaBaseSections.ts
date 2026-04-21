import { z } from 'zod';

import {
  MedioConocimientoItemSchema,
  TiempoCapacitacionItemSchema,
  RazonRecurreItemSchema,
  SolicitaCreditoItemSchema,
  UtilizaCreditoItemSchema,
  EstadoCivilItemSchema,
  EscolaridadItemSchema,
  CantidadDependientesEconomicosItemSchema,
  OcupacionesItemSchema,
  RangosIngresoMensualItemSchema,
  AntiguedadNegocioItemSchema,
  GiroNegocioItemSchema,
  ActividadNegocioItemSchema,
  EstrategiasIncrementarVentasItemSchema,
  ComoEmpleaGananciasItemSchema,
  ObjetivosAhorroItemSchema,
  GeneroItemSchema,
  CodigoPostalItemSchema,
  MunicipioItemSchema,
  EstadoItemSchema,
  ComunidadParroquialItemSchema,
  VicariaItemSchema,
  DecanatoItemSchema
} from './lineaBase';

// Helper for coerced numbers
const zNumber = z.coerce.number();
const zString = z.string().trim();
const zBoolean = z.boolean();

// Helper for Yes/No fields that map to 1/0
// Accepts number, string "1"/"0", boolean. Transforms to 1 (Yes) or 0 (No).
const zYesNo = z.union([z.number(), z.string(), z.boolean()]).transform((val) => {
  if (val === true || val === 'true' || val === 1 || val === '1' || val === 'si' || val === 'Sí') return 1;
  return 0; // Default to 0 for false/no/0
});

// --- Seccion Preliminar ---
export const PreliminarSchema = z.object({
  mediosConocimiento: z.array(MedioConocimientoItemSchema),
  medioConocimiento_otro: zString.nullable(),
  tiempoCapacitacion: TiempoCapacitacionItemSchema,
  razonRecurre: RazonRecurreItemSchema,
  razonRecurre_otro: zString.nullable(),
  solicitaCredito: SolicitaCreditoItemSchema.nullable(),
  utilizaCredito: UtilizaCreditoItemSchema.nullable(),
});

// --- Seccion Identificacion ---
export const IdentificacionSchema = z.object({
  edad: zNumber.min(18).max(100),
  genero: zString.or(GeneroItemSchema),
  estadoCivil: EstadoCivilItemSchema,
  escolaridad: EscolaridadItemSchema,
  discapacidad: zString.nullable(),
});

// --- Seccion Domicilio ---
export const DomicilioSchema = z.object({
  codigoPostal: CodigoPostalItemSchema,
  estado: EstadoItemSchema,
  municipio: MunicipioItemSchema,
  colonia: zString,
  calle: zString,
  calleCruce1: zString,
  calleCruce2: zString,
  numeroExterior: zString,
  numeroInterior: zString.nullable(),
  comunidadParroquial: ComunidadParroquialItemSchema.nullable().optional(),
  vicaria: VicariaItemSchema.nullable().optional(),
  decanato: DecanatoItemSchema.nullable().optional(),
});

// --- Seccion Socioeconomico ---
export const SocioeconomicoSchema = z.object({
  cantidadDependientesEconomicos: CantidadDependientesEconomicosItemSchema,
  ocupacionActual: OcupacionesItemSchema,
  ingresoMensual: RangosIngresoMensualItemSchema,
});

// --- Seccion Informacion General Negocio ---
export const InformacionGeneralNegocioSchema = z.object({
  nombre: zString,
  telefono: zString,
  calle: zString,
  calleCruce1: zString,
  calleCruce2: zString,
  numeroExterior: zString,
  numeroInterior: zString.nullable(),
  codigoPostal: CodigoPostalItemSchema,
  colonia: zString,
  estado: EstadoItemSchema,
  municipio: MunicipioItemSchema,
  antiguedad: zString, // API returns string like "3-5 años"
  cantidadEmpleados: zNumber,
  giroNegocio: GiroNegocioItemSchema,
  actividad: ActividadNegocioItemSchema.nullable(),
  otraActividad: zString.nullable(),
}).refine((data) => {
  // If otraActividad is set, actividad should be null (mutually exclusive)
  if (data.otraActividad !== null && data.otraActividad !== undefined && data.otraActividad.trim() !== '') {
    return data.actividad === null;
  }
  return true;
}, {
  message: "Si se especifica otra actividad, no debe haber actividad seleccionada.",
  path: ["actividad"]
});

// --- Seccion Analisis Negocio ---
export const AnalisisNegocioSchema = z.object({
  registraEntradasSalidas: zYesNo,
  asignaSueldo: zYesNo,
  conoceUtilidades: zYesNo,
  conoceProductosMayorUtilidad: zYesNo,
  porcentajeGanancia: zNumber.nullable(),
  identificaCompetencia: zYesNo,
  quienCompetencia: zString.nullable(),
  clientesNegocio: zString,
  ventajasNegocio: zString,
  problemasNegocio: zString,
  estrategiasIncrementarVentas: z.array(EstrategiasIncrementarVentasItemSchema).or(z.array(EstrategiasIncrementarVentasItemSchema).length(0)),
  empleoGanancias: ComoEmpleaGananciasItemSchema,
  ahorro: zYesNo,
  cuantoAhorro: zNumber.nullable(),
  razonesNoAhorro: zString.nullable(),
  conocePuntoEquilibrio: zYesNo,
  separaGastos: zYesNo,
  elaboraPresupuesto: zYesNo,
}).refine((data) => {
  // If conoceProductosMayorUtilidad is false (0), porcentajeGanancia must be null
  if (data.conoceProductosMayorUtilidad === 0) {
    return data.porcentajeGanancia === null || data.porcentajeGanancia === undefined;
  }
  // If identificaCompetencia is false (0), quienCompetencia must be null
  if (data.identificaCompetencia === 0) {
    return data.quienCompetencia === null || data.quienCompetencia === undefined;
  }
  // If ahorro is true (1), cuantoAhorro must not be null
  if (data.ahorro === 1) {
    return data.cuantoAhorro !== null && data.cuantoAhorro !== undefined;
  }
  // If ahorro is false (0), razonesNoAhorro must not be null
  if (data.ahorro === 0) {
    return data.razonesNoAhorro !== null && data.razonesNoAhorro !== undefined && data.razonesNoAhorro.trim() !== '';
  }
  return true;
}, {
  message: "Validaciones condicionales fallidas",
  path: ["analisisNegocio"]
});

// --- Seccion Administracion Ingresos ---
export const AdministracionIngresosSchema = z.object({
  montoMensualVentas: zNumber,
  montoMensualEgresos: zNumber,
  montoMensualUtilidades: zNumber,
  sueldoMensual: zNumber,
  esNegocioPrincipalFuentePersonal: zYesNo,
  esNegocioPrincipalFuenteFamiliar: zYesNo,
});

// --- Seccion Ahorros ---
export const AhorrosSchema = z.object({
  tieneHabitoAhorro: zYesNo,
  cuentaSistemaAhorro: zYesNo,
  detalleSistemaAhorro: zString.nullable(),
  montoAhorroMensual: zNumber.nullable(),
  objetivosAhorro: ObjetivosAhorroItemSchema,
}).refine((data) => {
  console.log("Validating AhorrosSchema with data:", data.cuentaSistemaAhorro);
  if (data.cuentaSistemaAhorro === 0) {
    return true;
  }
  const tieneDetalle = data.detalleSistemaAhorro !== null && data.detalleSistemaAhorro !== undefined && data.detalleSistemaAhorro.trim() !== "";
  const tieneMonto = data.montoAhorroMensual !== null && data.montoAhorroMensual !== undefined;
  return tieneDetalle && tieneMonto;
}, {
  message: "Detalle del sistema y monto de ahorro son requeridos si cuenta con sistema de ahorro",
  path: ["cuentaSistemaAhorro"],
});

// Combined Schema
export const LineaBaseSchema = z.object({
  preliminar: PreliminarSchema,
  identificacion: IdentificacionSchema,
  domicilio: DomicilioSchema,
  socioeconomico: SocioeconomicoSchema,
  negocio: InformacionGeneralNegocioSchema.nullable(), // negocio can be null if user has no business
  analisisNegocio: AnalisisNegocioSchema.nullable(), // analisisNegocio can be null if user has no business
  administracionIngresos: AdministracionIngresosSchema,
  objetivosAhorro: AhorrosSchema,
});

export type PreliminarType = z.infer<typeof PreliminarSchema>;
export type IdentificacionType = z.infer<typeof IdentificacionSchema>;
export type DomicilioType = z.infer<typeof DomicilioSchema>;
export type SocioeconomicoType = z.infer<typeof SocioeconomicoSchema>;
export type InformacionGeneralNegocioType = z.infer<typeof InformacionGeneralNegocioSchema>;
export type AnalisisNegocioType = z.infer<typeof AnalisisNegocioSchema>;
export type AdministracionIngresosType = z.infer<typeof AdministracionIngresosSchema>;
export type AhorrosType = z.infer<typeof AhorrosSchema>;
export type LineaBaseType = z.infer<typeof LineaBaseSchema>;

export interface LineaBaseDataExistsResponse {
  exists: boolean;
  lineaBase: LineaBaseType | null;
  ok: boolean;
  success: boolean;
  message?: string;
}
