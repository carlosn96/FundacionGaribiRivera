"use client";

import React from "react";
import { CorporateTable, CorporateColumn } from "@/core/components/ui/CorporateTable";
import { EmprendedorLineaBase } from "../domain/models/LineaBaseAdministracion";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import { 
  FileSearch, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Mail,
  User as UserIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";

interface AdminLineaBaseTableProps {
  data: EmprendedorLineaBase[];
  isLoading: boolean;
  type: "with-baseline" | "without-baseline";
  onView?: (item: EmprendedorLineaBase) => void;
  onEdit?: (item: EmprendedorLineaBase) => void;
  onDelete?: (item: EmprendedorLineaBase) => void;
}

export const AdminLineaBaseTable: React.FC<AdminLineaBaseTableProps> = ({
  data,
  isLoading,
  type,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns: CorporateColumn<EmprendedorLineaBase>[] = [
    {
      key: "nombre",
      header: "Emprendedor",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-vision-brand/10 flex items-center justify-center text-vision-brand">
            <UserIcon className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium vision-text-primary">
              {item.nombre} {item.apellidos}
            </span>
            <span className="text-[10px] vision-text-disabled flex items-center gap-1">
              <Mail className="w-2.5 h-2.5" />
              {item.correo || "Sin correo"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "etapa",
      header: "Etapa",
      sortable: true,
      render: (item) => (
        <Badge variant="outline" className="vision-badge-info py-0 px-2 text-[10px]">
          {item.etapa}
        </Badge>
      ),
    },
    ...(type === "with-baseline"
      ? [
          {
            key: "fechaCreacion",
            header: "Fecha Registro",
            sortable: true,
            render: (item: EmprendedorLineaBase) => (
              <span className="vision-text-secondary text-xs">
                {item.fechaCreacion ? new Date(item.fechaCreacion).toLocaleDateString() : "-"}
              </span>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="vision-dropdown">
            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest opacity-50">
              Acciones
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {type === "with-baseline" && (
              <>
                <DropdownMenuItem onClick={() => onView?.(item)}>
                  <FileSearch className="mr-2 h-4 w-4" />
                  <span>Ver Línea Base</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(item)}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 focus:text-red-500"
                  onClick={() => onDelete?.(item)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Eliminar</span>
                </DropdownMenuItem>
              </>
            )}
            {type === "without-baseline" && (
              <DropdownMenuItem onClick={() => onEdit?.(item)}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Crear Línea Base</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
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
          ? "No hay emprendedores con línea base"
          : "Todos los emprendedores tienen línea base"
      }
    />
  );
};
