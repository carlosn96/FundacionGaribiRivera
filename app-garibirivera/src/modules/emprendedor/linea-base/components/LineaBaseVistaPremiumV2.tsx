// src/components/lineaBase/LineaBaseVistaPremiumV2.tsx
/**
 * @fileoverview Componente Premium V2 para visualizar la Línea Base
 * Diseño ultra-moderno con progressive disclosure y scrollytelling mobile-first
 * @version 2.0.0
 */
'use client';

import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent } from '@/core/components/ui/card';
import { Badge } from '@/core/components/ui/badge';
import { Separator } from '@/core/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/core/components/ui/sheet';
import { 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  User, 
  MapPin, 
  Wallet, 
  Building, 
  TrendingUp, 
  DollarSign, 
  PiggyBank, 
  Loader2,
  Download,
  Printer,
  Share2,
  Eye,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  FileDown,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LineaBaseSchema, type LineaBaseType } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBaseSections';
import { recuperarCatalogosLineaBase } from '@/modules/emprendedor/linea-base/application/services/lineaBase';
import { CatalogosPorSecciones } from '@/modules/emprendedor/linea-base/domain/schemas/lineaBase';
import { cn } from '@/core/utils/utils';

// ============================================
// TIPOS Y CONFIGURACIÓN
// ============================================

enum NavigationMode {
  STREAM = 'stream',
  SECTION = 'section',
  PRINT = 'print'
}

interface SectionConfig {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  keyMetric?: (data: LineaBaseType) => string;
  preview?: (data: LineaBaseType) => string[];
}

interface LineaBaseVistaPremiumV2Props {
  initialData: LineaBaseType;
  onBack?: () => void;
  showBackButton?: boolean;
  userName?: string;
}

// ============================================
// CONFIGURACIÓN DE SECCIONES
// ============================================

