// src/components/lineaBase/LineaBaseVistaPremium.tsx
/**
 * @fileoverview Componente Premium para visualizar la Línea Base
 * Diseño mobile-first, profesional, con funcionalidad de impresión
 */
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { VisionGlassWindow, VisionTypography, VisionText, VisionSpringContainer } from '@/core/components/ui/vision-glass';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Badge } from '@/core/components/ui/badge';
import { Separator } from '@/core/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/core/components/ui/sheet';
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
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { LineaBaseSchema, type LineaBaseType } from '@/modules/emprendedor/linea-base/domain/models/lineaBaseSections';
import { recuperarCatalogosLineaBase } from '@/modules/emprendedor/linea-base/application/services/lineaBase';
import { CatalogosPorSecciones } from '@/modules/emprendedor/linea-base/domain/models/lineaBase';
import { cn } from '@/core/utils/utils';

interface LineaBaseVistaPremiumProps {
  initialData: LineaBaseType;
  onBack?: () => void;
  showBackButton?: boolean;
  userName?: string;
}

interface SectionData {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}

export const LineaBaseVistaPremium: React.FC<LineaBaseVistaPremiumProps> = ({ 
  initialData, 
  onBack, 
  showBackButton = true,
  userName = 'Emprendedor'
}) => {
  const [data, setData] = useState<LineaBaseType | null>(null);
  const [catalogos, setCatalogos] = useState<CatalogosPorSecciones | null>(null);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [selectedTab, setSelectedTab] = useState('resumen');
  const printRef = useRef<HTMLDivElement>(null);

  // Inicializar todas las secciones expandidas
  useEffect(() => {
    const sections = ['preliminar', 'identificacion', 'domicilio', 'socioeconomico', 'negocio', 'analisis', 'administracion', 'ahorros'];
    const initialExpanded: Record<string, boolean> = {};
    sections.forEach(section => {
      initialExpanded[section] = true;
    });
    setExpandedSections(initialExpanded);
  }, []);

  useEffect(() => {
    if (initialData) {
      const parsed = LineaBaseSchema.safeParse(initialData);
      if (parsed.success) {
        setData(parsed.data);
      } else {
        console.error("Error validando datos de línea base para vista:", parsed.error);
      }
    }
  }, [initialData]);

  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const catalogosResponse = await recuperarCatalogosLineaBase();
        if (catalogosResponse) {
          setCatalogos(catalogosResponse as any);
        }
      } catch (error) {
        console.error('Error fetching catalogos:', error);
      } finally {
        setLoadingCatalogos(false);
      }
    };

    fetchCatalogos();
  }, []);

  const getCatalogDescription = (
    value: number | undefined | string,
    catalogItems: Array<Record<string, unknown>> | undefined,
    idKey: string,
    descKey: string = 'descripcion'
  ) => {
    if (value === undefined || value === null || !catalogItems) return 'No especificado';
    const item = catalogItems.find(i => String(i[idKey]) === String(value));
    const rawValue = item?.[descKey];
    return rawValue !== undefined && rawValue !== null ? String(rawValue) : String(value);
  };

  const getYesNo = (val: unknown) => {
    if (val === undefined || val === null) return 'No especificado';
    if (val === 1 || val === '1' || val === true || val === 'si') return 'Sí';
    return 'No';
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handlePrint = () => {
    console.log('Imprimir función activada');
    //window.print();
  };

  const handleDownloadPDF = () => {
    console.log('Descargar PDF función activada');
    // Trigger print dialog which allows saving as PDF
    //window.print();
  };

  const handleShare = async () => {
    console.log('Compartir función activada');
    /*if (navigator.share) {
      try {
        await navigator.share({
          title: 'Línea Base - Fundación Garibi Rivera',
          text: `Línea Base de ${userName}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }*/
  };

  if (loadingCatalogos || !data) {
    if (!data && !loadingCatalogos) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Info className="w-5 h-5" />
                Error al cargar datos
              </CardTitle>
              <CardDescription>
                No se pudo cargar la información de la línea base.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showBackButton && (
                <Button variant="outline" onClick={onBack} className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Volver
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Cargando información...</p>
        </div>
      </div>
    );
  }

  const sections: SectionData[] = [
    { id: 'preliminar', title: 'Información Preliminar', icon: <FileText className="w-5 h-5" />, color: 'text-blue-600', badge: 'Inicial' },
    { id: 'identificacion', title: 'Identificación', icon: <User className="w-5 h-5" />, color: 'text-purple-600', badge: 'Personal' },
    { id: 'domicilio', title: 'Domicilio', icon: <MapPin className="w-5 h-5" />, color: 'text-green-600', badge: 'Ubicación' },
    { id: 'socioeconomico', title: 'Socioeconómico', icon: <Wallet className="w-5 h-5" />, color: 'text-orange-600', badge: 'Económico' },
    { id: 'negocio', title: 'Información del Negocio', icon: <Building className="w-5 h-5" />, color: 'text-cyan-600', badge: 'Negocio' },
    { id: 'analisis', title: 'Análisis del Negocio', icon: <TrendingUp className="w-5 h-5" />, color: 'text-indigo-600', badge: 'Análisis' },
    { id: 'administracion', title: 'Administración de Ingresos', icon: <DollarSign className="w-5 h-5" />, color: 'text-emerald-600', badge: 'Finanzas' },
    { id: 'ahorros', title: 'Ahorros y Objetivos', icon: <PiggyBank className="w-5 h-5" />, color: 'text-pink-600', badge: 'Ahorro' },
  ];

  return (
    <>
      {/* Estilos de impresión */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-content,
          #printable-content * {
            visibility: visible;
          }
          #printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-after: always;
          }
          .print-section {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
          
          {/* Header con acciones - No se imprime */}
          <div className="no-print mb-6 animate-in fade-in slide-in-from-top duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                {showBackButton && onBack && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onBack}
                    className="shrink-0 hover:scale-105 transition-transform"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
                    Línea Base
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {userName} • {new Date().toLocaleDateString('es-MX', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Compartir</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadPDF}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Descargar</span>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handlePrint}
                  className="gap-2"
                >
                  <Printer className="h-4 w-4" />
                  <span className="hidden sm:inline">Imprimir</span>
                </Button>
              </div>
            </div>

            {/* Alert de éxito */}
            <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="shrink-0 p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900 dark:text-green-50">
                    Información completada
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Tu línea base ha sido registrada correctamente en el sistema.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs de navegación - No se imprime en móvil */}
          <div className="no-print mb-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto p-1">
                <TabsTrigger value="resumen" className="gap-2 whitespace-nowrap">
                  <Eye className="h-4 w-4" />
                  <span className="hidden sm:inline">Vista</span> Resumen
                </TabsTrigger>
                <TabsTrigger value="detalle" className="gap-2 whitespace-nowrap">
                  <FileText className="h-4 w-4" />
                  Vista Detallada
                </TabsTrigger>
              </TabsList>

              {/* Contenido imprimible */}
              <div id="printable-content" ref={printRef}>
                
                {/* Header para impresión */}
                <div className="hidden print:block mb-8 border-b-2 border-slate-200 pb-4">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      Fundación Garibi Rivera
                    </h1>
                    <h2 className="text-xl font-semibold text-slate-700 mb-1">
                      Línea Base - Programa de Emprendedores
                    </h2>
                    <p className="text-sm text-slate-600">
                      {userName} • {new Date().toLocaleDateString('es-MX', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <TabsContent value="resumen" className="mt-6 space-y-4">
                  <ResumenView 
                    data={data} 
                    catalogos={catalogos} 
                    sections={sections}
                    getCatalogDescription={getCatalogDescription as any}
                    getYesNo={getYesNo}
                  />
                </TabsContent>

                <TabsContent value="detalle" className="mt-6 space-y-6">
                  <DetalleView 
                    data={data} 
                    catalogos={catalogos} 
                    sections={sections}
                    expandedSections={expandedSections}
                    toggleSection={toggleSection}
                    getCatalogDescription={getCatalogDescription as any}
                    getYesNo={getYesNo}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================
// VISTA RESUMEN
// ============================================

interface ViewProps {
  data: LineaBaseType;
  catalogos: CatalogosPorSecciones | null;
  sections: SectionData[];
  getCatalogDescription: (value: unknown, catalogItems: Array<Record<string, unknown>> | undefined, idKey: string, descKey?: string) => string;
  getYesNo: (val: unknown) => string;
  expandedSections?: Record<string, boolean>;
  toggleSection?: (sectionId: string) => void;
}

const ResumenView: React.FC<ViewProps> = ({ data, catalogos, sections, getCatalogDescription, getYesNo }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Identificación Resumen */}
      <Card className="print-section hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Identificación
            </CardTitle>
            <Badge variant="outline">Personal</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <DataRow label="Edad" value={`${data.identificacion.edad} años`} />
          <DataRow label="Género" value={typeof data.identificacion.genero === 'string' ? data.identificacion.genero : data.identificacion.genero?.descripcion || 'No especificado'} />
          <DataRow label="Estado civil" value={getCatalogDescription(data.identificacion.estadoCivil?.id_estado_civil, catalogos?.estadoCivil.data, 'id_estado_civil')} />
          <DataRow label="Escolaridad" value={getCatalogDescription(data.identificacion.escolaridad?.id_escolaridad, catalogos?.escolaridad.data, 'id_escolaridad')} />
        </CardContent>
      </Card>

      {/* Domicilio Resumen */}
      <Card className="print-section hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Domicilio
            </CardTitle>
            <Badge variant="outline">Ubicación</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <DataRow label="Dirección" value={`${data.domicilio.calle} ${data.domicilio.numeroExterior}`} />
          <DataRow label="Colonia" value={data.domicilio.colonia} />
          <DataRow label="Municipio" value={data.domicilio.municipio.nombre} />
          <DataRow label="Estado" value={data.domicilio.estado.nombre} />
          <DataRow label="Código postal" value={data.domicilio.codigoPostal.codigo_postal} />
        </CardContent>
      </Card>

      {/* Socioeconómico Resumen */}
      <Card className="print-section hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="w-5 h-5 text-orange-600" />
              Socioeconómico
            </CardTitle>
            <Badge variant="outline">Económico</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <DataRow label="Cantidad de dependientes económicos" value={getCatalogDescription(data.socioeconomico.cantidadDependientesEconomicos?.id_cantidad, catalogos?.cantidadDependientesEconomicos.data, 'id_cantidad')} />
          <DataRow label="Ocupación actual" value={getCatalogDescription(data.socioeconomico.ocupacionActual?.id_ocupacion, catalogos?.ocupacionActual.data, 'id_ocupacion')} />
          <DataRow label="Rango de ingreso mensual" value={getCatalogDescription(data.socioeconomico.ingresoMensual?.id_rango, catalogos?.ingresoMensual.data, 'id_rango')} />
        </CardContent>
      </Card>

      {/* Negocio Resumen */}
      {data.negocio && (
        <Card className="print-section hover:shadow-lg transition-shadow sm:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="w-5 h-5 text-cyan-600" />
                Negocio
              </CardTitle>
              <Badge variant="outline">Emprendimiento</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <DataRow label="Nombre del negocio" value={data.negocio.nombre} />
              <DataRow label="Giro del negocio" value={getCatalogDescription(data.negocio.giroNegocio?.id_tipo_giro, catalogos?.giroNegocio.data, 'id_tipo_giro')} />
              <DataRow label="Antigüedad" value={data.negocio.antiguedad} />
            </div>
            <div className="space-y-2">
              <DataRow label="Teléfono del negocio" value={data.negocio.telefono} />
              <DataRow label="Número de empleados" value={String(data.negocio.cantidadEmpleados)} />
              <DataRow label="Municipio" value={data.negocio.municipio.nombre} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Administración Ingresos Resumen */}
      {data.administracionIngresos && data.negocio && (
        <Card className="print-section hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Finanzas
              </CardTitle>
              <Badge variant="outline">Ingresos</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
          <DataRow label="Monto mensual de ventas" value={`$${data.administracionIngresos.montoMensualVentas.toLocaleString()}`} />
          <DataRow label="Monto mensual de gastos/egresos" value={`$${data.administracionIngresos.montoMensualEgresos.toLocaleString()}`} />
          <DataRow label="Utilidades mensuales" value={`$${data.administracionIngresos.montoMensualUtilidades.toLocaleString()}`} />
          <DataRow label="Sueldo mensual" value={`$${data.administracionIngresos.sueldoMensual.toLocaleString()}`} />
          </CardContent>
        </Card>
      )}

      {/* Ahorros Resumen */}
      {data.objetivosAhorro && (
        <Card className="print-section hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-pink-600" />
                Ahorros
              </CardTitle>
              <Badge variant="outline">Objetivos</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
          <DataRow label="¿Tienes el hábito de ahorrar de manera constante y a largo plazo?" value={getYesNo(data.objetivosAhorro.tieneHabitoAhorro)} />
          <DataRow label="¿Cuentas con algún sistema de ahorro?" value={getYesNo(data.objetivosAhorro.cuentaSistemaAhorro)} />
          {Number(data.objetivosAhorro.cuentaSistemaAhorro) === 1 && (
            <DataRow label="Monto aproximado de ahorros mensuales" value={`$${data.objetivosAhorro.montoAhorroMensual?.toLocaleString() || 0}`} />
          )}
          <DataRow label="Objetivo principal de tus ahorros" value={getCatalogDescription(data.objetivosAhorro.objetivosAhorro?.id_objetivo, catalogos?.objetivosAhorro.data, 'id_objetivo')} />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// ============================================
// VISTA DETALLADA
// ============================================

const DetalleView: React.FC<ViewProps> = ({ 
  data, 
  catalogos, 
  sections, 
  expandedSections = {}, 
  toggleSection = () => {}, 
  getCatalogDescription, 
  getYesNo 
}) => {
  return (
    <div className="space-y-4">
      {/* Sección Preliminar */}
      <CollapsibleSection
        section={sections[0]}
        isExpanded={expandedSections['preliminar']}
        onToggle={() => toggleSection('preliminar')}
      >
        <div className="grid gap-3 text-sm">
          <DataRow 
            label="¿Cómo te enteraste de la Fundación?" 
            value={data.preliminar.mediosConocimiento?.map(medio => 
              getCatalogDescription(medio.id_medio, catalogos?.medioConocimiento.data, 'id_medio')
            ).join(', ') || 'No especificado'} 
          />
          {data.preliminar.medioConocimiento_otro && (
            <DataRow label="Otro medio" value={data.preliminar.medioConocimiento_otro} />
          )}
          <DataRow 
            label="¿Cuánto tiempo a la semana puedes dedicar para formarte/capacitarte de manera permanente?" 
            value={getCatalogDescription(data.preliminar.tiempoCapacitacion?.id_tiempo, catalogos?.tiempoCapacitacion.data, 'id_tiempo')} 
          />
          <DataRow 
            label="Recurres a la Fundación para:" 
            value={getCatalogDescription(data.preliminar.razonRecurre?.id_razon, catalogos?.razonRecurre.data, 'id_razon')} 
          />
          {data.preliminar.razonRecurre_otro && (
            <DataRow label="Otra razón" value={data.preliminar.razonRecurre_otro} />
          )}
          {data.preliminar.solicitaCredito && (
            <DataRow 
              label="El crédito lo solicitarías para:" 
              value={getCatalogDescription(data.preliminar.solicitaCredito.id_solicitud, catalogos?.solicitaCredito.data, 'id_solicitud')} 
            />
          )}
          {data.preliminar.utilizaCredito && (
            <DataRow 
              label="El crédito lo utilizarías para:" 
              value={getCatalogDescription(data.preliminar.utilizaCredito.id_utilidad, catalogos?.utilizaCredito.data, 'id_utilidad')} 
            />
          )}
        </div>
      </CollapsibleSection>

      {/* Sección Identificación */}
      <CollapsibleSection
        section={sections[1]}
        isExpanded={expandedSections['identificacion']}
        onToggle={() => toggleSection('identificacion')}
      >
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <DataRow label="Edad" value={`${data.identificacion.edad} años`} />
          <DataRow 
            label="Género" 
            value={typeof data.identificacion.genero === 'string' ? data.identificacion.genero : data.identificacion.genero?.descripcion || 'No especificado'} 
          />
          <DataRow 
            label="Estado civil" 
            value={getCatalogDescription(data.identificacion.estadoCivil?.id_estado_civil, catalogos?.estadoCivil.data, 'id_estado_civil')} 
          />
          <DataRow 
            label="Escolaridad" 
            value={getCatalogDescription(data.identificacion.escolaridad?.id_escolaridad, catalogos?.escolaridad.data, 'id_escolaridad')} 
          />
          {data.identificacion.discapacidad && (
            <DataRow label="¿Presentas alguna discapacidad?" value={data.identificacion.discapacidad} />
          )}
        </div>
      </CollapsibleSection>

      {/* Sección Domicilio */}
      <CollapsibleSection
        section={sections[2]}
        isExpanded={expandedSections['domicilio']}
        onToggle={() => toggleSection('domicilio')}
      >
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">Dirección completa</p>
            <p className="text-slate-600 dark:text-slate-400">
              {data.domicilio.calle} {data.domicilio.numeroExterior}
              {data.domicilio.numeroInterior && `, Int. ${data.domicilio.numeroInterior}`}
              <br />
              Col. {data.domicilio.colonia}
              <br />
              {data.domicilio.municipio.nombre}, {data.domicilio.estado.nombre}
              <br />
              C.P. {data.domicilio.codigoPostal.codigo_postal}
            </p>
          </div>
          <Separator />
          <DataRow label="Entre calle" value={`${data.domicilio.calleCruce1} y ${data.domicilio.calleCruce2}`} />
          <DataRow label="Comunidad parroquial" value={data.domicilio.comunidadParroquial?.nombre || 'No especificada'} />
          <DataRow label="Vicaría" value={data.domicilio.vicaria?.nombre || 'No especificada'} />
          <DataRow label="Decanato" value={data.domicilio.decanato?.nombre || 'No especificado'} />
        </div>
      </CollapsibleSection>

      {/* Sección Socioeconómico */}
      <CollapsibleSection
        section={sections[3]}
        isExpanded={expandedSections['socioeconomico']}
        onToggle={() => toggleSection('socioeconomico')}
      >
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <DataRow 
            label="Cantidad de dependientes económicos" 
            value={getCatalogDescription(data.socioeconomico.cantidadDependientesEconomicos?.id_cantidad, catalogos?.cantidadDependientesEconomicos.data, 'id_cantidad')} 
          />
          <DataRow 
            label="Ocupación actual" 
            value={getCatalogDescription(data.socioeconomico.ocupacionActual?.id_ocupacion, catalogos?.ocupacionActual.data, 'id_ocupacion')} 
          />
          <DataRow 
            label="Rango de ingreso mensual" 
            value={getCatalogDescription(data.socioeconomico.ingresoMensual?.id_rango, catalogos?.ingresoMensual.data, 'id_rango')} 
          />
        </div>
      </CollapsibleSection>

      {/* Sección Negocio */}
      {data.negocio && (
        <CollapsibleSection
          section={sections[4]}
          isExpanded={expandedSections['negocio']}
          onToggle={() => toggleSection('negocio')}
        >
          <div className="space-y-4 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              <DataRow label="Nombre del negocio" value={data.negocio.nombre} />
              <DataRow label="Teléfono" value={data.negocio.telefono} />
              <DataRow 
                label="Giro del negocio" 
                value={getCatalogDescription(data.negocio.giroNegocio?.id_tipo_giro, catalogos?.giroNegocio.data, 'id_tipo_giro')} 
              />
              <DataRow 
                label="Actividad" 
                value={data.negocio.actividad ? getCatalogDescription(data.negocio.actividad.id_giro, catalogos?.actividadNegocio.data, 'id_giro') : data.negocio.otraActividad || 'No especificada'} 
              />
              <DataRow label="Antigüedad" value={data.negocio.antiguedad} />
              <DataRow label="Número de empleados" value={String(data.negocio.cantidadEmpleados)} />
            </div>
            <Separator />
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">Ubicación del negocio</p>
              <p className="text-slate-600 dark:text-slate-400">
                {data.negocio.calle} {data.negocio.numeroExterior}
                {data.negocio.numeroInterior && `, Int. ${data.negocio.numeroInterior}`}
                <br />
                Col. {data.negocio.colonia}
                <br />
                {data.negocio.municipio.nombre}, {data.negocio.estado.nombre}
                <br />
                C.P. {data.negocio.codigoPostal.codigo_postal}
              </p>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Sección Análisis del Negocio */}
      {data.analisisNegocio && data.negocio && (
        <CollapsibleSection
          section={sections[5]}
          isExpanded={expandedSections['analisis']}
          onToggle={() => toggleSection('analisis')}
        >
          <div className="space-y-4 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              <DataRow label="¿Llevas registros de entradas y salidas de dinero?" value={getYesNo(data.analisisNegocio.registraEntradasSalidas)} />
              <DataRow label="¿Tienes asignado un sueldo?" value={getYesNo(data.analisisNegocio.asignaSueldo)} />
              <DataRow label="¿Conoces cuál es la utilidad mensual que te deja tu negocio?" value={getYesNo(data.analisisNegocio.conoceUtilidades)} />
              <DataRow label="¿Conoces los productos o servicios que te generan mayor utilidad?" value={getYesNo(data.analisisNegocio.conoceProductosMayorUtilidad)} />
              {data.analisisNegocio.porcentajeGanancia !== null && (
                <DataRow label="Porcentaje de ganancias de esos productos" value={`${data.analisisNegocio.porcentajeGanancia}%`} />
              )}
              <DataRow label="¿Identificas quién es tu competencia?" value={getYesNo(data.analisisNegocio.identificaCompetencia)} />
            </div>
            
            {data.analisisNegocio.quienCompetencia && (
              <>
                <Separator />
                <DataRow label="¿Quién es tu competencia?" value={data.analisisNegocio.quienCompetencia} />
              </>
            )}
            
            <Separator />
            <DataRow label="¿A quién le vendes? ¿Quiénes son tus clientes?" value={data.analisisNegocio.clientesNegocio} />
            <DataRow label="¿Cuáles consideras que son las ventajas de tu negocio sobre tu competencia?" value={data.analisisNegocio.ventajasNegocio} />
            <DataRow label="¿Cuáles consideras que son los principales problemas de tu negocio?" value={data.analisisNegocio.problemasNegocio} />
            
            {data.analisisNegocio.estrategiasIncrementarVentas && data.analisisNegocio.estrategiasIncrementarVentas.length > 0 && (
              <>
                <Separator />
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">¿Qué estrategias utilizas para incrementar tus ventas?</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                    {data.analisisNegocio.estrategiasIncrementarVentas.map((estrategia, idx) => (
                      <li key={idx}>
                        {getCatalogDescription(estrategia.id_estrategia, catalogos?.estrategiasIncrementarVentas.data, 'id_estrategia')}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            
            <Separator />
            <div className="grid sm:grid-cols-2 gap-3">
              <DataRow 
                label="¿Cómo empleas las ganancias generadas?" 
                value={getCatalogDescription(data.analisisNegocio.empleoGanancias?.id_empleo, catalogos?.comoEmpleaGanancias.data, 'id_empleo')} 
              />
              <DataRow label="¿Asignas ahorro mensual para mantenimiento de equipo o maquinaria?" value={getYesNo(data.analisisNegocio.ahorro)} />
              {data.analisisNegocio.cuantoAhorro !== null && (
                <DataRow label="¿Cuánto ahorras?" value={`$${data.analisisNegocio.cuantoAhorro.toLocaleString()}`} />
              )}
            </div>
            
            {data.analisisNegocio.razonesNoAhorro && (
              <DataRow label="Razones por las cuales no ahorras" value={data.analisisNegocio.razonesNoAhorro} />
            )}
            
            <Separator />
            <div className="grid sm:grid-cols-3 gap-3">
              <DataRow label="¿Conoces el punto de equilibrio de tu negocio?" value={getYesNo(data.analisisNegocio.conocePuntoEquilibrio)} />
              <DataRow label="¿Separas los gastos del negocio de tus gastos personales?" value={getYesNo(data.analisisNegocio.separaGastos)} />
              <DataRow label="¿Elaboras un presupuesto mensual para tu negocio?" value={getYesNo(data.analisisNegocio.elaboraPresupuesto)} />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Sección Administración de Ingresos */}
      {data.administracionIngresos && data.negocio && (
        <CollapsibleSection
          section={sections[6]}
          isExpanded={expandedSections['administracion']}
          onToggle={() => toggleSection('administracion')}
        >
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">Monto mensual de ventas</p>
                <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                  ${data.administracionIngresos.montoMensualVentas.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">Monto mensual de gastos/egresos</p>
                <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                  ${data.administracionIngresos.montoMensualEgresos.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Utilidades mensuales</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  ${data.administracionIngresos.montoMensualUtilidades.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">Sueldo mensual</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  ${data.administracionIngresos.sueldoMensual.toLocaleString()}
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <DataRow 
                label="¿Es tu negocio la principal fuente de ingresos a nivel personal?" 
                value={getYesNo(data.administracionIngresos.esNegocioPrincipalFuentePersonal)} 
              />
              <DataRow 
                label="¿Es tu negocio la principal fuente de ingresos para tu familia?" 
                value={getYesNo(data.administracionIngresos.esNegocioPrincipalFuenteFamiliar)} 
              />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Sección Ahorros */}
      {data.objetivosAhorro && (
        <CollapsibleSection
          section={sections[7]}
          isExpanded={expandedSections['ahorros']}
          onToggle={() => toggleSection('ahorros')}
        >
          <div className="space-y-4 text-sm">
            <div className="grid sm:grid-cols-2 gap-3">
              <DataRow label="¿Tienes el hábito de ahorrar de manera constante y a largo plazo?" value={getYesNo(data.objetivosAhorro.tieneHabitoAhorro)} />
              <DataRow label="¿Cuentas con algún sistema de ahorro?" value={getYesNo(data.objetivosAhorro.cuentaSistemaAhorro)} />
            </div>
            
            {Number(data.objetivosAhorro.cuentaSistemaAhorro) === 1 && (
              <>
                <Separator />
                <DataRow label="¿Con qué sistema de ahorro cuentas?" value={data.objetivosAhorro.detalleSistemaAhorro || 'No especificado'} />
                <div className="p-4 bg-pink-50 dark:bg-pink-950/30 rounded-lg border border-pink-200 dark:border-pink-800">
                  <p className="text-xs text-pink-600 dark:text-pink-400 font-medium mb-1">Monto aproximado de ahorros mensuales</p>
                  <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">
                    ${(data.objetivosAhorro.montoAhorroMensual || 0).toLocaleString()}
                  </p>
                </div>
              </>
            )}
            
            <Separator />
            <DataRow 
              label="¿Cuál es el objetivo principal de tus ahorros?" 
              value={getCatalogDescription(data.objetivosAhorro.objetivosAhorro?.id_objetivo, catalogos?.objetivosAhorro.data, 'id_objetivo')} 
            />
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
};

// ============================================
// COMPONENTES AUXILIARES
// ============================================

interface CollapsibleSectionProps {
  section: SectionData;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ 
  section, 
  isExpanded, 
  onToggle, 
  children 
}) => {
  return (
    <Card className={cn(
      "print-section overflow-hidden transition-all duration-200",
      isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md"
    )}>
      <CardHeader 
        className="pb-3 cursor-pointer no-print hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("shrink-0", section.color)}>
              {section.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {section.badge && (
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {section.badge}
              </Badge>
            )}
            <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500" />
              )}
            </button>
          </div>
        </div>
      </CardHeader>
      
      {/* En impresión siempre se muestra el contenido */}
      <div className={cn(
        "print:block",
        !isExpanded && "hidden"
      )}>
        <CardContent className="pt-0">
          {children}
        </CardContent>
      </div>
    </Card>
  );
};

interface DataRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

const DataRow: React.FC<DataRowProps> = ({ label, value, highlight = false }) => {
  return (
    <div className={cn(
      "flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0",
      highlight && "bg-yellow-50 dark:bg-yellow-950/20 px-2 rounded"
    )}>
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {label}:
      </span>
      <span className="text-slate-600 dark:text-slate-400 sm:text-right">
        {value}
      </span>
    </div>
  );
};

export default LineaBaseVistaPremium;
