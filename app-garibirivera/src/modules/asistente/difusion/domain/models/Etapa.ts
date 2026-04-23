import { z } from "zod";

export const EtapaFormacionSchema = z.object({
  id: z.coerce.number(),
  nombre: z.string(),
  fechaInicio: z.string().optional().nullable(),
  fechaFin: z.string().optional().nullable(),
  idTipo: z.coerce.number().optional().nullable(),
  tipo: z.string().optional().nullable(),
  esActual: z.boolean().optional(),
  modalidad: z.coerce.number().optional().nullable(),
  talleres: z.array(z.number()).optional()
});

export type EtapaFormacion = z.infer<typeof EtapaFormacionSchema>;

export interface TallerCronograma {
  numeroTaller: number;
  nombreTaller: string;
  fecha: string;
  instructor: string;
}