const getSectionConfigs = (data: LineaBaseType, catalogos: CatalogosPorSecciones | null): SectionConfig[] => {
  const getCatalogDescription = (value: unknown, catalogItems: Array<Record<string, unknown>> | undefined, idKey: string) => {
    if (!catalogItems) return 'No especificado';
    const item = catalogItems.find(i => String(i[idKey]) === String(value));
    const description = item?.['descripcion'];
    return description !== undefined && description !== null ? String(description) : String(value);
  };

  return [
    {
      id: 'preliminar',
      title: 'Información Preliminar',
      icon: <FileText className="w-5 h-5" />,
      color: 'text-blue-600',
      gradient: 'from-blue-500 to-cyan-500',
      keyMetric: () => `${data.preliminar.mediosConocimiento?.length || 0} medios de conocimiento`,
      preview: () => [
        getCatalogDescription(data.preliminar.tiempoCapacitacion?.id_tiempo, catalogos?.tiempoCapacitacion.data, 'id_tiempo'),
        getCatalogDescription(data.preliminar.razonRecurre?.id_razon, catalogos?.razonRecurre.data, 'id_razon')
      ]
    },
    {
      id: 'identificacion',
      title: 'Identificación',
      icon: <User className="w-5 h-5" />,
      color: 'text-purple-600',
      gradient: 'from-purple-500 to-pink-500',
      keyMetric: () => `${data.identificacion.edad} años`,
      preview: () => [
        typeof data.identificacion.genero === 'string' ? data.identificacion.genero : data.identificacion.genero?.descripcion || '',
        getCatalogDescription(data.identificacion.escolaridad?.id_escolaridad, catalogos?.escolaridad.data, 'id_escolaridad')
      ]
    },
    {
      id: 'domicilio',
      title: 'Domicilio',
      icon: <MapPin className="w-5 h-5" />,
      color: 'text-green-600',
      gradient: 'from-green-500 to-emerald-500',
      keyMetric: () => data.domicilio.municipio.nombre,
      preview: () => [
        data.domicilio.colonia,
        `${data.domicilio.estado.nombre}`
      ]
    },
    {
      id: 'socioeconomico',
      title: 'Socioeconómico',
      icon: <Wallet className="w-5 h-5" />,
      color: 'text-orange-600',
      gradient: 'from-orange-500 to-amber-500',
      keyMetric: () => getCatalogDescription(data.socioeconomico.ingresoMensual?.id_rango, catalogos?.ingresoMensual.data, 'id_rango'),
      preview: () => [
        getCatalogDescription(data.socioeconomico.ocupacionActual?.id_ocupacion, catalogos?.ocupacionActual.data, 'id_ocupacion'),
        getCatalogDescription(data.socioeconomico.cantidadDependientesEconomicos?.id_cantidad, catalogos?.cantidadDependientesEconomicos.data, 'id_cantidad')
      ]
    },
    ...(data.negocio ? [{
      id: 'negocio',
      title: 'Negocio',
      icon: <Building className="w-5 h-5" />,
      color: 'text-cyan-600',
      gradient: 'from-cyan-500 to-blue-500',
      keyMetric: () => data.negocio?.nombre || '',
      preview: () => [
        getCatalogDescription(data.negocio?.giroNegocio?.id_tipo_giro, catalogos?.giroNegocio.data, 'id_tipo_giro'),
        `${data.negocio?.cantidadEmpleados || 0} empleados`
      ]
    }] : []),
    ...(data.analisisNegocio && data.negocio ? [{
      id: 'analisis',
      title: 'Análisis del Negocio',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-indigo-600',
      gradient: 'from-indigo-500 to-purple-500',
      keyMetric: () => data.analisisNegocio?.conoceUtilidades ? 'Conoce utilidades' : 'No conoce utilidades',
      preview: () => [
        data.analisisNegocio?.registraEntradasSalidas ? 'Registra ingresos/egresos' : 'No registra',
        `${data.analisisNegocio?.estrategiasIncrementarVentas?.length || 0} estrategias de venta`
      ]
    }] : []),
    ...(data.administracionIngresos && data.negocio ? [{
      id: 'administracion',
      title: 'Administración de Ingresos',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'text-emerald-600',
      gradient: 'from-emerald-500 to-green-500',
      keyMetric: () => `$${data.administracionIngresos?.montoMensualVentas.toLocaleString() || 0}`,
      preview: () => [
        `Utilidades: $${data.administracionIngresos?.montoMensualUtilidades.toLocaleString() || 0}`,
        `Sueldo: $${data.administracionIngresos?.sueldoMensual.toLocaleString() || 0}`
      ]
    }] : []),
    ...(data.objetivosAhorro ? [{
      id: 'ahorros',
      title: 'Ahorros y Objetivos',
      icon: <PiggyBank className="w-5 h-5" />,
      color: 'text-pink-600',
      gradient: 'from-pink-500 to-rose-500',
      keyMetric: () => data.objetivosAhorro?.tieneHabitoAhorro ? 'Tiene hábito de ahorro' : 'Sin hábito de ahorro',
      preview: () => [
        data.objetivosAhorro?.cuentaSistemaAhorro ? `$${data.objetivosAhorro.montoAhorroMensual?.toLocaleString() || 0}/mes` : 'Sin sistema',
        getCatalogDescription(data.objetivosAhorro?.objetivosAhorro?.id_objetivo, catalogos?.objetivosAhorro.data, 'id_objetivo')
      ]
    }] : [])
  ];
};

// ============================================
// SPRING ANIMATION CONFIG
// ============================================

