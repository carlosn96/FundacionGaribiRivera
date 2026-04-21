export interface IAuthRepository {
  login(credentials: Record<string, unknown>): Promise<Record<string, unknown>>;
  register(userData: Record<string, unknown>): Promise<Record<string, unknown>>;
  verifyEmail(data: { correo: string; nombre: string; apellidos: string }): Promise<{ exists: boolean }>;
  verifyCode(data: { correo: string; codigo: string }): Promise<{ verified: boolean }>;
  me(): Promise<Record<string, unknown>>;
  logout(): Promise<Record<string, unknown>>;
  resendVerificationCode(data: {
    correo: string;
    nombre: string;
    apellidos: string;
    isResend: boolean;
  }): Promise<{ exists?: boolean; sent?: boolean }>;
  forgotPassword(data: { correo: string }): Promise<{ sent: boolean }>;
  verifyResetCode(data: { correo: string; codigo: string }): Promise<{ verified: boolean }>;
  resetPassword(data: { correo: string; codigo: string; nuevaContrasena: string }): Promise<{ reset: boolean }>;
}
