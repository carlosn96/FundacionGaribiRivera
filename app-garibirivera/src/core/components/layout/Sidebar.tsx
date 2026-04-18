"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { LucideIcon, X, ChevronRight, Settings, LogOut, Lightbulb, Users, Shield, Briefcase } from "lucide-react";
import { useUser } from "@/modules/auth/context/UserContext";
import { getRoleName as getUserRoleName } from "@/modules/auth/domain/Roles";
import { useRouter } from "next/navigation";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  badge?: string;
  href?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Map user types to icons
const userTypeIcons: Record<number, LucideIcon> = {
  1: Lightbulb,      // Emprendedor
  2: Users,          // Auxiliar Difusión
  3: Users,          // Trabajador Social
  4: Shield,         // Administrador General
  5: Briefcase,      // Coordinador Emprendimiento
  6: Briefcase,      // Encargado Crédito y Cobranza
};

// Map user types to settings URLs
const userTypeSettingsUrls: Record<number, string> = {
  1: '/emprendedor/configuracion',      // Emprendedor
  2: '/asistente/configuracion',       // Encargado Crédito y Cobranza
};

export default function Sidebar({
  isOpen,
  onClose,
  menuItems,
  title,
  subtitle,
  icon,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const router = useRouter();
  const { user, logout } = useUser();
  const [isDesktop, setIsDesktop] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Auto-derive title, subtitle, icon, and settings URL from user context
  const userType = user?.tipoUsuario ?? 1;
  const displayTitle = title || getUserRoleName(userType);
  const displaySubtitle = subtitle || "Panel de Control";
  const DisplayIcon = icon || userTypeIcons[userType] || Lightbulb;
  const settingsUrl = userTypeSettingsUrls[userType] || '/configuracion';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
      window.location.href = '/login';
    }
  };

  const handleSettings = () => {
    router.push(settingsUrl);
  };

  if (!user) return null;

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(label)) {
        // Si ya está expandido, lo colapsamos
        newExpanded.delete(label);
      } else {
        // Si no está expandido, colapsamos todos y expandimos solo este
        newExpanded.clear();
        newExpanded.add(label);
      }
      return newExpanded;
    });
  };

  const renderMenuItem = (item: MenuItem, index: number, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.label);
    const isActive = item.active || (hasChildren && item.children?.some(child => child.active));
    
    const ItemContent = (
      <>
        <div className={`flex items-center justify-center w-9 h-9 rounded-[var(--vision-radius-small)] transition-all duration-medium flex-shrink-0 ${
          isActive 
            ? 'bg-fundacion-amarillo/20 border border-fundacion-amarillo/40' 
            : 'bg-[var(--interact-hover)] group-hover:bg-[var(--interact-active)]'
        }`}>
          <item.icon className={`w-5 h-5 ${isActive ? 'text-fundacion-verde' : 'text-[var(--text-secondary)]'}`} strokeWidth={2} />
        </div>
        {!isCollapsed && (
          <>
            <span className={`flex-1 text-left vision-callout font-medium truncate ${
              isActive ? 'text-fundacion-verde' : 'vision-text-primary'
            }`}>
              {item.label}
            </span>
            {item.badge && (
              <Badge className="ml-2 flex-shrink-0">
                {item.badge}
              </Badge>
            )}
            {hasChildren && (
              <ChevronRight className={`w-4 h-4 transition-transform duration-medium flex-shrink-0 ${
                isExpanded ? 'rotate-90 text-fundacion-verde' : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]'
              }`} />
            )}
            {!hasChildren && !item.active && !item.disabled && !item.badge && (
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-all duration-medium flex-shrink-0 text-[var(--text-tertiary)]" />
            )}
          </>
        )}
      </>
    );

    if (item.disabled) {
      return (
        <div
          key={index}
          className={`
            w-full flex items-center h-12 rounded-[var(--vision-radius-small)]
            vision-text-disabled cursor-not-allowed opacity-50
            transition-all duration-medium
            ${isCollapsed ? 'gap-0 px-1.5 justify-center' : 'gap-3 px-3'}
          `}
          role="button"
          aria-disabled="true"
          title={isCollapsed ? item.label : undefined}
        >
          {ItemContent}
        </div>
      );
    }

    if (hasChildren) {
      return (
        <div key={index}>
          <button
            onClick={() => toggleExpanded(item.label)}
            className={`
              group flex items-center w-full h-12 rounded-[var(--vision-radius-small)]
              transition-all duration-medium ease-spring-smooth
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,208,62,0.50)]
              ${isCollapsed ? 'gap-0 px-1.5 justify-center' : 'gap-3 px-3'}
              ${isActive
                ? 'vision-glass-ornament bg-fundacion-amarillo/90 border-fundacion-amarillo text-fundacion-verde shadow-lg shadow-fundacion-amarillo/25'
                : 'vision-text-primary hover:bg-[var(--interact-hover)] active:bg-[var(--interact-active)] hover:scale-[1.02]'
              }
            `}
            title={isCollapsed ? item.label : undefined}
          >
            {ItemContent}
          </button>
          {isExpanded && !isCollapsed && (
            <div className="ml-6 mt-1 space-y-1">
              {item.children?.map((child, childIndex) => renderMenuItem(child, childIndex, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={index}
        href={item.href!}
        onClick={() => {
          if (!isDesktop) {
            onClose();
          }
        }}
        className={`
          group flex items-center w-full h-12 rounded-[var(--vision-radius-small)]
          transition-all duration-medium ease-spring-smooth
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,208,62,0.50)]
          ${isCollapsed ? 'gap-0 px-1.5 justify-center' : 'gap-3 px-3'}
          ${item.active
            ? 'vision-glass-ornament bg-fundacion-amarillo/90 border-fundacion-amarillo text-fundacion-verde shadow-lg shadow-fundacion-amarillo/25 data-[active=true]'
            : 'vision-text-primary hover:bg-[var(--interact-hover)] active:bg-[var(--interact-active)] hover:scale-[1.02]'
          }
        `}
        data-active={item.active}
        aria-current={item.active ? 'page' : undefined}
        title={isCollapsed ? item.label : undefined}
      >
        {ItemContent}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[4px] z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 lg:top-[73px] left-0 z-50 lg:z-30
          ${isCollapsed ? 'w-16' : 'w-72 lg:w-64 xl:w-72'}
          h-screen lg:h-[calc(100vh-73px)]
          vision-glass-sidebar
          shadow-xl lg:shadow-none
          border-r border-[var(--border-default)]
          transform transition-all duration-slow ease-spring-smooth
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
          overflow-hidden
        `}
        role="navigation"
        aria-label="Menú principal"
      >
        {/* Sidebar Header - Fixed */}
        <div className={`flex-shrink-0 py-5 border-b border-[var(--border-default)] bg-[var(--interact-hover)] transition-all duration-slow ${isCollapsed ? 'px-2' : 'px-5 lg:px-6'
          }`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center min-w-0 flex-1 transition-all duration-slow ${isCollapsed ? 'justify-center space-x-0' : 'space-x-3'
              }`}>
              <div className="w-10 h-10 bg-gradient-to-br from-fundacion-amarillo to-fundacion-verde rounded-[var(--vision-radius-small)] flex items-center justify-center shadow-md flex-shrink-0 border border-[var(--border-brand)]">
                <DisplayIcon className="w-5 h-5 text-fundacion-verde" strokeWidth={2.5} />
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <h2 className="vision-callout font-semibold vision-text-primary truncate">{displayTitle}</h2>
                  <p className="vision-caption-upper vision-text-tertiary truncate">{displaySubtitle}</p>
                </div>
              )}
            </div>
            {/* Botón de cerrar solo visible en móvil */}
            <Button
              variant="vision"
              size="icon"
              onClick={onClose}
              className="lg:hidden h-8 w-8 rounded-[var(--vision-radius-small)] flex-shrink-0 ml-2"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5 text-[var(--text-primary)]" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav
          className={`flex-1 py-4 overflow-y-auto overflow-x-hidden transition-all duration-slow ${isCollapsed ? 'px-2' : 'px-3 lg:px-4'
            }`}
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(243, 208, 62, 0.3) transparent'
          }}
        >
          <div className="space-y-1">
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </div>
        </nav>

        {/* Sidebar Footer - Fixed */}
        <div className={`flex-shrink-0 py-3 border-t border-[var(--border-default)] bg-[var(--interact-hover)] space-y-1.5 transition-all duration-slow ${isCollapsed ? 'px-2' : 'px-3 lg:px-4'
          }`}>
          <Button
            variant="vision"
            className={`w-full h-11 rounded-[var(--vision-radius-small)] font-medium text-sm ${isCollapsed ? 'justify-center px-2' : 'justify-start gap-3'
              }`}
            onClick={handleSettings}
            title={isCollapsed ? 'Configuración' : undefined}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--interact-hover)] flex-shrink-0">
              <Settings className="w-5 h-5 text-[var(--text-secondary)]" strokeWidth={2} />
            </div>
            {!isCollapsed && <span className="truncate">Configuración</span>}
          </Button>
          <Button
            variant="visionDestructive"
            className={`w-full h-11 rounded-[var(--vision-radius-small)] font-medium text-sm ${isCollapsed ? 'justify-center px-2' : 'justify-start gap-3'
              }`}
            onClick={handleLogout}
            title={isCollapsed ? 'Cerrar Sesión' : undefined}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[rgba(217,48,37,0.08)] dark:bg-[rgba(217,48,37,0.15)] flex-shrink-0">
              <LogOut className="w-5 h-5 text-[var(--color-vision-red)]" strokeWidth={2} />
            </div>
            {!isCollapsed && <span className="truncate">Cerrar Sesión</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}

