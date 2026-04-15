import { useState, useMemo } from 'react';
import { useUser } from '@/modules/auth/context/UserContext';
import { normalizePermissions } from '@/modules/auth/domain/Roles';
import { ASSISTANT_MODULES_CONFIG } from '../config/modules.config';

export function useDashboardModules() {
  const { user } = useUser();
  const [selectedModule, setSelectedModule] = useState<typeof ASSISTANT_MODULES_CONFIG[0] | null>(null);

  const { visibleModules, quickActions, mainAction } = useMemo(() => {
    if (!user) return { visibleModules: [], quickActions: [], mainAction: null };

    const userPerms = normalizePermissions(user.permisos);
    const effectivePermissions = userPerms.filter((p: number) => !isNaN(p));

    const visible = ASSISTANT_MODULES_CONFIG.filter((module) =>
      effectivePermissions.includes(module.permission)
    );

    const allAllowedLinks = visible.flatMap(m => m.links);
    const uniqueAllowedLinks = Array.from(new Map(allAllowedLinks.map(item => [item.id, item])).values());
    const priorityLinks = uniqueAllowedLinks.sort(
      (a, b) => (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER)
    );

    return {
      visibleModules: visible,
      mainAction: priorityLinks.length > 0 ? priorityLinks[0] : null,
      quickActions: priorityLinks.slice(0, 6)
    };
  }, [user]);

  return {
    user,
    visibleModules,
    quickActions,
    mainAction,
    selectedModule,
    setSelectedModule
  };
}

