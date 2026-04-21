/**
 * @fileoverview Unified role definitions and routing.
 * Single source of truth for all user roles, their names, and redirect paths.
 * Sincronizado estrictamente con TipoUsuario.php del backend.
 */

export const ROLES = {
  EMPRENDEDOR: 1,
  ASISTENTE: 2,
} as const;

export const PERMISSIONS = {
  ADMINISTRACION_GENERAL: 2,
  TRABAJO_SOCIAL: 3,
  DIFUSION: 4,
  EMPRENDIMIENTO: 5,
  CREDITO_COBRANZA: 6,
};

export interface RoleInfo {
  name: string;
  route: string;
}

export const ROLE_INFO: Record<number, RoleInfo> = {
  [ROLES.EMPRENDEDOR]: { name: 'Emprendedor', route: '/emprendedor/dashboard' },
  [ROLES.ASISTENTE]: { name: 'Asistente', route: '/asistente/dashboard' },
};

export const normalizeRole = (roleId: number): number =>
  roleId === ROLES.EMPRENDEDOR ? ROLES.EMPRENDEDOR : ROLES.ASISTENTE;

export const getRedirectPath = (roleId: number): string =>
  ROLE_INFO[normalizeRole(roleId)]?.route || '/login';

export const getRoleName = (roleId: number): string =>
  ROLE_INFO[roleId]?.name || (roleId > 1 ? 'Administrador' : 'Usuario');

/**
 * Normaliza la colección de permisos del usuario a un arreglo de números.
 * Acepta formatos observados en runtime: number[], string JSON o vacío.
 */
export const normalizePermissions = (permissions: unknown): number[] => {
  if (!permissions) return [];

  if (Array.isArray(permissions)) {
    return permissions.map((permission) => Number(permission)).filter((permission) => !Number.isNaN(permission));
  }

  if (typeof permissions === 'string') {
    try {
      const parsed = JSON.parse(permissions);
      if (Array.isArray(parsed)) {
        return parsed.map((permission) => Number(permission)).filter((permission) => !Number.isNaN(permission));
      }
    } catch (error) {
      if (permissions.includes(',')) {
        return permissions
          .split(',')
          .map((p) => Number(p.trim()))
          .filter((p) => !Number.isNaN(p));
      }

      const single = Number(permissions.trim());
      if (!Number.isNaN(single)) return [single];
    }
  }

  if (typeof permissions === 'number') {
    return [permissions];
  }

  return [];
};

export const PUBLIC_PATHS = ['/login', '/register', '/verificar-codigo', '/olvide-contrasena'];

export const ROUTE_PERMISSIONS: Record<string, number[]> = {
  '/emprendedor': [ROLES.EMPRENDEDOR],
  '/asistente': [ROLES.ASISTENTE],
};

export const hasPermission = (path: string, roleId: number): boolean => {
  const normalizedRole = normalizeRole(roleId);
  const prefix = Object.keys(ROUTE_PERMISSIONS).find((p) => path.startsWith(p));
  if (!prefix) return true;
  return ROUTE_PERMISSIONS[prefix].includes(normalizedRole);
};

export const hasRequiredPermissions = (
  userPerms: unknown,
  requiredPerms: number[],
  requireAll: boolean = false
): boolean => {
  if (requiredPerms.length === 0) return true;
  const userPermissions = normalizePermissions(userPerms);

  if (requireAll) {
    return requiredPerms.every((requiredPerm) => userPermissions.includes(requiredPerm));
  }
  return requiredPerms.some((requiredPerm) => userPermissions.includes(requiredPerm));
};
