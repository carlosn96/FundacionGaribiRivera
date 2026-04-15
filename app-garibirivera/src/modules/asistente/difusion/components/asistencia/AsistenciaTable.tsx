"use client";

import React, { useState } from 'react';
import { Check, X, FileEdit, User } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table";
import { Badge } from "@/core/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/core/components/ui/avatar";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { AsistenciaEmprendedor } from '@/modules/asistente/difusion/domain/models/Asistencia';
import { API_BASE_URL } from '@/core/constants';

interface AsistenciaTableProps {
  emprendedores: AsistenciaEmprendedor[];
  idEtapa: number;
  idTaller: number;
  onToggleAsistencia: (idAsistente: number, asiste: number, observacion: string) => Promise<void>;
  isLoading: boolean;
}

export function AsistenciaTable({ emprendedores, idEtapa, idTaller, onToggleAsistencia, isLoading }: AsistenciaTableProps) {
  const [editingObs, setEditingObs] = useState<number | null>(null);
  const [obsValue, setObsValue] = useState("");

  const handleObservacionClick = (emp: AsistenciaEmprendedor) => {
    setEditingObs(emp.id);
    setObsValue(emp.observacion || "");
  };

  const handleSaveObservacion = (emp: AsistenciaEmprendedor) => {
    if (emp.observacion !== obsValue) {
      onToggleAsistencia(emp.id, emp.asiste, obsValue);
    }
    setEditingObs(null);
  };

  const handleToggle = (emp: AsistenciaEmprendedor) => {
    const nuevoEstado = emp.asiste === 1 ? 0 : 1;
    onToggleAsistencia(emp.id, nuevoEstado, emp.observacion || "");
  };

  if (isLoading) {
    return <div className="p-8 text-center animate-pulse difusion-accent-text">Cargando lista de asistentes...</div>;
  }

  if (emprendedores.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No hay emprendedores inscritos en esta etapa.</div>;
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[80px]">Foto</TableHead>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead className="text-center">Asistencia</TableHead>
            <TableHead>Observaciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emprendedores.map((emp) => (
            <TableRow key={emp.id} className="group transition-colors">
              <TableCell>
                <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                  <AvatarImage src={emp.tiene_foto ? `${API_BASE_URL}/admin/emprendedores/${emp.id}/foto` : undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <div className="font-semibold text-sm">{emp.nombre} {emp.apellidos}</div>
                <div className="text-xs text-muted-foreground hidden md:block">#{emp.id}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{emp.correo_electronico}</div>
                <div className="text-xs text-muted-foreground">{emp.numero_celular}</div>
              </TableCell>
              <TableCell className="text-center">
                <Button 
                  size="sm" 
                  variant={emp.asiste === 1 ? "default" : "outline"} 
                  className={`h-8 px-3 rounded-full transition-all ${
                    emp.asiste === 1 
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20 shadow-lg" 
                      : "text-muted-foreground border-dashed"
                  }`}
                  onClick={() => handleToggle(emp)}
                >
                  {emp.asiste === 1 ? (
                    <><Check className="w-4 h-4 mr-1" /> Presente</>
                  ) : (
                    <><X className="w-4 h-4 mr-1 opacity-50" /> Ausente</>
                  )}
                </Button>
              </TableCell>
              <TableCell>
                {editingObs === emp.id ? (
                  <div className="flex items-center space-x-2">
                    <Input 
                      autoFocus
                      size={1}
                      className="h-8 py-1 text-xs max-w-[200px]" 
                      value={obsValue} 
                      onChange={(e) => setObsValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveObservacion(emp)}
                      onBlur={() => handleSaveObservacion(emp)}
                    />
                  </div>
                ) : (
                  <div 
                    className="flex items-center space-x-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    onClick={() => handleObservacionClick(emp)}
                  >
                    {emp.observacion ? (
                      <span className="truncate max-w-[200px]">{emp.observacion}</span>
                    ) : (
                      <span className="italic opacity-50">Añadir nota...</span>
                    )}
                    <FileEdit className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
