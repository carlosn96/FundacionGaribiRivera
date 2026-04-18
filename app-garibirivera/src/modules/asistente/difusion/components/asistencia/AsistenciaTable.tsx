"use client";

import React, { useState, useMemo } from 'react';
import { 
  Check, X, Pencil, User, MessageSquare, 
  ArrowUpDown, ChevronUp, ChevronDown 
} from "lucide-react";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow
} from "@/core/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/components/ui/avatar";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { AsistenciaEmprendedor } from '@/modules/asistente/difusion/domain/models/Asistencia';
import { emprendedorRepository } from '@/modules/asistente/difusion/infrastructure/api/EmprendedorRepository';
import { cn } from "@/core/utils/utils";

interface AsistenciaTableProps {
  emprendedores: AsistenciaEmprendedor[];
  idEtapa: number;
  idTaller: number | null;
  onToggleAsistencia: (idAsistente: number, asiste: boolean, observacion: string) => Promise<void>;
  isLoading: boolean;
}

function AttendancePill({
  asiste,
  onToggle,
}: {
  asiste: boolean;
  onToggle: () => void;
}) {
  const present = asiste;
  return (
    <button
      onClick={onToggle}
      aria-label={present ? "Marcar ausente" : "Marcar presente"}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black",
        "vision-caption-upper transition-all duration-300 active:scale-95 cursor-pointer",
        present
          ? "vision-badge-success"
          : "vision-badge-muted"
      )}
    >
      {present ? (
        <><Check className="w-3 h-3" /> Presente</>
      ) : (
        <><X className="w-3 h-3 opacity-60" /> Ausente</>
      )}
    </button>
  );
}

function ObservacionCell({
  emp,
  editingId,
  obsValue,
  onEditClick,
  onObsChange,
  onSave,
}: {
  emp: AsistenciaEmprendedor;
  editingId: number | null;
  obsValue: string;
  onEditClick: () => void;
  onObsChange: (v: string) => void;
  onSave: () => void;
}) {
  const isEditing = editingId === emp.emprendedor.id;

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          autoFocus
          value={obsValue}
          onChange={(e) => onObsChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSave()}
          onBlur={onSave}
          placeholder="Escribe una nota..."
          className={cn(
            "vision-input-base text-xs font-medium h-8 px-3 rounded-lg w-full max-w-[220px]",
            "vision-caption"
          )}
        />
      </div>
    );
  }

  return (
    <button
      onClick={onEditClick}
      className={cn(
        "group/obs flex items-center gap-2 text-left w-full py-1",
        "transition-colors duration-200"
      )}
    >
      {emp.observacion ? (
        <span className="vision-caption vision-text-secondary truncate max-w-[200px]">
          {emp.observacion}
        </span>
      ) : (
        <span className="vision-caption vision-text-disabled italic">
          Añadir nota...
        </span>
      )}
      <Pencil className="w-3 h-3 vision-text-disabled opacity-0 group-hover/obs:opacity-100 transition-opacity flex-none" />
    </button>
  );
}

function SortHeader({ 
  label, 
  active, 
  direction, 
  onToggle,
  className
}: { 
  label: string; 
  active: boolean; 
  direction: 'asc' | 'desc'; 
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-1.5 vision-caption-upper transition-colors duration-200 group text-[9px]",
        active ? "vision-text-primary" : "vision-text-disabled hover:vision-text-secondary",
        className
      )}
    >
      {label}
      <div className="flex flex-col -space-y-1 opacity-40 group-hover:opacity-100 transition-opacity">
        {active && direction === 'asc' ? (
          <ChevronUp className="w-2.5 h-2.5" />
        ) : active && direction === 'desc' ? (
          <ChevronDown className="w-2.5 h-2.5" />
        ) : (
          <ArrowUpDown className="w-2.5 h-2.5" />
        )}
      </div>
    </button>
  );
}

/* ─── Skeleton loader ──────────────────────────────────── */
function TableSkeleton() {
  return (
    <div className="space-y-0 divide-y border-subtle">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4 animate-pulse">
          <div className="w-9 h-9 rounded-full surface-raised flex-none" />
          <div className="flex-1 space-y-2">
            <div className="h-3 surface-raised rounded w-36" />
            <div className="h-2.5 surface-raised rounded w-24 opacity-60" />
          </div>
          <div className="hidden md:block h-3 surface-raised rounded w-40" />
          <div className="w-20 h-6 surface-raised rounded-full flex-none" />
        </div>
      ))}
    </div>
  );
}

/* ─── Componente principal ─────────────────────────────── */

