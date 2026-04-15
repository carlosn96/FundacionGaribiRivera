import { LayoutDashboard, ClipboardList, UserCircle, LineChart } from 'lucide-react';
import { MenuItem } from '@/core/components/layout/Sidebar';

// ConfiguraciA3n de navegaciA3n para el Emprendedor
export const EMPRENDEDOR_NAVIGATION_CONFIG: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Inicio', href: '/emprendedor/dashboard' },
  { icon: ClipboardList, label: 'LAnea Base', href: '/emprendedor/linea-base' },
  { icon: UserCircle, label: 'Perfil', href: '/emprendedor/perfil', disabled: true, badge: 'Pronto' },
  { icon: LineChart, label: 'Progreso', href: '/emprendedor/progreso', disabled: true, badge: 'Pronto' },
];
