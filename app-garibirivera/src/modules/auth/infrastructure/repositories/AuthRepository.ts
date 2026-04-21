import { BaseRepository } from '@/core/infrastructure/BaseRepository';
import { AUTH_ENDPOINTS } from '@/modules/auth/constants';
import { IAuthRepository } from '@/modules/auth/domain/repositories/IAuthRepository';
import {
  AuthFieldErrors,
  AuthServiceError,
  AuthErrorKind,
  isAuthServiceError,
} from '@/modules/auth/domain/models/Auth';

type AppErrorLike = {
  message?: string;
  status?: number;
  details?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function toFieldErrors(input: unknown): AuthFieldErrors | undefined {
  if (!isRecord(input)) return undefined;

  const normalized: AuthFieldErrors = {};

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === 'string') {
      normalized[key] = [value];
      continue;
    }

    if (Array.isArray(value)) {
      const stringValues = value.filter((item): item is string => typeof item === 'string');
      if (stringValues.length > 0) {
        normalized[key] = stringValues;
      }
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function firstFieldError(fieldErrors?: AuthFieldErrors): string | undefined {
  if (!fieldErrors) return undefined;
  const firstKey = Object.keys(fieldErrors)[0];
  if (!firstKey) return undefined;
  return fieldErrors[firstKey]?.[0];
}

function toErrorKind(status?: number, hasFieldErrors: boolean = false): AuthErrorKind {
  if (hasFieldErrors || status === 422) return 'validation';
  if (status === 401) return 'unauthorized';
  if (status === 404) return 'not-found';
  if (status === 0 || status === 503 || status === 504) return 'network';
  return 'unknown';
}

function mapAuthError(error: unknown, fallbackMessage: string): AuthServiceError {
  if (isAuthServiceError(error)) return error;

  const source = (error ?? {}) as AppErrorLike;
  const fieldErrors = toFieldErrors(source.details);
  const message = source.message || firstFieldError(fieldErrors) || fallbackMessage;
  const status = typeof source.status === 'number' ? source.status : undefined;

  return new AuthServiceError({
    message,
    status,
    fieldErrors,
    details: source.details,
    kind: toErrorKind(status, Boolean(fieldErrors)),
  });
}

class AuthRepository extends BaseRepository implements IAuthRepository {
  protected readonly prefix = '';

  private async execute<T>(
    request: () => Promise<T>,
    fallbackMessage: string
  ): Promise<T> {
    try {
      return await request();
    } catch (error: unknown) {
      throw mapAuthError(error, fallbackMessage);
    }
  }

  async login(credentials: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.execute(
      () => this.raw<Record<string, unknown>>('post', AUTH_ENDPOINTS.login, credentials),
      'No fue posible iniciar sesión.'
    );
  }

  async register(userData: Record<string, unknown>): Promise<Record<string, unknown>> {
    return this.execute(
      () => this.raw<Record<string, unknown>>('post', AUTH_ENDPOINTS.register, userData),
      'No fue posible registrar el usuario.'
    );
  }

  async verifyEmail(data: { correo: string; nombre: string; apellidos: string }): Promise<{ exists: boolean }> {
    return this.execute(
      () => this.raw<{ exists: boolean }>('post', AUTH_ENDPOINTS.verifyEmail, data),
      'No fue posible verificar el correo.'
    );
  }

  async verifyCode(data: { correo: string; codigo: string }): Promise<{ verified: boolean }> {
    return this.execute(
      () => this.raw<{ verified: boolean }>('post', AUTH_ENDPOINTS.verifyCode, data),
      'No fue posible verificar el código.'
    );
  }

  async me(): Promise<Record<string, unknown>> {
    return this.execute(
      () => this.raw<Record<string, unknown>>('get', AUTH_ENDPOINTS.me),
      'No fue posible recuperar la sesión actual.'
    );
  }

  async logout(): Promise<Record<string, unknown>> {
    return this.execute(
      () => this.raw<Record<string, unknown>>('post', AUTH_ENDPOINTS.logout, {}),
      'No fue posible cerrar la sesión.'
    );
  }

  async resendVerificationCode(data: { correo: string; nombre: string; apellidos: string; isResend: boolean }): Promise<{ exists?: boolean; sent?: boolean }> {
    return this.execute(
      () => this.raw<{ exists?: boolean; sent?: boolean }>('post', AUTH_ENDPOINTS.verifyEmail, data),
      'No fue posible reenviar el código de verificación.'
    );
  }

  async forgotPassword(data: { correo: string }): Promise<{ sent: boolean }> {
    return this.execute(
      () => this.raw<{ sent: boolean }>('post', AUTH_ENDPOINTS.forgotPassword, data),
      'No fue posible enviar el código de recuperación.'
    );
  }

  async verifyResetCode(data: { correo: string; codigo: string }): Promise<{ verified: boolean }> {
    return this.execute(
      () => this.raw<{ verified: boolean }>('post', AUTH_ENDPOINTS.verifyResetCode, data),
      'No fue posible verificar el código de recuperación.'
    );
  }

  async resetPassword(data: { correo: string; codigo: string; nuevaContrasena: string }): Promise<{ reset: boolean }> {
    return this.execute(
      () => this.raw<{ reset: boolean }>('post', AUTH_ENDPOINTS.resetPassword, data),
      'No fue posible restablecer la contraseña.'
    );
  }
}

export const authRepository = new AuthRepository();
