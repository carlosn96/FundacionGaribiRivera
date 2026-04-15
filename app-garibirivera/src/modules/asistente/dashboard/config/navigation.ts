import { MenuItem } from '@/core/components/layout/Sidebar';
import { ASSISTANT_MODULES_CONFIG } from './modules.config';

/**
 * Convierte un mA3dulo del asistente en items del sidebar
 */
export const buildAssistantNavigation = (userPermissions: number[]): MenuItem[] => {
  const allowedModules = ASSISTANT_MODULES_CONFIG.filter(
    sm => userPermissions.includes(sm.permission)
  );

  return allowedModules.map(module => ({
    icon: module.icon,
    label: module.title,
    href: '#', 
    children: module.links.map(link => ({
      icon: link.icon,
      label: link.text,
      href: link.href
    }))
  }));
};
