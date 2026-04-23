import { LucideIcon, Users, UserPlus, ListTodo, Receipt, Megaphone, Layers, Presentation, UserCheck, ClipboardCheck, History, Lightbulb, GraduationCap, Banknote, BarChart, HandHelping, FileText, Settings, CreditCard, FileSignature, Home } from 'lucide-react';
import { PERMISSIONS } from '@/modules/auth/domain/policies/Roles';

export interface AssistantModuleLink {
  id: string;
  text: string;
  href: string;
  icon: LucideIcon;
  priority?: number;
}

export interface AssistantModuleConfig {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  gradient: string;
  permission: number;
  links: AssistantModuleLink[];
}

export const ASSISTANT_MODULES_CONFIG: AssistantModuleConfig[] = [
  {
    id: 'admin',
    title: 'Administracion General',
    desc: 'Gestion de usuarios y comunicacion interna del sistema',
    icon: Users,
    gradient: 'from-fundacion-verde to-fundacion-verde-light',
    permission: PERMISSIONS.ADMINISTRACION_GENERAL,
    links: [
      { id: 'admin_users', text: 'Gestion de Usuarios', href: '/asistente/administracion-general/usuarios', icon: UserPlus, priority: 10 },
      { id: 'admin_params', text: 'Configuracion de Parametros', href: '/asistente/administracion-general/configuracion', icon: ListTodo, priority: 12 },
      { id: 'admin_info', text: 'Informacion Institucional', href: '/asistente/administracion-general/informacion-general', icon: Receipt, priority: 17 },
    ]
  },
  {
    id: 'difusion',
    title: 'Difusion',
    desc: 'Gestion de talleres, etapas y registro de emprendedores',
    icon: Megaphone,
    gradient: 'from-emerald-500 to-green-600',
    permission: PERMISSIONS.DIFUSION,
    links: [
      { id: 'dif_inicio', text: 'Inicio', href: '/asistente/difusion', icon: Home, priority: 10 },
      { id: 'dif_etapas', text: 'Etapas', href: '/asistente/difusion/etapas', icon: Layers, priority: 14 },
      { id: 'dif_talleres', text: 'Talleres', href: '/asistente/difusion/talleres', icon: Presentation, priority: 3 },
      { id: 'dif_instructores', text: 'Instructores', href: '/asistente/difusion/instructores', icon: UserCheck, priority: 15 },
      { id: 'dif_asistencia', text: 'Asistencia', href: '/asistente/difusion/asistencia', icon: ClipboardCheck, priority: 4 },
      { id: 'dif_nuevo', text: 'Nuevo Emprendedor', href: '/asistente/difusion/emprendedores/nuevo', icon: UserPlus, priority: 1 },
      { id: 'dif_historial', text: 'Historial de Emprendedores', href: '/asistente/difusion/emprendedores/historial', icon: History, priority: 13 },
      { id: 'dif_lineabase', text: 'Administracion de la Linea Base', href: '/asistente/difusion/linea-base', icon: ListTodo, priority: 16 },
    ]
  },
  {
    id: 'emprendimiento',
    title: 'Emprendimiento',
    desc: 'Medicion de impactos en creditos y capacitacion',
    icon: Lightbulb,
    gradient: 'from-fundacion-amarillo to-yellow-600',
    permission: PERMISSIONS.EMPRENDIMIENTO,
    links: [
      { id: 'emp_graduados', text: 'Seguimiento a Graduados', href: '#', icon: GraduationCap, priority: 6 },
      { id: 'emp_impacto_cap', text: 'Medicion de Impacto: Capacitacion', href: '#', icon: Presentation, priority: 8 },
      { id: 'emp_impacto_cred', text: 'Medicion de Impacto: Credito', href: '#', icon: Banknote, priority: 12 },
      { id: 'emp_estadisticas', text: 'Estadisticas', href: '#', icon: BarChart, priority: 9 },
      { id: 'emp_historial', text: 'Historial de Emprendedores', href: '#', icon: History, priority: 13 },
    ]
  },
  {
    id: 'social',
    title: 'Trabajo Social',
    desc: 'Seguimiento, estudios socioeconomicos y reportes',
    icon: HandHelping,
    gradient: 'from-blue-500 to-indigo-600',
    permission: PERMISSIONS.TRABAJO_SOCIAL,
    links: [
      { id: 'soc_ficha', text: 'Ficha de Seguimiento', href: '#', icon: ClipboardCheck, priority: 2 },
      { id: 'soc_socioeconomico', text: 'Estudio Socioeconomico', href: '#', icon: FileText, priority: 5 },
      { id: 'soc_coneval', text: 'Configuracion de Parametros (CONEVAL)', href: '#', icon: Settings, priority: 11 },
    ]
  },
  {
    id: 'credito',
    title: 'Credito y cobranza',
    desc: 'Gestion de creditos y cobranza.',
    icon: CreditCard,
    gradient: 'from-purple-500 to-fuchsia-600',
    permission: PERMISSIONS.CREDITO_COBRANZA,
    links: [
      { id: 'cred_cobranza', text: 'Cobranza', href: '#', icon: FileSignature, priority: 7 },
    ]
  }
];

