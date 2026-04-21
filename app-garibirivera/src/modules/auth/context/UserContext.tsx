'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/modules/auth/domain/models/User';
import { getRedirectPath } from '@/modules/auth/domain/policies/Roles';
import { checkAuthStatus, logoutUser as logoutUserService } from '@/modules/auth/application/auth.service';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Proveedor de contexto de usuario centralizado. 
 * Gestiona el estado de la sesión, la verificación inicial y las redirecciones de la raíz.
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const login = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUserService();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      // Modern redirect: Clean server cache and soft navigate
      router.refresh();
      router.replace('/login');
    }
  }, [router]);

  // Verificación inicial de sesión al montar la app
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { isAuthenticated, user: authUser } = await checkAuthStatus();
        if (isAuthenticated && authUser) {
          setUser(authUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.warn('Initial auth verification failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verifyUser();
  }, []);

  // Lógica de redirección centralizada para la raíz (/)
  useEffect(() => {
    if (isLoading) return;

    // Comprobamos si estamos en la raíz o en una ruta que requiera redirección (index)
    const normalizedPath = pathname?.replace(/\/$/, '') || '/';
    const isRoot = normalizedPath === '/' || normalizedPath === '/index' || normalizedPath === '';
    
    if (isRoot) {
      if (user) {
        const userType = Number(user.tipoUsuario || 0);
        const destination = getRedirectPath(userType);
        
        console.log('Centralized Redirect: To Dashboard', destination);
        router.replace(destination);
      } else {
        console.log('Centralized Redirect: To Login');
        router.replace('/login');
      }
    }
  }, [user, isLoading, pathname, router]);

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