export function AsistenciaTable({
  emprendedores,
  onToggleAsistencia,
  isLoading,
}: AsistenciaTableProps) {
  const [editingObs, setEditingObs] = useState<number | null>(null);
  const [obsValue, setObsValue] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: 'nombre' | 'asiste';
    direction: 'asc' | 'desc';
  }>({ key: 'nombre', direction: 'asc' });

  const handleObservacionClick = (emp: AsistenciaEmprendedor) => {
    setEditingObs(emp.emprendedor.id);
    setObsValue(emp.observacion || "");
  };

  const handleSaveObservacion = (emp: AsistenciaEmprendedor) => {
    if (emp.observacion !== obsValue) {
      onToggleAsistencia(emp.emprendedor.id, emp.asiste, obsValue);
    }
    setEditingObs(null);
  };

  const handleToggle = (emp: AsistenciaEmprendedor) => {
    onToggleAsistencia(emp.emprendedor.id, !emp.asiste, emp.observacion || "");
  };

  const toggleSort = (key: 'nombre' | 'asiste') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedEmprendedores = useMemo(() => {
    return [...emprendedores].sort((a, b) => {
      if (sortConfig.key === 'nombre') {
        const nameA = `${a.emprendedor.nombre} ${a.emprendedor.apellidos}`.toLowerCase();
        const nameB = `${b.emprendedor.nombre} ${b.emprendedor.apellidos}`.toLowerCase();
        return sortConfig.direction === 'asc' 
          ? nameA.localeCompare(nameB) 
          : nameB.localeCompare(nameA);
      }
      if (sortConfig.key === 'asiste') {
        const valA = a.asiste ? 1 : 0;
        const valB = b.asiste ? 1 : 0;
        return sortConfig.direction === 'asc' 
          ? valA - valB 
          : valB - valA;
      }
      return 0;
    });
  }, [emprendedores, sortConfig]);

  const presentCount = emprendedores.filter(e => e.asiste).length;

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-subtle surface-raised overflow-hidden">
        <TableSkeleton />
      </div>
    );
  }

  if (emprendedores.length === 0) {
    return (
      <div className="rounded-2xl border border-subtle surface-raised p-12 text-center space-y-2">
        <User className="w-8 h-8 vision-text-disabled mx-auto" />
        <p className="vision-caption-upper vision-text-disabled">
          No hay emprendedores inscritos en este taller.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-subtle surface-raised overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Barra de resumen ── */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-subtle surface-base">
        <div className="flex items-center gap-3">
          <span className="vision-caption-upper vision-text-tertiary">
            {emprendedores.length} inscritos
          </span>
          <span className="vision-divider w-px h-3.5 inline-block" />
          <span className="vision-caption-upper vision-badge-success px-2 py-0.5 rounded-full text-[9px]">
            {presentCount} presentes
          </span>
          {emprendedores.length - presentCount > 0 && (
            <span className="vision-caption-upper vision-badge-muted px-2 py-0.5 rounded-full text-[9px]">
              {emprendedores.length - presentCount} ausentes
            </span>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-24 h-1.5 rounded-full border border-subtle overflow-hidden">
            <div
              className="h-full rounded-full bg-vision-green transition-all duration-500"
              style={{ width: `${Math.round((presentCount / emprendedores.length) * 100)}%` }}
            />
          </div>
          <span className="vision-caption vision-text-tertiary text-[11px]">
            {Math.round((presentCount / emprendedores.length) * 100)}%
          </span>
        </div>
      </div>

      {/* ── Tabla ── */}
      <div className="w-full">
        <ScrollArea className="h-[550px]">
          <Table>
            <TableHeader className="sticky top-0 z-20 surface-base border-b border-subtle">
              <TableRow className="surface-base hover:surface-base">
                <TableHead className="w-16 pl-6" />
                <TableHead className="py-3">
                  <SortHeader 
                    label="Emprendedor" 
                    active={sortConfig.key === 'nombre'} 
                    direction={sortConfig.direction} 
                    onToggle={() => toggleSort('nombre')} 
                  />
                </TableHead>
                <TableHead className="vision-caption-upper vision-text-disabled text-[9px] hidden md:table-cell">
                  Contacto
                </TableHead>
                <TableHead className="py-3 text-center">
                  <SortHeader 
                    label="Asistencia" 
                    active={sortConfig.key === 'asiste'} 
                    direction={sortConfig.direction} 
                    onToggle={() => toggleSort('asiste')}
                    className="mx-auto"
                  />
                </TableHead>
                <TableHead className="vision-caption-upper vision-text-disabled text-[9px] hidden lg:table-cell">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Nota
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedEmprendedores.map((emp) => (
                <TableRow
                  key={emp.emprendedor.id}
                  className={cn(
                    "group border-b border-subtle transition-colors duration-200",
                    "hover:surface-raised"
                  )}
                >
                  {/* Avatar */}
                  <TableCell className="w-16 pl-6 pr-2 py-3">
                    <Avatar className="h-9 w-9 border border-subtle">
                      <AvatarImage
                        src={emp.emprendedor.tieneFoto ? emprendedorRepository.getEmprendedorPhotoUrl(emp.emprendedor.id) : undefined}
                      />
                      <AvatarFallback className="surface-raised">
                        <User className="h-4 w-4 vision-text-disabled" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Nombre */}
                  <TableCell className="py-3">
                    <div className="vision-callout font-bold vision-text-primary">
                      {emp.emprendedor.nombre} {emp.emprendedor.apellidos}
                    </div>
                    <div className="vision-caption vision-text-disabled mt-0.5">
                      #{emp.emprendedor.id}
                    </div>
                  </TableCell>

                  {/* Contacto */}
                  <TableCell className="py-3 hidden md:table-cell">
                    <div className="vision-caption vision-text-secondary truncate">{emp.emprendedor.correoElectronico}</div>
                    <div className="vision-caption vision-text-disabled">{emp.emprendedor.numeroCelular}</div>
                  </TableCell>

                  {/* Asistencia toggle */}
                  <TableCell className="py-3 text-center">
                    <AttendancePill
                      asiste={emp.asiste}
                      onToggle={() => handleToggle(emp)}
                    />
                  </TableCell>

                  {/* Observación */}
                  <TableCell className="py-3 hidden lg:table-cell">
                    <ObservacionCell
                      emp={emp}
                      editingId={editingObs}
                      obsValue={obsValue}
                      onEditClick={() => handleObservacionClick(emp)}
                      onObsChange={setObsValue}
                      onSave={() => handleSaveObservacion(emp)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
