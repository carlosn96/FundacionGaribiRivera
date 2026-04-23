"use client";

import { Mail, Phone, MoreVertical, Edit2, Trash2, User } from "lucide-react";
import { Instructor } from "../../domain/models/Instructor";
import { InstructorAvatar } from "../shared/InstructorAvatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/core/components/ui/dropdown-menu";
import { CorporateTable, CorporateColumn } from "@/core/components/ui/CorporateTable";

interface InstructoresTableProps {
  instructores: Instructor[];
  onEdit?: (instructor: Instructor) => void;
  onDelete?: (id: number) => void;
  loading?: boolean;
}

export function InstructoresTable({ instructores, onEdit, onDelete, loading }: InstructoresTableProps) {
  const columns: CorporateColumn<Instructor>[] = [
    {
      key: "instructor",
      header: "Instructor",
      sortable: true,
      render: (instructor) => {
        const fullName = instructor.nombreCompleto || 
          `${instructor.nombre} ${instructor.apellidoPaterno} ${instructor.apellidoMaterno || ''}`.trim();
        return (
          <div className="flex items-center gap-3">
            <InstructorAvatar 
              idInstructor={instructor.idInstructor}
              nombre={instructor.nombre}
              apellidoPaterno={instructor.apellidoPaterno}
              size="md"
              className="shadow-sm border border-subtle"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs vision-text-primary group-hover:text-vision-brand transition-colors truncate" title={fullName}>
                {fullName}
              </span>
              <span className="text-[9px] vision-text-tertiary tracking-widest font-black uppercase">Red ID: #{instructor.idInstructor}</span>
            </div>
          </div>
        );
      }
    },
    {
      key: "correo",
      header: "Correo Electrónico",
      sortable: true,
      hiddenOn: "sm",
      render: (instructor) => (
        <div className="flex items-center gap-2 text-[11px] font-bold vision-text-secondary opacity-80">
          <Mail className="w-3 h-3 text-zinc-400" />
          {instructor.correo || '---'}
        </div>
      )
    },
    {
      key: "telefono",
      header: "Teléfono",
      hiddenOn: "md",
      render: (instructor) => (
        <div className="flex items-center gap-2 text-[11px] font-bold vision-text-secondary opacity-80">
          <Phone className="w-3 h-3 text-zinc-400" />
          <span className="tracking-widest">{instructor.telefono || '---'}</span>
        </div>
      )
    },
    {
      key: "acciones",
      header: "",
      className: "w-12 text-right",
      render: (instructor) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors">
                <MoreVertical className="w-4 h-4 text-zinc-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-xl border-subtle shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl">
              <DropdownMenuItem onClick={() => onEdit?.(instructor)} className="py-2.5 px-4 text-xs font-bold cursor-pointer rounded-lg mx-1 focus:bg-fundacion-verde/10 focus:text-fundacion-verde">
                <Edit2 className="w-3.5 h-3.5 mr-2" />
                Editar Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete?.(instructor.idInstructor)} className="py-2.5 px-4 text-xs font-bold cursor-pointer rounded-lg mx-1 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/30">
                <Trash2 className="w-3.5 h-3.5 mr-2" />
                Retirar de Red
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <CorporateTable
      data={instructores}
      columns={columns}
      isLoading={loading}
      emptyMessage="No hay instructores registrados en la red"
      emptyIcon={User}
      onRowClick={onEdit}
    />
  );
}
