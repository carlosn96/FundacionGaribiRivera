"use client";

import React from "react";
import { CorporateTable, CorporateColumn } from "@/core/components/ui/CorporateTable";
import { Emprendedor } from "../domain/models/Emprendedor";
import { VisionBadge } from "@/core/components/ui/vision-glass";
import { Button } from "@/core/components/ui/button";
import { 
  FileSearch, 
  Edit, 
  Trash2, 
  MoreVertical,
  Mail,
  Calendar,
  Layers
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { VisionAvatar } from "@/core/components/ui/vision-avatar";
import { emprendedorRepository } from "../infrastructure/api/EmprendedorRepository";

interface AdminLineaBaseTableProps {
  data: Emprendedor[];
  isLoading: boolean;
  type: "with-baseline" | "without-baseline";
  onView?: (item: Emprendedor) => void;
  onEdit?: (item: Emprendedor) => void;
  onDelete?: (item: Emprendedor) => void;
}

export const AdminLineaBaseTable: React.FC<AdminLineaBaseTableProps> = ({
  data,
  isLoading,
  type,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns: CorporateColumn<Emprendedor>[] = [
    {
      key: "nombre",
      header: "Identidad Emprendedor",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-4 py-1">
          <VisionAvatar 
            src={item.fotoUrl ? emprendedorRepository.getEmprendedorPhotoByUrl(item) : ""}
            alt={item.nombre}
            initials={`${item.nombre.charAt(0)}${item.apellidos.charAt(0)}`}
            size="md"
            className="rounded-2xl shadow-sm border-subtle group-hover:scale-105 transition-transform duration-500"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-bold vision-text-primary text-sm truncate uppercase tracking-tight">
              {item.nombre} {item.apellidos}
            </span>
            <div className="flex items-center gap-1.5 vision-text-secondary opacity-60 text-[10px] font-medium truncate">
              <Mail className="w-3 h-3 shrink-0" />
              {item.correoElectronico || "SIN CORREO REGISTRADO"}
            </div>
          </div>
        </div>
      ),
    },
    // Solo mostramos la columna de Etapa si el emprendedor TIENE línea base
    ...(type === "with-baseline"
      ? [
          {
            key: "etapa",
            header: "Etapa de Formación",
            sortable: true,
            render: (item: Emprendedor) => {
              const etapaNombre = item.lineaBase?.etapa?.nombre;
              return (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-fundacion-verde opacity-70" />
                    <span className="text-[10px] font-black vision-text-tertiary tracking-widest uppercase">Etapa</span>
                  </div>
                  <VisionBadge sentiment="brand" className="px-2 py-0.5 text-[10px] font-bold border-none bg-fundacion-verde/10 text-fundacion-verde w-fit">
                    {etapaNombre || "EN PROCESO"}
                  </VisionBadge>
                </div>
              );
            },
          },
          {
            key: "fechaCreacion",
            header: "Fecha de Diagnóstico",
            sortable: true,
            className: "hidden lg:table-cell",
            render: (item: Emprendedor) => (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-fundacion-azul opacity-70" />
                  <span className="text-[10px] font-black vision-text-tertiary tracking-widest uppercase">Registrado</span>
                </div>
                <span className="vision-text-secondary text-xs font-bold">
                  {item.lineaBase?.fechaCreacion ? item.lineaBase.fechaCreacion : "-"}
                </span>
              </div>
            ),
          },
        ]
      : []),
    {
      key: "acciones",
      header: "",
      headerClassName: "w-[50px]",
      className: "text-right",
      render: (item) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <MoreVertical className="h-5 h-5 text-zinc-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-subtle shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-zinc-900/90">
              <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                Operaciones Disponibles
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-subtle mx-1" />
              
              {type === "with-baseline" ? (
                <>
                  <DropdownMenuItem onClick={() => onView?.(item)} className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-verde/10 focus:bg-fundacion-verde/10 focus:text-fundacion-verde">
                    <FileSearch className="h-4 w-4 text-fundacion-verde" />
                    <span className="font-bold text-xs uppercase tracking-tight">Ver Expediente</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit?.(item)} className="gap-3 py-3 cursor-pointer rounded-xl hover:bg-fundacion-azul/10 focus:bg-fundacion-azul/10 focus:text-fundacion-azul">
                    <Edit className="h-4 w-4 text-fundacion-azul" />
                    <span className="font-bold text-xs uppercase tracking-tight">Editar Diagnóstico</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-subtle mx-1" />
                  <DropdownMenuItem 
                    className="gap-3 py-3 cursor-pointer rounded-xl text-red-500 hover:bg-red-50 focus:bg-red-50 dark:hover:bg-red-950/30 dark:focus:bg-red-950/30"
                    onClick={() => onDelete?.(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="font-bold text-xs uppercase tracking-tight">Eliminar Línea Base</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={() => onEdit?.(item)} className="gap-3 py-3 cursor-pointer rounded-xl bg-fundacion-verde text-white hover:bg-fundacion-verde-light focus:bg-fundacion-verde-light group">
                  <Edit className="h-4 w-4 transition-transform group-hover:rotate-12" />
                  <span className="font-bold text-xs uppercase tracking-tight">Generar Línea Base</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <CorporateTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      emptyMessage={
        type === "with-baseline"
          ? "No se encontraron diagnósticos para el filtro seleccionado"
          : "Todos los emprendedores activos cuentan con diagnóstico"
      }
      onRowClick={onEdit}
    />
  );
};
