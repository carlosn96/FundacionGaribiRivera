// src/modules/asistente/difusion/domain/models/LineaBaseAdministracion.ts
import { z } from "zod";
import { EmprendedorSchema } from "./Emprendedor";
import { EtapaFormacionSchema } from "./Etapa";

/**
 * Respuesta de administración de Línea Base orientada al modelo de dominio.
 */
export const LineaBaseAdminResponseSchema = z.object({
  emprendedores: z.array(EmprendedorSchema),
  emprendedoresNoLineaBase: z.array(EmprendedorSchema),
  etapa: z.number(),
  listaEtapas: z.array(EtapaFormacionSchema)
});

export type LineaBaseAdminInitialResponse = z.infer<typeof LineaBaseAdminResponseSchema>;

/**
 * Esquema para el seguimiento de caso.
 */
export const SeguimientoCasoSchema = z.object({
  idSeguimiento: z.number(),
  idLineaBase: z.number(),
  observacionesGenerales: z.string(),
  fotografiasCaso: z.array(z.string()).nullable().optional(),
  etapasFormacionCursadas: z.array(z.string()).nullable().optional(),
  numeroCaso: z.number().optional()
});

export type SeguimientoCaso = z.infer<typeof SeguimientoCasoSchema>;
