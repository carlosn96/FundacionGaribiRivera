"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Eye, Edit, Trash2, Users, UserPlus, MoreVertical, KeyRound } from "lucide-react";
import { VisionBadge } from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { Emprendedor } from "../../domain/models/Emprendedor";
import ModuleEmptyState from "@/core/components/ui/module-empty-state";
import { VisionAvatar } from "@/core/components/ui/vision-avatar";
import { CorporateTable, CorporateColumn } from "@/core/components/ui/CorporateTable";
import { useConfirm } from "@/core/context/ConfirmContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/core/components/ui/dropdown-menu";
import { ResetPasswordModal } from "./ResetPasswordModal";
import { useState } from "react";

interface EmprendedorTableProps {
  emprendedores: Emprendedor[];
  loading?: boolean;
  onDelete?: (id: number) => void;
  onResetPassword?: (id: number, password?: string) => Promise<void>;
  onGetPhoto: (emp: Emprendedor) => string;
}

export function EmprendedorTable({ emprendedores, loading, onDelete, onResetPassword, onGetPhoto }: EmprendedorTableProps) {
  const router = useRouter();
  const confirm = useConfirm();
  const [selectedEmprendedor, setSelectedEmprendedor] = useState<Emprendedor | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleOpenResetModal = (emp: Emprendedor) => {
    setSelectedEmprendedor(emp);
    setIsResetModalOpen(true);
  };

  const handleResetPassword = async (id: number, password?: string) => {
    if (onResetPassword) {
      return await onResetPassword(id, password);
    }
  };

  const handleDelete = async (emp: Emprendedor) => {
    const isConfirmed = await confirm.confirmDelete(`${emp.nombre} ${emp.apellidos}`);
    if (isConfirmed) {
      onDelete?.(emp.id);
    }
  };
  
  const columns = useMemo((): CorporateColumn<Emprendedor>[] => [
    {
      key: 'nombreComp',
      header: 'Información del Emprendedor',
      sortable: true,
      className: 'min-w-[250px]',
      render: (emp) => (
        <div className="flex items-center gap-5">
          <VisionAvatar 
            src={onGetPhoto(emp)} 
            alt={emp.nombre} 
            initials={`${emp.nombre?.charAt(0)}${emp.apellidos?.charAt(0)}`}
          />
          <div className="min-w-0">
            <p className="font-bold vision-text-primary text-sm leading-tight truncate transition-colors uppercase tracking-tight">
              {emp.nombre} {emp.apellidos}
            </p>
            <p className="vision-caption vision-text-tertiary mt-1.5 font-black tracking-widest text-[8px] uppercase opacity-40">
              ID: {emp.idEmprendedor}
            </p>
          </div>
        </div>
      )
    },
    {
      key: 'contacto',
      header: 'Datos de Contacto',
      hiddenOn: 'sm',
      render: (emp) => (
        <div className="space-y-1">
          <p className="text-sm vision-text-secondary font-bold tracking-tight truncate max-w-[200px] opacity-80">
            {emp.correoElectronico || "SIN CORREO"}
          </p>
          <p className="vision-caption vision-text-tertiary font-black text-[9px] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-fundacion-verde" />
              CEL: {emp.numeroCelular || "NO REGISTRADO"}
          </p>
        </div>
      )
    },
    {
      key: 'graduado',
      header: 'Estatus',
      sortable: true,
      hiddenOn: 'md',
      render: (emp) => (
        <VisionBadge
          sentiment={emp.graduado ? "success" : "brand"}
          className="px-4 py-1.5 font-black text-[9px] tracking-[0.2em] border shadow-sm uppercase h-8 flex items-center w-max"
        >
          {emp.graduado ? "GRADUADO" : "EN PROGRAMA"}
        </VisionBadge>
      )
    },
    {
      key: 'acciones',
      header: 'Acciones',
      headerClassName: 'text-right',
      className: 'text-right w-20',
      render: (emp) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="visionGlass" 
              size="icon" 
              className="h-9 w-9 rounded-xl shadow-sm border border-border-default hover:bg-fundacion-amarillo/10 group transition-all"
            >
              <MoreVertical className="w-4 h-4 text-vision-text-tertiary group-hover:text-fundacion-amarillo transition-colors" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 vision-glass">
            <DropdownMenuLabel className="vision-caption-upper px-2 py-1.5 opacity-50">Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="flex items-center gap-3 cursor-pointer py-2.5 hover:bg-fundacion-amarillo/5"
              onClick={() => router.push(`/asistente/difusion/emprendedores/detalle?id=${emp.idEmprendedor}`)}
            >
              <div className="p-1.5 rounded-lg bg-fundacion-amarillo/10 text-fundacion-amarillo">
                <Eye className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-xs">Ver Perfil</span>
            </DropdownMenuItem>

            <DropdownMenuItem 
              className="flex items-center gap-3 cursor-pointer py-2.5 hover:bg-fundacion-amarillo/5"
              onClick={() => handleOpenResetModal(emp)}
            >
              <div className="p-1.5 rounded-lg bg-fundacion-amarillo/10 text-fundacion-amarillo">
                <KeyRound className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-xs">Restablecer Contraseña</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              className="flex items-center gap-3 cursor-pointer py-2.5 text-red-500 hover:bg-red-500/10"
              onClick={() => handleDelete(emp)}
            >
              <div className="p-1.5 rounded-lg bg-red-500/10">
                <Trash2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-xs">Eliminar Permanente</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ], [onDelete, onGetPhoto]);

  // Aplanamos datos para que el sortable por 'nombreComp' funcione bien
  const flatData = useMemo(() => {
    if (!emprendedores) return [];
    return emprendedores.map(emp => ({
      ...emp,
      nombreComp: `${emp.nombre} ${emp.apellidos}`.toLowerCase()
    }));
  }, [emprendedores]);

  // Mantenemos el estado vacío enriquecido de antes en lugar de usar el genérico de CorporateTable
  if (!loading && (!emprendedores || emprendedores.length === 0)) {
    return (
      <ModuleEmptyState
        icon={Users}
        title="Sin emprendedores disponibles"
        description="La consulta no arrojó resultados"
        action={{
          label: "Registrar Nuevo Emprendedor",
          href: "/asistente/difusion/emprendedores/nuevo",
          icon: UserPlus
        }}
        gradient="from-fundacion-verde to-fundacion-verde-dark"
      />
    );
  }

  return (
    <>
      <CorporateTable 
        columns={columns}
        data={flatData}
        isLoading={loading}
        defaultSortKey="nombreComp"
      />

      <ResetPasswordModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        emprendedor={selectedEmprendedor}
        onConfirm={handleResetPassword}
        loading={loading}
      />
    </>
  );
}