const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      ...springConfig
    }
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export const LineaBaseVistaPremiumV2: React.FC<LineaBaseVistaPremiumV2Props> = ({ 
  initialData, 
  onBack, 
  showBackButton = true,
  userName = 'Emprendedor'
}) => {
  const [data, setData] = useState<LineaBaseType | null>(null);
  const [catalogos, setCatalogos] = useState<CatalogosPorSecciones | null>(null);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [navigationMode, setNavigationMode] = useState<NavigationMode>(NavigationMode.STREAM);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [showExportMenu, setShowExportMenu] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollOptions, setScrollOptions] = useState<{ container: React.RefObject<HTMLDivElement> } | undefined>(undefined);
  const { scrollYProgress } = useScroll(scrollOptions);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      setScrollOptions({ container: scrollContainerRef });
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      const parsed = LineaBaseSchema.safeParse(initialData);
      if (parsed.success) {
        setData(parsed.data);
      } else {
        console.error("Error validando datos:", parsed.error);
      }
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const catalogosResponse = await recuperarCatalogosLineaBase();
        if (catalogosResponse) {
          setCatalogos(catalogosResponse);
        }
      } catch (error) {
        console.error('Error fetching catalogos:', error);
      } finally {
        setLoadingCatalogos(false);
      }
    };

    fetchCatalogos();
  }, []);

  const toggleCard = (sectionId: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const openSection = (sectionId: string) => {
    setSelectedSection(sectionId);
    setNavigationMode(NavigationMode.SECTION);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Línea Base',
          text: `Línea Base de ${userName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loadingCatalogos || !data) {
    return <LoadingState />;
  }

  const sections = getSectionConfigs(data, catalogos);
  const completionPercentage = Math.round((sections.length / 8) * 100);

  return (
    <>
      {/* Estilos de impresión */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          #printable-content { 
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        
        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50 no-print"
          style={{ scaleX }}
        />

        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 no-print">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {showBackButton && onBack && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack}
                    className="shrink-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <div>
                  <h1 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    {userName}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Línea Base • {new Date().toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="relative"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div 
          ref={scrollContainerRef}
          className="container mx-auto px-4 py-6 max-w-2xl overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 140px)' }}
        >
          
          {/* Success Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 p-2 bg-green-100 dark:bg-green-900 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-green-900 dark:text-green-50 text-sm">
                      Información completada
                    </h3>
                    <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                      Tu línea base ha sido registrada correctamente
                    </p>
                  </div>
                  <ProgressRing percentage={completionPercentage} size={48} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card Stream */}
          <div className="space-y-3">
            {sections.map((section, index) => (
              <SectionCard
                key={section.id}
                section={section}
                data={data}
                catalogos={catalogos}
                index={index}
                isExpanded={expandedCards.has(section.id)}
                onToggle={() => toggleCard(section.id)}
                onViewAll={() => openSection(section.id)}
              />
            ))}
          </div>

          {/* Spacer para bottom nav */}
          <div className="h-20" />
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation
          mode={navigationMode}
          onModeChange={setNavigationMode}
          onPrint={handlePrint}
          onShare={handleShare}
        />

        {/* Export Menu Sheet */}
        <Sheet open={showExportMenu} onOpenChange={setShowExportMenu}>
          <SheetContent side="bottom" className="h-auto">
            <SheetHeader>
              <SheetTitle>Exportar Línea Base</SheetTitle>
              <SheetDescription>Elige cómo quieres compartir o guardar esta información</SheetDescription>
            </SheetHeader>
            <div className="grid gap-3 py-4">
              <Button variant="outline" className="justify-start gap-3" onClick={handlePrint}>
                <Printer className="w-5 h-5" />
                Imprimir / Guardar como PDF
              </Button>
              <Button variant="outline" className="justify-start gap-3" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
                Compartir enlace
              </Button>
              <Button variant="outline" className="justify-start gap-3">
                <Download className="w-5 h-5" />
                Descargar datos (CSV)
              </Button>
              <Button variant="outline" className="justify-start gap-3">
                <ExternalLink className="w-5 h-5" />
                Generar enlace público (24h)
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Section Detail Sheet */}
        <AnimatePresence>
          {selectedSection && (
            <SectionDetailSheet
              sectionId={selectedSection}
              data={data}
              catalogos={catalogos}
              onClose={() => {
                setSelectedSection(null);
                setNavigationMode(NavigationMode.STREAM);
              }}
            />
          )}
        </AnimatePresence>

        {/* Printable Content */}
        <div id="printable-content" className="hidden print:block">
          <PrintableReport data={data} catalogos={catalogos} userName={userName} />
        </div>
      </div>
    </>
  );
};

// ============================================
// SECTION CARD COMPONENT
// ============================================

interface SectionCardProps {
  section: SectionConfig;
  data: LineaBaseType;
  catalogos: CatalogosPorSecciones | null;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onViewAll: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ 
  section, 
  data, 
  catalogos,
  index, 
  isExpanded, 
  onToggle, 
  onViewAll 
}) => {
  const keyMetric = section.keyMetric?.(data);
  const preview = section.preview?.(data);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={cardVariants}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800">
        <CardContent className="p-0">
          {/* Header */}
          <button
            onClick={onToggle}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className={cn("shrink-0 p-2 rounded-xl bg-gradient-to-br", section.gradient, "text-white")}>
              {section.icon}
            </div>
            <div className="flex-1 text-left min-w-0">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-50 truncate">
                {section.title}
              </h3>
              {keyMetric && (
                <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
                  {keyMetric}
                </p>
              )}
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={springConfig}
            >
              <ChevronDown className="w-5 h-5 text-slate-400" />
            </motion.div>
          </button>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={springConfig}
                className="overflow-hidden"
              >
                <div className="px-4 pb-3 pt-2 space-y-2 bg-slate-50/50 dark:bg-slate-800/30">
                  {preview?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-1.5 shrink-0" />
                      <p className="text-xs text-slate-700 dark:text-slate-300 flex-1">
                        {item}
                      </p>
                    </div>
                  ))}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onViewAll}
                    className="w-full justify-between mt-3 text-xs h-8"
                  >
                    Ver todo
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// ============================================
// PROGRESS RING COMPONENT
// ============================================

interface ProgressRingProps {
  percentage: number;
  size?: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ percentage, size = 48 }) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-slate-200 dark:text-slate-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="text-green-500"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-green-600 dark:text-green-400">
          {percentage}%
        </span>
      </div>
    </div>
  );
};

// ============================================
// BOTTOM NAVIGATION
// ============================================

interface BottomNavigationProps {
  mode: NavigationMode;
  onModeChange: (mode: NavigationMode) => void;
  onPrint: () => void;
  onShare: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ mode, onModeChange, onPrint, onShare }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 no-print">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3 max-w-2xl">
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={mode === NavigationMode.STREAM ? "default" : "ghost"}
              size="sm"
              onClick={() => onModeChange(NavigationMode.STREAM)}
              className="flex-col h-auto py-2 gap-1"
            >
              <BarChart3 className="w-5 h-5" />
              <span className="text-xs">Vista</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onShare}
              className="flex-col h-auto py-2 gap-1"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs">Compartir</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrint}
              className="flex-col h-auto py-2 gap-1"
            >
              <Printer className="w-5 h-5" />
              <span className="text-xs">Exportar</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SECTION DETAIL SHEET
// ============================================

interface SectionDetailSheetProps {
  sectionId: string;
  data: LineaBaseType;
  catalogos: CatalogosPorSecciones | null;
  onClose: () => void;
}

const SectionDetailSheet: React.FC<SectionDetailSheetProps> = ({ sectionId, data, catalogos, onClose }) => {
  const getCatalogDescription = (value: unknown, catalogItems: Array<Record<string, unknown>> | undefined, idKey: string) => {
    if (!catalogItems) return 'No especificado';
    const item = catalogItems.find(i => String(i[idKey]) === String(value));
    const description = item?.['descripcion'];
    return description !== undefined && description !== null ? String(description) : String(value);
  };

  const getYesNo = (val: unknown) => {
    if (val === undefined || val === null) return 'No especificado';
    if (val === 1 || val === '1' || val === true || val === 'si') return 'Sí';
    return 'No';
  };

  const renderSectionContent = () => {
    switch (sectionId) {
      case 'identificacion':
        return (
          <div className="space-y-3">
            <DetailField label="Edad" value={`${data.identificacion.edad} años`} />
            <DetailField 
              label="Género" 
              value={typeof data.identificacion.genero === 'string' ? data.identificacion.genero : data.identificacion.genero?.descripcion || 'No especificado'} 
            />
            <DetailField 
              label="Estado civil" 
              value={getCatalogDescription(data.identificacion.estadoCivil?.id_estado_civil, catalogos?.estadoCivil.data, 'id_estado_civil')} 
            />
            <DetailField 
              label="Escolaridad" 
              value={getCatalogDescription(data.identificacion.escolaridad?.id_escolaridad, catalogos?.escolaridad.data, 'id_escolaridad')} 
            />
            {data.identificacion.discapacidad && (
              <DetailField label="Discapacidad" value={data.identificacion.discapacidad} />
            )}
          </div>
        );
      
      case 'domicilio':
        return (
          <div className="space-y-3">
            <DetailField 
              label="Dirección completa" 
              value={`${data.domicilio.calle} ${data.domicilio.numeroExterior}${data.domicilio.numeroInterior ? `, Int. ${data.domicilio.numeroInterior}` : ''}`}
            />
            <DetailField label="Colonia" value={data.domicilio.colonia} />
            <DetailField label="Municipio" value={data.domicilio.municipio.nombre} />
            <DetailField label="Estado" value={data.domicilio.estado.nombre} />
            <DetailField label="Código Postal" value={data.domicilio.codigoPostal.codigo_postal} />
            <Separator />
            <DetailField label="Entre calles" value={`${data.domicilio.calleCruce1} y ${data.domicilio.calleCruce2}`} />
            <DetailField label="Comunidad Parroquial" value={data.domicilio.comunidadParroquial?.nombre || 'No especificada'} />
          </div>
        );

      // Agregar más casos según sea necesario
      default:
        return <p className="text-sm text-slate-600 dark:text-slate-400">Contenido de {sectionId}</p>;
    }
  };

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
        <SheetHeader className="sticky top-0 bg-white dark:bg-slate-900 z-10 pb-4">
          <SheetTitle className="flex items-center gap-2">
            {sectionId === 'identificacion' && <User className="w-5 h-5" />}
            {sectionId === 'domicilio' && <MapPin className="w-5 h-5" />}
            {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
          </SheetTitle>
          <SheetDescription>Información detallada</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {renderSectionContent()}
        </div>
      </SheetContent>
    </Sheet>
  );
};

// ============================================
// DETAIL FIELD COMPONENT
// ============================================

const DetailField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
    <span className="text-sm text-slate-900 dark:text-slate-50">{value}</span>
  </div>
);

// ============================================
// LOADING STATE
// ============================================

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
    <div className="text-center space-y-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
      <p className="text-sm text-slate-600 dark:text-slate-400">Cargando información...</p>
    </div>
  </div>
);

// ============================================
// PRINTABLE REPORT
// ============================================

const PrintableReport: React.FC<{ data: LineaBaseType; catalogos: CatalogosPorSecciones | null; userName: string }> = ({ 
  data, 
  catalogos, 
  userName 
}) => (
  <div className="p-8 max-w-4xl mx-auto">
    <div className="text-center mb-8 border-b-2 border-slate-200 pb-6">
      <h1 className="text-3xl font-bold mb-2">Fundación Garibi Rivera</h1>
      <h2 className="text-xl font-semibold text-slate-700">Línea Base - Programa de Emprendedores</h2>
      <p className="text-sm text-slate-600 mt-2">
        {userName} • {new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
    {/* Agregar contenido completo para impresión */}
    <p className="text-sm text-slate-600">Contenido completo del reporte...</p>
  </div>
);

export default LineaBaseVistaPremiumV2;
