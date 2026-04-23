"use client";

import { Presentation, MoreVertical, Edit2, Trash2, ShieldCheck, ShieldAlert, Layers } from "lucide-react";
import { Taller } from "../../domain/models/Taller";
import { InstructorAvatar } from "../shared/InstructorAvatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu";
import { CorporateTable, CorporateColumn } from "@/core/components/ui/CorporateTable";

interface TalleresTableProps {
  talleres: Taller[];
  onEdit: (taller: Taller) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

export function TalleresTable({ talleres, onEdit, onDelete, loading }: TalleresTableProps) {
  const columns: CorporateColumn<Taller>[] = [
    {
      key: "numeroTaller",
      header: "Secuencia",
      sortable: true,
      className: "w-20",
      render: (taller) => (
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 font-bold text-[10px] text-zinc-500">
          #{taller.numeroTaller}
        </div>
      )
    },
    {
      key: "nombre",
      header: "Nombre del Taller",
      sortable: true,
      render: (taller) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-fundacion-verde/10 flex items-center justify-center text-fundacion-verde shrink-0">
            <Presentation className="w-4 h-4" />
          </div>
          <span className="font-bold text-xs vision-text-primary group-hover:text-fundacion-verde transition-colors">
            {taller.nombre}
          </span>
        </div>
      )
    },
    {
      key: "tipoTaller",
      header: "Módulo",
      hiddenOn: "sm",
      render: (taller) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-subtle">
          <Layers className="w-3 h-3 mr-1.5 opacity-50" />
          {taller.tipoTaller?.descripcion || "N/A"}
        </span>
      )
    },
    {
      key: "instructor",
      header: "Instructor",
      hiddenOn: "md",
      render: (taller) => (
        <div className="flex items-center gap-2.5 text-[11px] font-bold vision-text-secondary">
          <InstructorAvatar 
            idInstructor={taller.idInstructor}
            nombre={taller.instructor?.nombre}
            apellidoPaterno={taller.instructor?.apellidoPaterno}
            size="sm"
            className="border border-white dark:border-zinc-900 shadow-sm w-7 h-7"
          />
          <span className="truncate max-w-[120px]">
            {taller.instructor?.nombreCompleto || `ID: ${taller.idInstructor}`}
          </span>
        </div>
      )
    },
    {
      key: "evaluacion",
      header: "Evaluación",
      hiddenOn: "lg",
      render: (taller) => (
        <div className="flex items-center gap-1.5">
          {taller.evaluacionHabilitada ? (
            <div className="flex items-center gap-1 text-fundacion-verde">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-tight">Activa</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-zinc-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="text-[9px] font-black uppercase tracking-tight">Inactiva</span>
            </div>
          )}
        </div>
      )
    },
    {
      key: "acciones",
      header: "",
      className: "w-12 text-right",
      render: (taller) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                <MoreVertical className="w-4 h-4 text-zinc-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-zinc-200/50 dark:border-zinc-800/50 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
              <DropdownMenuItem onClick={() => onEdit(taller)} className="py-2.5 px-4 text-xs font-bold cursor-pointer rounded-lg mx-1 focus:bg-fundacion-verde/10 focus:text-fundacion-verde">
                <Edit2 className="w-3.5 h-3.5 mr-2" />
                Editar Taller
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(taller.id)} className="py-2.5 px-4 text-xs font-bold cursor-pointer rounded-lg mx-1 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30">
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                Eliminar Taller
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <CorporateTable
      data={talleres}
      columns={columns}
      isLoading={loading}
      emptyMessage="No se encontraron talleres planificados"
      defaultSortKey="numeroTaller"
      onRowClick={onEdit}
    />
  );
}
