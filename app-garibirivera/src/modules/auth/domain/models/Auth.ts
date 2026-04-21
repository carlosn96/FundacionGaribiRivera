import { User } from '@/modules/auth/domain/models/User';

export type AuthFieldErrors = Record<string, string[]>;
export type AuthErrorKind = 'validation' | 'unauthorized' | 'not-found' | 'network' | 'unknown';

export class AuthServiceError extends Error {
  readonly kind: AuthErrorKind;
  readonly status?: number;
  readonly fieldErrors?: AuthFieldErrors;
  readonly details?: unknown;

  constructor(options: {
    message: string;
    kind: AuthErrorKind;
    status?: number;
    fieldErrors?: AuthFieldErrors;
    details?: unknown;
  }) {
    super(options.message);
    this.name = 'AuthServiceError';
    this.kind = options.kind;
    this.status = options.status;
    this.fieldErrors = options.fieldErrors;
    this.details = options.details;
  }
}

export function isAuthServiceError(error: unknown): error is AuthServiceError {
  return error instanceof AuthServiceError;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginResponseData extends User {
  accessToken: string;
}

export interface LoginResponse {
  data: LoginResponseData;
  message: string;
  status: number;
}

export interface RegisterResponse {
  user?: User;
  message: string;
  status: number;
}

export interface AuthResponse {
  isAuthenticated: boolean;
  user: User | null;
}

export const unAuthenticatedUser: AuthResponse = {
  isAuthenticated: false,
  user: null,
};
