"use client";

import React from 'react';
import { Calendar, Clock, User, Hash } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/core/components/ui/dialog";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";

interface TallerCronograma {
  numero_taller: number;
  nombre_taller: string;
  fecha_formateada: string;
  instructor: string;
}

interface CronogramaModalProps {
  idEtapa: number | null;
  isOpen: boolean;
  onClose: () => void;
  cronograma: TallerCronograma[];
  loading?: boolean;
}

export function CronogramaModal({ idEtapa, isOpen, onClose, cronograma, loading }: CronogramaModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 glassmorphism shadow-2xl overflow-hidden border-zinc-200/50">
        <DialogHeader className="p-8 pb-4 bg-gradient-to-br from-fundacion-verde to-fundacion-verde-dark text-white">
          <DialogTitle className="text-2xl font-black tracking-tight uppercase flex items-center gap-4">
            <Calendar className="w-8 h-8" />
            Cronograma de Formación
          </DialogTitle>
          <DialogDescription className="text-zinc-100/70 font-medium">
            Planificación estratégica de talleres y sesiones de capacitación institucional.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full max-h-[60vh] px-8 py-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-12 h-12 border-4 border-fundacion-verde border-t-transparent rounded-full animate-spin" />
                <p className="vision-caption vision-text-secondary font-bold uppercase tracking-widest text-[10px]">Cargando planificación...</p>
              </div>
            ) : cronograma && cronograma.length > 0 ? (
              <div className="space-y-4">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800">
                      <th className="py-4 vision-caption-upper font-black text-[9px] tracking-widest vision-text-tertiary">#</th>
                      <th className="py-4 vision-caption-upper font-black text-[9px] tracking-widest vision-text-tertiary">Taller/Tema</th>
                      <th className="py-4 vision-caption-upper font-black text-[9px] tracking-widest vision-text-tertiary">Instructor</th>
                      <th className="py-4 vision-caption-upper font-black text-[9px] tracking-widest vision-text-tertiary">Fecha Programada</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900/40">
                    {cronograma.map((item, idx) => (
                      <tr key={idx} className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                        <td className="py-4 font-black text-xs text-fundacion-verde/60">{item.numero_taller}</td>
                        <td className="py-4 min-w-[200px]">
                          <div className="font-bold vision-text-primary text-sm tracking-tight group-hover:text-fundacion-verde">{item.nombre_taller}</div>
                        </td>
                        <td className="py-4">
                            <div className="flex items-center gap-2 text-xs vision-text-secondary font-medium">
                                <User className="w-3 h-3 text-zinc-300" />
                                {item.instructor || 'Sin Asignar'}
                            </div>
                        </td>
                        <td className="py-4">
                          <Badge variant="outline" className="font-black text-[10px] tracking-tight bg-fundacion-verde/5 text-fundacion-verde border-fundacion-verde/20 px-3 py-1">
                            {item.fecha_formateada}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-3xl">
                <Clock className="w-12 h-12 text-zinc-200" />
                <div className="space-y-1">
                  <p className="font-bold vision-text-secondary">No hay cronograma generado</p>
                  <p className="text-xs vision-text-tertiary max-w-[240px]">Esta etapa aún no tiene sesiones programadas en el sistema.</p>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="p-8 pt-4 bg-zinc-50/50 dark:bg-zinc-900/50 flex justify-end">
          <Button variant="outline" onClick={onClose} className="rounded-full px-8 vision-text-secondary font-bold text-xs uppercase tracking-widest border-zinc-200 dark:border-zinc-800">
            Cerrar Calendario
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
