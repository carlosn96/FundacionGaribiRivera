import { LoginResponse, RegisterResponse } from '@/modules/auth/domain/Auth';
import { BaseResponse } from '@/core/http/ApiResponse';
import { http } from '@/core/http/ApiHttpClient';
import { AUTH_ENDPOINTS } from '@/modules/auth/constants';

export class AuthAPI {
  static async login(credentials: Record<string, unknown>): Promise<LoginResponse> {
    return http.post<LoginResponse>(AUTH_ENDPOINTS.login, credentials);
  }

  static async register(userData: Record<string, unknown>): Promise<RegisterResponse> {
    return http.post<RegisterResponse>(AUTH_ENDPOINTS.register, userData);
  }

  static async verifyEmail(data: { correo: string, nombre: string, apellidos: string }) {
    return http.post<{ exists: boolean }>(AUTH_ENDPOINTS.verifyEmail, data);
  }

  static async verifyCode(data: { correo: string, codigo: string }) {
    return http.post<{ verified: boolean }>(AUTH_ENDPOINTS.verifyCode, data);
  }

  static async me() {
    return http.get<Record<string, unknown>>(AUTH_ENDPOINTS.me);
  }

  static async logout() {
    return http.post<BaseResponse>(AUTH_ENDPOINTS.logout, {});
  }

  static async resendVerificationCode(data: { correo: string, nombre: string, apellidos: string, isResend: boolean }) {
    return http.post<{ exists: boolean }>(AUTH_ENDPOINTS.verifyEmail, data);
  }

  static async forgotPassword(data: { correo: string }) {
    return http.post<{ sent: boolean }>(AUTH_ENDPOINTS.forgotPassword, data);
  }

  static async resetPassword(data: { correo: string, codigo: string, nuevaContrasena: string }) {
    return http.post<{ reset: boolean }>(AUTH_ENDPOINTS.resetPassword, data);
  }
}


