import { authRepository } from '@/modules/auth/infrastructure/repositories/AuthRepository';
import { User } from '@/modules/auth/domain/models/User';
import {
  AuthResponse,
  AuthServiceError,
  unAuthenticatedUser,
} from '@/modules/auth/domain/models/Auth';
import { clearSingleFlightCache, singleFlightWithTtl } from '@/core/utils/singleFlight';

function normalizeUserPayload(payload: unknown): User | null {
  const raw = payload as User;

  const id = Number(raw.id ?? 0);
  if (!id) return null;

  return {
    id,
    nombre: String(raw.nombre ?? ''),
    apellidos: String(raw.apellidos ?? ''),
    correoElectronico: String(raw.correoElectronico ?? ''),
    numeroCelular: String(raw.numeroCelular ?? ''),
    estadoActivo: Boolean(raw.estadoActivo ?? true),
    tipoUsuario: Number(raw.tipoUsuario ?? 0),
    rol: String(raw.rol ?? ''),
    permisos: Array.isArray(raw.permisos) ? raw.permisos.map(Number) : [],
    fotografiaBase64: (raw.fotografiaBase64 ?? null) as string | null,
    fotoUrl: String(raw.fotoUrl ?? ''),
  };
}

function toActionResult(flag: boolean, successMessage: string, errorMessage: string) {
  return {
    ok: flag,
    success: flag,
    message: flag ? successMessage : errorMessage,
  };
}

function ensureUser(payload: unknown, message: string): User {
  const user = normalizeUserPayload(payload);
  if (!user) {
    throw new AuthServiceError({
      message,
      kind: 'unknown',
    });
  }

  return user;
}

export async function loginUser(correo: string, contrasena: string, rememberMe: boolean): Promise<User> {
  const payload = await authRepository.login({ correo, contrasena, rememberMe });
  const user = ensureUser(payload, 'No fue posible obtener la sesión del usuario.');
  clearSingleFlightCache('auth:status');
  return user;
}

export async function registerUser(userData: any): Promise<User> {
  const payload = await authRepository.register(userData);
  const user = ensureUser(payload, 'Registro completado sin datos de usuario válidos.');
  clearSingleFlightCache('auth:status');
  return user;
}

export async function logoutUser() {
  await authRepository.logout();
  clearSingleFlightCache('auth:status');
}

export async function checkAuthStatus(): Promise<AuthResponse> {
  return singleFlightWithTtl<AuthResponse>('auth:status', async () => {
    try {
      const payload = await authRepository.me();
      const user = normalizeUserPayload(payload);
      if (user) {
        return { user, isAuthenticated: true };
      }
      return unAuthenticatedUser;
    } catch {
      return unAuthenticatedUser;
    }
  }, 2000);
}

export async function resendVerificationCode(
  correo: string,
  nombre: string,
  apellidos: string
): Promise<{ sent: boolean; message?: string }> {
  const res = await authRepository.resendVerificationCode({
    correo,
    nombre,
    apellidos,
    isResend: true,
  });

  const sent = typeof res.sent === 'boolean'
    ? res.sent
    : (typeof res.exists === 'boolean' ? !res.exists : true);

  return {
    sent,
    message: sent ? 'Código enviado correctamente' : 'No fue posible reenviar el código.',
  };
}

export const authService = {
  checkEmail: async (correo: string, nombre: string, apellidos: string) => {
    const res = await authRepository.verifyEmail({ correo, nombre, apellidos });
    const exists = Boolean(res.exists);
    return {
      ok: true,
      success: true,
      exists,
      message: exists ? 'Este correo ya está registrado.' : 'Correo disponible, código enviado.',
    };
  },

  verifyCode: async (correo: string, codigo: string) => {
    const res = await authRepository.verifyCode({ correo, codigo });
    return {
      ...toActionResult(Boolean(res.verified), 'Código verificado', 'Código incorrecto o expirado.'),
      verified: Boolean(res.verified),
    };
  },

  verifyResetCode: async (correo: string, codigo: string) => {
    const res = await authRepository.verifyResetCode({ correo, codigo });
    return {
      ...toActionResult(Boolean(res.verified), 'Código verificado', 'Código incorrecto o expirado.'),
      verified: Boolean(res.verified),
    };
  },

  forgotPassword: async (correo: string) => {
    const res = await authRepository.forgotPassword({ correo });
    return {
      ...toActionResult(Boolean(res.sent), 'Código enviado', 'No fue posible enviar el código.'),
      sent: Boolean(res.sent),
    };
  },

  resetPassword: async (correo: string, codigo: string, nuevaContrasena: string) => {
    const res = await authRepository.resetPassword({ correo, codigo, nuevaContrasena });
    return {
      ...toActionResult(Boolean(res.reset), 'Contraseña restablecida', 'No fue posible restablecer la contraseña.'),
      reset: Boolean(res.reset),
    };
  },
};
