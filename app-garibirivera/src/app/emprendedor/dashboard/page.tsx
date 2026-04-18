"use client";

import { useRouter } from "next/navigation";
import { VisionGlassWindow, VisionTypography, VisionText, VisionSpringContainer, VisionInteractive } from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { Progress } from "@/core/components/ui/progress";
import {
  User,
  Mail,
  Phone,
  FileText,
  Plus,
  ArrowRight,
  CheckCircle,
  Clock,
  BookOpen,
  Target,
  TrendingUp,
  Activity,
  Sparkles,
  BarChart3,
  Zap,
  ChevronRight,
  Calendar
} from "lucide-react";

import { useUser } from "@/modules/auth/context/UserContext";
import { useLineaBase } from "@/modules/emprendedor/linea-base/context/LineaBaseContext";
import useIdleSession from "@/modules/auth/hooks/useIdleSession";

// Configuración de colores usando variables visionOS institucionales
const colorConfig = {
  primary: {
    gradient: "from-[var(--vision-primary)] to-[var(--vision-secondary)]",
    bg: "bg-[var(--vision-primary)]",
    text: "text-[var(--text-primary)]",
    iconColor: "text-[var(--fundacion-amarillo)]",
    hover: "hover:bg-[var(--vision-primary)]",
    light: "bg-[var(--vision-tint-bg)]",
    border: "border-[var(--glass-border)]"
  },
  secondary: {
    gradient: "from-[var(--vision-secondary)] to-[var(--vision-secondary)]",
    bg: "bg-[var(--vision-secondary)]",
    text: "text-[var(--text-primary)]",
    iconColor: "text-[var(--fundacion-verde)]",
    hover: "hover:bg-[var(--vision-secondary)]",
    light: "bg-[var(--glass-bg)]",
    border: "border-[var(--glass-border)]"
  },
  accent: {
    gradient: "from-[var(--vision-primary)] to-[var(--vision-secondary)]",
    bg: "bg-[var(--vision-primary)]",
    text: "text-[var(--text-primary)]",
    iconColor: "text-[var(--fundacion-amarillo)]",
    hover: "hover:bg-[var(--vision-primary)]",
    light: "bg-[var(--vision-tint-bg)]",
    border: "border-[var(--glass-border)]"
  },
  neutral: {
    gradient: "from-[var(--vision-neutral)] to-[var(--vision-secondary)]",
    bg: "bg-[var(--vision-neutral)]",
    text: "text-[var(--text-primary)]",
    iconColor: "text-[var(--text-tertiary)]",
    light: "bg-[var(--glass-bg)]",
    border: "border-[var(--glass-border)]"
  },
  glass: {
    bg: "bg-[var(--glass-bg)]",
    border: "border-[var(--glass-border)]",
    shadow: "shadow-[var(--glass-shadow)]"
  }
};

