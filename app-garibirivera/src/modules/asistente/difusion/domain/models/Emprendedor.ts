import { z } from 'zod';
import { UserSchema } from '@/modules/auth/domain/models/User';
import { 
  LineaBaseSchema
} from '@/modules/emprendedor/linea-base/domain/models/lineaBaseSections';
import { EtapaFormacionSchema } from './Etapa';

/**
 * ESQUEMA DE LÍNEA BASE COMPLETO: Extiende el esquema base con metadatos de la API.
 */
export const LineaBaseFullSchema = /* LineaBaseSchema.extend({*/ z.object({
  idLineaBase: z.number().optional(),
  fechaCreacion: z.string().optional(),
  etapa: EtapaFormacionSchema
});

/**
 * ESQUEMAS DE EXPEDIENTE (Crédito, Aval, Garantías)
 */
export const ExpedienteSchema = z.object({
  idExpediente: z.number(),
  numeroExpediente: z.string().optional().nullable(),
  montoSolicitado: z.number().optional(),
  fechaInicio: z.string().optional().nullable(),
  fechaTermino: z.string().optional().nullable(),
  aval: z.object({
    nombre: z.string(),
    apellidos: z.string(),
    parentesco: z.object({ descripcion: z.string() }).optional().nullable(),
    numeroCelular: z.string().optional().nullable(),
  }).optional().nullable(),
  inmuebleGarantia: z.object({
    propietario: z.string().optional().nullable(),
    valorComercial: z.number().optional().nullable(),
    escrituraPublica: z.string().optional().nullable(),
  }).optional().nullable(),
  resumenEjecutivo: z.record(z.string(), z.any()).optional().nullable(),
});


export const EmprendedorSchema = UserSchema.extend({
  idEmprendedor: z.number(),
  referencia: z.number().nullable(),
  fechaCredito: z.string().nullable(),
  graduado: z.boolean(),
  fechaGraduacion: z.string().nullable(),
  lineaBase: LineaBaseFullSchema.optional().nullable(),
  expediente: ExpedienteSchema.optional().nullable(),
});

/**
 * ESQUEMA DE FORTALECIMIENTO: Extiende al emprendedor base.
 */
export const EmprendedorFortalecimientoSchema = EmprendedorSchema.extend({
  idFortalecimiento: z.number(),
  fechaRegistroFortalecimiento: z.string(),
});

/**
 * ESQUEMA PARA REGISTRO: Validación de formulario (campos que el usuario llena).
 */
export const EmprendedorRegistroSchema = z.object({
  nombre: z.string()
    .min(1, { message: "El nombre es requerido" })
    .max(255, { message: "El nombre es demasiado largo" }),
    
  apellidos: z.string()
    .min(1, { message: "Los apellidos son requeridos" })
    .max(255, { message: "Los apellidos son demasiado largos" }),
    
  correo: z.string().email({ message: "Correo electrónico inválido" }).trim(),
    
  celular: z.string()
    .min(10, { message: "El número celular debe tener al menos 10 dígitos" }),
});

// INFERENCIA DE TIPOS: Los tipos de TypeScript nacen de los esquemas.
export type Emprendedor = z.infer<typeof EmprendedorSchema>;
export type EmprendedorFortalecimiento = z.infer<typeof EmprendedorFortalecimientoSchema>;
export type EmprendedorRegistro = z.infer<typeof EmprendedorRegistroSchema>;
