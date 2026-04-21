import { z } from 'zod';
import { UserSchema } from '@/modules/auth/domain/models/User';

/**
 * ESQUEMA DE USUARIO PARA ADMINISTRACIÓN
 * Extiende el UserSchema base de Auth con campos necesarios para el CRUD.
 */
export const UsuarioAsistenteSchema = UserSchema.extend({
});

/**
 * ESQUEMA PARA RESET DE PASSWORD
 */
export const UsuarioResetPasswordSchema = z.object({
  idUsuario: z.number(),
  contrasena: z.string().min(6, "Contraseña debe tener al menos 6 caracteres"),
});

// Tipos inferidos
export type UsuarioAsistente = z.infer<typeof UsuarioAsistenteSchema>;
export type UsuarioResetPasswordInput = z.infer<typeof UsuarioResetPasswordSchema>;