export default function EntrepreneurDashboard() {
  useIdleSession();
  const { user } = useUser();
  const { lineaBaseResponse, isLoading } = useLineaBase();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center spatial-bg">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 border-4 border-fundacion-verde/20 border-t-fundacion-verde rounded-full animate-spin"></div>
          <VisionText variant="secondary">Iniciando Dashboard...</VisionText>
        </div>
      </div>
    );
  }

  const tieneLineaBase = !!(lineaBaseResponse.exists && lineaBaseResponse.lineaBase);

  // Calcular progreso basado en el estado del usuario
  const progresoLineaBase = tieneLineaBase ? 100 : 0;
  const progresoGeneral = tieneLineaBase ? 15 : 5;
  const progresoCapacitaciones = 0; // TODO: Calcular basado en capacitaciones completadas

  const stats = [
    {
      title: "Línea Base",
      value: tieneLineaBase ? "Completada" : "Pendiente",
      icon: FileText,
      description: tieneLineaBase ? "Ver tu perfil" : "Inicia tu perfil",
      action: !tieneLineaBase,
      progress: progresoLineaBase,
      color: colorConfig.primary.gradient,
      bgColor: colorConfig.primary.light,
      textColor: colorConfig.primary.text,
      iconColor: colorConfig.primary.iconColor
    },
    {
      title: "Capacitaciones",
      value: "0",
      icon: BookOpen,
      description: "Cursos disponibles",
      progress: progresoCapacitaciones,
      color: colorConfig.secondary.gradient,
      bgColor: colorConfig.secondary.light,
      textColor: colorConfig.secondary.text,
      iconColor: colorConfig.secondary.iconColor
    },
  ];

  const upcomingTasks = tieneLineaBase 
    ? [
        {
          title: "Primera Capacitación",
          description: "Fundamentos del emprendimiento",
          priority: "high",
          dueDate: "Próximamente",
          disabled: false,
          icon: BookOpen,
          progress: 0
        },
        {
          title: "Evaluación Inicial",
          description: "Conoce tus fortalezas emprendedoras",
          priority: "medium",
          dueDate: "Próximamente",
          disabled: false,
          icon: Target,
          progress: 0
        }
      ]
    : [
        {
          title: "Completa tu Línea Base",
          description: "Define el estado actual de tu emprendimiento",
          priority: "high",
          dueDate: "Pendiente",
          action: "Comenzar",
          icon: FileText,
          progress: 0
        },
        {
          title: "Primera Capacitación",
          description: "Fundamentos del emprendimiento",
          priority: "medium",
          dueDate: "Próximamente",
          disabled: true,
          icon: BookOpen,
          progress: 0
        },
        {
          title: "Evaluación Inicial",
          description: "Conoce tus fortalezas emprendedoras",
          priority: "low",
          dueDate: "Próximamente",
          disabled: true,
          icon: Target,
          progress: 0
        }
      ];

  const recentActivity = [
    {
      title: "Cuenta creada",
      description: "Bienvenido al programa",
      time: "Hace 45 días",
      icon: CheckCircle,
      color: colorConfig.accent.text,
      bgColor: colorConfig.accent.light,
      iconColor: "text-green-600"
    },
    {
      title: "Perfil actualizado",
      description: "Información verificada",
      time: "Hace 45 días",
      icon: User,
      color: colorConfig.primary.text,
      bgColor: colorConfig.primary.light,
      iconColor: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen p-6 sm:p-8 spatial-bg">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <VisionSpringContainer>
          <div className={`relative overflow-hidden rounded-vision-lg ${tieneLineaBase ? 'bg-gradient-to-br from-fundacion-verde to-fundacion-verde/90' : 'bg-gradient-to-br from-fundacion-verde to-fundacion-verde/90'} p-8 shadow-2xl border border-white/10`}>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                    {tieneLineaBase ? (
                      <CheckCircle className="w-5 h-5 text-fundacion-amarillo" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-fundacion-amarillo" />
                    )}
                  </div>
                  <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm px-3 py-1">
                    {tieneLineaBase ? 'Activo' : 'Nuevo'}
                  </Badge>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {tieneLineaBase 
                      ? '¡Continúa tu camino emprendedor!' 
                      : '¡Comienza tu viaje emprendedor!'
                    }
                  </h1>
                  <p className="text-white/80 text-lg mt-2 max-w-2xl font-medium">
                    {tieneLineaBase
                      ? 'Tu línea base está completa. Ahora puedes acceder a capacitaciones y recursos.'
                      : 'Completa tu línea base para crear un plan personalizado y alcanzar tus metas.'
                    }
                  </p>
                </div>
              </div>

              {!tieneLineaBase && (
                <Button
                  onClick={() => router.push('/emprendedor/linea-base')}
                  className="bg-fundacion-amarillo text-fundacion-verde hover:bg-fundacion-amarillo-light shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-8 font-bold text-base whitespace-nowrap rounded-vision-md"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Crear Línea Base
                </Button>
              )}
            </div>
          </div>
        </VisionSpringContainer>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <VisionSpringContainer key={index} delay={index * 100}>
              <VisionGlassWindow className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="p-6 flex flex-col h-full justify-between">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${stat.bgColor} backdrop-blur-md shadow-sm`}>
                      <stat.icon className={`w-6 h-6 ${stat.iconColor || 'text-fundacion-verde'}`} strokeWidth={2.5} />
                    </div>
                    {stat.action && (
                      <Badge className="bg-fundacion-amarillo/20 text-fundacion-verde border border-fundacion-amarillo/30">
                        Pendiente
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <VisionTypography variant="title-large" className="vision-text-primary text-3xl font-bold">
                      {stat.value}
                    </VisionTypography>
                    <VisionTypography variant="headline" className="vision-text-primary text-base">
                      {stat.title}
                    </VisionTypography>
                    <VisionText variant="tertiary" className="text-sm line-clamp-1">
                      {stat.description}
                    </VisionText>
                  </div>

                  {stat.progress > 0 && (
                    <div className="pt-4 mt-auto">
                      <Progress value={stat.progress} className="h-2 bg-black/5" />
                    </div>
                  )}

                  {stat.action && (
                    <div className="pt-4 mt-auto">
                      <Button
                        onClick={() => router.push('/emprendedor/linea-base')}
                        variant="vision"
                        size="visionSm"
                        className="w-full justify-center bg-white/40 hover:bg-white/60 border border-white/20"
                      >
                        <Zap className="w-4 h-4 mr-2 text-fundacion-verde" />
                        Comenzar
                      </Button>
                    </div>
                  )}

                  {tieneLineaBase && stat.title === "Línea Base" && (
                    <div className="pt-4 mt-auto">
                      <Button
                        onClick={() => router.push('/emprendedor/linea-base')}
                        variant="vision"
                        size="visionSm"
                        className="w-full justify-center bg-white/40 hover:bg-white/60 border border-white/20"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Ver Detalles
                      </Button>
                    </div>
                  )}
                </div>
              </VisionGlassWindow>
            </VisionSpringContainer>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Línea Base Featured Card */}
          <VisionSpringContainer delay={400} className="lg:col-span-2">
            <VisionGlassWindow className="h-full relative overflow-hidden" withNoise>
              <div className="absolute top-0 right-0 w-96 h-96 bg-fundacion-amarillo/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl bg-fundacion-verde/10`}>
                        <FileText className={`w-6 h-6 text-fundacion-verde`} strokeWidth={2.5} />
                      </div>
                      <VisionTypography variant="title-1" className="vision-text-primary font-bold">
                        Línea Base del Emprendedor
                      </VisionTypography>
                    </div>
                    <VisionText variant="secondary" className="text-lg">
                      {tieneLineaBase 
                        ? 'Tu perfil emprendedor está completo y actualizado.'
                        : 'Tu punto de partida hacia el éxito empresarial.'
                      }
                    </VisionText>
                  </div>

                  <Badge className={`${tieneLineaBase ? 'bg-green-100 text-green-700' : 'bg-fundacion-amarillo text-fundacion-verde'} border-0 shadow-sm px-3 py-1 font-semibold text-sm`}>
                    {tieneLineaBase ? 'Completada' : 'Recomendado'}
                  </Badge>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: User, text: "Identificación" },
                    { icon: Target, text: "Domicilio" },
                    { icon: BarChart3, text: "Información preliminar" },
                    { icon: TrendingUp, text: "Datos del negocio" }
                  ].map((item, idx) => (
                    <VisionInteractive key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/40 border border-white/20">
                      <div className={`p-2 rounded-lg bg-white/50 shadow-sm`}>
                        <item.icon className={`w-5 h-5 text-fundacion-verde`} strokeWidth={2.5} />
                      </div>
                      <span className="text-base font-semibold vision-text-primary">{item.text}</span>
                    </VisionInteractive>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {tieneLineaBase ? (
                    <Button
                      onClick={() => router.push('/emprendedor/linea-base')}
                      variant="visionPrimary"
                      size="visionLg"
                      className="flex-1 shadow-xl"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Ver Línea Base
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => router.push('/emprendedor/linea-base')}
                        variant="visionPrimary"
                        size="visionLg"
                        className="flex-1 shadow-xl"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Comenzar Ahora
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </VisionGlassWindow>
          </VisionSpringContainer>

          {/* Profile Card */}
          <VisionSpringContainer delay={500}>
            <VisionGlassWindow className="h-full p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg bg-fundacion-verde/10`}>
                  <User className={`w-5 h-5 text-fundacion-verde`} strokeWidth={2.5} />
                </div>
                <VisionTypography variant="headline" className="vision-text-primary">
                  Tu Perfil
                </VisionTypography>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/20 backdrop-blur-md">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fundacion-amarillo to-fundacion-verde flex items-center justify-center shadow-lg ring-2 ring-white">
                    {user?.fotografiaBase64 ? (
                      <img
                        src={`data:image/jpeg;base64,${user.fotografiaBase64}`}
                        alt={user.nombre}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <span className="text-white font-bold text-2xl">
                        {user?.nombre?.substring(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold vision-text-primary truncate text-lg">
                      {user?.nombre} {user?.apellidos}
                    </h3>
                    <p className="text-sm vision-text-secondary font-medium">
                      Emprendedor
                    </p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span className="text-xs text-green-700 font-bold uppercase tracking-wide">Activo</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Mail, label: "Email", value: user?.correoElectronico, color: "text-blue-600", bg: "bg-blue-50" },
                    { icon: Phone, label: "Teléfono", value: user?.numeroCelular, color: "text-purple-600", bg: "bg-purple-50" }
                  ].map((item, idx) => (
                    <VisionInteractive key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/30 border border-white/10 w-full text-left">
                      <div className={`p-2 rounded-lg bg-white/60 shadow-sm`}>
                        <item.icon className={`w-4 h-4 text-fundacion-verde`} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs vision-text-tertiary font-medium uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm vision-text-primary truncate font-semibold">{item.value}</p>
                      </div>
                    </VisionInteractive>
                  ))}
                </div>

                <Button variant="vision" size="visionMd" className="w-full justify-between group">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </span>
                  <ChevronRight className="w-4 h-4 text-black/20 group-hover:text-black/50 transition-colors" />
                </Button>
              </div>
            </VisionGlassWindow>
          </VisionSpringContainer>
        </div>

        {/* Tasks and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tasks Card */}
          <VisionSpringContainer delay={600}>
            <VisionGlassWindow className="h-full p-6">
              <div className="flex items-center justify-between mb-6 pointer-events-none">
                <div className="flex items-center gap-3 pointer-events-auto">
                  <div className={`p-2 rounded-lg bg-fundacion-amarillo/20`}>
                    <Clock className={`w-5 h-5 text-fundacion-verde`} strokeWidth={2.5} />
                  </div>
                  <div>
                    <VisionTypography variant="headline" className="vision-text-primary">
                      Tareas Pendientes
                    </VisionTypography>
                    <VisionText variant="tertiary" className="text-xs">
                      Actividades clave
                    </VisionText>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/50 text-fundacion-verde border border-white/20 backdrop-blur-md px-2.5 py-0.5 font-bold pointer-events-auto hover:bg-fundacion-verde hover:text-white transition-colors duration-200">
                  {upcomingTasks.filter(t => !t.disabled).length}
                </Badge>
              </div>
            
              <div className="space-y-4">
                {upcomingTasks.map((task, index) => {
                  const priorityConfig: Record<string, { bg: string; border: string; badge?: string }> = {
                    high: { bg: 'bg-red-50/50', border: 'border-red-100', badge: 'bg-red-100 text-red-700 border-red-200' },
                    medium: { bg: 'bg-white/40', border: 'border-white/20', badge: 'bg-fundacion-amarillo/20 text-fundacion-verde border-fundacion-amarillo/30' },
                    low: { bg: 'bg-white/20', border: 'border-white/10' }
                  };

                  const config = task.disabled
                    ? { bg: 'bg-gray-50/30', border: 'border-transparent' }
                    : priorityConfig[task.priority];

                  return (
                    <VisionInteractive
                      asChild
                      key={index}
                      className={`
                        w-full p-4 rounded-xl border transition-all duration-300
                        ${task.disabled ? 'opacity-50 pointer-events-none grayscale' : 'hover:shadow-lg'}
                        ${config.bg} ${config.border}
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`
                          p-2.5 rounded-xl flex-shrink-0
                          ${task.disabled ? 'bg-gray-100 text-gray-400' : `bg-white shadow-sm text-fundacion-verde`}
                        `}>
                          <task.icon className="w-5 h-5" strokeWidth={2.5} />
                        </div>
                        
                        <div className="flex-1 min-w-0 space-y-2 text-left">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold vision-text-primary text-sm leading-tight">
                              {task.title}
                            </h4>
                            {task.priority === 'high' && !task.disabled && (
                              <Badge className={`${config.badge} border shadow-none text-[10px] px-2 uppercase tracking-wide`}>
                                Urgente
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm vision-text-secondary leading-relaxed">
                            {task.description}
                          </p>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2 text-xs vision-text-tertiary font-medium">
                              <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
                              <span>{task.dueDate}</span>
                            </div>

                            {task.action && !task.disabled && (
                              <Button
                                onClick={() => router.push('/emprendedor/linea-base')}
                                size="sm"
                                variant="visionPrimary"
                                className="h-8 text-xs font-bold px-4 shadow-md"
                              >
                                {task.action}
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </VisionInteractive>
                  );
                })}
              </div>
            </VisionGlassWindow>
          </VisionSpringContainer>

          {/* Activity Card */}
          <VisionSpringContainer delay={700}>
            <VisionGlassWindow className="h-full p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-blue-50/50`}>
                    <Activity className={`w-5 h-5 text-blue-600`} strokeWidth={2.5} />
                  </div>
                  <VisionTypography variant="headline" className="vision-text-primary">
                    Actividad Reciente
                  </VisionTypography>
                </div>
              </div>
            
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <VisionInteractive asChild key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/40 border border-white/20 w-full text-left">
                    <div className={`p-2.5 rounded-xl ${activity.bgColor} flex-shrink-0 shadow-sm bg-white`}>
                      <activity.icon className={`w-5 h-5 ${activity.iconColor}`} strokeWidth={2.5} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold vision-text-primary text-sm mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm vision-text-secondary mb-2 leading-relaxed">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs vision-text-tertiary font-medium">
                        <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </VisionInteractive>
                ))}

                <Button variant="visionGlass" className="w-full mt-4 justify-between group">
                  Ver Historial Completo
                  <ChevronRight className="w-4 h-4 ml-auto text-black/20 group-hover:text-black/50 transition-colors" />
                </Button>
              </div>
            </VisionGlassWindow>
          </VisionSpringContainer>
        </div>

        {/* Progress Overview */}
        <VisionSpringContainer delay={800}>
          <VisionGlassWindow className="relative overflow-hidden p-8" withNoise>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-fundacion-verde/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-fundacion-verde/10`}>
                    <TrendingUp className={`w-5 h-5 text-fundacion-verde`} strokeWidth={2.5} />
                  </div>
                  <VisionTypography variant="title-1" className="vision-text-primary font-bold">
                    Progreso General
                  </VisionTypography>
                </div>
                <VisionText variant="secondary" className="text-base ml-10">
                  Tu avance en el programa de emprendimiento.
                </VisionText>
              </div>
              
              <div className="text-center sm:text-right bg-white/40 p-4 rounded-2xl border border-white/20 backdrop-blur-md shadow-sm">
                <p className={`text-4xl font-black text-fundacion-verde`}>
                  {progresoGeneral}%
                </p>
                <p className="text-xs text-fundacion-verde/70 font-bold uppercase tracking-wider mt-1">Completado</p>
              </div>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <Progress value={progresoGeneral} className="h-4 bg-black/5 rounded-full" />
                <p className="text-sm vision-text-tertiary text-center font-medium">
                  {tieneLineaBase 
                    ? '¡Excelente progreso! Tu línea base está completa. Continúa con las capacitaciones.' 
                    : '¡Excelente inicio! Continúa completando tareas para avanzar al siguiente nivel.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Perfil", value: "100%", color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
                  { label: "Línea Base", value: `${progresoLineaBase}%`, color: tieneLineaBase ? "text-green-600" : "text-fundacion-amarillo-dark", bg: tieneLineaBase ? "bg-green-100" : "bg-fundacion-amarillo/20", icon: FileText },
                  { label: "Capacitaciones", value: `${progresoCapacitaciones}%`, color: "text-blue-600", bg: "bg-blue-100", icon: BookOpen }
                ].map((item, idx) => (
                  <VisionInteractive key={idx} className="relative p-5 rounded-2xl bg-white/40 border border-white/20 w-full text-left group">
                    <div className={`flex items-center justify-between mb-3`}>
                      <div className={`p-2.5 rounded-xl ${item.bg} group-hover:scale-110 transition-transform`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2.5} />
                      </div>
                      <p className={`text-2xl font-bold ${item.color}`}>
                        {item.value}
                      </p>
                    </div>
                    <p className="text-sm vision-text-secondary font-bold uppercase tracking-wide">{item.label}</p>
                  </VisionInteractive>
                ))}
              </div>
            </div>
          </VisionGlassWindow>
        </VisionSpringContainer>
      </div>
    </div>
  );
}
