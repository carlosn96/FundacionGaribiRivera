"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/core/components/ui/button";
import { User, Bell, Menu, Search, ChevronDown, Settings, LogOut, Sun, Moon, Sparkles } from "lucide-react";
import { useUser } from "@/modules/auth/context/UserContext";
import { getRoleName as getUserRoleName } from "@/modules/auth/domain/Roles";
import { useTheme } from "@/core/hooks/useTheme";
import { useRouter } from "next/navigation";

interface DashboardNavbarProps {
  welcomeMessage?: string;
  onMenuClick: () => void;
  onNotificationClick?: () => void;
  customUserRole?: string;
  isSidebarCollapsed?: boolean;
  onToggleSidebarCollapse?: () => void;
}

export default function DashboardNavbar({
  welcomeMessage,
  onMenuClick,
  onNotificationClick,
  customUserRole,
  isSidebarCollapsed = false,
  onToggleSidebarCollapse,
}: DashboardNavbarProps) {
  const router = useRouter();
  const { user, logout } = useUser();
  const { toggleTheme, isDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/login';
    }
  };

  const handleSettings = () => {
    // Determinar URL de settings según el rol
    const userType = user?.tipoUsuario ?? 1;
    const settingsUrl = userType === 1 ? '/emprendedor/configuracion' : '/asistente/configuracion';
    router.push(settingsUrl);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        profileButtonRef.current &&
        profileMenuRef.current &&
        !profileButtonRef.current.contains(target) &&
        !profileMenuRef.current.contains(target)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('click', handleClickOutside, true);
      return () => document.removeEventListener('click', handleClickOutside, true);
    }
  }, [showProfileMenu]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setNotifications(3);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const displayRole = customUserRole || getUserRoleName(user?.tipoUsuario ?? 0);
  const defaultWelcomeMessage = `Bienvenido a tu panel de ${displayRole.toLowerCase()}`;

  const getUserInitials = () => {
    if (user?.nombre) {
      const names = user.nombre.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return user.nombre.substring(0, 2).toUpperCase();
    }
    return 'US';
  };

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }, []);

  const handleMenuClick = useCallback(() => {
    if (isDesktop && onToggleSidebarCollapse) {
      onToggleSidebarCollapse();
    } else {
      onMenuClick();
    }
  }, [isDesktop, onToggleSidebarCollapse, onMenuClick]);

  const toggleProfileMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowProfileMenu(prev => !prev);
  }, []);

  const handleProfileMenuItemClick = useCallback((action: () => void) => {
    setShowProfileMenu(false);
    setTimeout(() => action(), 100);
  }, []);

  if (!user) return null;

  return (
    <header
      className={`
        sticky top-0 z-40 
        vision-glass-window border-b transition-all duration-slow ease-spring-smooth overflow-visible
        ${isScrolled
          ? 'border-[var(--border-brand)] shadow-[0_10px_30px_var(--glass-shadow)]'
          : 'border-[var(--border-subtle)]'
        }
      `}
    >
      <div className="px-4 sm:px-6 lg:px-8 overflow-visible">
        <div className="flex items-center justify-between h-16 lg:h-[73px] overflow-visible">

          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <Button
              variant="vision"
              size="icon"
              onClick={handleMenuClick}
              className="flex-shrink-0 h-10 w-10 rounded-[var(--vision-radius-small)] hover:bg-[var(--interact-hover)] active:bg-[var(--interact-active)] transition-all duration-medium ease-spring-smooth hover:scale-105 active:scale-95"
              aria-label={isDesktop ? (isSidebarCollapsed ? "Expandir menú" : "Replegar menú") : "Abrir menú"}
            >
              <Menu className="w-5 h-5 text-[var(--text-primary)]" strokeWidth={2.5} />
            </Button>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="vision-headline vision-text-primary truncate">
                  {getGreeting()}, {user.nombre?.split(' ')[0]}
                </h1>
                <Sparkles className="hidden lg:inline-block w-5 h-5 text-fundacion-amarillo flex-shrink-0" strokeWidth={2.5} />
              </div>
              <p className="vision-caption-upper vision-text-secondary mt-0.5 hidden sm:block truncate">
                {welcomeMessage || defaultWelcomeMessage}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0 overflow-visible">

            {/* Theme Toggle */}
            <Button
              variant="vision"
              size="icon"
              className="hidden sm:flex h-10 w-10 rounded-[var(--vision-radius-small)] hover:bg-[var(--interact-hover)] active:bg-[var(--interact-active)] transition-all duration-medium ease-spring-smooth hover:scale-105 active:scale-95"
              onClick={toggleTheme}
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              <div className="relative w-5 h-5">
                <Moon
                  className={`absolute inset-0 text-fundacion-amarillo transition-all duration-slow ease-spring-smooth ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                    }`}
                  strokeWidth={2.5}
                />
                <Sun
                  className={`absolute inset-0 text-fundacion-amarillo transition-all duration-slow ease-spring-smooth ${!isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
                    }`}
                  strokeWidth={2.5}
                />
              </div>
            </Button>

            {/* Divider */}
            <div className="hidden sm:block h-8 w-px bg-[var(--border-default)] mx-1.5" />

            {/* User Profile */}
            <div className="relative">
              <button
                ref={profileButtonRef}
                type="button"
                className="group flex items-center gap-2 sm:gap-2.5 px-1.5 sm:px-2.5 py-1.5 rounded-[var(--vision-radius-small)] hover:bg-[var(--interact-hover)] active:bg-[var(--interact-active)] transition-all duration-medium ease-spring-smooth border border-transparent hover:border-[var(--border-brand)] hover:scale-[1.02]"
                onClick={toggleProfileMenu}
                aria-label="Menú de perfil"
                aria-expanded={showProfileMenu}
                aria-haspopup="true"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[var(--vision-radius-small)] bg-gradient-to-br from-fundacion-amarillo via-fundacion-amarillo-light to-fundacion-verde flex items-center justify-center shadow-md overflow-hidden ring-2 ring-[var(--surface-raised)] group-hover:shadow-lg group-hover:ring-[var(--border-brand)] transition-all duration-medium ease-spring-smooth">
                    {user.fotografiaBase64 ? (
                      <img
                        src={`data:image/jpeg;base64,${user.fotografiaBase64}`}
                        alt={user.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm">
                        {getUserInitials()}
                      </span>
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[var(--surface-raised)] shadow-sm" />
                </div>

                <div className="hidden md:flex flex-col items-start min-w-0">
                  <p className="font-semibold vision-callout vision-text-primary leading-tight truncate max-w-[100px] lg:max-w-[140px]">
                    {user.nombre}
                  </p>
                  <p className="vision-caption vision-text-secondary leading-tight truncate max-w-[100px] lg:max-w-[140px]">
                    {displayRole}
                  </p>
                </div>

                <ChevronDown
                  className={`hidden md:block w-4 h-4 text-[var(--text-tertiary)] group-hover:text-fundacion-amarillo transition-all duration-200 flex-shrink-0 ${showProfileMenu ? 'rotate-180' : 'rotate-0'}`}
                  strokeWidth={2.5}
                />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div
                  ref={profileMenuRef}
                  className="absolute right-0 mt-2 w-72 vision-glass-window border border-[var(--border-brand)] shadow-[0_20px_50px_var(--glass-shadow)] py-1 origin-top-right rounded-[var(--vision-radius-large)] z-50"
                  role="menu"
                  aria-orientation="vertical"
                  style={{
                    animation: 'fadeIn 0.2s ease-out',
                  }}
                >
                  {/* User Info */}
                  <div className="px-4 py-3.5 border-b border-[var(--border-subtle)]">
                    <p className="font-semibold vision-callout vision-text-primary truncate">
                      {user.nombre}
                    </p>
                    <p className="vision-caption vision-text-secondary truncate mt-1">
                      {user.correoElectronico}
                    </p>
                    {/* Badge de rol – usa tokens semánticos, NO hardcoded */}
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full vision-badge-brand">
                      <div className="w-1.5 h-1.5 rounded-full bg-fundacion-amarillo" />
                      <span className="vision-caption font-semibold">{displayRole}</span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1.5">
                    <Button
                      variant="ghost"
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 vision-callout vision-text-primary hover:bg-[var(--interact-hover)] justify-start h-auto"
                      role="menuitem"
                      onClick={() => handleProfileMenuItemClick(() => console.log('Perfil'))}
                    >
                      <div className="w-8 h-8 rounded-[var(--vision-radius-small)] bg-[var(--interact-hover)] flex items-center justify-center transition-colors">
                        <User className="w-4 h-4 text-[var(--text-primary)]" strokeWidth={2.5} />
                      </div>
                      <span className="font-medium">Mi Perfil</span>
                    </Button>

                    <Button
                      variant="ghost"
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 vision-callout vision-text-primary hover:bg-[var(--interact-hover)] justify-start h-auto"
                      onClick={() => handleProfileMenuItemClick(handleSettings)}
                      role="menuitem"
                    >
                      <div className="w-8 h-8 rounded-[var(--vision-radius-small)] bg-[var(--interact-hover)] flex items-center justify-center transition-colors">
                        <Settings className="w-4 h-4 text-[var(--text-primary)]" strokeWidth={2.5} />
                      </div>
                      <span className="font-medium">Configuración</span>
                    </Button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-[var(--border-subtle)] pt-1.5 pb-1">
                    <Button
                      variant="ghost"
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 vision-callout text-[var(--color-vision-red)] hover:bg-[rgba(217,48,37,0.08)] dark:hover:bg-[rgba(217,48,37,0.15)] justify-start h-auto"
                      onClick={() => handleProfileMenuItemClick(handleLogout)}
                      role="menuitem"
                    >
                      <div className="w-8 h-8 rounded-[var(--vision-radius-small)] bg-[rgba(217,48,37,0.08)] dark:bg-[rgba(217,48,37,0.15)] flex items-center justify-center transition-colors">
                        <LogOut className="w-4 h-4 text-[var(--color-vision-red)]" strokeWidth={2.5} />
                      </div>
                      <span className="font-medium">Cerrar Sesión</span>
                    </Button>
                  </div>
                </div>
              )}

              <style jsx>{`
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(-10px) scale(0.95);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Welcome Message */}
      <div className="sm:hidden px-4 pb-3 border-t border-[var(--border-subtle)] pt-2.5">
        <p className="vision-caption-upper vision-text-secondary truncate">
          {welcomeMessage || defaultWelcomeMessage}
        </p>
      </div>
    </header>
  );
}

