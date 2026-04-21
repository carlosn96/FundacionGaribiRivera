"use client";

import React, { useState, useMemo } from 'react';
import { 
  Check, X, Pencil, User, MessageSquare
} from "lucide-react";
import { VisionAvatar } from "@/core/components/ui/vision-avatar";
import { AsistenciaEmprendedor } from '@/modules/asistente/difusion/domain/models/Asistencia';
import { CorporateTable, CorporateColumn } from "@/core/components/ui/CorporateTable";
import { cn } from "@/core/utils/utils";

interface AsistenciaTableProps {
  emprendedores: AsistenciaEmprendedor[];
  idEtapa: number;
  idTaller: number | null;
  onToggleAsistencia: (idAsistente: number, asiste: boolean, observacion: string) => Promise<void>;
  isLoading: boolean;
  onGetPhoto: (emp: any) => string;
}

/* ─── Componentes de Celda ─────────────────────────────── */

function AttendancePill({
  asiste,
  onToggle,
}: {
  asiste: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black",
        "vision-caption-upper transition-all duration-300 active:scale-95 cursor-pointer",
        asiste ? "vision-badge-success" : "vision-badge-muted"
      )}
    >
      {asiste ? (
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
  const isEditing = editingId === emp.emprendedor.idEmprendedor;

  if (isEditing) {
    return (
      <input
        autoFocus
        value={obsValue}
        onChange={(e) => onObsChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSave()}
        onBlur={onSave}
        placeholder="Escribe una nota..."
        className="vision-input-base text-xs font-medium h-8 px-3 rounded-lg w-full max-w-[220px] vision-caption"
      />
    );
  }

  return (
    <button
      onClick={onEditClick}
      className="group/obs flex items-center gap-2 text-left w-full py-1 transition-colors duration-200"
    >
      {emp.observacion ? (
        <span className="vision-caption vision-text-secondary truncate max-w-[200px]">
          {emp.observacion}
        </span>
      ) : (
        <span className="vision-caption vision-text-disabled italic">Añadir nota...</span>
      )}
      <Pencil className="w-3 h-3 vision-text-disabled opacity-0 group-hover/obs:opacity-100 transition-opacity flex-none" />
    </button>
  );
}

/* ─── Componente Principal ─────────────────────────────── */

export function AsistenciaTable({
  emprendedores,
  onToggleAsistencia,
  onGetPhoto,
  isLoading,
}: AsistenciaTableProps) {
  const [editingObs, setEditingObs] = useState<number | null>(null);
  const [obsValue, setObsValue] = useState("");

  const handleObservacionClick = (emp: AsistenciaEmprendedor) => {
    setEditingObs(emp.emprendedor.idEmprendedor);
    setObsValue(emp.observacion || "");
  };

  const handleSaveObservacion = (emp: AsistenciaEmprendedor) => {
    onToggleAsistencia(emp.emprendedor.idEmprendedor, emp.asiste, obsValue);
    setEditingObs(null);
  };

  const handleToggle = (emp: AsistenciaEmprendedor) => {
    onToggleAsistencia(emp.emprendedor.idEmprendedor, !emp.asiste, emp.observacion || "");
  };

  const presentCount = emprendedores.filter(e => e.asiste).length;

  const columns = useMemo((): CorporateColumn<AsistenciaEmprendedor>[] => [
    {
      key: 'avatar',
      header: '',
      className: 'w-16 pl-6 pr-2',
      render: (emp) => (
        <VisionAvatar 
          src={onGetPhoto(emp.emprendedor)}
          alt={emp.emprendedor.nombre}
          initials={`${emp.emprendedor.nombre?.charAt(0)}${emp.emprendedor.apellidos?.charAt(0)}`}
          size="md"
        />
      )
    },
    {
      key: 'nombre',
      header: 'Emprendedor',
      sortable: true,
      className: 'min-w-[200px]',
      render: (emp) => (
        <div className="vision-callout font-bold vision-text-primary">
          {emp.emprendedor.nombre} {emp.emprendedor.apellidos}
        </div>
      )
    },
    {
      key: 'contacto',
      header: 'Contacto',
      hiddenOn: 'md',
      render: (emp) => (
        <>
          <div className="vision-caption vision-text-secondary truncate">{emp.emprendedor.correoElectronico}</div>
          <div className="vision-caption vision-text-disabled">{emp.emprendedor.numeroCelular}</div>
        </>
      )
    },
    {
      key: 'asiste',
      header: 'Asistencia',
      sortable: true,
      headerClassName: 'text-center',
      className: 'text-center',
      render: (emp) => (
        <AttendancePill
          asiste={emp.asiste}
          onToggle={() => handleToggle(emp)}
        />
      )
    },
    {
      key: 'nota',
      header: 'Nota',
      hiddenOn: 'lg',
      render: (emp) => (
        <ObservacionCell
          emp={emp}
          editingId={editingObs}
          obsValue={obsValue}
          onEditClick={() => handleObservacionClick(emp)}
          onObsChange={setObsValue}
          onSave={() => handleSaveObservacion(emp)}
        />
      )
    }
  ], [editingObs, obsValue, onGetPhoto]);

  const flatData = useMemo(() => {
    return emprendedores.map(emp => ({
      ...emp,
      nombre: `${emp.emprendedor.nombre} ${emp.emprendedor.apellidos}`,
    }));
  }, [emprendedores]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Barra de resumen ── */}
      <div className="flex items-center justify-between px-5 py-3 mb-6 rounded-2xl border border-subtle surface-base shadow-sm">
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
              style={{ width: `${Math.round((presentCount / (emprendedores.length || 1)) * 100)}%` }}
            />
          </div>
          <span className="vision-caption vision-text-tertiary text-[11px]">
            {Math.round((presentCount / (emprendedores.length || 1)) * 100)}%
          </span>
        </div>
      </div>

      <CorporateTable 
        data={flatData}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No hay emprendedores inscritos en este taller."
        defaultSortKey="nombre"
      />
    </div>
  );
}
