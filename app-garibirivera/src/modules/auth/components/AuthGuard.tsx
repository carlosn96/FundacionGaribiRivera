'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/modules/auth/context/UserContext';
import { hasPermission, getRedirectPath, normalizeRole, hasRequiredPermissions } from '@/modules/auth/domain/policies/Roles';
import { VisionGlassWindow, VisionText } from '@/core/components/ui/vision-glass';

interface AuthGuardProps {
  children: ReactNode;
  allowedPermissions?: number[];
  allowedRoles?: number[];
  requireAllPermissions?: boolean;
}

/**
 * Componente guardián que protege rutas basadas en autenticación y permisos.
 */
export default function AuthGuard({ children, allowedPermissions, allowedRoles, requireAllPermissions = false }: AuthGuardProps) {
  const { user, isLoading, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // 1. Verificar roles de alto nivel (tipoUsuario)
  const hasRoleAccess = !allowedRoles || allowedRoles.length === 0 || (!!user && allowedRoles.includes(user.tipoUsuario));

  // 2. Verificar permisos específicos
  const hasPermissionAccess = user
    ? (!allowedPermissions || allowedPermissions.length === 0 || hasRequiredPermissions(user.permisos, allowedPermissions, requireAllPermissions))
    : false;

  // 3. Verificar acceso por ruta (legacy sync)
  const hasRouteAccess = user ? hasPermission(pathname, user.tipoUsuario) : false;

  const canRender = !!user && hasRoleAccess && hasPermissionAccess && hasRouteAccess;

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      try {
        router.replace('/login');
      } catch (e) {
        window.location.assign('/login');
      }
      return;
    }

    // Si no tiene acceso, intentar ruteo por defecto
    if (!canRender) {
      const fallbackPath = getRedirectPath(normalizeRole(user.tipoUsuario));
      
      // SOLO redireccionar si el destino es diferente al actual para evitar loops infinitos
      if (fallbackPath !== pathname) {
        console.warn(`AuthGuard: Access denied to ${pathname}. Redirecting to fallback ${fallbackPath}`);
        try {
          router.replace(fallbackPath);
        } catch (e) {
          window.location.assign(fallbackPath);
        }
      } else {
        console.error(`AuthGuard: Stuck at ${pathname} with no access. Rendering error UI.`);
      }
    }
  }, [user, isLoading, router, canRender, pathname]);

  // Mostrar loading mientras se valida o no hay acceso confirmado
  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center spatial-bg">
        <VisionGlassWindow className="p-8 flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-fundacion-amarillo border-t-transparent rounded-full"></div>
          <VisionText variant="secondary" className="font-bold">
            {isLoading ? "Verificando acceso seguro..." : "Redirigiendo..."}
          </VisionText>
        </VisionGlassWindow>
      </div>
    );
  }

  // Si después del loading no podemos renderizar (y el redirect no es posible/fue al mismo sitio)
  if (!canRender) {
    const isLooping = user && getRedirectPath(normalizeRole(user.tipoUsuario)) === pathname;

    return (
      <div className="min-h-screen flex items-center justify-center spatial-bg p-4">
        <VisionGlassWindow className="max-w-md w-full p-8 flex flex-col items-center gap-6 text-center">
          <div className="h-16 w-16 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <VisionText className="text-xl font-bold">Acceso Denegado</VisionText>
            <VisionText variant="secondary" className="text-sm">
              {isLooping 
                ? "No cuentas con los permisos necesarios para este módulo administrativo."
                : "Se ha denegado el acceso por falta de permisos específicos."}
            </VisionText>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors font-medium text-sm"
            >
              Volver al inicio
            </button>
            <button 
              onClick={() => logout()}
              className="px-4 py-2 bg-red-600/60 hover:bg-red-600/80 text-white rounded-lg transition-colors font-medium text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        </VisionGlassWindow>
      </div>
    );
  }

  // Solo renderizar children cuando se ha validado el acceso
  return <>{children}</>;
}


