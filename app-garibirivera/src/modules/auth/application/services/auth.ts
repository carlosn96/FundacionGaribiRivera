import { AuthAPI } from '@/modules/auth/infrastructure/api/AuthAPI';
import { User, AuthResponse, unAuthenticatedUser } from '@/modules/auth/domain/Auth';
import { clearSingleFlightCache, singleFlightWithTtl } from '@/core/utils/singleFlight';

/**
 * Servicio central de Autenticación. 
 */

export async function loginUser(correo: string, contrasena: string, rememberMe: boolean): Promise<User> {
  const res = await AuthAPI.login({ correo, contrasena, rememberMe });
  if (!res.ok) throw new Error(res.message || 'Credenciales inválidas');
  
  clearSingleFlightCache('auth:status');
  return res as unknown as User;
}

export async function registerUser(userData: any): Promise<User> {
  const res = await AuthAPI.register(userData);
  if (!res.ok) throw new Error(res.message || 'Error en el registro');
  
  clearSingleFlightCache('auth:status');
  return res as unknown as User;
}

export async function logoutUser() {
  await AuthAPI.logout();
  clearSingleFlightCache('auth:status');
}

export async function checkAuthStatus(): Promise<AuthResponse> {
  return singleFlightWithTtl<AuthResponse>('auth:status', async () => {
    try {
      const res = await AuthAPI.me() as any;
      if (res.ok && (res.id || res.id_usuario)) {
        return { user: res as User, isAuthenticated: true };
      }
      return unAuthenticatedUser;
    } catch {
      return unAuthenticatedUser;
    }
  }, 2000);
}

// Funciones de utilidad para el wizard de registro
export const authService = {
  checkEmail: (correo: string, nombre: string, apellidos: string) => 
    AuthAPI.verifyEmail({ correo, nombre, apellidos }),
    
  verifyCode: (correo: string, codigo: string) => 
    AuthAPI.verifyCode({ correo, codigo }),
    
  forgotPassword: (correo: string) => 
    AuthAPI.forgotPassword({ correo }),

  resetPassword: (correo: string, codigo: string, nueva_contrasena: string) => 
    AuthAPI.resetPassword({ correo, codigo, nueva_contrasena })
};
