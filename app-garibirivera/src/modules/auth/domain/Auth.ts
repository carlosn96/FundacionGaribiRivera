import { z } from 'zod';
import { BaseResponse } from '@/core/http/ApiResponse';

/**
 * Esquema base para el usuario, sincronizado con el backend.
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
  tieneFoto: z.boolean().optional().default(false),
  contrasena: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginResponseData extends User {
  accessToken: string;
}

export interface LoginResponse extends BaseResponse {
  data: LoginResponseData;
}

export interface RegisterResponse extends BaseResponse {
  user?: User;
}

export const LoginResponseSchema = z.object({
  message: z.string(),
  data: UserSchema,
  status: z.number(),
});

/**
 * Esquemas de validación para payloads de entrada
 */
export const LoginPayloadSchema = z.object({
  correo: z.email({ message: 'Correo electrónico inválido' })
    .trim()
    .min(1, { message: 'El correo es requerido' }),
  contrasena: z.string()
    .min(1, { message: 'La contraseña es requerida' })
    .min(4, { message: 'Mínimo 4 caracteres' }),
  rememberMe: z.boolean(),
});

export const RegisterPayloadSchema = z.object({
  nombre: z.string()
    .trim()
    .min(1, { message: 'El nombre es requerido' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'El nombre solo debe contener letras' }),
  apellidos: z.string()
    .trim()
    .min(1, { message: 'Los apellidos son requeridos' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Los apellidos solo deben contener letras' }),
  correo: z.email({ message: 'Correo electrónico inválido' })
    .trim()
    .min(1, { message: 'El correo es requerido' }),
  numeroCelular: z.string()
    .trim()
    .min(1, { message: 'El teléfono es requerido' })
    .regex(/^\d{10}$/, { message: 'Deben ser exactamente 10 dígitos' }),
  contrasena: z.string()
    .min(1, { message: 'La contraseña es requerida' })
    .min(8, { message: 'Mínimo 8 caracteres' })
    .regex(/[A-Z]/, { message: 'Falta una mayúscula' })
    .regex(/\d/, { message: 'Falta un número' }),
});

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type RegisterPayload = z.infer<typeof RegisterPayloadSchema>;

export const ForgotPasswordPayloadSchema = z.object({
  correo: z.email({ message: 'Correo electrónico válido requerido' }).trim(),
});

export const ResetPasswordPayloadSchema = z.object({
  correo: z.string().email(),
  codigo: z.string().min(4).max(4),
  nuevaContrasena: z.string()
    .min(1, { message: 'La contraseña es requerida' })
    .min(8, { message: 'Mínimo 8 caracteres' })
    .regex(/[A-Z]/, { message: 'Falta una mayúscula' })
    .regex(/\d/, { message: 'Falta un número' }),
  confirmarContrasena: z.string().min(1, { message: 'Confirma tu contraseña' }),
}).refine((data) => data.nuevaContrasena === data.confirmarContrasena, {
  message: "Las contraseñas no coinciden",
  path: ["confirmarContrasena"],
});

export type ForgotPasswordPayload = z.infer<typeof ForgotPasswordPayloadSchema>;
export type ResetPasswordPayload = z.infer<typeof ResetPasswordPayloadSchema>;

/**
 * Esquemas de respuesta especializados (Legacy sync)
 */
export const VerifyEmailResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    exists: z.boolean(),
  }),
  status: z.number(),
});

export const VerifyCodeResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    verified: z.boolean(),
  }),
  status: z.number(),
});

export const ForgotPasswordResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    sent: z.boolean(),
  }),
  status: z.number(),
});

export const ResetPasswordResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    reset: z.boolean(),
  }),
  status: z.number(),
});

/**
 * Tipos de estado de autenticación (Frontend)
 */
export interface AuthResponse {
  isAuthenticated: boolean;
  user: User | null;
}

export const unAuthenticatedUser: AuthResponse = {
  isAuthenticated: false,
  user: null,
};


