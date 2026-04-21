// src/modules/asistente/difusion/domain/models/LineaBaseAdministracion.ts
import { z } from "zod";

export const EmprendedorLineaBaseSchema = z.object({
  idUsuario: z.coerce.number(),
  nombre: z.string(),
  apellidos: z.string(),
  correo: z.string().nullable().optional(),
  idEtapa: z.coerce.number().optional().nullable(),
  etapa: z.string(),
  idLineaBase: z.coerce.number().optional().nullable(),
  fechaCreacion: z.string().optional().nullable()
});

export type EmprendedorLineaBase = z.infer<typeof EmprendedorLineaBaseSchema>;

export const LineaBaseAdminResponseSchema = z.object({
  emprendedores: z.array(EmprendedorLineaBaseSchema),
  emprendedoresNoLineaBase: z.array(EmprendedorLineaBaseSchema),
  etapas: z.array(z.object({
    idEtapa: z.coerce.number(),
    nombre: z.string()
  }))
});

export type LineaBaseAdminResponse = z.infer<typeof LineaBaseAdminResponseSchema>;

export const SeguimientoCasoSchema = z.object({
  idSeguimiento: z.number(),
  idLineaBase: z.number(),
  observacionesGenerales: z.string(),
  fotografiasCaso: z.array(z.string()).nullable().optional(),
  etapasFormacionCursadas: z.array(z.string()).nullable().optional(),
  numeroCaso: z.number().optional()
});

export type SeguimientoCaso = z.infer<typeof SeguimientoCasoSchema>;

