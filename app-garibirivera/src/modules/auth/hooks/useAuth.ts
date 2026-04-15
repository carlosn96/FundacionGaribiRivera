import { useState } from 'react';
import { useUser } from '@/modules/auth/context/UserContext';
import { 
  loginUser, 
  registerUser, 
  authService 
} from '@/modules/auth/application/services/auth';

/**
 * Hook de autenticación directo y sin "puerquero".
 * Conecta los componentes con los servicios y el estado global.
 */
export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: ctxLogin } = useUser();

  const login = async (credentials: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginUser(credentials.correo, credentials.contrasena, !!credentials.rememberMe);
      ctxLogin(user);
      return user;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await registerUser(userData);
      // Tras el 201, iniciamos sesión automáticamente en el estado global
      ctxLogin(user);
      return user;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailExists = (email: string, nombre: string, apellidos: string) => 
    authService.checkEmail(email, nombre, apellidos);

  const verifyValidationCode = (email: string, codigo: string) => 
    authService.verifyCode(email, codigo);

  return {
    login,
    register,
    verifyEmailExists,
    verifyValidationCode,
    isLoading,
    error,
    clearErrors: () => setError(null)
  };
}
