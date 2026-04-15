'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/modules/auth/context/UserContext';
import { hasPermission, getRedirectPath, normalizeRole, hasRequiredPermissions } from '@/modules/auth/domain/Roles';
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
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

    const requiredPermissions = allowedPermissions || allowedRoles || [];
  const hasPermissionAccess = user
    ? (requiredPermissions.length === 0 || hasRequiredPermissions(user.permisos, requiredPermissions, requireAllPermissions))
    : false;
  const hasRouteAccess = user ? hasPermission(pathname, user.tipo_usuario) : false;
  const canRender = !!user && hasPermissionAccess && hasRouteAccess;

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      // No hay sesión -> al login
      router.replace('/login');
      return;
    }

    // Verificar permisos específicos si se especificaron
    if (!hasPermissionAccess) {
      const fallbackPath = getRedirectPath(normalizeRole(user.tipo_usuario));
      router.replace(fallbackPath);
      return;
    }

    // Verificar permisos por ruta (mantener compatibilidad)
    if (!hasRouteAccess) {
      const fallbackPath = getRedirectPath(normalizeRole(user.tipo_usuario));
      router.replace(fallbackPath);
      return;
    }
  }, [user, isLoading, router, hasPermissionAccess, hasRouteAccess]);

  // Mostrar loading mientras se valida o no hay acceso confirmado
  if (isLoading || !canRender) {
    return (
      <div className="min-h-screen flex items-center justify-center spatial-bg">
        <VisionGlassWindow className="p-8 flex flex-col items-center gap-4">
          <div className="animate-spin h-10 w-10 border-4 border-fundacion-amarillo border-t-transparent rounded-full"></div>
          <VisionText variant="secondary" className="font-bold">
            {isLoading ? 'Verificando acceso seguro...' : 'Validando permisos...'}
          </VisionText>
        </VisionGlassWindow>
      </div>
    );
  }

  // Solo renderizar children cuando se ha validado el acceso
  return <>{children}</>;
}


