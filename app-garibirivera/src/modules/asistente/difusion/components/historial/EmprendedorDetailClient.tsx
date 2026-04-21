"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  History, 
  User, 
  Mail, 
  Phone,
  GraduationCap, 
  ArrowLeft,
  Calendar,
  BadgeCheck,
  ShieldCheck,
  Users,
  MapPin,
  Home,
  DollarSign,
  Briefcase,
  FileText
} from "lucide-react";
import { VisionSpringContainer, VisionGlassWindow, VisionBadge } from "@/core/components/ui/vision-glass";
import { useEmprendedor } from "@/modules/asistente/difusion/hooks/useEmprendedor";
import { Button } from "@/core/components/ui/button";
import { VisionAvatar } from "@/core/components/ui/vision-avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs";
import { Separator } from "@/core/components/ui/separator";
import { LineaBaseVistaPremium } from "@/modules/emprendedor/linea-base/components/LineaBaseVistaPremium";

export default function EmprendedorDetailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { emprendedor, loading, fetchById, getEmprendedorPhoto } = useEmprendedor();

  useEffect(() => {
    if (id) {
      fetchById(Number(id));
    }
  }, [id, fetchById]);

  if (loading) {
    return (
      <VisionSpringContainer className="py-8 space-y-8">
        <div className="animate-pulse space-y-8">
          <div className="h-40 bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-96 bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl" />
            <div className="md:col-span-2 h-96 bg-zinc-100 dark:bg-zinc-800/50 rounded-3xl" />
          </div>
        </div>
      </VisionSpringContainer>
    );
  }

  if (!emprendedor && !loading) {
    return (
      <VisionSpringContainer className="py-8 space-y-4 text-center">
        <h2 className="vision-title-1 vision-text-secondary">Emprendedor no encontrado</h2>
        <Button variant="outline" onClick={() => router.back()}>Regresar</Button>
      </VisionSpringContainer>
    );
  }

  return (
    <VisionSpringContainer className="space-y-8 py-8 animate-in fade-in duration-700">
      {/* 1. HEADER DINÁMICO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Button 
            variant="visionGlass" 
            size="icon" 
            onClick={() => router.back()}
            className="rounded-full h-12 w-12 shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-5">
            <VisionAvatar 
              src={getEmprendedorPhoto()} 
              alt={emprendedor?.nombre} 
              initials={`${emprendedor?.nombre?.charAt(0)}${emprendedor?.apellidos?.charAt(0)}`}
              className="w-20 h-20 text-xl border-2 border-fundacion-amarillo/30 shadow-lg"
            />
            <div>
              <p className="vision-caption-upper vision-text-disabled mb-1">Expediente {emprendedor?.expediente?.numeroExpediente || "N/A"}</p>
              <h1 className="vision-title-2 vision-text-primary uppercase flex items-center gap-3">
                {emprendedor?.nombre} {emprendedor?.apellidos}
                {emprendedor?.graduado && <BadgeCheck className="w-6 h-6 text-fundacion-verde-light" />}
              </h1>
              <div className="flex gap-2 mt-2">
                <VisionBadge sentiment={emprendedor?.graduado ? "success" : "brand"} className="text-[9px] px-2">
                  {emprendedor?.graduado ? "SOCIO GRADUADO" : "EN FORMACIÓN"}
                </VisionBadge>
                <VisionBadge sentiment="muted" className="text-[9px] px-2 uppercase">
                  ID: {emprendedor?.idEmprendedor}
                </VisionBadge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-2 font-bold uppercase tracking-widest text-[10px]">
            Descargar PDF
          </Button>
          <Button className="rounded-xl bg-fundacion-verde hover:bg-fundacion-verde-light text-white font-bold uppercase tracking-widest text-[10px]">
            Editar Perfil
          </Button>
        </div>
      </div>

      {/* 2. TABS PRINCIPALES */}
      <Tabs defaultValue="perfil" className="w-full space-y-8">
        <TabsList className="bg-transparent border-b border-subtle w-full justify-start rounded-none h-auto p-0 gap-8">
          <TabsTrigger value="perfil" className="rounded-none border-b-2 border-transparent data-[state=active]:border-fundacion-amarillo bg-transparent data-[state=active]:bg-transparent shadow-none px-1 pb-4">
            INFORMACIÓN PERSONAL
          </TabsTrigger>
          <TabsTrigger value="expediente" className="rounded-none border-b-2 border-transparent data-[state=active]:border-fundacion-amarillo bg-transparent data-[state=active]:bg-transparent shadow-none px-1 pb-4">
            EXPEDIENTE Y AVAL
          </TabsTrigger>
          <TabsTrigger value="linea-base" className="rounded-none border-b-2 border-transparent data-[state=active]:border-fundacion-amarillo bg-transparent data-[state=active]:bg-transparent shadow-none px-1 pb-4">
            DIAGNÓSTICO LÍNEA BASE
          </TabsTrigger>
        </TabsList>

        {/* CONTENIDO: PERFIL */}
        <TabsContent value="perfil" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <VisionGlassWindow className="p-8 space-y-6">
              <h3 className="vision-headline text-xs uppercase tracking-widest vision-text-secondary flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-fundacion-verde-light" />
                Datos de Contacto
              </h3>
              <div className="space-y-4">
                <InfoItem icon={Mail} label="Correo Electrónico" value={emprendedor?.correoElectronico} />
                <InfoItem icon={Phone} label="Teléfono de Contacto" value={emprendedor?.numeroCelular} />
                <InfoItem icon={MapPin} label="Ubicación" value={emprendedor?.lineaBase?.domicilio?.municipio?.nombre || "No especificada"} />
              </div>
            </VisionGlassWindow>
            
            <VisionGlassWindow className="md:col-span-2 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
               <DetailCard icon={Calendar} title="Fecha de Crédito" value={emprendedor?.fechaCredito || "PENDIENTE"} color="text-orange-500" />
               <DetailCard icon={History} title="Referencia de Pago" value={emprendedor?.referencia?.toString() || "SIN REFERENCIA"} color="text-blue-500" />
               <DetailCard icon={GraduationCap} title="Educación" value={emprendedor?.lineaBase?.identificacion?.escolaridad?.descripcion || "NO REGISTRADA"} color="text-purple-500" />
               <DetailCard icon={Users} title="Dependientes" value={emprendedor?.lineaBase?.socioeconomico?.cantidadDependientesEconomicos?.descripcion || "N/A"} color="text-pink-500" />
            </VisionGlassWindow>
          </div>
        </TabsContent>

        {/* CONTENIDO: EXPEDIENTE */}
        <TabsContent value="expediente" className="mt-0 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VisionGlassWindow className="p-0 overflow-hidden">
               <div className="p-6 bg-surface-base/50 border-b border-subtle flex items-center gap-3">
                  <User className="w-5 h-5 text-fundacion-amarillo" />
                  <h3 className="vision-headline text-sm uppercase">Información del Aval</h3>
               </div>
               <div className="p-8 space-y-6">
                  {emprendedor?.expediente?.aval ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <InfoItem icon={User} label="Nombre Completo" value={`${emprendedor.expediente.aval.nombre} ${emprendedor.expediente.aval.apellidos}`} />
                        <InfoItem icon={Users} label="Parentesco" value={emprendedor.expediente.aval.parentesco?.descripcion || "N/A"} />
                      </div>
                      <Separator className="opacity-50" />
                      <InfoItem icon={Phone} label="Teléfono del Aval" value={emprendedor.expediente.aval.numeroCelular || "No proporcionado"} />
                    </>
                  ) : (
                    <p className="text-sm vision-text-disabled text-center py-4 italic">No se ha registrado información del aval en este expediente.</p>
                  )}
               </div>
            </VisionGlassWindow>

            <VisionGlassWindow className="p-0 overflow-hidden">
               <div className="p-6 bg-surface-base/50 border-b border-subtle flex items-center gap-3">
                  <Home className="w-5 h-5 text-fundacion-verde-light" />
                  <h3 className="vision-headline text-sm uppercase">Garantía Inmobiliaria</h3>
               </div>
               <div className="p-8 space-y-6">
                  {emprendedor?.expediente?.inmuebleGarantia ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                         <InfoItem icon={User} label="Propietario" value={emprendedor.expediente.inmuebleGarantia.propietario || "N/A"} />
                         <InfoItem icon={DollarSign} label="Valor Comercial" value={`$${emprendedor.expediente.inmuebleGarantia.valorComercial?.toLocaleString() || '0'}`} />
                      </div>
                      <Separator className="opacity-50" />
                      <InfoItem icon={FileText} label="Escritura Pública" value={emprendedor.expediente.inmuebleGarantia.escrituraPublica || "N/A"} />
                    </>
                  ) : (
                    <p className="text-sm vision-text-disabled text-center py-4 italic">No hay garantías inmobiliarias registradas.</p>
                  )}
               </div>
            </VisionGlassWindow>
          </div>

          <VisionGlassWindow className="p-8">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                   <h3 className="vision-headline text-base uppercase">Estado del Crédito</h3>
                   <p className="text-xs vision-text-tertiary">Resumen ejecutivo del financiamiento otorgado</p>
                </div>
                <div className="flex gap-8">
                   <div className="text-right">
                      <p className="text-[10px] vision-text-disabled uppercase font-black">Monto Solicitado</p>
                      <p className="text-2xl font-bold text-fundacion-verde-light">${emprendedor?.expediente?.montoSolicitado?.toLocaleString() || '--'}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] vision-text-disabled uppercase font-black">Fecha Término</p>
                      <p className="text-lg font-bold vision-text-primary">{emprendedor?.expediente?.fechaTermino || '--'}</p>
                   </div>
                </div>
             </div>
          </VisionGlassWindow>
        </TabsContent>

        {/* CONTENIDO: LÍNEA BASE (REUTILIZACIÓN DE VISTA OFICIAL) */}
        <TabsContent value="linea-base" className="mt-0 outline-none">
          {emprendedor?.lineaBase ? (
            <div className="bg-white/5 dark:bg-zinc-900/40 rounded-3xl overflow-hidden border border-subtle">
              <LineaBaseVistaPremium
                initialData={emprendedor.lineaBase} 
                userName={emprendedor.nombre}
              />
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <Briefcase className="w-12 h-12 vision-text-disabled mx-auto opacity-20" />
              <p className="vision-text-tertiary">No se ha capturado el diagnóstico de Línea Base para este emprendedor.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </VisionSpringContainer>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any, label: string, value?: string }) {
  return (
    <div className="flex items-start gap-3 group">
      <div className="mt-0.5 p-1.5 rounded-lg bg-surface-base border border-subtle">
        <Icon className="w-3.5 h-3.5 vision-text-tertiary" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] vision-text-disabled uppercase font-black tracking-widest leading-none mb-1">{label}</p>
        <p className="text-xs font-semibold truncate vision-text-primary leading-tight">{value || "---"}</p>
      </div>
    </div>
  );
}

function DetailCard({ icon: Icon, title, value, color }: { icon: any, title: string, value: string, color: string }) {
  return (
    <div className="p-5 rounded-2xl surface-base border border-subtle hover:border-fundacion-amarillo/20 transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-subtle ${color} group-hover:scale-105 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-[9px] font-black uppercase tracking-[0.15em] vision-text-tertiary opacity-60">
            {title}
          </h4>
          <p className="text-base font-bold vision-text-primary uppercase tracking-tight">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
