import { z } from 'zod';

/**
 * Esquema interno de usuario sincronizado con el backend.
 * Se mantiene privado para controlar la superficie de la API del módulo.
 */
export const UserSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  apellidos: z.string(),
  correoElectronico: z.email({ message: 'Correo electrónico inválido' }).trim(),
  numeroCelular: z.string(),
  estadoActivo: z.boolean().optional(),
  tipoUsuario: z.number(),
  rol: z.string(),
  permisos: z.array(z.number()).optional().default([]),
  fotografiaBase64: z.string().nullable().optional(),
  fotoUrl: z.string(),
  contrasena: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
